import Bottom from './Bottom'
import Center from './Center'
import Top from './Top'

const Chat = () => {
  return (
    <div className="w-full px-3 flex flex-col justify-between h-full gap-1 mx-auto border border-gray-300 rounded-lg shadow-lg">
      <Top />
      <Center />
      <Bottom />
    </div>
  )
}

export default Chat
