import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";

const AvailableCamp = () => {
  const { data: camps, isLoading } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_Server_LINK}/camps`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <Helmet>
        <title>Available Camp | CareSync</title>
      </Helmet>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {camps.map((camp) => (
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
              <Link to={`/camp-details/${camp?._id}`}>
                <button className="px-4 py-2 mt-2  bg-sky-400 text-white font-bold rounded-lg flex justify-center items-center">
                  {" "}
                  See Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCamp;
