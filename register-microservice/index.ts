import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import errorHandler from "@middleware/errorHandler";
import registrationRouter from "@routes/registrationRouter";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use("/", registrationRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log("Listening on " + port);
});