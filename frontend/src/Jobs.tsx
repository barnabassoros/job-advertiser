import { useEffect, useRef, useState } from "react";
import { Ad } from "./types/ad";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import ApiServices from "./lib/api";
import useWindowDimensions from "./lib/windowSize";
import { ErrorBoundary } from "react-error-boundary";

const Jobs = () => {
  const [jobs, setJobs] = useState<Ad[]>([]);
  const { height } = useWindowDimensions();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [backendError, setBackendError] = useState(false);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchData = async () => {
      const result = await ApiServices.get("/api/ad");
      if (result.status !== 200) {
        setBackendError(true);
        setJobs([]);
      } else {
        setBackendError(false);
        setJobs(result.data);
      }
    };
    fetchData();
  }, []);
  const handleApply = async (id: string) => {
    const result = await ApiServices.post(
      "/api/registration",
      JSON.stringify({ adId: id })
    );
    if (result.status === 201) {
      enqueueSnackbar("Succesful application!", { variant: "success" });
    } else {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  };
  const doesUserOwnAd = (id: string): boolean => {
    return jobs.find((j) => j.id === id)?.userId === userId;
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
          disabled={doesUserOwnAd(params.value)}
          onClick={handleApply.bind(null, params.value)}
          variant="contained"
        >
          Apply
        </Button>
      ),
    },
  ];
  const rows: GridRowsProp = jobs;
  function ErrorFallback({ error, resetErrorBoundary }: any) {
    return (
      <div role="alert">
        <Typography>Something went wrong, check back later</Typography>
      </div>
    );
  }
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div style={{ height: height - 100, width: "100%" }}>
          <DataGrid rows={rows} columns={columns}></DataGrid>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default Jobs;
