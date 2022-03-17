import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { Toolbar } from "@mui/material";

const Menu = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link to="/jobs">
            <Button color="secondary" variant="contained">
              Jobs
            </Button>
          </Link>
          <Link to="/newjob">
            <Button color="secondary" variant="contained">
              New job
            </Button>
          </Link>
          <Link to="/registrations">
            <Button color="secondary" variant="contained">
              Registrations
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Menu;
