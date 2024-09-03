import { Box } from "rebass";
// import FavoritesSection from "../components/FavoritesSection/FavoritesSection";
import styled from "@emotion/styled";
import { color } from "styled-system";
import "../../App.css";
import Navbar from "../../components/Navbar/Navbar";
import RecentSongs from "../../components/RecentSongs/RecentSongs";
// import HiphopSection from "../components/HIphopSection/HipHopSection";

const Home = () => {
  const Home = styled(Box)`
    ${color}
    margin-top: 10px;
    max-width: 950px;
  `;

  return (
    <Home
      display="flex"
      flex="1"
      flexDirection="column"
      className="home"
      sx={{
        gap: "20px",
      }}
    >
      <Navbar />
      <RecentSongs />
      {/* <FavoritesSection /> */}
      {/* <HiphopSection /> */}
    </Home>
  );
};

export default Home;
