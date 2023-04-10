import React from "react";
import { Link } from "react-router-dom";

export default function SideNav() {
  return (
    <div className="sidenav bg-sidenav">
      <Link to="/">HomePage</Link>
      <Link to="/search">Search</Link>
      <Link to="/favorites">My Favorites</Link>
    </div>
  );
}
