import { useEffect, useRef, useState } from "react";
import { Registration, RegistrationWithoutAd } from "./types/registration";
import { Ad } from "./types/ad";
import { NewReview } from "./types/review";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Theme from "./Theme";
import { useSnackbar } from "notistack";
import ApiServices from "./lib/api";
import { AxiosRequestConfig } from "axios";
import useWindowDimensions from "./lib/windowSize";
import { ErrorBoundary } from "react-error-boundary";

const RegistrationPage = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration>();
  const [backendError, setBackendError] = useState(false);
  const { height } = useWindowDimensions();
  useEffect(() => {
    const getData = async () => {
      const registrationResults = await ApiServices.get("/api/registration");
      console.log(registrationResults);
      if (registrationResults.status !== 200) {
        setBackendError(true);
        return;
      } else {
        setBackendError(false);
      }
      const registrationArray = await registrationResults.data;
      const adIds = registrationArray.map(
        (registration: Registration) => registration.adId
      );
      const uniqueAdIds = adIds.filter(
        (id: string, index: number, self: Array<string>) => {
          return self.indexOf(id) === index;
        }
      );
      const headers = uniqueAdIds.reduce(
        (prevValue: string, currentValue: string) => {
          return prevValue + ";" + currentValue;
        },
        ""
      );
      const config: AxiosRequestConfig<any> = {};
      config.headers = {
        "X-Ad-Ids": headers.substring(1),
      };
      const adResults = await ApiServices.get("/api/ad/one", config);
      const adArray = await adResults.data;
      if (adResults.status !== 200) {
        setBackendError(true);
      } else {
        setBackendError(false);
        setRegistrations(
          registrationArray.map((reg: RegistrationWithoutAd) => {
            const registration: Registration = {
              ...reg,
              ad: adArray.find((ad: Ad) => ad.id === reg.adId),
            };
            return registration;
          })
        );
      }
    };
    getData();
  }, []);
  const handleClose = () => {
    setReviewDialogOpen(false);
  };
  const handleReview = (id: string) => {
    setSelectedRegistration(registrations.find((reg) => reg.id === id));
    setReviewDialogOpen(true);
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
    {
      field: "id",
      headerName: "Review",
      renderCell: (params: GridRenderCellParams<string>) => (
        <Button
          variant="contained"
          onClick={handleReview.bind(null, params.value)}
        >
          Review
        </Button>
      ),
    },
  ];
  const rows: GridRowsProp = registrations.map((reg) => {
    const { ad, ...rest } = reg;
    return {
      ...ad,
      ...rest,
    };
  });
  function ErrorFallback({ error, resetErrorBoundary }: any) {
    return (
      <div role="alert">
        <Typography>Something went wrong, check back later</Typography>
      </div>
    );
  }
  return (
    <>
      {backendError && <ErrorFallback></ErrorFallback>}
      {!backendError && (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div>
            <div style={{ height: height - 100, width: "100%" }}>
              <DataGrid columns={columns} rows={rows}></DataGrid>
            </div>
            {reviewDialogOpen && (
              <ReviewDialog
                open={reviewDialogOpen}
                handleClose={handleClose}
                selectedRegistration={selectedRegistration as Registration}
              ></ReviewDialog>
            )}
          </div>
        </ErrorBoundary>
      )}
    </>
  );
};

const ReviewDialog = (props: {
  open: boolean;
  handleClose: () => void;
  selectedRegistration: Registration;
}) => {
  const [value, setValue] = useState(1);
  const handleOk = async () => {
    if (value < 1 || value > 5) {
      enqueueSnackbar("Value must be between 1 and 5!", { variant: "error" });
    }
    const review: NewReview = {
      registrationId: props.selectedRegistration.id,
      stars: value,
    };
    const result = await ApiServices.post(
      "/api/review",
      JSON.stringify(review)
    );
    if (result.status === 201) {
      enqueueSnackbar("Succesful review!", { variant: "success" });
    }
    props.handleClose();
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const usernameRef = useRef<HTMLInputElement>();
  return (
    <Theme>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Review</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CalendarMonthIcon color="primary" fontSize="large" />{" "}
            <Typography>{props.selectedRegistration.ad.time}</Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AccessTimeIcon color="primary" fontSize="large" />{" "}
            <Typography>{props.selectedRegistration.ad.duration}</Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <LocationOnIcon color="primary" fontSize="large" />{" "}
            <Typography>{props.selectedRegistration.ad.location}</Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AttachMoneyIcon color="primary" fontSize="large" />{" "}
            <Typography>{props.selectedRegistration.ad.payment}</Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DescriptionIcon color="primary" fontSize="large" />{" "}
            <Typography>{props.selectedRegistration.ad.description}</Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CloseIcon color="primary" fontSize="large" />{" "}
            <Typography>{props.selectedRegistration.closed}</Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DoneIcon color="primary" fontSize="large" />{" "}
            <Typography>{props.selectedRegistration.accepted}</Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexFlow: "column",
              alignItems: "center",
            }}
          >
            <Rating
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue || 1);
              }}
            ></Rating>
            <Typography>5/{value}</Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleOk} color="success">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Theme>
  );
};

export default RegistrationPage;
