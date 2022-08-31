import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config/config";
import { GlobalContext } from "../../context/GlobalContext";
import { removeToken, userInfo } from "../../utilities/auth";
const Header = () => {
  const contextData = useContext(GlobalContext);
  const [user, setUser] = useState(userInfo() || {});
  const [showProfile, setShowProfile] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showIndicator, setShowIndicator] = useState(false);
  const humanTime = (date) => {
    date = new Date(date);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };
  const showNotificationPanel = () => {
    setShowProfile(false);
    setShowNotification(!showNotification);
    setShowIndicator(false);
    localStorage.setItem("totalNotification", notifications.totalNotification);
    // console.log(notifications.totalNotification);
  };

  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/notifications`, config.headers)
      .then((res) => {
        if (isLoaded) {
          setNotifications(res.data.data);
          const previousTotalNotification =
            localStorage.getItem("totalNotification") || 0;
          if (previousTotalNotification < res.data.data.totalNotification) {
            setShowIndicator(true);
          }
        }
        // console.log(res.data.data.dealer);
        // totalNotification = res.data.data.totalNotification;
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, []);
  const navigate = useNavigate();
  const logout = () => {
    removeToken(navigate("/login"));
  };

  return (
    <header className="relativem sticky top-0 flex px-3 md:px-6 py-3 justify-between items-center bg-gray-700 text-slate-200 z-20 print:hidden">
      {/* <!-- start left items  --> */}
      <div className="flex items-center space-x-5">
        <button
          onClick={contextData.showMobileSidebar}
          className="md:hidden bg-gray-800 p-1 rounded-full hover:bg-gray-900 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span
          id="time"
          className="hidden lg:block text-xl font-semibold"
        ></span>
      </div>
      {/* <!-- end left items  -->
          <!-- start right items  --> */}
      <div className="">
        <ul className="flex space-x-5 font-medium items-center">
          {/* <li className="flex">
            <div className="relative hidden md:block">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id=""
                className="block p-2 pl-10 w-full text-gray-200 bg-gray-800 rounded-lg border border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </li> */}
          <li className="flex">
            <button
              onClick={showNotificationPanel}
              className="relative inline-block bg-gray-800 rounded-full p-1 hover:bg-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {showIndicator && (
                <span className="absolute top-1 right-1 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"></span>
              )}
            </button>
          </li>
          {/* <li className="flex">
            <button className="relative inline-block bg-gray-800 rounded-full p-1 hover:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="absolute top-1 right-1 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"></span>
            </button>
          </li> */}
          <li>
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotification(false);
              }}
              className="flex items-center pl-2 rounded-full space-x-3 hover:bg-gray-800"
            >
              <span className="hidden md:block">{user.name}</span>
              <img
                className="w-8 h-8 rounded-full ring"
                src="../images/user.png"
                alt=""
              />
            </button>
          </li>
        </ul>
      </div>
      {showProfile && (
        <div className="absolute right-0 top-16 m-1  flex flex-col items-center rounded w-72 bg-white shadow border p-2 ">
          <div className="w-28 h-28 border rounded-full overflow-hidden">
            <img className="w-full h-full" src="../images/user.png" alt="" />
          </div>
          <h2 className="font-medium text-2xl text-indigo-600">{user.name}</h2>
          <div className="flex items-center space-x-1 text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h2 className="font-medium">{user.email}</h2>
          </div>
          <button
            onClick={logout}
            className="bg-indigo-600 w-full flex justify-center items-center p-2 mt-5 space-x-1"
          >
            <h2 className="font-medium ">Logout</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      )}

      {showNotification && (
        <div className="absolute right-0 top-16 m-1 space-y-2 max-h-[30rem] overflow-y-auto scrollbar-table overflow-hidden flex flex-col rounded-sm w-96 bg-white shadow border p-2 ">
          {notifications.notifications.map((item, indx) => {
            return (
              <Link
                onClick={() => setShowNotification(false)}
                to={item.product_id ? `/products/${item.product_id._id}` : ""}
                key={"notification_" + indx}
                className="flex space-x-2 shadow border hover:bg-slate-100 p-2 rounded"
              >
                <div className="min-w-[4rem] max-w-[4rem] h-16 border rounded-full overflow-hidden">
                  <img
                    className="w-full h-full"
                    src={
                      item.product_id
                        ? `${config.SERVER_URL}/public/storage/images/${item.product_id.photos[0]}`
                        : `https://via.placeholder.com/100x100.png/f2f2f2?text=${
                            item.title.split(" ")[0]
                          }`
                    }
                    alt=""
                  />
                </div>
                <div className="grow flex flex-col ">
                  <h2 className="font-medium text-gray-900">{item.title}</h2>
                  <p className="text-gray-500 text-sm text-justify">
                    {item.description}
                  </p>
                  <span className="text-right text-gray-900 font-medium text-xs">
                    {humanTime(item.createdAt)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
