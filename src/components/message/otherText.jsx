import PropTypes from 'prop-types'

const OtherText = ({ message, sentAt, userDP }) => {
  // console.log(message)
  return (
    <div className="message flex items-start gap-4 w-3/4 py-3 px-6 mx-4 bg-rose-200 rounded-lg">
      <img src={userDP} alt="pfp" className="h-10 rounded-full" />
      <div className="texts text-sm w-full text-left">
        <p className="bg-white py-2 px-4 rounded-lg shadow-sm w-full">
          {message}
        </p>
        <span className="text-gray-500 text-sm px-1">{sentAt} min ago</span>
      </div>
    </div>
  )
}

OtherText.propTypes = {
  message: PropTypes.string.isRequired,
  sentAt: PropTypes.number.isRequired,
  userDP: PropTypes.string.isRequired,
}

export default OtherText
