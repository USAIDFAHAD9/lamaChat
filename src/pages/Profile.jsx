import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'

const Profile = () => {
  const firebase = useFirebase()
  const navigate = useNavigate()

  if (!firebase.userDetails) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 p-10 m-auto bg-white rounded-lg shadow-lg w-1/2 h-2/3">
        <img src="avatar.png" alt="Profile" className="h-64 rounded-full" />
        <h1 className="text-2xl font-medium text-gray-800">Loading...</h1>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="relative flex flex-col items-center justify-center gap-8 p-10 bg-white rounded-lg shadow-lg w-full max-w-2xl h-auto">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={() => navigate('/')}
          aria-label="Close"
        >
          ✕
        </button>
        <img
          src={firebase.userDetails.dpURL || 'avatar.png'}
          alt="Profile"
          className="h-64 rounded-full border shadow-md"
        />
        <h1 className="text-2xl font-semibold text-gray-800">
          {firebase.userDetails.userName}
        </h1>
        <p className="text-lg text-gray-600">
          Email: {firebase.userDetails.email}
        </p>
        <p className="text-lg text-gray-600">DOB: {firebase.userDetails.dob}</p>
        <button className="px-4 py-2 mt-4 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default Profile
