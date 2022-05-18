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
import useWindowDimensions from "./lib/windowSize";

type selectType = "year" | "month";

const Reports = () => {
  let years = [];
  let months = [];
  for (let i = 1; i <= 12; i++) {
    months.push(<MenuItem value={i}>{i}</MenuItem>);
  }
  for (let i = 2000; i <= 2030; i++) {
    years.push(<MenuItem value={i}>{i}</MenuItem>);
  }
  const { height, width } = useWindowDimensions();
  const [payment, setPayment] = useState();
  const [type, setType] = useState<selectType>("year");
  const [year, setYear] = useState<number>(2022);
  const [month, setMonth] = useState<number>(1);
  const getResult = async (year: number, month: number = 0) => {
    let query = year + "/";
    if (month !== 0) {
      query += month;
    }
    const result = await ApiServices.get("/api/report/jobs/payment/" + query);
    setPayment(result.data);
  };
  useEffect(() => {
    getResult(2022);
  }, []);

  useEffect(() => {
    if (type === "year") {
      getResult(year);
    } else {
      getResult(year, month);
    }
  }, [type, year, month]);

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
            Created ads payment
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
        {type === "year" && (
          <LineChart width={width - 200} height={300} data={payment}>
            <Line
              type="monotone"
              dataKey="payment"
              stroke="#8884d8"
              strokeWidth={2}
            ></Line>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" fontFamily="Roboto" />
            <YAxis fontFamily="Roboto" />
            <Tooltip />
          </LineChart>
        )}
        {type === "month" && (
          <LineChart width={width - 200} height={300} data={payment}>
            <Line
              type="monotone"
              dataKey="payment"
              stroke="#8884d8"
              strokeWidth={2}
            ></Line>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="day" fontFamily="Roboto" />
            <YAxis fontFamily="Roboto" />
            <Tooltip />
          </LineChart>
        )}
      </div>
    </div>
  );
};

export default Reports;
