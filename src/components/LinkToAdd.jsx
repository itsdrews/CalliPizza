import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link } from "react-router-dom";

const LinkToAdd = ({ item, path }) => {
  return (
    <div className="link-to-add">
      <Link to={path}>
        <button>
          <h2>Adicionar {item}</h2>
          <AddOutlinedIcon
            sx={{ fontSize: "inherit" }}
            className="link-to-add-icon"
          />
        </button>
      </Link>
    </div>
  );
};

export default LinkToAdd;
