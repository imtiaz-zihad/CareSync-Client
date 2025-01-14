/* eslint-disable no-unused-vars */
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";

const CampDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const { data: camps, isLoading } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_Server_LINK}/camps/${id}`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  console.log(camps);

  const {
    name,
    image,
    fees,
    date_time,
    description,
    healthcare_professional,
    location,
    participant_count,
    _id,
  } = camps;

  const handleFormSubmit =async (event) => {
    event.preventDefault(); // Prevent page reload

    if (user && user.email) {
      const formData = new FormData(event.target); // Collect form data
      const submissionData = {
        campId: _id,
        name,
        fees,
        location,
        participantName: user?.displayName,
        participantEmail: user?.email,
        age: formData.get("age"),
        phoneNumber: formData.get("phoneNumber"),
        gender: formData.get("gender"),
        emergencyContact: formData.get("emergencyContact"),
      };
  
      try {
        await axios.post(
          `${import.meta.env.VITE_Server_LINK}/participants`,
          submissionData
        );
        toast.success("You have successfully joined the camp!");
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error submitting the form:", error);
        toast.error("Failed to join the camp. Please try again.");
      }
    } else {
      toast.error("You are not logged in. Please log in to join the camp.");
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <Helmet>
        <title>Camps Details | CareSync</title>
      </Helmet>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <div className="image-section">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Details Section */}
        <div className="details-section bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{name}</h2>
          <p className="text-gray-700 mb-4">
            <span className="font-bold">Description:</span> {description}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Date & Time:</span> {date_time}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Location:</span> {location}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Healthcare Professional:</span>{" "}
            {healthcare_professional}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Participants:</span> {participant_count}
          </p>
          <p className="text-gray-700 mb-6">
            <span className="font-bold">Fees:</span> ${fees}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Join Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Camp</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Camp Name
                </label>
                <input
                  type="text"
                  value={name}
                  readOnly
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Camp Fees
                </label>
                <input
                  type="text"
                  value={`$${fees}`}
                  readOnly
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  readOnly
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Healthcare Professional
                </label>
                <input
                  type="text"
                  value={healthcare_professional}
                  readOnly
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Participant Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Participant Email
                </label>
                <input
                  type="text"
                  value={user?.email || ""}
                  readOnly
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampDetails;
