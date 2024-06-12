import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'

const Profile = () => {
  const firebase = useFirebase()
  const navigate = useNavigate()

  if (!firebase.userDetails) {
    return (
      <div className="items-center justify-center flex flex-col gap-10 p-20 m-auto bg-white rounded-lg shadow-md w-1/2 h-2/3">
        <img src="avatar.png" alt="Profile" className="h-64 rounded-full " />
        <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
      </div>
    ) 
  }

  return (
    <div className="items-center justify-center flex flex-col gap-10 p-20 m-auto bg-white rounded-lg shadow-md w-1/2 h-2/3 ">
      <button
        className="absolute top-8 right-8 text-gray-500 hover:text-gray-700 text-3xl"
        onClick={() => navigate('/')}
      >
        ✕
      </button>
      <img
        src={firebase.userDetails.dpURL || 'avatar.png'}
        alt="Profile"
        className="h-64 rounded-full border shadow-xl "
      />
      <h1 className="text-2xl font-semibold text-gray-700">
        User Name: {firebase.userDetails.userName}
      </h1>
      <h1 className="text-xl text-gray-600">
        Email: {firebase.userDetails.email}
      </h1>
      <h1 className="text-xl text-gray-600">DOB: {firebase.userDetails.dob}</h1>
      <button className='text-lg'>Edit Profile</button>
    </div>
  )
}

export default Profile
