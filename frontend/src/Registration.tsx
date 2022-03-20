import { useEffect, useRef, useState } from "react";
import { Registration, RegistrationWithoutAd } from "./types/registration";
import { Ad } from "./types/ad";
import { Button, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

const RegistrationPage = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const usernameRef = useRef<HTMLInputElement>();
  const handleClick = async () => {
    const registrationResults = await fetch(
      "http://localhost/registration/user/" + usernameRef.current?.value,
      { method: "GET" }
    );
    const registrationArray = await registrationResults.json();
    const adResults = await fetch("http://localhost/ad", {
      method: "GET",
    });
    const adArray = await adResults.json();
    setRegistrations(
      registrationArray.map((reg: RegistrationWithoutAd) => {
        const registration: Registration = {
          ...reg,
          ad: adArray.find((ad: Ad) => ad.id === reg.adId),
        };
        return registration;
      })
    );
  };
  const columns: GridColDef[] = [
    { field: "accepted", headerName: "Accepted", type: "boolean" },
    { field: "closed", headerName: "Closed", type: "boolean" },
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
  ];
  const rows: GridRowsProp = registrations.map((reg) => {
    const { ad, ...rest } = reg;
    return {
      ...ad,
      ...rest,
    };
  });
  return (
    <div>
      <div>
        <TextField
          label="username"
          inputRef={usernameRef}
          variant="outlined"
          margin="normal"
        ></TextField>
        <Button onClick={handleClick} variant="contained">
          List
        </Button>
      </div>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid columns={columns} rows={rows}></DataGrid>
      </div>
    </div>
  );
};

export default RegistrationPage;
