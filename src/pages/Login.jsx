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
        <div className="w-1/3 flex flex-col items-center justify-center bg-rose-100 rounded-xl p-6 ">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-center text-pink-700">
              Welcome Back
            </h1>
            <h1 className="text-md mb-6 text-center text-gray-500">
              Please Login to continue
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  Login
                </button>
              </div>
            </form>
            {/* <div className="mb-4">
              <button
                onClick={firebase.signinWithGoogle}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Login using Google
              </button>
            </div> */}
          </div>
          <div className="text-center py-3">
            <button
              onClick={() => navigate('/signup')}
              className="text-gray-500 hover:underline focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Do not have an account? Sign Up here
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
