import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="p-16 bg-gray-200">
      <div className="p-8 bg-gray-50 shadow mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 relative">
          <div className="w-48 h-48 bg-red-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="mt-32 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            {`${user.firstName} ${user.lastName}`}
          </h1>
          <p className="font-light text-gray-600 mt-3">{user.userName}</p>
          <p className="mt-3 text-gray-500">{user.email}</p>
        </div>

        <div className="mt-6 flex flex-col justify-center">
          <p className="text-gray-600 text-center font-light lg:px-16">
            {user.Address}
          </p>
          <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
