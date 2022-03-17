import { Button, Stack, TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useRef, useState } from "react";
import { NewAd } from "./types/ad";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

const NewJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [dateTime, setDateTime] = useState<Date | null>(new Date());
  const handleDateChange = (newValue: Date | null) => {
    setDateTime(newValue);
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const locationRef = useRef<HTMLInputElement>();
  const durationRef = useRef<HTMLInputElement>();
  const salaryRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();
  const onSubmit = async () => {
    const ad: NewAd = {
      time: dateTime || new Date(),
      duration: durationRef.current?.value || "",
      location: locationRef.current?.value || "",
      payment: parseInt(salaryRef.current?.value || "0"),
      description: descriptionRef.current?.value || "",
    };
    console.log(JSON.stringify(ad));
    const result = await fetch("http://localhost:3000/ad", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ad),
    });
    if (result.status === 201) {
      enqueueSnackbar("Succesful job creation!", { variant: "success" });
    } else {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };
  console.log(errors);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack width="60%" textAlign="center">
          <Typography variant="h3" component="div" gutterBottom>
            Creating a new job
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date and time"
              InputProps={{ ...register("dateTime", { required: true }) }}
              value={dateTime}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params}></TextField>}
            ></DateTimePicker>
          </LocalizationProvider>
          <TextField
            margin="normal"
            variant="outlined"
            inputProps={{
              ...register("location", { required: true, maxLength: 80 }),
            }}
            inputRef={locationRef}
            label="Location"
            error={!!errors.location}
          ></TextField>
          <TextField
            margin="normal"
            variant="outlined"
            inputProps={{
              ...register("duration", { required: true, maxLength: 100 }),
            }}
            inputRef={durationRef}
            label="Duration"
            error={!!errors.duration}
          ></TextField>
          <TextField
            margin="normal"
            variant="outlined"
            inputProps={{ ...register("salary", { required: true }) }}
            inputRef={salaryRef}
            label="Salary"
            error={!!errors.salary}
          ></TextField>
          <TextField
            margin="normal"
            InputProps={{
              ...register("description", { required: true, maxLength: 80 }),
            }}
            variant="outlined"
            inputRef={descriptionRef}
            label="Description"
            error={!!errors.description}
          ></TextField>

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default NewJob;
