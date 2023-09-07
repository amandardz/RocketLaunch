import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="headerCard">
      <h1 className="title">
        <span>Rocket</span> Launch
      </h1>
      <p className="description">where you can search for rocket launches</p>
      <Link to='/credentials'>
        <button className="headerBtn"> Login/Signup</button>
      </Link>
    </div>
  );
};

export default Header;
