import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
const GOOGLE_CLIENT_ID =
  "912838585910-4oknosaesv398s5639o4npmg0qkmhg23.apps.googleusercontent.com";

const AuthProvider = ({ children }: any) => {
  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    let token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    } else {
      token = localStorage.getItem("token");
    }
    if (token) setLoggedIn(true);
  }, []);
  const handleLogin = async (googleData: any) => {
    const res = await fetch("/api/auth/google", {
      method: "POST",
      body: JSON.stringify({ token: googleData.tokenId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userId = res.headers.get("X-User-Id");
    localStorage.setItem("userId", userId as string);
    const name = res.headers.get("X-User-Name");
    localStorage.setItem("name", name as string);
    const email = res.headers.get("X-User-Email");
    localStorage.setItem("email", email as string);
    const data = await res.json();
    localStorage.setItem("token", data.token);
    window.location.reload();
  };
  return (
    <>
      {loggedIn && <>{children}</>}
      {!loggedIn && (
        <div>
          <h1>Not logged in</h1>
          <Button
            variant="contained"
            href="https://github.com/login/oauth/authorize?client_id=17864b3bb7f139356969&redirect_uri=http://localhost/api/auth/redirect/github"
          >
            Sign in with GitHub
          </Button>
          <Button
            variant="contained"
            href="https://accounts.google.com/o/oauth2/v2/auth"
          >
            Sign in with Google
          </Button>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Sign in with google"
            onSuccess={handleLogin}
            onFailure={handleLogin}
            cookiePolicy={"single_host_origin"}
          ></GoogleLogin>
        </div>
      )}
    </>
  );
};

export default AuthProvider;
