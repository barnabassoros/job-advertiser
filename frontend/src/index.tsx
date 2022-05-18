import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom";
import Jobs from "./Jobs";
import Registration from "./Registration";
import NewJob from "./NewJob";
import Reports from "./Reports";
import Menu from "./Menu";
import { SnackbarProvider } from "notistack";
import Theme from "./Theme";
import AuthProvider from "./AuthProvider";
import axios from "axios";

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
    }
    return Promise.reject(err);
  }
);


ReactDOM.render(
  <Theme>
    <BrowserRouter>
      <AuthProvider>
        <SnackbarProvider>
          <Menu></Menu>
          <Routes>
            <Route index element={<Jobs />}></Route>
            <Route path="jobs" element={<Jobs />}></Route>
            <Route path="newjob" element={<NewJob />}></Route>
            <Route path="applications" element={<Registration />} />
            <Route path="summaries" element={<Reports />} />
          </Routes>
        </SnackbarProvider>
      </AuthProvider>
    </BrowserRouter>
  </Theme>,
  document.getElementById("root")
);
