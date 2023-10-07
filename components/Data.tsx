import { Box } from "@mui/material";
import Balance from "./Balance";
import Stats from "./Stats";

const Data = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"flex-start"}
      gap={1.5}>
      <Balance />
      <Stats />
    </Box>
  );
};

export default Data;
