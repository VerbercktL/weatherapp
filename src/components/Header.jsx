import logo from "../assets/Logo_weerapp.png";

function Header() {
  return (
    <header>
      <img src={logo} alt={logo} />
      <h1> Weather forecast</h1>
    </header>
  );
}

export default Header;
