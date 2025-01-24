import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import ProTip from "./ProTip";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import WarningIcon from "@mui/icons-material/Warning";
import RentalFee from "./RentalFee";
import HolderFee from "./HolderFee";
import { SOL_BOOSTER_SERVER_URL } from "./constant";

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: "text.secondary",
      }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  const [platformWallet, setPlatformWallet] = useState("");
  const [rentalFees, setRentalFees] = useState([]);
  const [holderFees, setHolderFees] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const handleWallet = async () => {
    setIsPending(true);
    const payload = {
      feewallet: platformWallet,
    };
    const res = await axios.post(
      SOL_BOOSTER_SERVER_URL + "/api/platform/setfeewallet",
      payload
    );
    setIsPending(false);
    if (res.status == 200) {
      window.alert("Successfully Set");
      return;
    } else {
      window.alert("No Set up");
      return;
    }
  };

  const handleSetIsPending = (value: boolean) => {
    setIsPending(value); // Toggle isPending state
  };

  useEffect(() => {
    const fetchPlatformInfo = async () => {
      const platRes = await axios.get(
        SOL_BOOSTER_SERVER_URL + "/api/platform/getplatform"
      );
      console.log(platRes);
      if (platRes) {
        const platformInfo = platRes.data;
        setPlatformWallet(platformInfo.feewallet);
        setRentalFees(platformInfo.rental_fees);
        setHolderFees(platformInfo.holder_fees);
      }
    };
    fetchPlatformInfo();
  }, [isPending]);
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
          Sol Booster Manager Inferface
        </Typography>
        {/* <ProTip /> */}
        {/* <Copyright /> */}
      </Box>
      <Box>
        <Stack direction="row" spacing={2} my={4} alignItems="center">
          <Typography variant="h6">Platform Wallet</Typography>
          <Box sx={{ width: 400, maxWidth: "100%" }}>
            <TextField
              fullWidth
              label=""
              id="fullWidth"
              value={platformWallet}
              onChange={(e) => setPlatformWallet(e.target.value)}
            />
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              handleWallet();
            }}
          >
            Set up
          </Button>
        </Stack>
        {rentalFees.map((rental, index) => (
          <RentalFee
            value={rental}
            index={index}
            key={rental}
            setIsPending={handleSetIsPending}
          />
        ))}

        {/* Holder Boosting Fees */}
        <Typography variant="h4" component="h1" sx={{ mt: 3, mb: 1 }}>
          Holders Boosting Fee
        </Typography>
        {holderFees.map((holder, index) => (
          <HolderFee
            value={holder}
            index={index}
            key={holder}
            setIsPending={handleSetIsPending}
          />
        ))}
      </Box>
    </Container>
  );
}
