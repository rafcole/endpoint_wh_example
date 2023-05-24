import { format } from "date-fns";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
  Select,
  MenuItem,
  Grid,
  Stack
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";
import ReactJson from "react-json-view";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Bin = () => {
  const { binId } = useParams();
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const isDevelopment = process.env.NODE_ENV === "development";
  const baseUrl = isDevelopment ? "http://localhost:3001" : "";

  const formatTime = date => format(new Date(date), "hh:mm:ss a");
  const formatDate = date => format(new Date(date), "MMMM do, yyyy");
  const shouldDisplayDate = (date, previousDate) => {
    if (!previousDate) {
      return true;
    }
    return new Date(previousDate).toLocaleDateString() !== new Date(date).toLocaleDateString();
  };
  const rowStyles = request => {
    return {
      "&:hover": {
        backgroundColor: "rgba(0, 0, 255, 0.04)",
        cursor: "pointer"
      },
      transition: "ease-in 0.3s",
      backgroundColor:
        selectedRequest && selectedRequest._id === request._id ? "rgba(0, 0, 255, 0.04)" : ""
    };
  };
  const renderRequestRow = (request, previousRequest) => (
    <>
      {shouldDisplayDate(request.createdAt, previousRequest?.createdAt) && (
        <TableRow>
          <TableCell colSpan={4} style={{ textAlign: "left", backgroundColor: "lightgray" }}>
            {formatDate(request.createdAt)}
          </TableCell>
        </TableRow>
      )}
      <TableRow
        key={request._id}
        onClick={() => setSelectedRequest(request)}
        sx={rowStyles(request)}>
        <TableCell>{request.method}</TableCell>
        <TableCell>{request.path}</TableCell>
        <TableCell>{formatTime(request.createdAt)}</TableCell>
        <TableCell>
          <IconButton
            onClick={e => {
              e.stopPropagation();
              deleteRequest(request._id);
            }}>
            <DeleteIcon sx={{ fontSize: "18px", "&:hover": { color: "red" } }} />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await axios.get(`${baseUrl}/api/bin/${binId}`);
      console.log(response.data);

      if (Array.isArray(response.data)) {
        setRequests(response.data);
      } else {
        console.error("response.data is not an array:", response.data);
      }
    };
    fetchRequests();
  }, [binId]);

  const deleteRequest = async id => {
    try {
      await axios.delete(`${baseUrl}/api/bin/${binId}/${id}`);
      setRequests(requests.filter(request => request._id !== id)); // Update requests state
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const headerStyles = {
    color: "white",
    width: "10%",
    fontFamily: "Helvetica Neue",
    fontWeight: "bold"
  };

  return (
    <Grid container>
      <Grid item xs={5}>
        <TableContainer component={Paper}>
          <Table sx={{ tableLayout: "fixed" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "black", opacity: "0.8" }}>
                <TableCell sx={headerStyles}>Method</TableCell>
                <TableCell sx={{ ...headerStyles, width: "35%" }}>Path</TableCell>
                <TableCell sx={headerStyles}>Time</TableCell>
                <TableCell sx={{ width: "5%" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests &&
                [...requests]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                  .map((request, index, self) => renderRequestRow(request, self[index - 1]))}
            </TableBody>
          </Table>
          <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
            <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
            <Pagination
              count={Math.ceil(requests.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </TableContainer>
      </Grid>
      <Grid item xs={6} sx={{ ml: "20px" }}>
        {selectedRequest && (
          <Stack direction="column" spacing={2}>
            <ReactJson src={selectedRequest} name="Request Data" collapsed={true} />
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};

export default Bin;
