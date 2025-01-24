import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import SearchBar from "../Shared/SearchBar/SearchBar";

const MyCamp = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [filteredCamps, setFilteredCamps] = useState([]);
  const [sortBy, setSortBy] = useState("name");

  const {
    data: camps = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myCamps"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-camps/${user.email}`);
      setFilteredCamps(data); // Initialize filtered camps
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this registration?")) return;

    try {
      await axiosSecure.delete(`/my-camps/${id}`);
      toast.success("Registration canceled successfully.");
      queryClient.invalidateQueries("myCamps");
    } catch (error) {
      console.error("Error deleting camp:", error.message);
      toast.error("Failed to cancel registration. Please try again.");
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      await axiosSecure.post(`/my-camps/feedback/${selectedCamp._id}`, {
        feedback,
        Name: user?.displayName,
      });
      toast.success("Feedback submitted successfully.");
      setIsModalOpen(false);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
      toast.error("Failed to submit feedback. Please try again.");
    }
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);

    const sortedCamps = [...filteredCamps].sort((a, b) =>
      a[sortValue].localeCompare(b[sortValue])
    );
    setFilteredCamps(sortedCamps);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-6 py-10">
      <Helmet>
        <title>My Camps | CareSync</title>
      </Helmet>

      <h2 className="text-4xl font-bold text-center mb-6">My Camps</h2>

      <div className="flex justify-between items-center mb-4">
        <SearchBar onSearch={handleSearch} />
        <select
          onChange={handleSortChange}
          className="px-3 py-2 border rounded-md"
        >
          <option value="name">Sort by Name</option>
          <option value="participantName">Sort by Participant Name</option>
        </select>
      </div>

      {filteredCamps.length === 0 ? (
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
              {filteredCamps.map((camp, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-4 py-2 text-center">{camp.name}</td>
                  <td className="px-4 py-2 text-center">${camp.fees}</td>
                  <td className="px-4 py-2 text-center">{camp.participantName}</td>
                  <td className="px-4 py-2 text-center">
                    {camp.paymentStatus ? (
                      <span className="text-green-500">Paid</span>
                    ) : (
                      <Link
                        to={`/dashboard/payment`}
                        state={{ price: camp.fees, campId: camp._id }}
                      >
                        <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
                          Pay
                        </button>
                      </Link>
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
                      className={`px-4 py-2 text-white rounded ${
                        camp.paymentConfirmed
                          ? "bg-green-500 hover:bg-green-600 transition"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      onClick={() => {
                        setSelectedCamp(camp);
                        setIsModalOpen(true);
                      }}
                      disabled={!camp.paymentStatus}
                    >
                      Feedback
                    </button>
                    <button
                      className={`ml-2 px-4 py-2 text-white rounded ${
                        camp.paymentStatus
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 transition"
                      }`}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h3 className="text-xl font-semibold">
              Submit Feedback for {selectedCamp?.name}
            </h3>
            <textarea
              className="w-full p-2 border rounded mt-2"
              rows="4"
              placeholder="Write your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={handleFeedbackSubmit}
              >
                Submit
              </button>
              <button
                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCamp;
