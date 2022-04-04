import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const AuthProvider = ({ children }: any) => {
  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    let token = new URLSearchParams(window.location.search).get("access_token");
    let userId = new URLSearchParams(window.location.search).get("user_id");
    if (token && userId) {
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", userId);
      navigate("/");
    } else {
      token = localStorage.getItem("token");
      userId = localStorage.getItem("user_id");
    }

    axios
      .get("https://api.github.com/user", {
        headers: {
          Authorization: "token " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }, []);
  return (
    <>
      {loggedIn && <>{children}</>}
      {!loggedIn && (
        <div>
          <h1>Not logged in</h1>
          <Button href="https://github.com/login/oauth/authorize?client_id=17864b3bb7f139356969&redirect_uri=http://localhost/auth/redirect">
            Sign in
          </Button>
        </div>
      )}
    </>
  );
};

export default AuthProvider;
