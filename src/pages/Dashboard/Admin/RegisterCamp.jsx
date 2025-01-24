import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import SearchBar from "../../Shared/SearchBar/SearchBar";


const RegisterCamp = () => {
  const axiosSecure = useAxiosSecure();
  const [loadingCampId, setLoadingCampId] = useState(null);
  const [filteredCamps, setFilteredCamps] = useState([]);

  const { data: camps = [], isLoading, refetch } = useQuery({
    queryKey: ["registeredCamps"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/register-camp");
      setFilteredCamps(data); 
      return data;
    },
  });

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = camps.filter(
      (camp) =>
        camp.name.toLowerCase().includes(lowerQuery) ||
        camp.participantName.toLowerCase().includes(lowerQuery)
    );
    setFilteredCamps(filtered);
  };

  const handleConfirm = async (campId) => {
    try {
      setLoadingCampId(campId);
      await axiosSecure.post("/payment-confirm", { campId });
      await refetch();
    } catch (error) {
      console.error("Error confirming payment:", error);
    } finally {
      setLoadingCampId(null);
    }
  };

  const handleDelete = async (campId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoadingCampId(campId);
          await axiosSecure.delete(`/register-camp/${campId}`);
          await refetch();

          Swal.fire({
            title: "Deleted!",
            text: "Your camp has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting camp:", error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again.",
            icon: "error",
          });
        } finally {
          setLoadingCampId(null);
        }
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center mt-10">
        Registered Camps
      </h1>

      
      <SearchBar onSearch={handleSearch} />

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Camp Name</th>
            <th className="border border-gray-300 px-4 py-2">Camp Fees</th>
            <th className="border border-gray-300 px-4 py-2">Participant Name</th>
            <th className="border border-gray-300 px-4 py-2">Payment Status</th>
            <th className="border border-gray-300 px-4 py-2">Confirmation Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCamps.length > 0 ? (
            filteredCamps.map((camp) => (
              <tr key={camp._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{camp.name}</td>
                <td className="border border-gray-300 px-4 py-2">${camp.fees}</td>
                <td className="border border-gray-300 px-4 py-2">{camp.participantName}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {camp.paymentStatus ? "Paid" : "Unpaid"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {camp.paymentConfirmed ? (
                    <span className="text-green-500 font-bold">Confirmed</span>
                  ) : (
                    <span className="bg-yellow-500 text-white px-4 py-2 rounded">Pending</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center">
                  {camp.paymentStatus && !camp.paymentConfirmed ? (
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                      onClick={() => handleConfirm(camp._id)}
                      disabled={loadingCampId === camp._id}
                    >
                      {loadingCampId === camp._id ? "Processing..." : "Confirm Payment"}
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 bg-gray-400 text-white cursor-not-allowed rounded"
                      disabled
                    >
                      {camp.paymentConfirmed ? "Confirmed" : "Pending"}
                    </button>
                  )}

                  {!camp.paymentStatus && (
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded"
                      onClick={() => handleDelete(camp._id)}
                      disabled={loadingCampId === camp._id}
                    >
                      {loadingCampId === camp._id ? "Deleting..." : "Delete"}
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No matching camps found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RegisterCamp;
