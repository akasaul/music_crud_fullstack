import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { useSnapCarousel } from "react-snap-carousel";
import BaseCard from "../BaseCard";
import { Song } from "../../app/types/song";

interface SliderProps {
  songs: Song[];
}

const Slider = ({ songs }: SliderProps) => {
  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();

  if (!songs) {
    return;
  }

  return (
    <div className="slider">
      <ul
        ref={scrollRef}
        style={{
          display: "flex",
          overflow: "auto",
          scrollSnapType: "x mandatory",
          paddingBlock: "1rem",
        }}
      >
        {Array.from({ length: 5 }).map(
          (_, i) =>
            i < songs.length && (
              <li
                style={{
                  fontSize: "50px",
                  width: "250px",
                  height: "250px",
                  flexShrink: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginInline: "30px",
                }}
                key={songs[i]?.id}
              >
                <BaseCard
                  imageUrl={songs[i]?.coverImg}
                  album={songs[i]?.album}
                  artist={songs[i]?.artist}
                  duration={songs[i]?.duration}
                  genre={songs[i]?.genre}
                  id={songs[i]?.id}
                  title={songs[i]?.title}
                  key={songs[i]?.id}
                />
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default Slider;
