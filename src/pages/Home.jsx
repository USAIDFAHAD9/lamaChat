import Chat from '../components/chat/Chat'
import Details from '../components/details/Details'
import Lists from '../components/lists/Lists'

import { useFirebase } from '../context/Firebase'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const firebase = useFirebase()
  const navigate = useNavigate()

  useEffect(() => {
    if (!firebase.isLoggedIn) {
      navigate('/login')
    }
  }, [firebase.isLoggedIn, navigate])

  return (
    <div
      className="h-full w-full flex justify-center bg-fixed bg-cover bg-no-repeat overflow-hidden"
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <div
        className="p-4 bg-rose-100 bg-opacity-10 backdrop-blur-md rounded-lg w-full flex flex-col"
        style={{ mixBlendMode: 'multiply' }}
      >
        <div className="flex flex-row justify-between w-full h-full p-auto">
          <Lists />
          <Chat />
          <Details />
        </div>
      </div>
    </div>
  )
}

export default Home
