import UserInfo from './userinfo/UserInfo'
import ChatList from './chatlist/ChatList'

const Lists = () => {
  return (
    <div className="flex flex-col w-full h-full max-w-sm mx-auto border border-gray-300 rounded-lg shadow-lg">
      <UserInfo className="md:w-2/6  h-full" />
      <ChatList className="md:w-4/6 h-full" />
    </div>
  )
}

export default Lists
