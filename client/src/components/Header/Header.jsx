import "./Header.css";


const Header = () => {
  return (
    <div className="headerCard">
      <h1 className="title">
        <span>Rocket</span> Launch
      </h1>
      <p className="description">where you can search for rocket launches</p>
      <button className="btn"> Login/Signup </button>
    </div>
  );
};

export default Header;
