import { Box, Image } from "rebass";

const Notfound = () => {
  return (
    <Box
      sx={{
        display: "grid",
        placeContent: "center",
        width: "500px",
        height: "550px",
      }}
    >
      <Image
        height={"150px"}
        src={
          "https://cdn-icons-png.flaticon.com/512/408/408697.png?w=740&t=st=1683050602~exp=1683051202~hmac=b2742b98226da86801474ffa532a4b203cb68486ee2fb1780eba6c9275272bf9"
        }
      />
      <h4 style={{ color: "#fff", textAlign: "center" }}>Route Not Found..</h4>
    </Box>
  );
};

export default Notfound;
