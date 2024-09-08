import { ChangeEvent, useEffect, useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Image, Text } from "rebass";
import { Container, Input, Spinner } from "theme-ui";
import SongTile from "../../components/SongTile/SongTile";
import Slider from "../../components/slider/Slider";
import styled from "@emotion/styled";
import { color, fontSize, fontWeight } from "styled-system";
import {
  fetchRecentRequest,
  reset,
  searchSong,
  setSearchQuery,
} from "../../app/features/song/songSlice";
import Header from "../../components/Header";
import { LibSong, Song } from "../../app/types/song";
import TopResultCard from "../../components/TopResultCard/TopResultCard";
import { RootState } from "../../app";

const Search = () => {
  const dispatch = useDispatch();
  const {
    recents: songs,
    isLoading,
    currentState,
    isSuccess,
    isError,
    searchResults,
  } = useSelector((state: RootState) => state.song);

  useEffect(() => {
    dispatch(reset());
    dispatch(fetchRecentRequest());
  }, [dispatch]);

  const [query, setQuery] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    dispatch(setSearchQuery(query));
    dispatch(searchSong());
  };

  const RecentText = styled(Text)`
    ${color}
    ${fontSize}
    ${fontWeight}
    margin-block: 1rem;
  `;

  return (
    <Box
      className="home"
      sx={{
        marginTop: "10px",
        width: "100%",
        maxWidth: "1000px",
        flex: 1,
      }}
    >
      <Header />

      <Container className="search-container">
        <MdSearch style={{ color: "white" }} size={22} />

        <Input
          className="search-input"
          placeholder="Search"
          value={query}
          sx={{
            border: "none",
            color: "white",
          }}
          onChange={handleChange}
        />
        <MdClose
          onClick={() => setQuery("")}
          style={{ color: "white" }}
          size={22}
        />
      </Container>

      {isLoading && currentState == "SEARCH" && (
        <Box
          style={{
            display: "grid",
            placeContent: "center",
          }}
        >
          <Spinner color="green" />
        </Box>
      )}

      {isSuccess && query && searchResults.length > 0 && (
        <Flex
          flexDirection={["column", "column", "column", "row"]}
          style={{
            marginTop: "2rem",
            maxWidth: "800px",
          }}
        >
          <Box flex="1">
            <Text
              sx={{
                color: "white",
                fontSize: "24px",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Top Result
            </Text>

            <TopResultCard
              song={searchResults[0]}
              key={searchResults[0]?._id}
            />
          </Box>

          <Box
            flex="1.5"
            p={2}
            sx={{
              background: "#000",
            }}
          >
            <h2 style={{ color: "white" }}>Songs</h2>
            {songs.slice(1, 6).map((song: Song, index: number) => (
              <SongTile
                index={index}
                song={song as LibSong}
                key={song._id}
                isSearch={true}
              />
            ))}
          </Box>
        </Flex>
      )}

      {isError && query && (
        <Box
          sx={{ display: "grid", placeContent: "center", marginTop: "2rem" }}
        >
          <Image
            height={"150px"}
            src={
              "https://cdn-icons-png.flaticon.com/512/408/408697.png?w=740&t=st=1683050602~exp=1683051202~hmac=b2742b98226da86801474ffa532a4b203cb68486ee2fb1780eba6c9275272bf9"
            }
          />
          <h4 style={{ color: "#fff", textAlign: "center" }}>Nothing found</h4>
        </Box>
      )}

      {!query && (
        <Box
          sx={{ display: "grid", placeContent: "center", marginTop: "2rem" }}
        >
          <Image
            height={"150px"}
            src={
              "https://cdn-icons-png.flaticon.com/512/408/408697.png?w=740&t=st=1683050602~exp=1683051202~hmac=b2742b98226da86801474ffa532a4b203cb68486ee2fb1780eba6c9275272bf9"
            }
          />
          <h4 style={{ color: "#fff", textAlign: "center" }}>Search songs..</h4>
        </Box>
      )}

      <RecentText color="textPrimary" fontSize="md" fontWeight="semiBold">
        Recent Songs
      </RecentText>

      <Slider songs={songs} />
    </Box>
  );
};

export default Search;
