import { useEffect, useRef, useState } from "react";
import { Ad } from "./types/ad";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";

const Jobs = () => {
  const [jobs, setJobs] = useState<Ad[]>([]);
  const usernameRef = useRef<HTMLInputElement>();
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:3000/ad", { method: "GET" });
      setJobs(await result.json());
    };
    fetchData();
  }, []);
  const handleApply = async (id: string) => {
    const username = usernameRef.current?.value;
    const result = await fetch("http://localhost:3001/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, adId: id }),
    });
    if (result.status === 201) console.log("siker");
  };
  const columns: GridColDef[] = [
    {
      field: "time",
      headerName: "Time",
      width: 200,
      type: "dateTime",
      valueGetter: ({ value }) => new Date(value),
    },
    { field: "duration", headerName: "Duration" },
    { field: "location", headerName: "Location" },
    { field: "payment", headerName: "Salary" },
    { field: "description", headerName: "Description" },
    {
      field: "id",
      headerName: "Apply",
      renderCell: (params: GridRenderCellParams<string>) => (
        <Button
          onClick={handleApply.bind(null, params.value)}
          variant="contained"
        >
          Apply
        </Button>
      ),
    },
  ];
  const rows: GridRowsProp = jobs;
  return (
    <>
      <TextField
        label="Username"
        variant="outlined"
        inputRef={usernameRef}
      ></TextField>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid rows={rows} columns={columns}></DataGrid>
      </div>
    </>
  );
};

export default Jobs;
