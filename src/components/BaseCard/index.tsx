import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { playSong } from "../../app/features/song/songSlice";
// import { AppDispatch } from "../../app/store"; // Adjust path as needed
import { Song } from "../../app/types/song";

interface BaseCardProps {
  // title: string;
  // imageUrl: string;
  // artist: string;
  // id: string;
  // album: string;
  // duration: number;
  // genre: string;
  song: Song;
}

const BasicCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 7px;
  background: #202020; /* Equivalent to bg='cardDark' */
  color: #fff; /* Default text color */
  padding: 15px;
  width: 200px; /* Default width */
  /* Responsive widths */
  @media (min-width: 576px) {
    width: 250px;
  }
  @media (min-width: 768px) {
    width: 300px;
  }
  @media (min-width: 992px) {
    width: 350px;
  }
  &:hover {
    cursor: pointer;
    outline: 2px solid green;
    background: #181818;
    transition: 200ms all ease;
  }
`;

const ImageStyled = styled.img`
  height: 170px;
  object-fit: cover;
  border-radius: 4px;
`;

const CardHeading = styled.h3`
  font-family: "dmSans", sans-serif;
  font-size: 1rem; /* Equivalent to fontSize='sm' */
`;

const CardBody = styled.p`
  color: #aaa; /* Equivalent to color='textSecondary' */
  font-size: 0.875rem; /* Equivalent to fontSize='xs' */
`;

const BaseCard: React.FC<BaseCardProps> = ({ song }) => {
  const dispatch = useDispatch();

  const startPlay = () => {
    dispatch(playSong(song));
  };

  return (
    <BasicCard onClick={startPlay}>
      <ImageStyled src={song.coverImg} alt={song.title} />
      <div>
        <CardHeading>{song.title}</CardHeading>
        <CardBody>{song.artist}</CardBody>
      </div>
    </BasicCard>
  );
};

export default BaseCard;
