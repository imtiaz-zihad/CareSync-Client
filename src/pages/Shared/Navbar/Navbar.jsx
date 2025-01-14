import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import avatarImg from "../../../assets/placeholder.jpg";
import { AiOutlineMenu } from "react-icons/ai";
import { AuthContext } from "../../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="border-b-[1px]">
        <div className="container mx-auto px-4 md:px-10 lg:px-20">
          <div className="flex flex-row items-center justify-between gap-3">
            {/* Logo */}
            <Link to="/">
              <img
                className="w-16"
                src={logo}
                alt="logo"
                width="100"
                height="100"
              />
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className={`${
                  isActive("/") ? "text-blue-500 font-semibold" : "text-gray-700"
                }`}
              >
                Home
              </Link>
              <Link
                to="/available-camps"
                className={`${
                  isActive("/available-camps")
                    ? "text-blue-500 font-semibold"
                    : "text-gray-700"
                }`}
              >
                Available Camps
              </Link>
              {/* Dropdown or Join Us */}
              {user ? (
                <div className="relative">
                  <div className="flex flex-row items-center gap-3">
                    {/* Dropdown Button */}
                    <div
                      onClick={() => setIsOpen(!isOpen)}
                      className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                    >
                      <AiOutlineMenu />
                      <div className="hidden md:block">
                        {/* Avatar */}
                        <img
                          className="rounded-full"
                          referrerPolicy="no-referrer"
                          src={user.photoURL ? user.photoURL : avatarImg}
                          alt="profile"
                          height="30"
                          width="30"
                        />
                      </div>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                      <div className="flex flex-col cursor-pointer">
                        <Link
                          to="/"
                          onClick={() => setIsOpen(false)}
                          className={`block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold ${
                            isActive("/") ? "bg-neutral-200" : ""
                          }`}
                        >
                          Home
                        </Link>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsOpen(false)}
                          className={`px-4 py-3 hover:bg-neutral-100 transition font-semibold ${
                            isActive("/dashboard") ? "bg-neutral-200" : ""
                          }`}
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={() => {
                            setIsOpen(false);
                            logOut();
                          }}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
