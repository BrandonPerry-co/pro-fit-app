import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/HomeBg2.jpg";
import "../components/Styles/home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})`}}>
      <div className="headerContainer">
        <h1> Welcome to Pro-Fit </h1>
        <p> Daily Meal Plan and Body Composition tracking </p>
        <Link style={{backgroundColor: 'transparent'}} to="/signup">
          <button> SIGN UP </button>
        </Link>
      </div>
    </div>
  );
}

export default Home