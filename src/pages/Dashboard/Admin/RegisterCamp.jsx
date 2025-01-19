import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const RegisterCamp = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: camps = [],
    isLoading,
    
  } = useQuery({
    queryKey: ["myCamps"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/register-camp`);
      return data;
    },
  });
  console.log(camps);

  if(isLoading) return <LoadingSpinner/>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center mt-10">Registered Camps</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Camp Name</th>
            <th className="border border-gray-300 px-4 py-2">Camp Fees</th>
            <th className="border border-gray-300 px-4 py-2">
              Participant Name
            </th>
            <th className="border border-gray-300 px-4 py-2">Payment Status</th>
            <th className="border border-gray-300 px-4 py-2">
              Confirmation Status
            </th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {camps.map((camp) => (
            <tr key={camp.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{camp?.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                ${camp?.fees}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {camp.participantName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {camp.paymentStatus ? "Paid" : "Unpaid"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {camp.paymentStatus ? (
                  <button
                    className=" text-green-500 font-bold"
                    // onClick={() => handleConfirm(camp.id)}
                  >
                    Confirmed
                    
                  </button>
                ) : (
                  <span className="bg-yellow-500 text-white px-4 py-2 rounded">Pending</span>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className={`px-4 py-2 rounded ${
                    camp.paymentStatus &&
                    camp.confirmationStatus === "Confirmed"
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-red-500 text-white"
                  }`}
                  //   onClick={() => handleCancel(camp.id)}
                  disabled={
                    camp.paymentStatus &&
                    camp.confirmationStatus === "Confirmed"
                  }
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisterCamp;
