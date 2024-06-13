import PropTypes from 'prop-types'

const OtherText = ({ message, sentAt, userDP }) => {
  const timeAgo = (sentAt) => {
    // console.log(sentAt)
    const diffInSeconds = sentAt
      ? Math.round((Date.now() - sentAt.toDate().getTime()) / 1000)
      : 'just now'
    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds === 1 ? '' : 's'} ago`
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60)
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600)
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`
    } else if (diffInSeconds < 2592000) {
      const diffInDays = Math.floor(diffInSeconds / 86400)
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`
    } else {
      const diffInMonths = Math.floor(diffInSeconds / 2592000)
      return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`
    }
  }

  return (
    <div className="message flex items-start gap-4 w-3/5 p-4 my-4 bg-gray-100 rounded-lg shadow-lg  max-w-3xl ">
      <img
        src={userDP}
        alt="Profile"
        className="h-12 w-12 rounded-full object-cover"
      />
      <div className="texts text-sm w-full text-left ">
        <p className="bg-white py-3 px-4 rounded-lg shadow-md mb-2 break-words text-md">
          {message}
        </p>
        <span className="text-gray-500 text-xs px-2">{timeAgo(sentAt)}</span>
      </div>
    </div>
  )
}

OtherText.propTypes = {
  message: PropTypes.string,
  // createdAt: PropTypes.number,
  userDP: PropTypes.string,
}

export default OtherText
