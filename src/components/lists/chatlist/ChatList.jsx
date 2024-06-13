import { useEffect, useState } from 'react'
import AddUser from './addUser/AddUser'
import { useFirebase } from '../../../context/Firebase'

const ChatList = () => {
  const [inputText, setInputText] = useState('')
  const {
    setChatId,
    fetchChats,
    chats,
    isLoggedIn,
    user,
    setCurrentUserDetails,
    addMode,
    setAddMode,
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
    chats.sort((a, b) => b.updatedAt.seconds - a.updatedAt.seconds)
  }, [chats])

  const timeAgo = (timestamp) => {
    if (!timestamp) return ''
    const now = new Date()
    const updatedAt = new Date(timestamp * 1000) // Convert seconds to milliseconds
    const diffInSeconds = Math.floor((now - updatedAt) / 1000)

    const getPluralizedTime = (value, unit) => {
      return `${value} ${unit}${value !== 1 ? 's' : ''} ago`
    }
    if (diffInSeconds < 60) {
      return getPluralizedTime(diffInSeconds, 'second')
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60)
      return getPluralizedTime(diffInMinutes, 'minute')
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600)
      return getPluralizedTime(diffInHours, 'hour')
    } else if (diffInSeconds < 2592000) {
      // Up to 30 days for simplicity
      const diffInDays = Math.floor(diffInSeconds / 86400)
      return getPluralizedTime(diffInDays, 'day')
    } else if (diffInSeconds < 31536000) {
      // Up to 12 months for simplicity
      const diffInMonths = Math.floor(diffInSeconds / 2592000)
      return getPluralizedTime(diffInMonths, 'month')
    } else {
      const diffInYears = Math.floor(diffInSeconds / 31536000)
      return getPluralizedTime(diffInYears, 'year')
    }
  }
  const filteredChats = chats.filter((c) =>
    c.user.userName.toLowerCase().includes(inputText.toLowerCase())
  )
  return (
    <div className="h-full flex flex-col gap-3 bg-white bg-opacity-75 rounded-lg shadow-lg px-4 pt-2 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-gray-200 bg-opacity-75 rounded-full w-5/6 p-2 shadow-sm">
          <img
            src="search.png"
            alt="search"
            className="w-4 h-4 cursor-pointer transform transition-transform hover:scale-110 ml-1"
          />
          <input
            type="text"
            placeholder="Search user"
            className="bg-transparent border-none outline-none p-0.5 mr-2 w-full text-gray-600"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <img
          src={addMode ? 'minus.png' : 'plus.png'}
          alt="add"
          className="w-5 h-5 cursor-pointer transform transition-transform hover:scale-110"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      <div className="overflow-auto mt-1 bg-gray-100 bg-opacity-75 rounded-lg shadow-inner">
        {filteredChats?.map((chat, index) => (
          <div
            key={index}
            className="p-3 flex border-b border-gray-300 cursor-pointer hover:bg-gray-200"
            onClick={() => {
              setCurrentUserDetails(chat.user)
              setChatId(chat.chatId)
            }}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <img
                  src={(chat.user && chat.user.dpURL) || 'avatar.png'}
                  alt="avatar"
                  className="w-14 h-14 rounded-full border border-black shadow-sm"
                />
                <div className="flex flex-col">
                  <span className="text-md text-gray-800 font-semibold">
                    {chat.user && chat.user.userName}
                  </span>
                  <span className="text-sm text-gray-600">
                    {chat.lastMessage}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 hidden md:block">
                {timeAgo(chat.updatedAt.seconds)}
              </p>
            </div>
          </div>
        ))}
      </div>
      {addMode && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-300 max-w-md">
            <AddUser />
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatList
