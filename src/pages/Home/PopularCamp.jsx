import { Link } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PopularCamp = () => {
  const { data: camps = [], isLoading ,refetch} = useQuery({
    queryKey: ['camps'],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_Server_LINK}/camps`);
      if (!Array.isArray(data)) throw new Error("API response is not an array");
      return data
        .sort((a, b) => b.participant_count - a.participant_count)
        .slice(0, 6);
    },
    
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Top 6 Popular Camps
        </h2>
        {camps.length === 0 ? (
          <p className="text-center text-gray-600">No popular camps available.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {camps?.map((camp) => (
              <div
                key={camp._id}
                className="camp-card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={camp.image}
                  alt={camp.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800">{camp.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Participants:{" "}
                    <span className="font-medium">{camp.participant_count}</span>
                  </p>
                  <p className="text-gray-700 mt-4">{camp.description}</p>
                  <Link to={`/camp-details/${camp._id}`}>
                    <button className="px-4 py-2 mt-2 bg-sky-400 text-white font-bold rounded-lg flex justify-center items-center">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center mt-10">
          <Link to="/available-camps">
            <button className="px-6 py-3 bg-blue-800 text-white font-bold rounded-lg flex justify-center items-center hover:bg-blue-700 transition duration-300">
              See All Camps
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularCamp;
