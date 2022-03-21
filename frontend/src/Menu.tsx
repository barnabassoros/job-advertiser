import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { Divider, Toolbar } from "@mui/material";

const Menu = () => {
  return (
    <>
      <AppBar color="primary">
        <Toolbar>
          <Link to="/jobs">
            <Button variant="text" color="secondary">
              Jobs
            </Button>
          </Link>
          <Divider orientation="vertical"  />
          <Link to="/newjob">
            <Button variant="text" color="secondary">
              New job
            </Button>
          </Link>
          <Divider orientation="vertical" variant="middle" flexItem light/>
          <Link to="/registrations">
            <Button variant="text" color="secondary">
              Registrations
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Outlet />
    </>
  );
};

export default Menu;
