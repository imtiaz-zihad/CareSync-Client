
import { useQuery} from "@tanstack/react-query";
import { Link } from "react-router-dom";



import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const ManageCamp = () => {
  const axiosSecure = useAxiosSecure();
 

  // Fetch camps created by the organizer
  const { data: camps, isLoading } = useQuery({
    queryKey: ["organizerCamps"],
    queryFn: async () => {
      const { data } = await axiosSecure("/camps");
      return data;
    },
  });

 




 

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Manage Camps</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Date & Time</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">Healthcare Professional</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {camps?.map((camp) => (
              <tr
                key={camp._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {camp.name}
                </td>
                <td className="py-3 px-6 text-left">{camp.date_time}</td>
                <td className="py-3 px-6 text-left">{camp.location}</td>
                <td className="py-3 px-6 text-left">
                  {camp.healthcare_professional}
                </td>
                <td className="py-3 px-6 text-center">
                 <Link to={`/dashboard/updateCamp/${camp._id}`}>
                 <button
                    
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300 mr-2"
                  >
                    Update
                  </button>
                 </Link>
                  <button
                    // onClick={() => handleDelete(camp._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCamp;
