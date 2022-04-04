import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import { v4 as uuid } from "uuid";
import db from "@lib/knex";

const CLIENT_ID = "17864b3bb7f139356969";
const CLIENT_SECRET = "38d36516ccf96fa60f1660735835eaba5c87bf87";
const GITHUB_URL = "https://github.com/login/oauth/access_token";
const LOCAL_URL = "http://localhost:3004";

type userType = {
  id: string;
  githubId: string;
  githubName: string;
  accesToken: string;
};

const app = express();
app.use(cors({ credentials: true, origin: true }));
const port = process.env.PORT || 3005;
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.get("/auth/redirect/", async (req: Request, res: Response) => {
  let user: userType;
  axios({
    url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
    headers: { Accept: "application/json" },
    method: "POST",
  }).then((tokenResponse) => {
    const token = tokenResponse.data.access_token;

    axios
      .get("https://api.github.com/user", {
        headers: {
          Authorization: "token " + token,
        },
      })
      .then(async (userResponse) => {
        user = {
          id: uuid(),
          githubId: userResponse.data.id,
          githubName: userResponse.data.login,
          accesToken: token,
        };
        console.log("user", user);
        const userFromDb = await db<userType>("users")
          .select("*")
          .where({ githubId: user.githubId });
        console.log("userFromDb", userFromDb);
        if (userFromDb.length === 0) {
          await db("users").insert(user);
        } else user = userFromDb[0];
        res.redirect(`${LOCAL_URL}?access_token=${token}&user_id=${user.id}`);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  });
});

app.listen(port, () => {
  console.log("Listening on " + port);
});
