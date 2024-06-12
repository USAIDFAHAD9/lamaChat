import { useState, useEffect, useRef } from 'react'
import { useFirebase } from '../../../../context/Firebase'

const AddUser = () => {
  const [username, setUsername] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false) // State to track form submission
  const { handleSearchUser, handleAddUser, addUser, setAddUser, setAddMode } =
    useFirebase()
  const componentRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (username.trim()) {
      const user = await handleSearchUser(username)
      setAddUser(user)
      setFormSubmitted(true) // Set formSubmitted to true after submitting
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    handleAddUser()
  }

  // Event handler to check for clicks outside the component
  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setAddMode(false)
    }
  }

  // Attach the event listener for clicks
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={componentRef}
      className="addUser flex flex-col items-center justify-center gap-4 p-6 w-full h-full bg-white bg-opacity-50 rounded-lg shadow-md"
    >
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 w-full justify-center"
      >
        <input
          type="text"
          placeholder="Enter username..."
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white w-2/3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Search
        </button>
      </form>

      {formSubmitted &&
        addUser === null && ( // Render only if form is submitted and no user is found
          <div className="user flex flex-col items-center justify-center gap-2 p-4 w-full bg-gray-100 rounded-lg shadow-sm mt-4">
            <div className="flex items-center gap-3">
              <span className="text-md font-semibold text-gray-800">
                No User Found.
              </span>
            </div>
          </div>
        )}

      {addUser !== null &&
        addUser !== undefined &&
        formSubmitted && ( // Check if addUser is not null or undefined after form is submitted
          <div className="user flex flex-col items-center justify-center gap-2 p-4 w-full bg-gray-100 rounded-lg shadow-sm mt-4">
            <div className="flex items-center gap-3">
              <img
                src={addUser.dpURL || 'avatar.png'}
                alt="User Avatar"
                className="w-16 h-16 rounded-full border border-gray-400"
              />
              <span className="text-md font-semibold text-gray-800">
                {addUser.userName}
              </span>
            </div>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 mt-2"
              onClick={handleAdd}
            >
              Add User
            </button>
          </div>
        )}
    </div>
  )
}

export default AddUser
