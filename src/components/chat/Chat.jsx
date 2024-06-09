import Bottom from './Bottom'
import Center from './Center'
import Top from './top'


const Chat = () => {
  return (
    <div className=" chat w-full border-l border-r border-pink-600/30 px-3 flex flex-col justify-between h-full gap-1">
      <Top />
      <Center/>
      <Bottom/>
    </div>
  )
}

export default Chat


// 3 main sections top, center and bottom