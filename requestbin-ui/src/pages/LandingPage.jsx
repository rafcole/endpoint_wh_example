import { useState, useContext } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import shortUUID from "short-uuid";
import { BinContext } from "../components/BinContext";
import { useNavigate } from "react-router-dom";

// Mock snacks data
const snacks = [
  { name: "pizza", icon: "🍕" },
  { name: "burger", icon: "🍔" },
  { name: "fries", icon: "🍟" },
  { name: "hot dog", icon: "🌭" },
  { name: "donut", icon: "🍩" }
];

const LandingPage = () => {
  const { setBinId } = useContext(BinContext);
  const [selectedSnack, setSelectedSnack] = useState("");
  const navigate = useNavigate();
  const handleClick = snack => {
    const uuid = shortUUID.generate();
    const name = snack.name.replace(" ", "");
    const binId = `${name}-${uuid}`;
    setBinId(binId);
    setSelectedSnack({ ...snack, endpointUrl: binId });

    // navigate(`/bin/${binId}`);
  };

  return (
    <Stack sx={{ mt: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome! Please pick your favorite snack.
      </Typography>

      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        {snacks.map(snack => (
          <Grid item key={snack.name}>
            <Button variant="outlined" onClick={() => handleClick(snack)}>
              <span style={{ fontSize: "40px", marginRight: "10px" }}>{snack.icon}</span>{" "}
              {snack.name}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Stack sx={{ margin: "0 auto", mt: "20px" }}>
        {selectedSnack && (
          <Typography sx={{ fontSize: "26px" }}>
            https://snackbin.io/{selectedSnack.endpointUrl}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default LandingPage;
