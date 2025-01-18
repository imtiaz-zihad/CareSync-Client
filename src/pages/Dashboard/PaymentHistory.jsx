import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useContext(AuthContext)

  // Fetch payment history using React Query
  const {
    data: paymentHistory = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments/${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return <p className="text-red-500 text-center">Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-center mb-6">Payment History</h2>
      {paymentHistory.length === 0 ? (
        <p className="text-center text-gray-600">No payment history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="px-4 py-2">Transition Id</th>
                <th className="px-4 py-2">Fees</th>
                <th className="px-4 py-2">Payment Status</th>
                <th className="px-4 py-2">Confirmation Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-4 py-2 text-center">{payment.transitionId}</td>
                  <td className="px-4 py-2 text-center">${payment.price}</td>
                  <td className="px-4 py-2 text-center">
                    {payment.status ? (
                      <span className="text-green-500">Paid</span>
                    ) : (
                      <span className="text-red-500">Unpaid</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {payment.status ? (
                      <span className="text-green-500">Confirmed</span>
                    ) : (
                      <span className="text-red-500">Pending</span>
                    )}
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

export default PaymentHistory;
