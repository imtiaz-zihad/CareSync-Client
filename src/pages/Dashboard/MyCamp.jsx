import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";

const MyCamp = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: camps = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myCamps"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/my-camps");
      return data;
    },
  });

  

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/my-camps/${id}`);
      toast.success("Registration canceled successfully.");
      queryClient.invalidateQueries("myCamps"); // Refresh data
    } catch (error) {
      console.error("Error deleting camp:", error.message);
      toast.error("Failed to cancel registration. Please try again.");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-center mb-6">My Camps</h2>
      {camps.length === 0 ? (
        <p className="text-center text-gray-600">No camps registered.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="px-4 py-2">Camp Name</th>
                <th className="px-4 py-2">Camp Fees</th>
                <th className="px-4 py-2">Participant Name</th>
                <th className="px-4 py-2">Payment Status</th>
                <th className="px-4 py-2">Payment Confirmation</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {camps.map((camp, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-4 py-2 text-center">{camp.name}</td>
                  <td className="px-4 py-2 text-center">${camp.fees}</td>
                  <td className="px-4 py-2 text-center">
                    {camp.participantName}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {camp.paymentStatus ? (
                      <span className="text-green-500">Paid</span>
                    ) : (
                      <button
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                        // onClick={() => handlePayment()}
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {camp.paymentConfirmed ? (
                      <span className="text-green-500">Confirmed</span>
                    ) : (
                      <span className="text-red-500">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      onClick={() => alert(`Feedback for ${camp.name}`)}
                    >
                      Feedback
                    </button>
                    <button
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      onClick={() => handleDelete(camp._id)}
                      disabled={camp.paymentStatus}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyCamp;
