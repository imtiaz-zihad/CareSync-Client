import { Link } from 'react-router-dom';
import error from '../../../assets/error.png'
const ErrorSection = () => {
  return (
    <section >
      <div className="flex items-center flex-col min-h-screen px-6 py-12 mx-auto">
        <img
          className="w-full"
          src={error}
          alt="Error logo"
        />
         <Link to="/">
            <button className="px-6 py-3 bg-pink-500 text-white font-bold rounded-lg flex justify-center items-center hover:bg-pink-700 transition duration-300">
              Back Home
            </button>
          </Link>
      </div>

    </section>
  );
};

export default ErrorSection;
