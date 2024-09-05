import styled from "@emotion/styled";
import { useEffect } from "react";
import { MdArrowForward } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "rebass";
import { color, fontSize, fontWeight } from "styled-system";
import { Spinner } from "theme-ui";
import { getSongsByGenreReq } from "../../app/features/song/songSlice";
import Slider from "../slider/Slider";
import { RootState } from "../../app";

const HiphopSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSongsByGenreReq());
  }, [dispatch]);

  const { genreSongs, isLoading } = useSelector(
    (state: RootState) => state.song,
  );

  const Title = styled(Text)`
    ${fontSize}
    ${fontWeight}
  ${color}  
    fontSize: 24px;
    margin-block: 1rem;
  `;

  const More = styled(Text)`
    ${color}
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 1rem;
    &:hover {
      background: #303030;
      cursor: pointer;
    }
  `;

  const Header = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  const handleClick = () => {
    navigate("/library");
  };

  return (
    <Box>
      <Header>
        <Title fontSize="md" fontWeight="700" color={"textPrimary"}>
          All Out HipHop
        </Title>

        <More color="secondary" onClick={handleClick}>
          See All
          <MdArrowForward />
        </More>
      </Header>

      {isLoading ? (
        <Box
          height="100px"
          width="100%"
          sx={{
            display: "grid",
            placeContent: "center",
          }}
        >
          <Spinner color="green" />
        </Box>
      ) : (
        <Slider songs={genreSongs} />
      )}
    </Box>
  );
};

export default HiphopSection;
