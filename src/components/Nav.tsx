import { Link } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
   return (
    <div className="nav">
      <ul className="nav-item">
      <li className="nav-link">
        <Link to="/" className="nav-link">Home</Link>
      </li>
      <li className="nav-link">
        <Link to="/saved" className="nav-link">Potential Candidates</Link>
      </li>
      </ul>
    </div>
  )
};

export default Nav;
