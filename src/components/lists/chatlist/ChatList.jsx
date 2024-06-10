import { useEffect, useState } from 'react'
import AddUser from './addUser/AddUser'
import { useFirebase } from '../../../context/Firebase'

const ChatList = () => {
  const [addMode, setAddMode] = useState(false)

  const {
    setChatId,
    fetchChats,
    chats,
    isLoggedIn,
    user,
    setCurrentUserDetails,
  } = useFirebase()

  useEffect(() => {
    const fetchChatsAsync = async () => {
      if (isLoggedIn && user) {
        return await fetchChats(user.uid)
      }
    }
    let unsubscribe
    fetchChatsAsync().then((unsub) => (unsubscribe = unsub))

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [isLoggedIn, user, fetchChats])
  console.log(chats)
  // console.log(chats[0].user)
  return (
    <div className="pr-3 h-5/6 flex flex-col gap-3">
      <div className="flex items-center py-4 justify-between">
        <div className="flex items-center gap-2 bg-rose-400 bg-opacity-30 rounded-lg w-5/6">
          <img
            src="search.png"
            alt="search"
            className="w-4 h-4 cursor-pointer transform transition-transform hover:scale-110 ml-1"
          />
          <input
            type="text"
            placeholder="search user"
            className="bg-transparent border-none outline-none p-0.5 mr-2"
          />
        </div>
        <img
          src={addMode ? 'minus.png' : 'plus.png'}
          alt="add"
          className="w-5 h-5 cursor-pointer transform transition-transform hover:scale-110"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      <div className="pt-3 overflow-auto mt-2">
        {chats.map((chat, index) => (
          <div
            key={index}
            className="p-3 flex flex-col border-b border-pink-600/30  w-5/6"
            onClick={() => {
              setCurrentUserDetails(chat.user)
              setChatId(chat.chatId)
            }}
          >
            <div className="flex gap-4 cursor-pointer">
              <img
                src={(chat.user && chat.user.dpURL) || 'avatar.png'}
                alt="avatar"
                className="w-12 h-12 cursor-pointer ml-1 rounded-full border-2 border-pink-400 overflow-hidden hover:scale-125"
              />
              <div>
                <span className="text-md">
                  {chat.user && chat.user.userName}
                </span>
                <p className="text-xs">
                  {chat.user &&
                    (chat.lastMessage.length > 25
                      ? chat.lastMessage.slice(0, 25) + '...'
                      : chat.lastMessage)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {addMode && (
        <div className="w-max h-max p-8 rounded-lg absolute top-0 bottom-0 left-0 right-0 m-auto border-2 border-gray-300 shadow-xl flex justify-center items-center bg-white">
          <AddUser />
        </div>
      )}
    </div>
  )
}

export default ChatList
