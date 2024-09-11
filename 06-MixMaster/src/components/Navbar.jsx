import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <section className="navbar">
        <div className="flex-navbar">
          <h5 className="logo-navbar">MixMaster</h5>
          <nav className="navlink">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-btn" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="about"
              className={({ isActive }) => (isActive ? "active-btn" : "")}
            >
              About
            </NavLink>
            <NavLink
              to="newsletter"
              className={({ isActive }) => (isActive ? "active-btn" : "")}
            >
              Newsletter
            </NavLink>
          </nav>
        </div>
      </section>
    </>
  );
}

export default Navbar;
