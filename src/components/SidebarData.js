import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";


export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    kind: 'divider',
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    kind: 'divider',
  },
  {
    title: "Products",
    path: "/products",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    kind: 'divider',
  },
  {
    title: "Team",
    path: "/team",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    kind: 'divider',
  },
  {
    title: "My Asset Requests", // New Section
    path: "/my-asset-requests",
    icon: <FaIcons.FaFileAlt />, // Icon for asset requests
    cName: "nav-text",
  },
  {
    kind: 'divider',
  },
  {
    title: "Asset Requests", // New Section
    path: "/asset-requests-for-approval",
    icon: <IoIcons.IoMdCheckmarkCircleOutline />, // Icon for approval requests
    cName: "nav-text",
  },

  {
    kind: 'divider',
  },
  {
    title: "PublicAccess",
    path: "/publicaccess",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    kind: 'divider',
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
  
  
];
