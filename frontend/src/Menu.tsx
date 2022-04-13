import { Link, Outlet, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { Divider, Toolbar } from "@mui/material";

const Menu = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      <AppBar color="primary">
        <Toolbar>
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
          <Link to="/registrations">
            <Button variant="text" color="secondary">
              Registrations
            </Button>
          </Link>
          <Button variant="contained" onClick={handleLogout}>
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
