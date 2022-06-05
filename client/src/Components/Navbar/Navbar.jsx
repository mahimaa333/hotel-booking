import React, {useContext} from 'react';
import "./Navbar.css"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {

    const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
        <div className="nav-container">
            <div>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                <span className="nav-logo">
                    Booking
                </span>
            </Link>
                
            </div>
            {user ? user.username : (
            <div className="nav-login">
                <button className="nav-button">Register</button>
                <button className="nav-button">Login</button>
            </div>
            )}
        </div>
    </div>
  )
}

export default Navbar