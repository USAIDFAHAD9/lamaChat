import { useEffect, useRef } from 'react'
import { useFirebase } from '../../context/Firebase'
import MyImg from '../message/MyImg'
import MyText from '../message/MyText'
import OtherImg from '../message/OtherImg'
import OtherText from '../message/OtherText'

const Center = () => {
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

  const renderMessage = (message, index) => {
    const { lastMessage, imgURL, senderId, createdAt } = message
    const sentAt = createdAt
      ? Math.round((Date.now() - createdAt.toDate().getTime()) / (60 * 1000))
      : 'just now'
    const userDP =
      senderId === userDetails?.userId
        ? userDetails.dpURL
        : currentUserDetails?.dpURL

    if (senderId === userDetails?.userId) {
      // Message sent by the current user
      if (imgURL) {
        return (
          <MyImg key={index} imgURL={imgURL} sentAt={sentAt} userDP={userDP} />
        )
      } else {
        return (
          <MyText
            key={index}
            message={lastMessage}
            sentAt={sentAt}
            userDP={userDP}
          />
        )
      }
    } else {
      // Message sent by the other user
      if (imgURL) {
        return (
          <OtherImg
            key={index}
            imgURL={imgURL}
            sentAt={sentAt}
            userDP={userDP}
          />
        )
      } else {
        return (
          <OtherText
            key={index}
            message={lastMessage}
            sentAt={sentAt}
            userDP={userDP}
          />
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
