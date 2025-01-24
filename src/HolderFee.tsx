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
import {
  HOLDER_COUNTS,
  RENTAL_DURATION,
  SOL_BOOSTER_SERVER_URL,
} from "./constant";

export default function HolderFee({
  value,
  index,
  setIsPending,
}: {
  value: number;
  index: number;
  setIsPending: (isPending: boolean) => void;
}) {
  const [kthHolderFee, setKthHolderFee] = useState(value);
  const setUpFee = async () => {
    setIsPending(true);
    const payload = {
      index: index,
      holderfee: kthHolderFee,
    };
    const res = await axios.post(
      SOL_BOOSTER_SERVER_URL + "/api/platform/setholderfee",
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
        {" "}
        {index + 1}
        {`)`}
      </Typography>
      <Box
        sx={{ width: 200, maxWidth: "100%" }}
        display={"flex"}
        alignItems={"center"}
        mr={2}
      >
        <TextField
          fullWidth
          label=""
          variant="filled"
          size="small"
          value={kthHolderFee}
          type="number"
          onChange={(e) => setKthHolderFee(parseFloat(e.target.value))}
        />
      </Box>
      <Typography variant="h6" width={200}>
        SOL for {HOLDER_COUNTS[index]} Holders
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setUpFee();
        }}
      >
        Set Holder Fee {index + 1}
      </Button>
    </Stack>
  );
}
