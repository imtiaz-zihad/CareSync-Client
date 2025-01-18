import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import PopularCamp from "./PopularCamp";
import Review from "./Review";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | CareSync</title>
      </Helmet>
      <Banner />
      <PopularCamp />
      <Review />
    </div>
  );
};

export default Home;
