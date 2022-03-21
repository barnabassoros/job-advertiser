import express from "express";
import bodyParser from "body-parser";
import errorHandler from "@middleware/errorHandler";
import registrationRouter from "@routes/registrationRouter";
import cors from "cors";


const app = express();
const port = process.env.PORT || 3001;
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

app.use("/", registrationRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log("Listening on " + port);
});
