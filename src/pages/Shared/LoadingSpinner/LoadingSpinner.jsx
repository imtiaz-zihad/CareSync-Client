import { Watch } from "react-loader-spinner";
const LoadingSpinner = () => {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
      <Watch
        visible={true}
        height="80"
        width="80"
        radius="48"
        color="#4fa94d"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      </div>
    </>
  );
};

export default LoadingSpinner;
