import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosPublic.get('/reviews');  
        setReviews(response.data); 
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    adaptiveHeight: true,
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-center font-bold text-4xl text-gray-800 mb-10">
          User Reviews
        </h2>
        {reviews.length > 0 ? (
          <Slider {...sliderSettings}>
            {reviews.map((review, index) => (
              <div 
                key={index} 
                className="text-center p-8 bg-white rounded-lg shadow-lg mx-4"
              >
                <p className="text-2xl italic text-gray-600 mb-6">
                  “{review?.feedback}”
                </p>
                <h4 className="text-lg text-blue-500 font-semibold">
                  - {review.Name}
                </h4>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-500">No reviews available</p>
        )}
      </div>
    </div>
  );
};

export default Review;
