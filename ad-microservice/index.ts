import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import adRouter from "@routes/adRouter";
import errorHandler from "@middleware/errorHandler";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

app.use("/", adRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log("Listening on " + port);
});
