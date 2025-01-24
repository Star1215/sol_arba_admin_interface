import * as React from "react";
import { useState } from "react";
import axios from "axios";
import Link from "@mui/material/Link";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { RENTAL_DURATION, SOL_BOOSTER_SERVER_URL } from "./constant";

export default function RentalFee({
  value,
  index,
  setIsPending,
}: {
  value: number;
  index: number;
  setIsPending: (isPending: boolean) => void;
}) {
  const [kthRentalFee, setKthRentalFee] = useState(value);

  const setUpFee = async () => {
    setIsPending(true);
    const payload = {
      index: index,
      rentalfee: kthRentalFee,
    };
    const res = await axios.post(
      SOL_BOOSTER_SERVER_URL + "/api/platform/setrentalfee",
      payload
    );
    setIsPending(false);
    if(res.status == 200) {
      window.alert("Successfully Set");
      return;
    } else {
      window.alert("No Set up");
      return; 
    }
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" mb={1}>
      <Typography variant="h6">
        {index + 1}
        {`)`}
      </Typography>
      <Box
        sx={{ width: 200, maxWidth: "100%" }}
        display={"flex"}
        alignItems={"center"}
        mr={2}
        padding={"4px 12px"}
      >
        <TextField
          fullWidth
          label=""
          variant="filled"
          size="small"
          value={kthRentalFee}
          onChange={(e) => setKthRentalFee(parseFloat(e.target.value))}
        />
      </Box>
      <Typography variant="h6" width={200}>
        SOL for {RENTAL_DURATION[index]}
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setUpFee();
        }}
      >
        Set Rental Fee {index + 1}
      </Button>
    </Stack>
  );
}
