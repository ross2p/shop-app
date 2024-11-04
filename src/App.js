import { Container, CssBaseline } from "@mui/material";
import ResponsiveAppBar from "./component/AppBar/AppBar";
import { Home } from "./component/Home/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./component/Auth/SignIn";
import SignUp from "./component/Auth/SignUp";

import { AppRoutes } from "./utils/routes";
import { Profile } from "./component/Profile/Profile";

function App() {
  return (
    <>
      <Router>
        <CssBaseline />
        <ResponsiveAppBar>
          <Routes>
            <Route path={AppRoutes.Home} element={<Home />} />
            <Route path={AppRoutes.SignIn} element={<SignIn />} />
            <Route path={AppRoutes.SignUp} element={<SignUp />} />
            <Route path={AppRoutes.Profile} element={<Profile />} />
          </Routes>
          {/* <Footer /> */}
        </ResponsiveAppBar>
      </Router>
    </>
  );
}

export default App;
