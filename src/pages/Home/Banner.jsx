import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from '../../components/Slide'


const Banner = () => {
    return (
        <div className='container py-0 mx-auto'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className='mySwiper'
        >
          <SwiperSlide>
            <Slide
              image="https://www.cflowapps.com/wp-content/uploads/2023/02/bpm_helthcre.jpg"
              // text='Get Your Web Development Projects Done in minutes'
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
                 image="https://www.cflowapps.com/wp-content/uploads/2023/02/bpm_helthcre.jpg"
              // text='Get Your Graphics Design Projects Done in minutes'
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
                 image="https://www.cflowapps.com/wp-content/uploads/2023/02/bpm_helthcre.jpg"
              // text='Start Your Digital Marketing Campaigns up n running'
            />
          </SwiperSlide>
        </Swiper>
      </div>
    );
};

export default Banner;