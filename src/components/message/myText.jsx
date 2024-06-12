import PropTypes from 'prop-types'

const MyText = ({ message, sentAt, userDP }) => {
  // console.log(message)
  return (
    <div className="message flex items-start justify-end gap-4 w-3/4 py-3 px-6 mx-4 bg-rose-200 rounded-lg self-end">
      <div className="text-sm text-right">
        <p className="bg-white py-2 rounded-lg shadow-sm px-4">{message}</p>
        <span className="text-gray-500 text-sm px-1">{sentAt} min ago</span>
      </div>
      <img src={userDP} alt="pfp" className="h-10 rounded-full" />
    </div>
  )
}

MyText.propTypes = {
  message: PropTypes.string,
  sentAt: PropTypes.number,
  userDP: PropTypes.string,
}

export default MyText
