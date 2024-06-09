import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'
import { useEffect, useState } from 'react'

const Profile = () => {
  const firebase = useFirebase()
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    if (firebase.isLoggedIn && firebase.userDetails) {
      setUserInfo(firebase.userDetails)
    }
  }, [firebase.isLoggedIn, firebase.userDetails])

  if (!userInfo) {
    return (
      <div className="items-center justify-center flex flex-col gap-10 p-20 m-auto">
        <img src="avatar.png" alt="Profile" className="h-64 rounded-full" />
        <h1>User Name: </h1>
        <h1>Email: </h1>
        <h1>DOB: </h1>

        <button
          onClick={() => {
            firebase.signoutUser()
            navigate('/login')
          }}
          className="bg-rose-300 px-20 py-2 rounded-xl"
        >
          Sign Out
        </button>
      </div>
    ) // or a loading spinner
  }

  return (
    <div className="items-center justify-center flex flex-col gap-10 p-20 m-auto">
      <img
        src={userInfo.dpURL || 'avatar.png'}
        alt="Profile"
        className="h-64 rounded-full"
      />
      <h1>User Name: {userInfo.userName}</h1>
      <h1>Email: {userInfo.email}</h1>
      <h1>DOB: {userInfo.dob}</h1>

      <button
        onClick={() => {
          firebase.signoutUser()
          navigate('/login')
        }}
        className="bg-rose-300 px-20 py-2 rounded-xl"
      >
        Sign Out
      </button>
    </div>
  )
}

export default Profile
