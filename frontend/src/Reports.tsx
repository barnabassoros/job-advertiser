import { Menu, MenuItem, Select, Typography } from "@mui/material";
import useWindowDimensions from "./lib/windowSize";
import ReportItem from "./ReportItem";

const Reports = () => {
  const { height, width } = useWindowDimensions();

  return (
    <div>
      <ReportItem
        title="Created ads payment"
        width={width - 200}
        height={300}
        datakey="payment"
        url="/api/report/jobs/payment/"
      ></ReportItem>
      <ReportItem
        title="Reviews"
        width={width - 200}
        height={300}
        datakey="review"
        url="/api/report/reviews/"
      ></ReportItem>
    </div>
  );
};

export default Reports;
