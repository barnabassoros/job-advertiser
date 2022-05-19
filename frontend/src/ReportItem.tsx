import { useEffect, useState } from "react";
import ApiServices from "./lib/api";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
} from "recharts";
import { Menu, MenuItem, Select, Typography } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";

type selectType = "year" | "month";

const ReportItem = (props: {
  title: string;
  url: string;
  width: number;
  height: number;
  datakey: string;
}) => {
  let years = [];
  let months = [];
  for (let i = 1; i <= 12; i++) {
    months.push(<MenuItem value={i}>{i}</MenuItem>);
  }
  for (let i = 2000; i <= 2030; i++) {
    years.push(<MenuItem value={i}>{i}</MenuItem>);
  }
  const [data, setData] = useState();
  const [type, setType] = useState<selectType>("year");
  const [year, setYear] = useState<number>(2022);
  const [month, setMonth] = useState<number>(1);
  const getResult = async (year: number, month: number = 0) => {
    let query = year + "/";
    if (month !== 0) {
      query += month;
    }
    const result = await ApiServices.get(props.url + query);
    setData(result.data);
  };
  useEffect(() => {
    getResult(2022);
  }, []);
  function ErrorFallback({ error, resetErrorBoundary }: any) {
    return (
      <div role="alert">
        <Typography>Something went wrong, check back later</Typography>
      </div>
    );
  }
  useEffect(() => {
    if (type === "year") {
      getResult(year);
    } else {
      getResult(year, month);
    }
  }, [type, year, month]);
  console.log(data);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", flexFlow: "row" }}>
          <Typography variant="h4" component="h4">
            {props.title}
          </Typography>
          ;
          <Select
            value={type}
            label="Type"
            onChange={(e) => {
              setType(e.target.value as selectType);
            }}
          >
            <MenuItem value="year">Yearly</MenuItem>
            <MenuItem value="month">Monthly</MenuItem>
          </Select>
          <Select
            value={year}
            label="Year"
            onChange={(e) => {
              setYear(e.target.value as number);
            }}
          >
            {years}
          </Select>
          <Select
            disabled={type === "year"}
            value={month}
            label="Month"
            onChange={(e) => {
              setMonth(e.target.value as number);
            }}
          >
            {months}
          </Select>
        </div>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {type === "year" && (
            <LineChart width={props.width} height={props.height} data={data}>
              <Line
                type="monotone"
                dataKey={props.datakey}
                stroke="#8884d8"
                strokeWidth={2}
              ></Line>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="month" fontFamily="Roboto" />
              <YAxis
                fontFamily="Roboto"
                max={props.datakey === "review" ? 5 : undefined}
              />
              <Tooltip />
            </LineChart>
          )}
          {type === "month" && (
            <LineChart width={props.width} height={props.height} data={data}>
              <Line
                type="monotone"
                dataKey={props.datakey}
                stroke="#8884d8"
                strokeWidth={2}
              ></Line>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="day" fontFamily="Roboto" />
              <YAxis
                fontFamily="Roboto"
                max={props.datakey === "review" ? 5 : undefined}
              />
              <Tooltip />
            </LineChart>
          )}{" "}
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ReportItem;
