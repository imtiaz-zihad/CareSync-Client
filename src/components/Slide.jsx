/* eslint-disable react/prop-types */
const Slide = ({ image }) => {
    return (
      <div className="relative w-full h-[30rem] overflow-hidden">
        {/* Main Image */}
        <img
          src={image}
          alt="Slide"
          className="absolute inset-0 object-cover w-full h-full"
        />
        {/* Overlay */}
        
      </div>
    );
  };
  
  export default Slide;