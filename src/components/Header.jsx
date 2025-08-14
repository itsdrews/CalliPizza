import React from "react";
import AdmNavBar from "./AdmNavBar";
import NavBar from "./NavBar";
import Logo from "./Logo";
import IconButton from "@mui/material/IconButton";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { useAuth } from "../context/AuthContext";

const Header = ({admin}) => {
  const { logout } = useAuth();

  return (
    <header className="header">
      <Logo />
      <IconButton
        aria-label="delete"
        onClick={logout}
        className="logout-button"
      >
        <ExitToAppOutlinedIcon fontSize="large" className="logout-icon" />
      </IconButton>
      <div className="navigation-bar">
        {admin ? <AdmNavBar/> :<NavBar/>}
      </div>
    </header>
  );
};

export default Header;
