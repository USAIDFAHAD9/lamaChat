import { useFirebase } from '../../context/Firebase'

const Details = () => {
  const { currentUserDetails, showDetailsPage } = useFirebase()
  if (!currentUserDetails || !showDetailsPage) return null
  else {
    return (
      <div className="detail w-2/6 flex flex-col pl-5 justify-between ">
        <div className="user  ">
          <div className="user flex flex-col items-center px-6 pt-1  border-b border-pink-600/30 ">
            <img
              src={currentUserDetails ? currentUserDetails.dpURL : 'avatar.png'}
              alt="pfp"
              className="h-32 pb-2 rounded-full object-cover  cursor-zoom-in "
            />
            <h1 className="text-2xl text-center my-2">
              {currentUserDetails ? currentUserDetails.userName : ''}
            </h1>
            <p className="text-sm text-gray-600 text-center px-5 pb-4">
              i am nobody and nobody is perfect.
            </p>
          </div>
        </div>
        <div className="info px-4 gap-4 flex flex-col mt-4 text-sm  overflow-auto">
          <div className="options">
            <div className="title flex items-center justify-between ">
              <span>Chat Settings</span>
              <img
                src="arrowup.png"
                alt="chat settings"
                className="h-6 bg-rose-300 rounded-full p-1 cursor-pointer hover:bg-rose-300/60 "
              />
            </div>
          </div>
          <div className="options ">
            <div className="title flex items-center justify-between ">
              <span>Privacy and Settings</span>
              <img
                src="arrowup.png"
                alt="chat settings"
                className="h-6 bg-rose-300 rounded-full p-1 cursor-pointer hover:bg-rose-300/60"
              />
            </div>
          </div>

          <div className="options ">
            <div className="title flex items-center justify-between pb-3  ">
              <span>Shared Photos</span>
              <img
                src="arrowdown.png"
                alt="chat settings"
                className="h-6 bg-rose-300 rounded-full p-1 cursor-pointer hover:bg-rose-300/60"
              />
            </div>
            <div className="photos py-4  gap-3  flex flex-col  justify-between bg-rose-200 px-4 rounded-lg ">
              <div className="photoItem flex justify-between items-center ">
                <div className="photoDetail flex items-center gap-2">
                  <img
                    src="leetcode.png"
                    alt=""
                    className=" w-12 h-12 object-cover rounded-md  "
                  />
                  <span className="text-gray-600">photo_2024_2.png</span>
                </div>
                <img src="download.png" alt="" className="h-6 cursor-pointer" />
              </div>
              <div className="photoItem flex justify-between items-center  ">
                <div className="photoDetail flex items-center gap-2">
                  <img
                    src="leetcode.png"
                    alt=""
                    className="  w-12 h-12 object-cover rounded-md  "
                  />
                  <span className="text-gray-600">photo_2024_2.png</span>
                </div>
                <img
                  src="download.png"
                  alt=""
                  className="h-6 cursor-pointer "
                />
              </div>
              <div className="photoItem flex justify-between items-center  ">
                <div className="photoDetail flex items-center gap-2">
                  <img
                    src="leetcode.png"
                    alt=""
                    className=" w-12 h-12 object-cover rounded-md  "
                  />
                  <span className="text-gray-600">photo_2024_2.png</span>
                </div>
                <img src="download.png" alt="" className="h-6 cursor-pointer" />
              </div>
              <div className="photoItem flex justify-between items-center ">
                <div className="photoDetail flex items-center gap-2">
                  <img
                    src="leetcode.png"
                    alt=""
                    className="  w-12 h-12 object-cover rounded-md  "
                  />
                  <span className="text-gray-600">photo_2024_2.png</span>
                </div>
                <img src="download.png" alt="" className="h-6 cursor-pointer" />
              </div>
              <div className="photoItem flex justify-between items-center  ">
                <div className="photoDetail flex items-center gap-2">
                  <img
                    src="leetcode.png"
                    alt=""
                    className="  w-12 h-12 object-cover rounded-md  "
                  />
                  <span className="text-gray-600">photo_2024_2.png</span>
                </div>
                <img src="download.png" alt="" className="h-6 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="options">
            <div className="title flex items-center justify-between">
              <span>Shared files</span>
              <img
                src="arrowup.png"
                alt="chat settings"
                className="h-6 bg-rose-300 rounded-full p-1 cursor-pointer hover:bg-rose-300/60 "
              />
            </div>
          </div>
        </div>
        <button className="px-2 py-2 mt-2 rounded-md bg-red-400/80 hover:bg-red-600/80">
          Block User
        </button>
      </div>
    )
  }
}

export default Details
