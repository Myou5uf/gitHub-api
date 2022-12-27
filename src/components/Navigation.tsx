import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-purple-600 text-white">
            <Link to="/">
                <h3 className="font-bold">GitHub Search</h3>
            </Link>
            <span>
                <Link to="/" className="mr-2">
                    Home
                </Link>
                <Link to="/favorites">Favorites</Link>
            </span>
        </nav>
    );
};

export default Navigation;
