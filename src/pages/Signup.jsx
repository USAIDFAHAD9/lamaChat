import { useFirebase } from '../context/Firebase'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const firebase = useFirebase()
  const navigate = useNavigate()

  useEffect(() => {
    if (firebase.isLoggedIn) navigate('/')
  }, [firebase.isLoggedIn, navigate])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    dob: '',
    userName: '',
    dp: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      dp: e.target.files[0],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log('Signing up a user')
      const result = await firebase.signupUserWithEmailAndPassword(
        formData.email,
        formData.password
      )
      console.log('User signed up:', result)

      if (formData.dp) {
        const dpUrl = await firebase.uploadUserDetails(
          formData.email,
          formData.password,
          formData.dob,
          formData.dp
        )
        console.log('User details uploaded, DP URL:', dpUrl)
      } else {
        console.log('No display picture selected')
      }

      console.log('Signup successful')
      navigate('/')
    } catch (error) {
      console.error('Signup failed', error)
    }
  }

  return (
    <div
      className="h-full w-full flex justify-center bg-fixed bg-cover bg-no-repeat overflow-hidden"
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <div
        className="p-4 bg-rose-100 bg-opacity-10 backdrop-blur-md rounded-lg w-full flex flex-col items-center justify-center h-full"
        style={{ mixBlendMode: 'multiply' }}
      >
        <div className="w-1/3 flex flex-col items-center justify-center bg-rose-100 rounded-xl p-6">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-center text-pink-700">
              Welcome
            </h1>
            <h1 className="text-md mb-6 text-center text-gray-500">
              Please Signup to continue
            </h1>
            <form onSubmit={handleSubmit}>
              <InputField
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <InputField
                type="text"
                name="userName"
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
              />
              <InputField
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
              <div className="mb-4">
                <input
                  type="file"
                  name="dp"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  Signup
                </button>
              </div>
            </form>
            <div className="mb-4">
              <button
                onClick={firebase.signinWithGoogle}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Signup using Google
              </button>
            </div>
          </div>
          <div className="text-center py-3">
            <button
              onClick={() => navigate('/login')}
              className="text-gray-500 hover:underline focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Already have an account? Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const InputField = ({ type, name, placeholder, value, onChange }) => (
  <div className="mb-4">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
      required
    />
  </div>
)

export default Signup
