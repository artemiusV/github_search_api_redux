import "./App.css";
import { Home } from "./components/pages/Home/Home";
import { User } from "./components/pages/User/UserProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:login" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}
