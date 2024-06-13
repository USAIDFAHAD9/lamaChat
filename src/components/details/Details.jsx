import { useFirebase } from '../../context/Firebase'
import { useEffect, useState } from 'react'

const Details = () => {
  const { currentUserDetails, showDetailsPage, getImagesForChat } =
    useFirebase()

  const [isChatSettingsOpen, setChatSettingsOpen] = useState(false)
  const [isPrivacySettingsOpen, setPrivacySettingsOpen] = useState(false)
  const [isSharedPhotosOpen, setSharedPhotosOpen] = useState(false)
  const [isSharedFilesOpen, setSharedFilesOpen] = useState(false)
  const [isMuted, setMuted] = useState(false) // State to handle mute/unmute
  const [sharedPhotos, setSharedPhotos] = useState(null)
  const [isLoading, setIsLoading] = useState(false) // Loading state

  useEffect(() => {
    const fetchSharedPhotos = async () => {
      if (isSharedPhotosOpen) {
        setIsLoading(true) // Start loading
        const photos = await getImagesForChat()
        setSharedPhotos(photos)
        setIsLoading(false) // End loading
      }
    }

    fetchSharedPhotos()
  }, [isSharedPhotosOpen, getImagesForChat])

  if (!currentUserDetails || !showDetailsPage) return null

  const toggleChatSettings = () => setChatSettingsOpen(!isChatSettingsOpen)
  const togglePrivacySettings = () =>
    setPrivacySettingsOpen(!isPrivacySettingsOpen)
  const toggleSharedPhotos = () => setSharedPhotosOpen(!isSharedPhotosOpen)
  const toggleSharedFiles = () => setSharedFilesOpen(!isSharedFilesOpen)

  const toggleMute = () => setMuted(!isMuted)

  return (
    <div className="flex flex-col px-3 justify-between h-full rounded-lg shadow-lg mx-auto border border-gray-300 max-w-xs w-full">
      <div className="user flex flex-col items-center px-6 pt-1 border-b border-gray-300">
        <img
          src={currentUserDetails ? currentUserDetails.dpURL : 'avatar.png'}
          alt="Profile Picture"
          className="h-32 mt-3 p-2 rounded-full object-cover cursor-zoom-in"
        />
        <h1 className="text-2xl text-center my-2">
          {currentUserDetails ? currentUserDetails.userName : ''}
        </h1>
        <p className="text-sm text-gray-600 text-center px-5 pb-4">
          <a href={`mailto:${currentUserDetails.email}`}>
            {currentUserDetails.email}
          </a>
        </p>
      </div>

      <div className="info px-4 gap-4 flex flex-col mt-4 text-sm overflow-auto h-full">
        {/* Chat Settings */}
        <div className="options">
          <div className="title flex items-center justify-between">
            <span>Chat Settings</span>
            <img
              src={isChatSettingsOpen ? 'arrowdown.png' : 'arrowup.png'}
              alt="Chat Settings"
              className="h-6 rounded-full p-1 cursor-pointer"
              onClick={toggleChatSettings}
            />
          </div>
          {isChatSettingsOpen && (
            <div className="chat-settings py-4 gap-3 flex flex-col justify-between px-4 rounded-lg bg-gray-100">
              <button
                className={`py-2 px-4 my-2 rounded-md ${
                  isMuted
                    ? 'bg-gray-400 hover:bg-gray-500'
                    : 'bg-green-400 hover:bg-green-500'
                } text-white shadow-md`}
                onClick={toggleMute}
              >
                {isMuted ? 'Unmute' : 'Mute'}
              </button>
              <button className="py-2 px-4 my-2 rounded-md bg-blue-400 hover:bg-blue-500 text-white shadow-md">
                Change Chat Background
              </button>
              <button className="py-2 px-4 my-2 rounded-md bg-red-400 hover:bg-red-500 text-white shadow-md">
                Clear Chat
              </button>
            </div>
          )}
        </div>

        {/* Privacy and Settings */}
        <div className="options">
          <div className="title flex items-center justify-between">
            <span>Privacy and Settings</span>
            <img
              src={isPrivacySettingsOpen ? 'arrowdown.png' : 'arrowup.png'}
              alt="Privacy Settings"
              className="h-6 rounded-full p-1 cursor-pointer"
              onClick={togglePrivacySettings}
            />
          </div>
          {isPrivacySettingsOpen && (
            <div className="privacy-settings py-4 gap-3 flex flex-col justify-between px-4 rounded-lg bg-gray-100">
              <button className="py-2 px-4 my-2 rounded-md bg-red-400 hover:bg-red-500 text-white shadow-md">
                Block User
              </button>
              {/* Add more privacy-related settings here */}
            </div>
          )}
        </div>

        {/* Shared Photos */}
        <div className="options">
          <div className="title flex items-center justify-between pb-3">
            <span>Shared Photos</span>
            <img
              src={isSharedPhotosOpen ? 'arrowdown.png' : 'arrowup.png'}
              alt="Shared Photos"
              className="h-6 rounded-full p-1 cursor-pointer"
              onClick={toggleSharedPhotos}
            />
          </div>
          {isSharedPhotosOpen && (
            <div className="photos py-4 gap-3 flex flex-col justify-between px-4 rounded-lg bg-gray-100">
              {isLoading ? (
                <div className="text-center text-gray-500">Loading...</div>
              ) : sharedPhotos && sharedPhotos.length > 0 ? (
                sharedPhotos.map((url, index) => (
                  <div
                    key={index}
                    className="photoItem flex justify-between items-center bg-white p-3 rounded-lg shadow-md"
                  >
                    <div className="photoDetail flex items-center gap-2">
                      <img
                        src={url}
                        alt={`Shared Photo ${index + 1}`}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </div>
                    <a href={url} download className="h-6 cursor-pointer">
                      <img src="download.png" alt="Download" className="h-6" />
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No shared photos found.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Shared Files */}
        <div className="options">
          <div className="title flex items-center justify-between">
            <span>Shared Files</span>
            <img
              src={isSharedFilesOpen ? 'arrowdown.png' : 'arrowup.png'}
              alt="Shared Files"
              className="h-6 rounded-full p-1 cursor-pointer hover:bg-gray-300"
              onClick={toggleSharedFiles}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
