import { useEffect, useRef, useState } from "react";
import { Ad } from "./types/ad";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import ApiServices from "./lib/api";

const Jobs = () => {
  const [jobs, setJobs] = useState<Ad[]>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const usernameRef = useRef<HTMLInputElement>();
  useEffect(() => {
    const fetchData = async () => {
      const result = await ApiServices.get("/ad");
      setJobs(result.data);
    };
    fetchData();
  }, []);
  const handleApply = async (id: string) => {
    const result = await ApiServices.post("/registration", {
      data: JSON.stringify({ adId: id }),
    });
    if (result.status === 201) {
      enqueueSnackbar("Succesful application!", { variant: "success" });
    } else {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
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
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid rows={rows} columns={columns}></DataGrid>
      </div>
    </>
  );
};

export default Jobs;
