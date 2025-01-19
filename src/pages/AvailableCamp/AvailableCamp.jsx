import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";

const AvailableCamp = () => {
  const { data: camps = [], isLoading, isError, error } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_Server_LINK}/camps`);
      if (!Array.isArray(data)) {
        console.error("API response is not an array:", data);
        throw new Error("API response is not an array");
      }
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    console.error("Error fetching camps:", error.message);
    return (
      <p className="text-center text-red-500">Failed to load available camps.</p>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Available Camp | CareSync</title>
      </Helmet>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {Array.isArray(camps) && camps.length > 0 ? (
          camps.map((camp) => (
            <div
              key={camp._id || Math.random()}
              className="camp-card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={camp.image || "default-image.jpg"}
                alt={camp.name || "Unnamed Camp"}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800">
                  {camp.name || "Unnamed Camp"}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Participants:{" "}
                  <span className="font-medium">{camp.participant_count || 0}</span>
                </p>
                <p className="text-gray-700 mt-4">
                  {camp.description || "No description available."}
                </p>
                <Link to={`/camp-details/${camp._id || ""}`}>
                  <button className="px-4 py-2 mt-2 bg-sky-400 text-white font-bold rounded-lg flex justify-center items-center">
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No available camps found.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableCamp;
