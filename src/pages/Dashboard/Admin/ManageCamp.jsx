
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const ManageCamp = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch camps created by the organizer
  const { data: camps, isLoading } = useQuery({
    queryKey: ["organizerCamps"],
    queryFn: async () => {
      const { data } = await axiosSecure("/camps");
      return data;
    },
  });

  // Mutation to delete a camp
  const deleteMutation = useMutation({
    mutationFn: async (campId) => {
      await axiosSecure.delete(`/delete-camp/${campId}`);
    },
    onSuccess: () => {
      toast.success("Camp deleted successfully!");
      queryClient.invalidateQueries(["organizerCamps"]);
    },
    onError: (error) => {
      console.error("Error deleting camp:", error);
      toast.error("Failed to delete the camp. Please try again.");
    },
  });

  const handleDelete = (campId) => {
    if (window.confirm("Are you sure you want to delete this camp?")) {
      deleteMutation.mutate(campId);
    }
  };

  const handleUpdate = (campId) => {
    navigate(`/update-camp/${campId}`);
  };

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
                  <button
                    onClick={() => handleUpdate(camp._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300 mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(camp._id)}
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
