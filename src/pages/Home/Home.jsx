import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import PopularCamp from "./PopularCamp";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | CareSync</title>
      </Helmet>
      <Banner />
      <PopularCamp />
    </div>
  );
};

export default Home;
