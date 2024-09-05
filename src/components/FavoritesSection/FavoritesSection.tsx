import styled from "@emotion/styled";
import { useEffect } from "react";
import { MdArrowForward } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Image, Link, Text } from "rebass";
import { color, fontSize, fontWeight } from "styled-system";
import { getFavsRequest } from "../../app/features/song/songSlice";
import Slider from "../slider/Slider";

const FavoritesSection = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavsRequest());
  }, [dispatch]);

  const { favSongs } = useSelector((state) => state.song);
  const navigate = useNavigate();

  if (!isAuth) {
    return;
  }

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
          Songs You Like
        </Title>

        <More color="secondary" onClick={handleClick}>
          See All
          <MdArrowForward />
        </More>
      </Header>

      {favSongs.length === 0 && (
        <Flex alignItems={"center"} sx={{ gap: "20px" }}>
          <Image
            src={
              "https://cdn-icons-png.flaticon.com/512/408/408697.png?w=740&t=st=1683050602~exp=1683051202~hmac=b2742b98226da86801474ffa532a4b203cb68486ee2fb1780eba6c9275272bf9"
            }
            height={"80px"}
          />
          <Text sx={{ color: "#fff" }}>You have no favorites</Text>
        </Flex>
      )}

      {isAuth && favSongs.length !== 0 && <Slider songs={favSongs} />}
    </Box>
  );
};

export default FavoritesSection;
