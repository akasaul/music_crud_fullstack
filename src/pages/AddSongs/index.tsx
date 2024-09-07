import {
  MdAlbum,
  MdLink,
  MdMic,
  MdMusicNote,
  MdSearch,
  MdTimer,
} from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { Box, Container, Flex, Image, Input, Spinner, Text } from "theme-ui";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  setSearchQuery,
  setSong,
  addSongRequest,
  editSongReq,
  setSongForUpdate,
  searchRequestForAdd,
} from "../../app/features/song/songSlice";
import SearchResult from "../../components/SearchResult/SearchResult";
import "../../App.css";
import Header from "../../components/Header";
import styled from "@emotion/styled";
import { color, fontSize, fontWeight } from "styled-system";
import useAuthStatus from "../../hooks/useAuthStatus";
import LoginModal from "../../components/LoginModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddSongBody, addSongSchema } from "../../lib/validation";
import { RootState } from "../../app";

interface AddSongProps {
  isEdit: boolean;
}

// Generic page used for both editing and adding music
const AddSong = ({ isEdit }: AddSongProps) => {
  // Get Query parameters
  const [params] = useSearchParams();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = useForm<AddSongBody>({
    resolver: zodResolver(addSongSchema),
    defaultValues: {
      title: params.get("title") ?? undefined,
      artist: params.get("artist") ?? undefined,
      album: params.get("album") ?? undefined,
      genre: params.get("genre") ?? undefined,
      duration: params.get("duration") ?? undefined,
      imageUrl: params.get("imageUrl") ?? undefined,
    },
  });

  const onSetValues = ({
    title,
    imageUrl,
    duration,
    genre,
    album,
    artist,
  }: AddSongBody) => {
    setValue("title", title);
    setValue("imageUrl", imageUrl);
    setValue("duration", duration);
    setValue("genre", genre);
    setValue("album", album);
    setValue("artist", artist);
  };

  const [query, setQuery] = useState("");

  // States from song slice
  const {
    apiSearchResults,
    isLoading,
    isSuccess,
    isError,
    currentState,
    errorMsg,
  } = useSelector((state: RootState) => state.song);

  const dispatch = useDispatch();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(reset());
    setQuery(e.target.value);
    dispatch(setSearchQuery(e.target.value));
    dispatch(searchRequestForAdd());
  };

  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStatus();

  const onSubmit = (data: AddSongBody) => {
    if (!isLoggedIn) {
      setOpenModal(true);
      return;
    }

    dispatch(reset());

    if (isEdit) {
      dispatch(setSongForUpdate({ song: data, id: params.get("id") ?? "" }));
      dispatch(editSongReq());
      navigate("/");
      return;
    }

    dispatch(setSong(data));
    dispatch(addSongRequest());
    navigate("/");
    return;
  };

  const ErrorMessage = styled(Text)`
    ${color}
    ${fontWeight}
      ${fontSize}
  `;

  const BottomText = styled(Text)`
    ${color}
  `;

  return (
    <Box
      className="home"
      sx={{
        width: "100%",
        marginTop: "10px",
        flex: 1,
      }}
    >
      <Header />
      {!isEdit && (
        <Container as="form">
          <h2
            style={{
              color: "white",
              textAlign: "center",
              marginBlock: "1rem",
            }}
          >
            Add Songs with Search
          </h2>

          <Container
            bg="inputBg"
            p="5px"
            sx={{
              display: "flex",
              maxWidth: "500px",
              position: "relative",
              borderBottom: "10px solid #1ED760",
            }}
            className="search-result"
          >
            <Input
              value={query}
              onChange={handleSearch}
              name="query"
              type="text"
              placeholder="Search Anything"
              sx={{
                color: "white",
                border: "none",
                outline: "none",
              }}
            />
            <MdSearch color="white" size={24} />

            {apiSearchResults.length > 0 && query.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  background: "#000",
                  width: "100%",
                  maxHeight: "170px",
                  overflowY: "scroll",
                  top: "40px",
                  left: "0px",
                  borderRadius: "4px",
                }}
              >
                {isLoading && !isSuccess ? (
                  <Spinner color="green" />
                ) : (
                  apiSearchResults.map((song) => (
                    <SearchResult
                      key={song?.id}
                      title={song?.title}
                      imageUrl={song?.album?.cover_big}
                      artist={song?.artist?.name || song?.artist}
                      duration={song?.duration}
                      album={song?.album?.title || song?.album}
                      genre="Pop"
                      onSetValues={onSetValues}
                      formData={{
                        title: watch("title"),
                        duration: watch("duration"),
                        artist: watch("artist"),
                        album: watch("album"),
                        imageUrl: watch("imageUrl"),
                        genre: watch("genre"),
                      }}
                    />
                  ))
                )}
              </Box>
            )}
          </Container>
        </Container>
      )}

      <Container
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          gap: "10px",
          maxWidth: "500px",
          flexDirection: "column",
          marginInline: "auto",
          marginTop: isEdit ? "2rem" : "9rem",
        }}
      >
        <h2
          style={{
            color: "white",
            textAlign: "center",
            marginBlock: "1rem",
          }}
        >
          {isEdit ? "Edit Song" : "Add Song Manually"}
        </h2>

        <Container
          bg="inputBg"
          p="5px"
          sx={{
            display: "flex",
            maxWidth: "500px",
          }}
        >
          <Input
            {...register("title")}
            type="text"
            placeholder="Title"
            sx={{
              color: "white",
              border: "none",
              outline: "none",
            }}
          />
          <MdMusicNote color="white" size={24} />
        </Container>
        {errors["title"] && (
          <BottomText color="white">{errors["title"].message}</BottomText>
        )}

        <Container
          bg="inputBg"
          p="5px"
          sx={{
            display: "flex",
            maxWidth: "500px",
          }}
        >
          <Input
            {...register("artist")}
            type="text"
            placeholder="Artist"
            sx={{
              color: "white",
              border: "none",
              outline: "none",
            }}
          />
          <MdMic color="white" size={24} />
        </Container>
        {errors["artist"] && (
          <BottomText color="white">{errors["artist"].message}</BottomText>
        )}

        <Container
          bg="inputBg"
          p="5px"
          sx={{
            display: "flex",
            maxWidth: "500px",
          }}
        >
          <Input
            {...register("album")}
            type="text"
            placeholder="Album"
            sx={{
              color: "white",
              border: "none",
              outline: "none",
            }}
          />
          <MdAlbum color="white" size={24} />
        </Container>
        {errors["album"] && (
          <BottomText color="white">{errors["album"].message}</BottomText>
        )}

        <Container
          bg="inputBg"
          p="5px"
          sx={{
            display: "flex",
            maxWidth: "500px",
          }}
        >
          <select
            {...register("genre")}
            className="input focus:border focus:border-primary"
            // value={genre}
            style={{
              width: "100%",
              height: "30px",
              background: "#323232",
              outline: "none",
              border: "none",
              color: "white",
              fontSize: "18px",
            }}
          >
            <option value="Pop">Pop</option>
            <option value="HipHop">HipHop</option>
            <option value="R&B">R&B</option>
            <option value="Country"> Country</option>
            <option value="Rock">Rock</option>
            <option value="Ethiopian">Ethiopian</option>
            <option value="Other">Other</option>
          </select>
        </Container>
        {errors["genre"] && (
          <BottomText color="white">{errors["genre"].message}</BottomText>
        )}

        <Container
          bg="inputBg"
          p="5px"
          sx={{
            display: "flex",
            maxWidth: "500px",
          }}
        >
          <Input
            {...register("duration")}
            type="text"
            placeholder="Duration"
            sx={{
              color: "white",
              border: "none",
              outline: "none",
            }}
          />
          <MdTimer color="white" size={24} />
        </Container>
        {errors["duration"] && (
          <BottomText color="white">{errors["duration"].message}</BottomText>
        )}

        <Container
          bg="inputBg"
          p="5px"
          sx={{
            display: "flex",
            maxWidth: "500px",
            flexDirection: "column",
          }}
        >
          <Flex
            sx={{
              alignItems: "center",
            }}
          >
            <Input
              {...register("imageUrl")}
              type="url"
              placeholder="ImageUrl"
              sx={{
                color: "white",
                border: "none",
                outline: "none",
              }}
            />
            <MdLink color="white" size={24} />
          </Flex>
          {errors["imageUrl"] && (
            <BottomText color="white">{errors["imageUrl"].message}</BottomText>
          )}

          {watch("imageUrl") && (
            <Box>
              <Image
                src={watch("imageUrl")}
                width="100%"
                sx={{
                  borderRadius: "5px",
                }}
              ></Image>
            </Box>
          )}
        </Container>

        <Box
          sx={{
            maxWidth: "500px",
            marginInline: "auto",
            marginBlock: "20px",
            marginBottom: "6rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {isEdit ? (
            <SubmitButton>
              Edit Song
              {isLoading && currentState === "EDIT" && (
                <Spinner height="20px" />
              )}
            </SubmitButton>
          ) : (
            <SubmitButton>
              Add Song
              {isLoading && currentState === "ADD" && <Spinner height="20px" />}
            </SubmitButton>
          )}

          {(isError && currentState === "ADD") ||
            (isError && currentState === "EDIT" && (
              <ErrorMessage color="textPrimary" sx={{ textAlign: "center" }}>
                {errorMsg}
              </ErrorMessage>
            ))}
        </Box>
      </Container>

      <LoginModal isOpen={openModal} setIsOpen={setOpenModal} />
    </Box>
  );
};

export default AddSong;
