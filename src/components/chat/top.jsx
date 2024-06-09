import { useFirebase } from '../../context/Firebase'

const Top = () => {
  const { currentUserDetails } = useFirebase()
  // console.log(currentUserDetails)
  if (!currentUserDetails) {
    return null
  }
  return (
    <div className="top border-b border-pink-600/30 p-3 flex justify-between items-center">
      <div className="user flex gap-4">
        <img
          src={currentUserDetails ? currentUserDetails.dpURL : 'avatar.png'}
          alt="avatar."
          className="w-14 h-14 cursor-pointer ml-1 rounded-full object-cover"
        />
        <div className="texts ">
          <span className="text-xl">{currentUserDetails?.userName}</span>
          <p className="text-sm text-pink-800">
            Lorem ipsum, dolor sit amet consectetur.{' '}
          </p>
        </div>
      </div>
      <div className="icons flex gap-4">
        <img
          src="call.png"
          alt="call"
          className="w-6 h-6 cursor-pointer transform transition-transform hover:scale-110"
        />
        <img
          src="video.png"
          alt="video"
          className="w-7 h-6 cursor-pointer transform transition-transform hover:scale-110"
        />
        <img
          src="info.png"
          alt="info"
          className="w-6 h-6  cursor-pointer transform transition-transform hover:scale-110"
        />
      </div>
    </div>
  )
}

export default Top
