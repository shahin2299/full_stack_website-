import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div className="navbar-container">
      <img
        alt="logo"
        className="logo"
        src="https://play-lh.googleusercontent.com/WcE1ZPNjPnpJMB2_lq1oMJVJNqe47PjOsDtpugzx0rSFGwQw6ZKWt0QZg-IXyy4Z"
      />
      {auth ? (
        <ul className="nav-ul">
          <li className="nav">
            <Link to="/">product</Link>
          </li>
          <li className="nav">
            <Link to="/add">Add product</Link>
          </li>
          <li className="nav">
            <Link to="/update">Update product</Link>
          </li>
          <li className="nav">
            <Link to="/profile">profile</Link>
          </li>
          <li className="nav">
            <Link onClick={logout} to="/signup">
              Logout({JSON.parse(auth).name})
            </Link>
          </li>{" "}
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
