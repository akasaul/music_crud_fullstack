import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Flex, Image, Text } from "rebass";
import { Link } from "react-router-dom";
import { color } from "styled-system";
import Header from "../../components/Header";
// import { auth } from "../firebase/firebase";
// import useAuthStatus from "../hooks/useAuthStatus";
import { Spinner } from "theme-ui";
import { useEffect } from "react";
import {
  getAllReq,
  getLibReq,
  getMySongsReq,
  reset,
} from "../../app/features/song/songSlice";
import SongTile from "../../components/SongTile/SongTile";
import { LibSong } from "../../app/types/song";

const Library = () => {
  const { mySongs, libSongs, isLoading, currentState } = useSelector(
    (state) => state.song,
  );
  const SongsContainer = styled(Box)`
    width: 100%;
  `;

  const FilterContainer = styled(Flex)`
    padding: 1rem 1rem;
    flex-wrap: wrap;
  `;

  const FilterButton = styled(Button)`
    ${color}
    background: #171717;
    border: 1px solid #1ed760;
    &:hover {
      background: #1ed760;
      color: #000;
      cursor: pointer;
    }
  `;

  const LibraryHeader = styled(Text)`
    margin-block: 1rem;
    color: #fff;
  `;

  const genres = ["HipHop", "R&B", "Pop", "Country", "Ethiopian", "Other"];

  const { isAuth: isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(getLibReq());
    dispatch(getMySongsReq());
  }, [dispatch]);

  const LoadingBox = styled(Box)`
    width: 60%;
    height: 50vh;
    display: grid;
    place-content: center;
  `;

  return (
    <Flex
      flexDirection="column"
      sx={{ width: "100%" }}
      className="home"
      marginTop="10px"
      flex="1"
    >
      <Header />
      {isLoggedIn && (
        <>
          <LibraryHeader as="h3">Your Songs</LibraryHeader>
          {isLoading && currentState === "GET_LIB " && (
            <LoadingBox>
              <Spinner color="green" />
            </LoadingBox>
          )}
          <SongsContainer>
            {mySongs.length > 0 ? (
              mySongs.map((song: LibSong, index: number) => (
                <SongTile
                  key={song._id}
                  song={song}
                  index={index}
                  isSearch={false}
                />
              ))
            ) : (
              <Flex sx={{ gap: "10px" }}>
                <Image
                  src={
                    "https://cdn-icons-png.flaticon.com/512/408/408697.png?w=740&t=st=1683050602~exp=1683051202~hmac=b2742b98226da86801474ffa532a4b203cb68486ee2fb1780eba6c9275272bf9"
                  }
                  height={"50px"}
                />
                <Flex alignItems="center" sx={{ color: "white", gap: "10px" }}>
                  <Text>Add Songs</Text>
                  <Link to="/add-song" style={{ color: "#fff" }}>
                    {" "}
                    Here
                  </Link>
                </Flex>
              </Flex>
            )}
          </SongsContainer>
        </>
      )}

      <LibraryHeader as="h3">All Songs</LibraryHeader>

      <FilterContainer sx={{ gap: "10px" }}>
        {genres.map((genre) => (
          <FilterButton key={genre} color="textSecondary">
            {genre}
          </FilterButton>
        ))}
      </FilterContainer>

      <SongsContainer>
        {isLoading && currentState === "GET_ALL" ? (
          <LoadingBox>
            <Spinner color="green" />
          </LoadingBox>
        ) : (
          libSongs.map((song: LibSong, index: number) => (
            <SongTile
              key={song._id}
              song={song}
              index={index}
              isSearch={false}
            />
          ))
        )}
      </SongsContainer>
    </Flex>
  );
};

export default Library;
