import { useEffect } from 'react'
import AddUser from './addUser/AddUser'
import { useFirebase } from '../../../context/Firebase'

const ChatList = () => {
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

  useEffect(() => {
    // Sort the chats array based on updatedAt in descending order
    chats.sort((a, b) => b.updatedAt - a.updatedAt)
  }, [chats])

  const timeAgo = (timestamp) => {
    if (!timestamp) return ''
    const now = new Date()
    const updatedAt = new Date(timestamp * 1000) // Convert seconds to milliseconds
    const diffInSeconds = Math.floor((now - updatedAt) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60)
      return `${diffInMinutes} minutes ago`
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600)
      return `${diffInHours} hours ago`
    } else if (diffInSeconds < 2592000) {
      const diffInDays = Math.floor(diffInSeconds / 86400)
      return `${diffInDays} days ago`
    } else {
      const diffInMonths = Math.floor(diffInSeconds / 2592000)
      return `${diffInMonths} months ago`
    }
  }
  const firebase = useFirebase()

  return (
    <div className="pr-3 h-5/6 flex flex-col gap-3 bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
      <div className="flex items-center py-4 justify-between">
        <div className="flex items-center gap-2 bg-gray-200 bg-opacity-50 rounded-full w-5/6 p-2 shadow-sm">
          <img
            src="search.png"
            alt="search"
            className="w-4 h-4 cursor-pointer transform transition-transform hover:scale-110 ml-1"
          />
          <input
            type="text"
            placeholder="Search user"
            className="bg-transparent border-none outline-none p-0.5 mr-2 w-full text-gray-600"
          />
        </div>
        <img
          src={firebase.addMode ? 'minus.png' : 'plus.png'}
          alt="add"
          className="w-5 h-5 cursor-pointer transform transition-transform hover:scale-110"
          onClick={() => firebase.setAddMode((prev) => !prev)}
        />
      </div>

      <div className="overflow-auto mt-2 bg-gray-100 bg-opacity-50 rounded-lg shadow-inner">
        {chats.map((chat, index) => (
          <div
            key={index}
            className="py-3 px-3 flex flex-col border-b border-gray-300/50 cursor-pointer transition-transform hover:bg-gray-200"
            onClick={() => {
              setCurrentUserDetails(chat.user)
              setChatId(chat.chatId)
            }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src={(chat.user && chat.user.dpURL) || 'avatar.png'}
                  alt="avatar"
                  className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-sm"
                />
                <div className="flex flex-col justify-center">
                  <span className="text-md text-gray-800 font-semibold">
                    {chat.user && chat.user.userName}
                  </span>
                  <p className="text-xs text-gray-500">
                    {chat.user &&
                      chat.lastMessage &&
                      (chat.lastMessage?.length > 25
                        ? chat.lastMessage.slice(0, 25) + '...'
                        : chat.lastMessage)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                {timeAgo(chat.updatedAt.seconds)}
              </p>
            </div>
          </div>
        ))}
      </div>
      {firebase.addMode && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-300 w-max h-max">
            <AddUser />
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatList
