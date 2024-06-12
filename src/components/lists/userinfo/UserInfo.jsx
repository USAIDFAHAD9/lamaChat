import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../../../context/Firebase'
import { useEffect, useState } from 'react'

const UserInfo = () => {
  const navigate = useNavigate()
  const firebase = useFirebase()
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const handleMoreClick = () => {
    setDropdownVisible(!dropdownVisible)
  }
  const handleProfileClick = () => {
    navigate('/profile')
    setDropdownVisible(false)
  }

  const handleSignOutClick = () => {
    firebase.signoutUser()
    navigate('/login')
    setDropdownVisible(false)
  }
  const handleShowBlockedUsersClick = () => {
    // Add your logic for showing blocked users here
    setDropdownVisible(false)
  }

  useEffect(() => {
    if (firebase.isLoggedIn && firebase.userDetails) {
      setUserInfo(firebase.userDetails)
    }
  }, [firebase.isLoggedIn, firebase.userDetails])
  if (!userInfo) {
    return (
      <div className="flex items-center p-2 justify-between">
        <div
          // onClick={() => navigate('/profile')}
          className="flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-110"
        >
          <img
            src="avatar.png"
            alt="pfp"
            className="w-12 h-12 rounded-full mr-4 cursor-pointer transform transition-transform hover:scale-110"
          />
          <h2 className="text-lg font-semibold">Loading..</h2>
        </div>
        <div className="relative">
          <img
            src="more.png"
            alt="more"
            className="w-4 h-4 cursor-pointer transform transition-transform hover:scale-110"
            onClick={handleMoreClick}
          />
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
              <div
                onClick={handleProfileClick}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                Profile
              </div>
              <div
                onClick={handleSignOutClick}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                Sign Out
              </div>
              <div
                onClick={handleShowBlockedUsersClick}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                Show Blocked Users
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-3">
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
      <div className="flex flex-row justify-between items-center cursor-pointer transform transition-transform ">
        <img
          src={userInfo.dpURL || 'avatar.png'}
          alt="pfp"
          className="w-12 h-12 rounded-full mr-3 cursor-pointer transform transition-transform "
        />
        <h2 className="text-xl font-semibold">{userInfo.userName}</h2>
      </div>
      <div className="relative">
        <img
          src="more.png"
          alt="more"
          className="w-6 h-6 cursor-pointer transform transition-transform hover:scale-110"
          onClick={handleMoreClick}
        />
        {dropdownVisible && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10 ">
            <div
              onClick={handleProfileClick}
              className="px-4 py-3 cursor-pointer hover:bg-gray-200"
            >
              Profile
            </div>
            <div
              onClick={handleShowBlockedUsersClick}
              className="px-4 py-3 cursor-pointer hover:bg-gray-200"
            >
              Show Blocked Users
            </div>
            <div
              onClick={handleSignOutClick}
              className="px-4 py-3 cursor-pointer hover:bg-gray-200 text-red-600  hover:underline "
            >
              Sign Out
            </div>
          </div>
        )}
      </div>
      {/* <div className="flex gap-3">
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
      </div> */}
    </div>
  )
}

export default UserInfo
