import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import "../components/Styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const toggleNavbarOff = () => {
    setOpenLinks(openLinks);
  };

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} />
        <div className="hiddenLinks">
          <Link style={{backgroundColor: 'transparent'}} to="/"> Home </Link>
          <Link style={{backgroundColor: 'transparent'}} to="/bodycomp"> BodyComp </Link>
          <Link style={{backgroundColor: 'transparent'}} to="/mealplan"> MealPlan </Link>
          <Link style={{backgroundColor: 'transparent'}} to="/login"> Login </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link style={{backgroundColor: 'transparent'}} to="/"> Home </Link>
        <Link style={{backgroundColor: 'transparent'}} to="/bodycomp"> Body Comp </Link>
        <Link style={{backgroundColor: 'transparent'}} to="/mealplan" > MealPlan </Link>
        <Link style={{backgroundColor: 'transparent'}} to="/login" > Login </Link>
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;