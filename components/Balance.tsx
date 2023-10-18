import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { theme } from ".";
import { currencyFormatter } from "../lib/utils";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { financeContext } from "../lib/store/finance-context";

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const { expenses, income } = useContext(financeContext);

  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => {
        return total + (i.amount || 0);
      }, 0) -
      expenses.reduce((total, e) => {
        return total + (e.total || 0);
      }, 0);
    setBalance(newBalance);
  }, [expenses, income]);
  return (
    <Box
      display={"flex"}
      padding={"24px 28px"}
      marginLeft={-3}
      flexDirection={"column"}
      alignItems={"flex-start"}
      gap={6}
      borderRadius={4}
      sx={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(113, 113, 113, 0.10) 100%)",
        boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, 0.10)",
        [theme.breakpoints.down("xl")]: {
          width: "678px",
        },
        [theme.breakpoints.up("xl")]: {
          width: "710px",
        },
      }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        sx={{
          [theme.breakpoints.down("xl")]: {
            width: "620px",
          },
          [theme.breakpoints.up("xl")]: {
            width: "650px",
          },
        }}>
        <Box
          className="€789 balance"
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}>
          <Box
            className="€789"
            display={"flex"}
            alignItems={"center"}
            gap={1.75}>
            <Typography
              fontFamily={"Poppins"}
              fontSize={44}
              fontWeight={600}
              color={"#FFF"}>
              {currencyFormatter(balance)}
            </Typography>

            <Image
              src={"./arrow-up.svg"}
              alt={"arrow up"}
              style={{
                transform: "rotate(180deg)",
              }}
              width={26}
              height={26}
            />
          </Box>
          <Typography
            color={"#FFF"}
            fontFamily={"Poppins"}
            fontSize={18}
            fontWeight={500}>
            Your Balance
          </Typography>
        </Box>
        <Box className="date" display={"flex"} alignItems={"center"} gap={2.25}>
          <Typography
            fontFamily={"Poppins"}
            fontSize={16}
            fontWeight={500}
            color={"#99FC03"}>
            22 May 2023
          </Typography>
          <Button
            sx={{
              minWidth: 26,
              minWeight: 26,
            }}>
            <Image src={"./more.svg"} alt={"more"} width={24} height={24} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Balance;
