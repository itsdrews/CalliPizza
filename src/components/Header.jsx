import React from "react";
import NavBar from "./NavBar";
import Logo from "./Logo";
import IconButton from "@mui/material/IconButton";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="header">
      <Logo />
      <IconButton aria-label="delete" onClick={logout}>
        <ExitToAppOutlinedIcon className="logout-icon" />
      </IconButton>
      <div className="navigation-bar">
        <NavBar></NavBar>
      </div>
    </header>
  );
};

export default Header;
