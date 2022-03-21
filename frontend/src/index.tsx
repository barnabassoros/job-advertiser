import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom";
import Jobs from "./Jobs";
import Registration from "./Registration";
import NewJob from "./NewJob";
import Menu from "./Menu";
import { SnackbarProvider } from "notistack";
import Theme from "./Theme";

ReactDOM.render(
  <Theme>
    <BrowserRouter>
      <SnackbarProvider>
        <Menu></Menu>
        <Routes>
          <Route index element={<Jobs />}></Route>
          <Route path="jobs" element={<Jobs />}></Route>
          <Route path="newjob" element={<NewJob />}></Route>
          <Route path="registrations" element={<Registration />} />
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  </Theme>,
  document.getElementById("root")
);
