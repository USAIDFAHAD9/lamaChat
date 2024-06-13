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
  uploadBytes,
  listAll,
} from 'firebase/storage'

const FirebaseContext = createContext(null)

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [chats, setChats] = useState([])
  const [chats2, setChats2] = useState([])
  const [chat, setChat] = useState([])
  const [addUser, setAddUser] = useState(null) // the user we want to add
  const [currentUserDetails, setCurrentUserDetails] = useState(null) // the user we are chatting with
  const [chatId, setChatId] = useState(null)
  const [showDetailsPage, setShowDetailsPage] = useState(false)
  const [addMode, setAddMode] = useState(false)

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

  const fetchChats2 = async () => {
    try {
      const docSnap = await getDoc(
        doc(db, 'userChats', currentUserDetails.userId)
      )
      if (docSnap.exists()) {
        const items = docSnap.data().chats || []
        items?.sort((a, b) => b.updatedAt - a.updatedAt)
        setChats2(items)
      } else {
        console.log('No such document!')
      }
    } catch (error) {
      console.error('Error fetching chats:', error)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUserDetails) {
          const docSnap = await getDoc(
            doc(db, 'userChats', currentUserDetails.userId)
          )
          if (docSnap.exists()) {
            const items = docSnap.data()?.chats
            setChats2(items)
          } else {
            console.log('No such document!')
          }
        }
      } catch (error) {
        console.error('Error fetching chats2:', error)
      }
    }

    // Call the fetchData function
    fetchData()
  }, [currentUserDetails, db])
  //************************************************************************************************ made a change above. */
  const handleSendMessage = async ({ text, imgURL }) => {
    try {
      const message = {
        senderId: userDetails.userId,
        receiverId: currentUserDetails.userId,
        createdAt: new Date(),
      }

      if (text) {
        message.lastMessage = text
      } else if (imgURL) {
        message.imgURL = imgURL
      } else {
        throw new Error('Either text or imgURL must be provided.')
      }

      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion(message),
      })

      const index = chats.findIndex((c) => c.chatId === chatId)
      if (index !== -1) {
        chats[index].lastMessage = text ? text : 'Photo'
        chats[index].updatedAt = new Date(message.createdAt)

        if (chats && userDetails?.userId) {
          await updateDoc(doc(db, 'userChats', userDetails.userId), {
            chats,
          })
        }

        // Refetch chats2 after sending a message
        await fetchChats2()

        const index2 = chats2.findIndex((c) => c.chatId === chatId)
        console.log(index2)
        if (index2 !== -1) {
          console.log(chats2[index])
          chats2[index2].lastMessage = text || 'Photo'
          chats2[index2].updatedAt = message.createdAt

          if (currentUserDetails?.userId && chats2.length > 0) {
            await updateDoc(doc(db, 'userChats', currentUserDetails.userId), {
              chats: chats2,
            })
          }
        }
      }
    } catch (error) {
      console.error('Error handling sending message:', error)
    }
  }

  const uploadImage = async (file) => {
    if (!file) throw new Error('No file provided')

    const storageRef = ref(
      storage,
      `chatImages/${chatId}/${Date.now()}_${file.name}`
    )
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
  }

  const getImagesForChat = async () => {
    try {
      const imagesRef = ref(storage, `chatImages/${chatId}/`)
      const result = await listAll(imagesRef)
      console.log(result)
      // Map through all the items in the folder and get their download URLs
      const urlPromises = result.items.map((itemRef) => getDownloadURL(itemRef))
      return Promise.all(urlPromises)
    } catch (error) {
      console.error('Error fetching images:', error)
      return []
    }
  }
  const isLoggedIn = !!user

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
        uploadImage,
        setShowDetailsPage,
        setAddMode,
        getImagesForChat,
        addMode,
        showDetailsPage,
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
