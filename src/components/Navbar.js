import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";
import { IconContext } from "react-icons";
import Button from '@mui/material/Button';
import axios from 'axios'; // Make sure to import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate



function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  const showSidebar = () => setSidebar(!sidebar);
  // const handleLogout = async () => {
  //   try {
  //     // Call your logout API endpoint
  //     const response = await axios.post('http://127.0.0.1:8082/auth/logout', {
  //       withCredentials: true, // Include credentials if your API uses them
  //     });

  //     if (response.status === 200) {
  //       // Logout successful, navigate to path "/"
  //       navigate('/');
  //     } else {
  //       // Handle logout failure
  //       console.error('Logout failed');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred during logout:', error);
  //   }
  // };
  const handleLogout = () => {
    // Navigate to the root path
    navigate('/');
  };
  

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
            

          </Link>
          <Button variant="contained" onClick={handleLogout}>Log Out</Button>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
