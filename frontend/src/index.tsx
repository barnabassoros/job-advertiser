import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import Jobs from "./Jobs";
import Registration from "./Registration";
import NewJob from "./NewJob";
import Menu from "./Menu";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
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
  </BrowserRouter>,
  document.getElementById("root")
);
