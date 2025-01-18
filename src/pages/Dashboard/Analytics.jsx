import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const 

  // Fetch participant's registered camps
  const {
    data: camps = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["analyticsData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-camps/${}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return <p className="text-red-500 text-center">Error: {error.message}</p>;

  // Prepare data for the chart
  const chartData = camps.map((camp) => ({
    name: camp.name,
    fees: camp.fees,
  }));

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-center mb-6">Analytics</h2>
      {camps.length === 0 ? (
        <p className="text-center text-gray-600">No registered camps found.</p>
      ) : (
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="fees" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Analytics;
