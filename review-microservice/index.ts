import express from "express";
import bodyParser from "body-parser";
import errorHandler from "@middleware/errorHandler";
import reviewRouter from "@routes/reviewRouter";
import cors from "cors";


const app = express();
const port = process.env.PORT || 3002;
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

app.use("/", reviewRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log("Listening on " + port);
});
