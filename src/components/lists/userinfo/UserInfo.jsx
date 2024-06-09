import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../../../context/Firebase'
import { useEffect, useState } from 'react'

const UserInfo = () => {
  const navigate = useNavigate()
  const firebase = useFirebase()

  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    if (firebase.isLoggedIn && firebase.userDetails) {
      setUserInfo(firebase.userDetails)
    }
  }, [firebase.isLoggedIn, firebase.userDetails])
  // console.log(userInfo)
  if (!userInfo) {
    return (
      <div className="flex items-center p-2 justify-between">
        <div
          onClick={() => navigate('/profile')}
          className="flex flex-row justify-between items-center   cursor-pointer transform transition-transform hover:scale-110"
        >
          <img
            src="avatar.png"
            alt="pfp"
            className="w-12 h-12 rounded-full mr-4 cursor-pointer transform transition-transform hover:scale-110"
          />
          <h2 className="text-lg  font-semibold  ">userName</h2>
        </div>
        <div className="flex gap-3">
          <img
            src="more.png"
            alt="more"
            className="w-4 h-4 cursor-pointer transform transition-transform hover:scale-110"
          />
          <img
            src="video.png"
            alt="video"
            className="w-5 h-4 cursor-pointer transform transition-transform hover:scale-110"
          />
          <img
            src="edit.png"
            alt="edit"
            className="h-4 cursor-pointer transform transition-transform hover:scale-110"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center p-2 justify-between">
      <div
        onClick={() => navigate('/profile')}
        className="flex flex-row justify-between items-center   cursor-pointer transform transition-transform hover:scale-110"
      >
        <img
          src={userInfo.dpURL || 'avatar.png'}
          alt="pfp"
          className="w-12 h-12 rounded-full mr-4 cursor-pointer transform transition-transform hover:scale-110"
        />
        <h2 className="text-lg  font-semibold  ">{userInfo.userName}</h2>
      </div>
      <div className="flex gap-3">
        <img
          src="more.png"
          alt="more"
          className="w-4 h-4 cursor-pointer transform transition-transform hover:scale-110"
        />
        <img
          src="video.png"
          alt="video"
          className="w-5 h-4 cursor-pointer transform transition-transform hover:scale-110"
        />
        <img
          src="edit.png"
          alt="edit"
          className="h-4 cursor-pointer transform transition-transform hover:scale-110"
        />
      </div>
    </div>
  )
}

export default UserInfo
