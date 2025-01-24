import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import SearchBar from "../../Shared/SearchBar/SearchBar";

const ManageCamp = () => {
  const axiosSecure = useAxiosSecure();
  const [filteredCamps, setFilteredCamps] = useState([]);

  const {
    data: camps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["organizerCamps"],
    queryFn: async () => {
      const { data } = await axiosSecure("/camps");
      setFilteredCamps(data); // Initialize filtered camps with full data
      return data;
    },
  });

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = camps.filter(
      (camp) =>
        camp.name.toLowerCase().includes(lowerQuery) ||
        camp.date_time.toLowerCase().includes(lowerQuery) ||
        camp.healthcare_professional.toLowerCase().includes(lowerQuery) ||
        camp.location.toLowerCase().includes(lowerQuery)
    );
    setFilteredCamps(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/camps/${id}`);
      toast.success("Camp Deleted successfully.");
      refetch();
    } catch (error) {
      console.error("Error deleting camp:", error.message);
      toast.error("Failed to delete camp. Please try again.");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-6 py-10">
      <Helmet>
        <title>Manage Camp | CareSync</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">Manage Camps</h1>
      <SearchBar onSearch={handleSearch} />

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
            {filteredCamps.length > 0 ? (
              filteredCamps.map((camp) => (
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
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300 mr-2">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(camp._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No matching camps found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCamp;
