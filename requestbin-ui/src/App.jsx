import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import Bin from "./components/Bin";
import LandingPage from "./pages/LandingPage";
import { BinContext } from "./components/BinContext";

const App = () => {
  const [binId, setBinId] = useState("");

  return (
    <BinContext.Provider value={{ binId, setBinId }}>
      <Router>
        <Stack>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/bin/:binId" element={<Bin />} />
          </Routes>
        </Stack>
      </Router>
    </BinContext.Provider>
  );
};

export default App;
