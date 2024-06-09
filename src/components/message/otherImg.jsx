const otherImg = (imgURL, sentAt, userDP) => {
  return (
    <div className="flex items-start gap-4 w-2/3 py-3 px-6 mx-4 bg-rose-200 rounded-lg">
      <img src="avatar.png" alt="pfp" className="h-10 rounded-full" />
      <div className="text-md w-full h-60  ">
        <img
          src={imgURL}
          alt=""
          className=" w-full h-56  object-cover rounded-lg "
        />
        <span className="text-gray-500 text-sm px-1"> {sentAt} mins ago</span>
      </div>
      <img src={userDP} alt="pfp" className="h-10 rounded-full" />
    </div>
  )
}

export default otherImg
