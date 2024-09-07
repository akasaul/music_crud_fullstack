import styled from "@emotion/styled";
import { Flex } from "rebass";
import { color } from "styled-system";
import { Grid } from "../../components/Basic/Grid";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getSongsAlbumsPerArtist,
  getSongsPerAlbum,
  getSongsPerGenre,
  getStatsOverview,
} from "../../app/features/stats/statsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app";
import { Bar, Doughnut } from "react-chartjs-2";
import theme from "../../theme";
import { ChartOptions } from "chart.js";

const Card = styled(Flex)`
  ${color}
  border-radius: 5px;
  height: 125px;
  padding: 15px;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  background: #2a2a2a;
  flex-direction: column;
  &:hover {
    cursor: pointer;
  }
`;

const CardTitle = styled.h3`
  ${color}
  margin-bottom: 10px;
  font-size: 1.25rem;
`;

const CardContent = styled.p`
  color: #fff;
  font-size: 1rem;
`;

const Dashboard = () => {
  const { overview, songPerGenre, songsAlbumsPerArtist, songsPerAlbum } =
    useSelector((state: RootState) => state.stats);

  const data = {
    labels: songPerGenre?.map((song) => song.genre),
    datasets: [
      {
        label: "Songs Per Genre",
        data: songPerGenre?.map((song) => song.count),
        backgroundColor: theme.colors.secondary,
        borderColor: "rgba(0, 128, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  const songPerArtistPerAlbumData = {
    labels: songsAlbumsPerArtist?.map((song) => song.artist),
    datasets: [
      {
        label: "Songs",
        data: songsAlbumsPerArtist?.map((song) => song.songsCount),
        backgroundColor: theme.colors.secondary,
        borderColor: "rgba(0, 128, 0, 1)",
        borderWidth: 1,
      },
      {
        label: "Albums",
        data: songsAlbumsPerArtist?.map((song) => song.albumsCount),
        backgroundColor: theme.colors.secondary,
        borderColor: "rgba(0, 128, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  const songPerAlbumData = {
    labels: songsPerAlbum?.map((song) => song.album),
    datasets: [
      {
        label: "Songs Per Album",
        data: songsPerAlbum?.map((song) => song.songsCount),
        backgroundColor: theme.colors.secondary,
        borderColor: "rgba(0, 128, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          padding: 0,
          font: {
            size: 11,
            lineHeight: "12.1px",
          },
          color: theme.colors.secondary,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
          color: "rgba(171, 165, 165, 1)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          borderRadius: 5,
          usePointStyle: true,
        },
      },
    },
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatsOverview());
    dispatch(getSongsPerGenre());
    dispatch(getSongsAlbumsPerArtist());
    dispatch(getSongsPerAlbum());
  }, []);

  return (
    <Grid
      padding={"20px"}
      gridGap={"20px"}
      gridTemplateColumns={[
        "repeat(2, 1fr)",
        "repeat(2, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(5, 1fr)",
      ]}
    >
      <Card>
        <CardTitle color="secondary">Total Songs</CardTitle>
        <CardContent>{overview?.totalSongs}</CardContent>
      </Card>
      <Card>
        <CardTitle color="secondary">Total Artists</CardTitle>
        <CardContent>{overview?.totalArtists}</CardContent>
      </Card>
      <Card>
        <CardTitle color="secondary">Total Albums</CardTitle>
        <CardContent>{overview?.totalAlbums}</CardContent>
      </Card>
      <Card>
        <CardTitle color="secondary">Total Songs</CardTitle>
        <CardContent>{overview?.totalSongs}</CardContent>
      </Card>
      <Card>
        <CardTitle color="secondary">Total Genres</CardTitle>
        <CardContent>{overview?.totalGenres}</CardContent>
      </Card>
      <Grid gridColumn={["span 2", "span 3"]}>
        <Bar data={data} options={options} />
      </Grid>
      <Grid gridColumn={["span 2", "span 2"]}>
        <Doughnut
          data={songPerAlbumData}
          options={options as ChartOptions<"doughnut">}
        />
      </Grid>
      <Grid gridColumn={["span 2", "span 3"]}>
        <Bar data={songPerArtistPerAlbumData} options={options} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
