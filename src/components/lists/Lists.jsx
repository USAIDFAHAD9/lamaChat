// import UserInfo from './userinfo/UserInfo'
// import ChatList from './chatlist/ChatList'
// const Lists = () => {
//   return (
//     <div className="w-2/6 h-full pb-1 ">
//       <UserInfo />
//       <ChatList />
//     </div>
//   )
// }

// export default Lists

import UserInfo from './userinfo/UserInfo'
import ChatList from './chatlist/ChatList'

const Lists = () => {
  return (
    <div className="flex flex-col w-full h-full pb-1 mx-auto max-w-lg ">
      <UserInfo className="md:w-2/6 md:pb-0 pb-2" />
      <ChatList className="md:w-4/6" />
    </div>
  )
}

export default Lists
