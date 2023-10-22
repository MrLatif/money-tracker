import { Box } from "@mui/material";
import Balance from "./Balance";
import Stats from "./Stats";
import WelcomeCard from "./WelcomeCard";

const Data = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      marginTop={3}
      gap={1.5}>
      <WelcomeCard />
      <Balance />
      <Stats />
    </Box>
  );
};

export default Data;
