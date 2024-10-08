import styled from "@emotion/styled";
import { useState } from "react";
import {
  MdClose,
  MdEdit,
  MdExpandLess,
  MdExpandMore,
  MdPause,
  MdPauseCircle,
  MdPlayArrow,
  MdPlayCircle,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Text } from "rebass";
import { color, display, fontSize, position } from "styled-system";
import { Image } from "theme-ui";
import { stopSong } from "../../app/features/song/songSlice";
import { formatTime } from "../../utils/formatTime";
import "./songPlayfooter.css";
import LoginModal from "../LoginModal";
import { RootState } from "../../app";

const SongPlayerFooter = () => {
  const SongPlayer = styled(Box)`
    position: fixed;
    left: 10px;
    right: 10px;
    border-radius: 5px;
    padding: 5px;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid green;
    ${position}
    ${display}
  `;

  const SongPlayerDesktop = styled(SongPlayer)`
    border: none;
    justify-content: space-between;
    align-items: start;
  `;

  const Title = styled(Text)`
    ${fontSize}
  `;

  const PlayProgress = styled(Box)`
    width: 100%;
    height: 3px;
    border-radius: 10px;
    background: #4d4d4d;
  `;

  const Timer = styled(Text)`
    ${fontSize}
  `;

  const EditSongText = styled(Text)`
    ${color}
    cursor: pointer;
    display: flex;
    alignitems: center;
    gap: 1rem;

    &:hover {
      color: #fff;
    }
  `;

  const [play, setPlay] = useState(true);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();

  const { song, isPlaying } = useSelector((state: RootState) => state.song);
  const navigate = useNavigate();

  const SongInfo = styled(Flex)`
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 5px;
    border-radius: 5px;
    width: 60%;
  `;

  if (!song || !isPlaying) {
    return;
  }

  const closePlayer = () => {
    dispatch(stopSong());
  };

  const handleEditSong = () => {
    navigate(
      `/edit-song?id=${song._id}&&imageUrl=${song.coverImg}&&title=${song.title}&&artist=${song.artist}&&album=${song.album}&&duration=${song.duration}`,
    );
  };

  const togglePlay = (playing: boolean) => {
    setPlay(playing);
  };

  return (
    <>
      <SongPlayer
        sx={{
          bottom: ["60px", "0px"],
        }}
        bg={"primary"}
        color={"textPrimary"}
        display={["flex", "flex", "none"]}
      >
        <Image
          src={song.coverImg}
          height={"100%"}
          width={"40px"}
          className={play ? "play_rotate" : ""}
          sx={{
            borderRadius: play ? "50%" : "10px",
          }}
        />

        <Flex flexDirection="column">
          <Title fontSize={["xs"]}>{song.title}</Title>

          <Text>{song.artist}</Text>
        </Flex>

        <Flex
          alignItems="center"
          sx={{
            gap: "10px",
          }}
        >
          {/* {favs.includes(song.id) ? ( */}
          {/*   <MdFavorite onClick={toggleFav} size={24} /> */}
          {/* ) : ( */}
          {/*   <MdFavoriteBorder onClick={toggleFav} size={24} /> */}
          {/* )} */}
          {play ? (
            <MdPause
              size={26}
              onClick={() => setPlay(false)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <MdPlayArrow
              size={26}
              onClick={() => setPlay(true)}
              style={{ cursor: "pointer" }}
            />
          )}
          <MdClose
            size={24}
            style={{ cursor: "pointer" }}
            onClick={closePlayer}
          />
        </Flex>
      </SongPlayer>

      <SongPlayerDesktop
        bg={"primary"}
        color={"textPrimary"}
        display={["none", "none", "flex"]}
        sx={{
          bottom: ["60px", "0px"],
          height: expand ? "135px" : "80px",
          zIndex: 10,
        }}
      >
        <Flex
          sx={{
            gap: "30px",
          }}
        >
          <Image
            src={song.coverImg}
            height={"100%"}
            width={"60px"}
            className={play ? "play_rotate" : ""}
            sx={{
              borderRadius: play ? "50%" : "10px",
            }}
          />

          <Flex
            alignItems="center"
            sx={{
              gap: "20px",
            }}
          >
            <Flex flexDirection="column">
              <Title fontSize={["xs"]}>{song.title}</Title>

              <Title>{song.artist}</Title>
            </Flex>

            {/* {favs.includes(song.id) ? ( */}
            {/*   <MdFavorite onClick={toggleFav} size={24} /> */}
            {/* ) : ( */}
            {/*   <MdFavoriteBorder onClick={toggleFav} size={24} /> */}
            {/* )} */}
          </Flex>
        </Flex>

        <Flex
          flexDirection="column"
          alignItems="center"
          sx={{
            gap: "10px",
            flex: "0.7",
          }}
        >
          <Flex
            alignItems="center"
            sx={{
              gap: "20px",
            }}
          >
            <MdSkipPrevious size={36} className="btn" />
            {play ? (
              <MdPauseCircle
                size={42}
                onClick={() => togglePlay(false)}
                className="play_button"
              />
            ) : (
              <MdPlayCircle
                size={42}
                onClick={() => togglePlay(true)}
                className="play_button"
              />
            )}
            <MdSkipNext size={36} className="btn" />
          </Flex>

          <Flex
            flex="1"
            width="100%"
            alignItems="center"
            sx={{
              gap: "20px",
            }}
          >
            <Timer fontSize={["12px"]}>0:00</Timer>
            <PlayProgress></PlayProgress>
            <Timer fontSize={["12px"]}>{formatTime(song.duration)}</Timer>
          </Flex>
        </Flex>

        <Flex
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          sx={{
            gap: "10px",
          }}
        >
          {expand ? (
            <MdExpandLess
              size={32}
              onClick={() => setExpand(false)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <MdExpandMore
              size={32}
              onClick={() => setExpand(true)}
              style={{ cursor: "pointer" }}
            />
          )}

          <MdClose
            size={24}
            style={{ cursor: "pointer" }}
            onClick={closePlayer}
          />
        </Flex>

        {expand && (
          <SongInfo
            sx={{
              gap: "10px",
            }}
          >
            <Text
              sx={{
                fontSize: "14px",
              }}
            >
              More Info:
            </Text>
            <Box>
              <Text
                sx={{
                  fontSize: "14px",
                }}
              >
                Album:{" "}
                {song.album?.length > 15
                  ? `${song.album.slice(0, 15)}...`
                  : song.album}
              </Text>

              <Text
                sx={{
                  fontSize: "14px",
                }}
              >
                Genre: {song.genre}
              </Text>
            </Box>

            <Box sx={{ marginLeft: "2rem" }}>
              <EditSongText
                onClick={handleEditSong}
                color="textSecondary"
                sx={{
                  fontSize: "14px",
                }}
              >
                Edit Song <MdEdit />
              </EditSongText>
            </Box>
          </SongInfo>
        )}
      </SongPlayerDesktop>
      <LoginModal isOpen={openModal} setIsOpen={setOpenModal} />
    </>
  );
};

export default SongPlayerFooter;
