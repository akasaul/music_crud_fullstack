import styled from "@emotion/styled";
import React, { useState } from "react";
import {
  MdDelete,
  MdEdit,
  MdFavorite,
  MdFavoriteBorder,
  MdMore,
  MdMoreVert,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Image, Text } from "rebass";
import { color, flex, fontFamily, fontSize, fontWeight } from "styled-system";
import {
  deleteSongReq,
  playSong,
  removeFavRequest,
  setFavId,
  setFavRequest,
} from "../../app/features/song/songSlice";
import { formatTime } from "../../utils/formatTime";
import LoginModal from "../LoginModal";
import "./SongTile.css";
import { LibSong } from "../../app/types/song";

interface SongTileProps {
  song: LibSong;
  index: number;
  isSearch: boolean;
}
const SongTile = ({
  song: {
    _id,
    album,
    genre,
    title,
    artist,
    coverImg: imageUrl,
    duration,
    isMySong,
    isFav,
  },
  index,
  isSearch = false,
}: SongTileProps) => {
  const Tile = styled(Flex)`
    border-radius: 5px;
    justify-content: space-between;
    align-items: center;
    max-width: 800px;
    // margin-inline: auto;
    &:hover {
      background: #2a2a2a;
      cursor: pointer;
    }
  `;

  const No = styled(Box)`
    ${color}
    ${fontFamily}
  `;

  const SongTitle = styled(Text)`
    ${color}
    ${fontSize}
    ${fontWeight}
  `;

  const Time = styled(Text)`
    ${color}
    ${fontWeight}
  `;

  const ArtistName = styled(Text)`
    ${color}
    ${fontWeight}
  `;

  const { isAuth } = useSelector((state) => state.auth);

  // Song duration formatted
  const time = formatTime(duration);

  const dispatch = useDispatch();
  // const { favs } = useSelector((state) => state.user);

  const toggleFav = (_id: string) => {
    if (!isAuth) {
      setOpenModal(true);
      return;
    }
    dispatch(setFavId(_id));

    if (isFav) {
      dispatch(removeFavRequest());
    } else {
      dispatch(setFavRequest());
    }
  };

  const [showOption, setShowOption] = useState(false);

  const toggleOption = () => {
    setShowOption((option) => !option);
  };

  const ListButton = styled(Button)`
    background: #000;
    width: 100%;
    font-weight: 400;
    align-items: center;
    color: #b3b3b3;
    ${flex}

    &:hover {
      background: #181818;
      color: #fff;
      cursor: pointer;
    }
  `;

  const navigate = useNavigate();

  const editItem = () => {
    navigate(
      `/edit-song?id=${_id}&&imageUrl=${imageUrl}&&title=${title}&&artist=${artist}&&album=${album}&&duration=${duration}`,
    );
  };

  const deleteItem = () => {
    dispatch(deleteSongReq(_id));
  };

  const [openModal, setOpenModal] = useState(false);

  const disptch = useDispatch();

  const startPlay = () => {
    disptch(
      playSong({
        title,
        artist,
        coverImg: imageUrl,
        album,
        duration,
        genre,
        _id,
        createdAt: "",
        updatedAt: "",
      }),
    );
  };

  return (
    <Flex>
      <Tile
        flex="1"
        onClick={startPlay}
        sx={{
          gap: "20px",
          p: "8px",
          position: "relative",
        }}
      >
        <No color="textPrimary" fontFamily="dmSans">
          {index + 1}
        </No>

        <Flex
          sx={{
            flex: "1",
            gap: "20px",
          }}
        >
          <Image height={["40px"]} src={imageUrl} />

          <Flex flexDirection="column">
            <SongTitle
              color="textPrimary"
              fontWeight="semiBold"
              fontSize={["xs"]}
            >
              {title}
            </SongTitle>

            <ArtistName color="textSecondary">{artist}</ArtistName>
          </Flex>
        </Flex>

        {!isSearch && (
          <Time
            color="textSecondary"
            fontWeight="500"
            flex="1"
            display={["none", "none", "none", "block"]}
          >
            {album?.length > 13 ? `${album?.slice(0, 13)}..` : album}
          </Time>
        )}

        {isFav ? (
          <MdFavorite
            onClick={() => toggleFav(_id)}
            color="#1ED760"
            size={20}
          />
        ) : (
          <MdFavoriteBorder
            onClick={() => toggleFav(_id)}
            color="#1ED760"
            size={20}
          />
        )}

        <Time color="textSecondary" fontWeight="500">
          {time}
        </Time>

        {showOption && (
          <Box className="more_options">
            <ListButton
              color="white"
              display="flex"
              justifyContent="space-between"
              onClick={editItem}
            >
              <Text>Edit</Text>

              <MdEdit />
            </ListButton>
            <ListButton
              color="white"
              display="flex"
              justifyContent="space-between"
              onClick={deleteItem}
            >
              <Text>Delete</Text>

              <MdDelete />
            </ListButton>
          </Box>
        )}

        <LoginModal isOpen={openModal} setIsOpen={setOpenModal} />
      </Tile>
      {isMySong && (
        <button className="more" onClick={toggleOption}>
          <MdMoreVert color="white" />
        </button>
      )}
    </Flex>
  );
};

export default SongTile;

