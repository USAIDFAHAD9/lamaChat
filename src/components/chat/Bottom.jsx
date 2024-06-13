// import  { useState } from 'react'
// import EmojiPicker from 'emoji-picker-react'
// import { useFirebase } from '../../context/Firebase'

// const Bottom = () => {
//   const { currentUserDetails, userDetails, handleSendMessage, uploadImage } =
//     useFirebase()
//   const [open, setOpen] = useState(false)
//   const [text, setText] = useState('')
//   const [sendPhotoURL, setSendPhotoURL] = useState(null)

//   const handleEmoji = (e) => {
//     setText((prev) => prev + e.emoji)
//     setOpen(false)
//   }

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       try {
//         const url = await uploadImage(file)
//         setSendPhotoURL(url)
//       } catch (error) {
//         console.error('Error uploading image:', error)
//       }
//     }
//   }

//   const handleSend = async () => {
//     if (text?.trim() || sendPhotoURL) {
//       await handleSendMessage({
//         text: text?.trim() || null,
//         imgURL: sendPhotoURL,
//       })
//       setText('')
//       setSendPhotoURL(null)
//     }
//   }

//   if (!currentUserDetails) {
//     return null
//   } else {
//     if (currentUserDetails.blocked.includes(userDetails.userId)) {
//       return (
//         <div className="bottom flex px-6 pt-2 border-t border-pink-600/30 justify-center items-center text-center">
//           <p className="text-lg font-bold">
//             You cannot send messages to this user.
//           </p>
//         </div>
//       )
//     }
//   }

//   return (
//     <div className="bottom flex px-6 pt-2 border-t border-pink-600/30 justify-between gap-6 items-center">
//       <div className="icons flex gap-3 justify-between">
//         <label>
//           <img src="img.png" alt="add img" className="h-6 cursor-pointer" />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             style={{ display: 'none' }}
//           />
//         </label>
//         <img src="camera.png" alt="camera" className="h-6 cursor-pointer" />
//         <img src="mic.png" alt="microphone" className="h-6 cursor-pointer" />
//       </div>

//       <input
//         type="text"
//         placeholder="Type a message..."
//         className="border-none outline-none flex-grow bg-rose-400 bg-opacity-30 rounded-lg p-2 m-1 text-lg"
//         onChange={(e) => setText(e.target.value)}
//         value={text}
//       />
//       <div className="emoji relative">
//         <img
//           src="emoji.png"
//           alt="emoji"
//           className="w-6 h-6 cursor-pointer"
//           onClick={() => setOpen((prev) => !prev)}
//         />
//         <div
//           className={`picker ${
//             open ? 'block' : 'hidden'
//           } absolute bottom-12 left-0`}
//         >
//           <EmojiPicker onEmojiClick={handleEmoji} />
//         </div>
//       </div>

//       <button
//         className="button bg-rose-400 bg-opacity-30 rounded-lg p-2"
//         onClick={handleSend}
//       >
//         Send
//       </button>
//     </div>
//   )
// }

// export default Bottom

import { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { useFirebase } from '../../context/Firebase'

const Bottom = () => {
  const { currentUserDetails, userDetails, handleSendMessage, uploadImage } =
    useFirebase()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [sendPhotoURL, setSendPhotoURL] = useState(null)

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji)
    setOpen(false)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        const url = await uploadImage(file)
        setSendPhotoURL(url)
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    }
  }

  const handleSend = async () => {
    if (text?.trim() || sendPhotoURL) {
      await handleSendMessage({
        text: text?.trim() || null,
        imgURL: sendPhotoURL,
      })
      setText('')
      setSendPhotoURL(null)
    }
  }

  if (!currentUserDetails) {
    return null
  } else {
    if (currentUserDetails.blocked.includes(userDetails.userId)) {
      return (
        <div className="bottom flex px-6 pt-2 border-t border-gray-300 justify-center items-center text-center">
          <p className="text-lg font-bold">
            You cannot send messages to this user.
          </p>
        </div>
      )
    }
  }

  return (
    <div className="bottom flex px-6 py-2 border-t border-gray-300 justify-between items-center gap-3 w-full">
      <div className="icons flex gap-3 justify-between">
        <label className="cursor-pointer">
          <img src="img.png" alt="Add Image" className="h-6" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>
        <img src="camera.png" alt="Camera" className="h-6 cursor-pointer" />
        <img src="mic.png" alt="Microphone" className="h-6 cursor-pointer" />
      </div>

      <input
        type="text"
        placeholder="Type a message..."
        className="flex-grow bg-gray-100 rounded-lg p-2 m-1 text-lg outline-none focus:ring-2 focus:ring-gray-500"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="relative">
        <img
          src="emoji.png"
          alt="Emoji"
          className="w-6 h-6 cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        />
        <div
          className={`picker ${
            open ? 'block' : 'hidden'
          } absolute bottom-12 right-0`}
        >
          <EmojiPicker onEmojiClick={handleEmoji} />
        </div>
      </div>

      <button
        className="button bg-gray-200 hover:bg-gray-300 rounded-lg p-2"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  )
}

export default Bottom
