const myText = (message, sentAt, userDP) => {
  return (
    <div className="flex items-start justify-end gap-4 w-2/3 py-3 px-6 mx-4 bg-rose-200 rounded-lg self-end">
      <div className="text-sm ">
        <p className="bg-white py-2 rounded-lg shadow-sm px-4">
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

export default myText
