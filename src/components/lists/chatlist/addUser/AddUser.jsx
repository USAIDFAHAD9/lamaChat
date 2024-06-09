import { useState } from 'react'
import { useFirebase } from '../../../../context/Firebase'

const AddUser = () => {
  const [username, setUsername] = useState('')
  const { handleSearchUser, handleAddUser, addUser, setAddUser } = useFirebase()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (username.trim()) {
      const user = await handleSearchUser(username)
      setAddUser(user)
    }
  }
  const handleAdd = async (e) => {
    e.preventDefault()
    handleAddUser()
  }
  return (
    <div className="addUser flex flex-col items-center justify-between p-6 h-full w-full">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username..."
          className="px-4 py-1 rounded-lg border-none outline-none mx-3 bg-rose-300/70"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          className="mr-3 bg-rose-300/70 px-3 py-1 rounded-lg"
        >
          Search
        </button>
      </form>
      <div className="user flex items-center justify-between gap-2">
        {addUser && (
          <>
            <div className="flex details gap-4 items-center justify-between py-6 px-5">
              <img
                src={addUser.dpURL || 'avatar.png'}
                alt=""
                className="h-10 rounded-full"
              />
              <span>{addUser.userName}</span>
            </div>
            <button
              className="bg-rose-300/70 p-6 py-1 rounded-lg"
              onClick={handleAdd}
            >
              Add User
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default AddUser
