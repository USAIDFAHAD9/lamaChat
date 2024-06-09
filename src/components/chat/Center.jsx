import { useEffect, useRef } from 'react'
import { useFirebase } from '../../context/Firebase'
import myImg from '../message/myImg'
const Center = () => {
  const endRef = useRef(null)
  const { fetchChat, chat } = useFirebase()

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

  // console.log(chat)

  return (
    <div className="center overflow-auto flex flex-col gap-6 mb-2 w-full p-4 px-10">
      {chat.messages &&
        chat.messages.map((message, index) => (
          <div key={index}>{message.text}</div>
        ))}
      <div ref={endRef}></div>
    </div>
  )
}

export default Center

// console.log(chat)

