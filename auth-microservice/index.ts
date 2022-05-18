import express, { NextFunction, Request, response, Response } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import { v4 as uuid } from "uuid";
import db from "@lib/knex";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const CLIENT_ID = "17864b3bb7f139356969";
const CLIENT_SECRET = "38d36516ccf96fa60f1660735835eaba5c87bf87";
const GITHUB_URL = "https://github.com/login/oauth/access_token";
const LOCAL_URL = "http://localhost:3004";

type Platform = "github" | "google";

type userType = {
  id: string;
  name: string;
  email: string;
  platform: Platform;
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

app.get("/auth/redirect/github", async (req: Request, res: Response) => {
  let user: userType;
  const githubResponse = await axios({
    url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
    headers: { Accept: "application/json" },
    method: "POST",
  }); /*
  const accessToken = githubResponse.data.access_token;
  const userResponse = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: "token " + accessToken,
    },
  });
  user = {
    id: uuid(),
    name: userResponse.data.name,
    email: userResponse.data.email,
    platform: "github",
  };
  const userFromDb = await db<userType>("users")
    .select("*")
    .where({ name: user.name })
    .orWhere({ email: user.email });
  if (userFromDb.length === 0) {
    await db("users").insert(user);
  } else user = userFromDb[0];
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );
  res.redirect(`${LOCAL_URL}?token=${token}`);*/
  axios({
    url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
    headers: { Accept: "application/json" },
    method: "POST",
  }).then((tokenResponse) => {
    const access_token = tokenResponse.data.access_token;

    axios
      .get("https://api.github.com/user", {
        headers: {
          Authorization: "token " + access_token,
        },
      })
      .then(async (userResponse) => {
        user = {
          id: uuid(),
          name: userResponse.data.name,
          email: userResponse.data.email,
          platform: "github",
        };
        const userFromDb = await db<userType>("users")
          .select("*")
          .where({ name: user.name, email: user.email });
        if (userFromDb.length === 0) {
          await db("users").insert(user);
        } else user = userFromDb[0];
        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET as string,
          { expiresIn: "1d" }
        );
        res.redirect(`${LOCAL_URL}?token=${token}`);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  });
});

app.use(
  "/auth/google",
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload?.email || "";
    const name = payload?.name || "";
    let user = {
      id: uuid(),
      name,
      email,
      platform: "google",
    };
    const userFromDb = await db<userType>("users")
      .select("*")
      .where({ name, email });
    if (userFromDb.length === 0) {
      await db("users").insert(user);
    } else user = userFromDb[0];
    const jwtToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    res.setHeader("X-User-Name", user.name);
    res.setHeader("X-User-Email", user.email);
    res.setHeader("X-User-Id", user.id);

    res.json({ token: jwtToken }).status(200);
  }
);

app.use("/auth/verify", (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) res.status(401).send();
  let userId;
  try {
    userId = jwt.verify(token as string, process.env.JWT_SECRET as string);
  } catch (ex) {
    res.status(401).send();
  }

  res.setHeader("X-User-Id", (userId as any).userId as string);
  res.setHeader(
    "X-User-Name",
    (userId as any).name === undefined ? "" : (userId as any).name
  );
  res.setHeader(
    "X-User-Email",
    (userId as any).email === undefined ? "" : (userId as any).email
  );
  res.status(200).send();
});

app.listen(port, () => {
  console.log("Listening on " + port);
});
