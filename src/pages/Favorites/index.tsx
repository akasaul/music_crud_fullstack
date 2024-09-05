import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Image, Text } from "rebass";
import { color, fontSize, fontWeight } from "styled-system";
import Header from "../../components/Header";
import "../../App.css";
import { MdAccountCircle } from "react-icons/md";
import { Spinner } from "theme-ui";
import {
  getFavsRequest,
  getLibReq,
  reset,
} from "../../app/features/song/songSlice";
import SongTile from "../../components/SongTile/SongTile";
import { LibSong } from "../../app/types/song";

const FavoriteSongs = () => {
  const dispatch = useDispatch();

  const {
    favSongs,
    libSongs: recents,
    isLoading,
    currentState,
  } = useSelector((state) => state.song);

  useEffect(() => {
    dispatch(reset());
    dispatch(getFavsRequest());
    dispatch(getLibReq());
  }, [dispatch]);

  const { isAuth: isLoggedIn } = useSelector((state) => state.auth);

  const HeaderText = styled(Text)`
    ${color}
    ${fontSize}
    ${fontWeight}
    text-align: center;
    margin-block: 2rem;
  `;

  return (
    <Box
      className="home"
      marginTop="10px"
      style={{
        width: "100%",
        flex: 1,
      }}
    >
      <Header />
      <Box>
        {isLoggedIn && (
          <HeaderText
            color="textPrimary"
            fontSize={["sm", "md"]}
            fontWeight={["semiBold"]}
          >
            Songs you enjoy Listening
          </HeaderText>
        )}
        {isLoggedIn ? (
          favSongs.length === 0 ? (
            <Flex alignItems={"center"} sx={{ gap: "20px" }}>
              <Image
                src={
                  "https://cdn-icons-png.flaticon.com/512/408/408697.png?w=740&t=st=1683050602~exp=1683051202~hmac=b2742b98226da86801474ffa532a4b203cb68486ee2fb1780eba6c9275272bf9"
                }
                height={"80px"}
              />
              <Text sx={{ color: "#fff" }}>You have no favorites</Text>
            </Flex>
          ) : (
            favSongs.map((song: LibSong, index: number) => (
              <SongTile song={song} index={index} isSearch={false} />
            ))
          )
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              height={"100px"}
              src={
                "https://cdn-icons-png.flaticon.com/512/408/408697.png?w=740&t=st=1683050602~exp=1683051202~hmac=b2742b98226da86801474ffa532a4b203cb68486ee2fb1780eba6c9275272bf9"
              }
            />
            <Text
              sx={{
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              Login to see your Favorites <MdAccountCircle />{" "}
            </Text>
          </Box>
        )}
      </Box>

      <Box>
        <HeaderText
          color="textPrimary"
          fontSize={["sm", "md"]}
          fontWeight={["semiBold"]}
        >
          Songs you May Like
        </HeaderText>
        {isLoading && currentState === "GET_ALL" ? (
          <Box
            height="200px"
            width="100%"
            display="grid"
            sx={{
              placeContent: "center",
            }}
          >
            <Spinner color="green" />
          </Box>
        ) : (
          recents.map((song: LibSong, index: number) => (
            <SongTile song={song} index={index} isSearch={false} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default FavoriteSongs;
