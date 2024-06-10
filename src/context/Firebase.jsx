import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  onSnapshot,
  collection,
  where,
  query,
  getDocs,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore'
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage'

const FirebaseContext = createContext(null)

const firebaseConfig = {
  apiKey: 'AIzaSyAP0fT76fIYSifwIF-NmX38pey0cLLjx4g',
  authDomain: 'chatt-1417f.firebaseapp.com',
  projectId: 'chatt-1417f',
  storageBucket: 'chatt-1417f.appspot.com',
  messagingSenderId: '240916224526',
  appId: '1:240916224526:web:57195a03e3113156047a5f',
}

export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [chats, setChats] = useState([])
  const [chat, setChat] = useState([])
  const [addUser, setAddUser] = useState(null) // the user we want to add
  const [currentUserDetails, setCurrentUserDetails] = useState(null) // the user we are chatting with
  const [chatId, setChatId] = useState(null)

  const firebaseApp = useMemo(() => initializeApp(firebaseConfig), [])
  const firebaseAuth = useMemo(() => getAuth(firebaseApp), [firebaseApp])
  const db = useMemo(() => getFirestore(firebaseApp), [firebaseApp])
  const storage = useMemo(() => getStorage(firebaseApp), [firebaseApp])
  const googleProvider = useMemo(() => new GoogleAuthProvider(), [])

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setUser(user)
        await fetchUserDetails(user.uid)
      } else {
        setUser(null)
        setUserDetails(null)
      }
    })

    return () => unsubscribeAuth()
  }, [firebaseAuth])

  useEffect(() => {
    let unsubscribeChats
    if (user) {
      fetchChats(user.uid).then((unSub) => {
        unsubscribeChats = unSub
      })
    }
    return () => {
      if (unsubscribeChats) {
        unsubscribeChats()
      }
    }
  }, [user])

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password)

  const signinUserWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password)

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider)

  const signoutUser = () => signOut(firebaseAuth)

  const uploadUserDetails = async (email, userName, dob, dp) => {
    try {
      const user = firebaseAuth.currentUser
      if (!user) {
        throw new Error('No authenticated user found.')
      }
      const date = new Date()
      const storageRef = ref(storage, `profilePictures/${dp.name + date}`)
      await uploadBytesResumable(storageRef, dp)
      const dpURL = await getDownloadURL(storageRef)

      const userDetails = {
        email,
        userName,
        dob,
        dpURL,
        userId: user.uid,
        blocked: [],
      }
      await setDoc(doc(db, 'users', user.uid), userDetails)
      await setDoc(doc(db, 'userChats', user.uid), {
        chats: [],
      })
      console.log('User details uploaded successfully')
      setUserDetails(userDetails)
    } catch (error) {
      console.error('Error uploading user details:', error)
    }
  }

  const fetchUserDetails = async (uid) => {
    try {
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setUserDetails(docSnap.data())
      } else {
        console.log('No such document!')
      }
    } catch (error) {
      console.log('Error getting document:', error)
    }
  }

  const fetchChats = useCallback(
    async (uid) => {
      const unSub = onSnapshot(doc(db, 'userChats', uid), async (res) => {
        if (res.exists()) {
          const items = res.data().chats
          const promises = items.map(async (item) => {
            const userDocRef = doc(db, 'users', item.receiverId)
            const userDocSnap = await getDoc(userDocRef)
            const user = userDocSnap.data()
            return { ...item, user }
          })
          const chatData = await Promise.all(promises)
          setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
        } else {
          console.log('No such document!')
        }
      })
      return unSub
    },
    [setChats, db]
  )

  const handleSearchUser = async (username) => {
    try {
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('userName', '==', username))
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        const addUser = querySnapshot.docs[0].data()
        console.log('User found:', addUser)
        return addUser
      } else {
        console.log('No such user!')
        return null
      }
    } catch (error) {
      console.error('Error searching for user:', error)
      return null
    }
  }

  const handleAddUser = async () => {
    const chatRef = collection(db, 'chats')
    const userChatsRef = collection(db, 'userChats')
    try {
      const newChatRef = doc(chatRef)
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      })

      await updateDoc(doc(userChatsRef, userDetails.userId), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: '',
          receiverId: addUser.userId,
          updatedAt: Date.now(),
          // isSeen: false,
        }),
      })
      await updateDoc(doc(userChatsRef, addUser.userId), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: '',
          receiverId: userDetails.userId,
          updatedAt: Date.now(),
          // isSeen:false
        }),
      })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchChat = useCallback(() => {
    if (chatId) {
      const unSub = onSnapshot(doc(db, 'chats', chatId), (res) => {
        setChat(res.data())
      })
      return () => {
        unSub()
      }
    }
  }, [setChat, chatId, db])

  const handleSendMessage = async (lastMessage) => {
    try {
      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion({
          senderId: userDetails.userId,
          receiverId: currentUserDetails.userId,
          lastMessage,
          createdAt: new Date(),
        }),
      })
      const index = chats?.findIndex((c) => c.chatId === chatId)
      chats[index].lastMessage = lastMessage
      chats[index].updatedAt = new Date()
      await updateDoc(doc(db, 'userChats', userDetails.userId), {
        chats,
      })
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(index)
  //now we will update the chat in chats array at index so that last message is updated there and can be shown in the chat list

  const isLoggedIn = !!user
  // chats&&console.log(chats)
  // chat&&console.log(chat)
  // currentUserDetails && console.log(currentUserDetails)
  // chatId && console.log(chatId)

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        signoutUser,
        uploadUserDetails,
        fetchChats,
        handleSearchUser,
        handleAddUser,
        fetchChat,
        setAddUser,
        setCurrentUserDetails,
        setChatId,
        handleSendMessage,
        chatId,
        currentUserDetails,
        addUser,
        chat,
        userDetails,
        isLoggedIn,
        user,
        chats,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  )
}
