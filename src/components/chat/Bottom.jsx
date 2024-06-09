import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'
import { useFirebase } from '../../context/Firebase'

const Bottom = () => {
  const { currentUserDetails, userDetails } = useFirebase()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji)
    setOpen(false)
  }
  // userDetails? console.log( userDetails.userId) : console.log('abc');

  if (!currentUserDetails) {
    return null
  } else {
    if (!currentUserDetails.blocked.includes(userDetails.userId)) {
      return (
        <div className="bottom flex px-6 pt-2  border-t border-pink-600/30  justify-between gap-6 items-center ">
          You cannot send messages to this user.
        </div>
      )
    }
  }
  const handleSendMessage = () => {
    
  }

  return (
    <div className="bottom flex px-6 pt-2  border-t border-pink-600/30  justify-between gap-6 items-center ">
      <div className="icons flex gap-3 justify-between">
        <img src="img.png" alt="add img" className="h-6 cursor-pointer" />
        <img src="camera.png" alt="camera" className="h-6 cursor-pointer" />
        <img src="mic.png" alt="microphone" className="h-6 cursor-pointer" />
      </div>

      <input
        type="text"
        placeholder="Type a message..."
        className="border-none outline-none flex-grow bg-rose-400 bg-opacity-30 rounded-lg p-2 m-1 text-lg "
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="emoji  relative">
        <img
          src="emoji.png"
          alt="emoji"
          className="w-6 h-6 cursor-pointer "
          onClick={() => setOpen((prev) => !prev)}
        />
        <div className="picker absolute bottom-12 left-0">
          <EmojiPicker open={open} onEmojiClick={handleEmoji} />
        </div>
      </div>

      <button className="button bg-rose-400 bg-opacity-30 rounded-lg p-2 " onClick={ handleSendMessage()}>
        Send
      </button>
    </div>
  )
}

export default Bottom
