import { useFirebase } from '../context/Firebase'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const firebase = useFirebase()
  const navigate = useNavigate()

  useEffect(() => {
    if (firebase.isLoggedIn) navigate('/')
  }, [firebase, navigate])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('logging in a user')
    const result = await firebase.signinUserWithEmailAndPassword(
      email,
      password
    )
    console.log('login successful', result)
  }

  return (
    <div
      className="h-full w-full flex justify-center items-center bg-fixed bg-cover bg-no-repeat"
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <div
        className="p-4 bg-gray-100 bg-opacity-20 backdrop-blur-md rounded-lg flex flex-col items-center justify-center h-full w-4/5 sm:w-1/2 lg:w-1/3"
        style={{ mixBlendMode: 'multiply' }}
      >
        <div className="flex flex-col items-center justify-center bg-white rounded-xl p-6 shadow-lg w-full">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
              Welcome Back
            </h1>
            <h2 className="text-md mb-6 text-center text-gray-500">
              Please login to continue
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="text-center py-3">
            <button
              onClick={() => navigate('/signup')}
              className="text-gray-500 hover:underline focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Don't have an account? Sign Up here
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
