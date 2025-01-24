
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../providers/AuthProvider';
// import { AuthContext } from '../../providers/AuthProvider';
const AdminProfile = () => {
    const { user } = useContext(AuthContext);
      const role = ""; 
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Helmet>
          <title>Profile | CareSync</title>
        </Helmet>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full">
          {/* Cover Image */}
          <div className="relative">
            <img
              src={'https://www.myhcg.com/wp-content/uploads/2020/06/Hand-chooses-a-emoticon-icons-healthcare-medical-symbol-on-wooden-block-Healthcare-and-medical-Insurance-concept-scaled.jpeg'}
              alt="Cover"
              className="w-full h-36 object-cover"
            />
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <img
                src={user?.photoURL}
                alt="Profile"
                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
              />
            </div>
          </div>
  
          {/* Profile Content */}
          <div className="text-center mt-14 p-6">
            {/* Role */}
            <span className="text-sm text-gray-500 uppercase font-semibold tracking-wide">
              {role}
            </span>
            {/* User Name */}
            <h1 className="mt-2 text-2xl font-semibold text-gray-800">
              {user?.displayName || "User Name"}
            </h1>
            {/* User Email */}
            <p className="text-gray-600 mt-1">{user?.email}</p>
            
  
            {/* Buttons */}
            <div className="flex justify-center mt-4 space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition">
                Update Profile
              </button>
             
            </div>
          </div>
  
          {/* Footer with Stats */}
          {/* <div className="bg-gray-50 border-t p-4 flex justify-between text-center">
            <div>
              <p className="text-sm text-gray-600">Total Camps</p>
              <p className="font-bold text-gray-800">5</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="font-bold text-gray-800">3</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="font-bold text-gray-800">2</p>
            </div>
          </div> */}
        </div>
      </div>
    );
};

export default AdminProfile;