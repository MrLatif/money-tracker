import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { theme } from ".";
import { currencyFormatter } from "../lib/utils";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { financeContext } from "../lib/store/finance-context";

function formatDate(date: Date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day} ${year}`;
}

const Balance = () => {
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  const [balance, setBalance] = useState(0);
  const { expenses, income, isPositive } = useContext(financeContext);

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
          width: "728px",
        },
        [theme.breakpoints.up("xl")]: {
          width: "728px",
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
              src={isPositive ? "./greenArrowUp.svg" : "./redArrowDown.svg"}
              alt={"arrow up"}
              style={{
                transform: isPositive ? "" : "rotate(180deg)",
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
            fontWeight={600}
            marginRight={-8}
            color={"#99FC03"}>
            {formattedDate}
          </Typography>
          <Button
            sx={{
              minWidth: 26,
              minWeight: 26,
            }}></Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Balance;
