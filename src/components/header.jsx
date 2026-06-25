"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Topbar from "./topbar";
const Header = () => {
    
    return (
        <div className="w-full fixed top-0 left-0 z-50 transition-all duration-500">
            <Topbar />
            <Navbar />
        </div>
    );
};

export default Header;
