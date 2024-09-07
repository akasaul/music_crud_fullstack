import { useSnapCarousel } from "react-snap-carousel";
import BaseCard from "../BaseCard";
import { Song } from "../../app/types/song";

interface SliderProps {
  songs: Song[];
}

const Slider = ({ songs }: SliderProps) => {
  const { scrollRef } = useSnapCarousel();

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
                key={songs[i]?._id}
              >
                <BaseCard song={songs[i]} key={songs[i]?._id} />
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default Slider;
