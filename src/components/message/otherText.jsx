const otherText = (message, sentAt, userDP) => {
  return (
    <div className="message flex items-start gap-4 w-3/4 py-3 px-6 mx-4 bg-rose-200 rounded-lg">
      <div className="texts text-sm w-full">
        <p className="bg-white py-2 px-4 rounded-lg shadow-sm w-full">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, error
          exercitationem mollitia eius distinctio aliquid beatae fuga sunt
          suscipit repellendus vero ducimus velit earum, vitae voluptas
          consequatur deleniti doloremque maxime! {message}
        </p>
        <span className="text-gray-500 text-sm px-1">{sentAt} min ago</span>
      </div>
      <img src={userDP} alt="pfp" className="h-10 rounded-full" />
    </div>
  )
}

export default otherText

   