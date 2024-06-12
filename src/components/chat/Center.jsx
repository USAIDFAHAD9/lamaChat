import { useEffect, useRef } from 'react'
import { useFirebase } from '../../context/Firebase'
import MyImg from '../message/MyImg'
import MyText from '../message/MyText'
import OtherImg from '../message/OtherImg'
import OtherText from '../message/OtherText'

const Center = () => {
  const endRef = useRef(null)
  const { fetchChat, chat, userDetails, currentUserDetails } = useFirebase()

  // console.log(chat)
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
            <MyImg imgURL={imgURL} sentAt={createdAt} userDP={userDP} />
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
            <OtherImg imgURL={imgURL} sentAt={createdAt} userDP={userDP} />
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

  return (
    <div className="center overflow-auto flex flex-col gap-6 mb-2 w-full p-4 px-10">
      {chat.messages &&
        chat.messages.map((message, index) => renderMessage(message, index))}
      <div ref={endRef}></div>
    </div>
  )
}

export default Center
