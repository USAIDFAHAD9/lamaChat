import { useEffect, useRef, useState } from 'react'
import { useFirebase } from '../../context/Firebase'
import MyImg from '../message/MyImg'
import MyText from '../message/MyText'
import OtherImg from '../message/OtherImg'
import OtherText from '../message/OtherText'

const ImageModal = ({ imgURL, onClose }) => {
  const closeModal = (e) => {
    if (e.target.classList.contains('modal-bg')) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 modal-bg"
      onClick={closeModal}
    >
      <div className="relative bg-gray-200 rounded-lg shadow-lg overflow-hidden  flex items-center justify-center ">
        <div className="h-2/3-screen flex gap-3 m-20 w-full">
          <img
            src={imgURL}
            alt="Enlarged"
            className="w-full max-h-96 object-contain rounded-md "
          />
          <button
            className="absolute top-2 right-2  text-4xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  )
}

const Center = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const endRef = useRef(null)
  const { fetchChat, chat, userDetails, currentUserDetails } = useFirebase()

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat])

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = await fetchChat()
      return unsubscribe
    }

    let unsubscribe
    fetchData().then((unsub) => {
      unsubscribe = unsub
    })

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [fetchChat])
  const handleImageClick = (imgURL) => {
    setSelectedImage(imgURL)
  }
  const renderMessage = (message, index) => {
    const { lastMessage, imgURL, senderId, createdAt } = message
    const userDP =
      senderId === userDetails?.userId
        ? userDetails.dpURL
        : currentUserDetails?.dpURL

    if (senderId === userDetails?.userId) {
      // Message sent by the current user
      if (imgURL) {
        return (
          <div className="flex justify-end" key={index}>
            <MyImg
              imgURL={imgURL}
              sentAt={createdAt}
              userDP={userDP}
              onClick={() => handleImageClick(imgURL)}
            />
          </div>
        )
      } else {
        return (
          <div className="flex justify-end" key={index}>
            <MyText message={lastMessage} sentAt={createdAt} userDP={userDP} />
          </div>
        )
      }
    } else {
      // Message sent by the other user
      if (imgURL) {
        return (
          <div className="flex" key={index}>
            <OtherImg
              imgURL={imgURL}
              sentAt={createdAt}
              userDP={userDP}
              onClick={() => handleImageClick(imgURL)}
            />
          </div>
        )
      } else {
        return (
          <div className="flex" key={index}>
            <OtherText
              message={lastMessage}
              sentAt={createdAt}
              userDP={userDP}
            />
          </div>
        )
      }
    }
  }
  if (!currentUserDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <img src="lama.png" alt="LamaCat" className="h-96 mb-4" />
        <span className="text-center text-gray-800 text-2xl flex">
          Hello&nbsp;
          <p className="text-gray-500">{userDetails?.userName}</p>, I am LamaCat
        </span>
      </div>
    )
  }
  return (
    <div className="center overflow-auto flex flex-col gap-6 mb-2 w-full p-4 px-10">
      {chat.messages &&
        chat.messages.map((message, index) => renderMessage(message, index))}
      <div ref={endRef}></div>

      {selectedImage && (
        <ImageModal
          imgURL={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  )
}

export default Center
