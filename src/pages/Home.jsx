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
      <div className="flex flex-row justify-between w-full h-full gap-3 p-4 md:p-6">
        <Lists />
        <Chat />
        <Details />
      </div>
    </div>
  )
}

export default Home
