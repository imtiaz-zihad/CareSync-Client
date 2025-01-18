import { NavLink, Outlet } from "react-router-dom";
import { IoAnalytics } from "react-icons/io5";
import { BiRegistered } from "react-icons/bi";
import { MdManageSearch, MdNoteAdd, MdPayment } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaHouse, FaRegRegistered } from "react-icons/fa6";
import useAdmin from "../hooks/useAdmin";

const DashBoard = () => {
  const [isAdmin] = useAdmin();
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-sky-300">
        <ul className="menu p-4 gap-4 font-bold text-base">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/admin-profile">
                <CgProfile /> Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-camp">
                <MdNoteAdd /> Add a Camp
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-camp">
                <MdManageSearch /> Manage Camp
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/register-camp">
                <FaRegRegistered /> Register camp
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/analytics">
                  <IoAnalytics /> Analytics
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-camp">
                  {" "}
                  <BiRegistered /> Registered Camps
                </NavLink>
              </li>
              <li>
                <MdPayment />
                <NavLink to="/dashboard/payment-history">
                  {" "}
                  <MdPayment /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">
                  {" "}
                  <CgProfile /> Profile
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>

          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHouse /> Home
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
