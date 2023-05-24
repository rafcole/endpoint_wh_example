import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactJson from "react-json-view";

const Query = ({ data }) => {
  return (
    <Box>
      {data && (
        <Accordion sx={{ backgroundColor: "rgba(39, 40, 35, 1)" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
            <Typography variant="body2" sx={{ color: "orange" }}>
              Query ({Object.keys(data).length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ReactJson src={data} theme="monokai" />
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};
export default Query;
