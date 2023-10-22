import { Box } from "@mui/material";
import Balance from "./Balance";
import Stats from "./Stats";

const Data = () => {
  return (
    <Box
      display={"flex"}
      padding={3}
      flexDirection={"column"}
      alignItems={"flex-start"}
      marginTop={3}
      gap={1.5}>
      <Balance />
      <Stats />
    </Box>
  );
};

export default Data;
