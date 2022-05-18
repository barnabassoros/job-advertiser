import { Link, Outlet, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { Divider, Toolbar, Typography } from "@mui/material";

const Menu = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    window.location.reload();
  };

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  return (
    <>
      <AppBar color="primary">
        <Toolbar>
          <div style={{ flexGrow: 1, display: "flex", flexFlow: "row" }}>
            <Link to="/jobs">
              <Button variant="text" color="secondary">
                Jobs
              </Button>
            </Link>
            <Divider orientation="vertical" />
            <Link to="/newjob">
              <Button variant="text" color="secondary">
                New job
              </Button>
            </Link>
            <Divider orientation="vertical" variant="middle" flexItem light />
            <Link to="/applications">
              <Button variant="text" color="secondary">
                Applications
              </Button>
            </Link>
            <Divider orientation="vertical" variant="middle" flexItem light />
            <Link to="/summaries">
              <Button variant="text" color="secondary">
                Summaries
              </Button>
            </Link>
          </div>
          <Typography margin="normal">{name}</Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Outlet />
    </>
  );
};

export default Menu;
