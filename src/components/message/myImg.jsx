const MyImg = ({ imgURL, sentAt, userDP }) => {
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
    <div className="flex items-start gap-4 w-3/5 p-4  my-4 bg-gray-100 rounded-lg shadow-lg max-w-3xl ">
      <div className="text-sm w-full">
        <div className="bg-white py-3 px-4 rounded-lg shadow-md mb-2">
          <img
            src={imgURL}
            alt="Content"
            className="w-full h-60 object-cover rounded-lg"
          />
        </div>
        <span className="text-gray-500 text-xs">{timeAgo(sentAt)}</span>
      </div>
      <img
        src={userDP}
        alt="Profile"
        className="h-12 w-12 rounded-full object-cover"
      />
    </div>
  )
}

export default MyImg
