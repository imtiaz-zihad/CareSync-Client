import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const AddCamp = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    isLoading,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const newCamp = {
      ...data,
      participant_count: 0,
      organizer_name: user?.displayName,
      organizer_email: user?.email,
    };
    try {
      await axiosSecure.post(`/camps`, newCamp);
      toast.success("Camp added successfully!");
      reset();
    } catch (error) {
      console.error("Error adding camp:", error);
      toast.error("Failed to add the camp. Please try again.");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Helmet>
        <title>Add Camp | CareSync</title>
      </Helmet>
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Add a New Camp
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Camp Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Camp Name is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              {...register("image", { required: "Image URL is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="fees" className="block text-sm font-medium">
              Camp Fees ($)
            </label>
            <input
              type="number"
              id="fees"
              {...register("fees", {
                required: "Camp Fees is required",
                valueAsNumber: true,
              })}
              className="w-full p-2 border rounded-md"
            />
            {errors.fees && (
              <p className="text-red-500 text-sm">{errors.fees.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="date_time" className="block text-sm font-medium">
              Date & Time
            </label>
            <input
              type="datetime-local"
              id="date_time"
              {...register("date_time", {
                required: "Date & Time is required",
              })}
              className="w-full p-2 border rounded-md"
            />
            {errors.date_time && (
              <p className="text-red-500 text-sm">{errors.date_time.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium">
              Location
            </label>
            <input
              type="text"
              id="location"
              {...register("location", { required: "Location is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="healthcare_professional"
              className="block text-sm font-medium"
            >
              Healthcare Professional Name
            </label>
            <input
              type="text"
              id="healthcare_professional"
              {...register("healthcare_professional", {
                required: "Healthcare Professional Name is required",
              })}
              className="w-full p-2 border rounded-md"
            />
            {errors.healthcare_professional && (
              <p className="text-red-500 text-sm">
                {errors.healthcare_professional.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              rows="4"
              className="w-full p-2 border rounded-md"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-300"
            >
              Add Camp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCamp;
