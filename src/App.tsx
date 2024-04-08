import "./App.css";
import { Home } from "./components/pages/Home/Home";
import { User } from "./components/pages/User/UserProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Paths } from "./constants/paths";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.HOME} element={<Home />} />
        <Route path={Paths.USER} element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}
