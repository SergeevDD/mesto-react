import logo from '../images/logo/logo_white.svg';

function Header() {
  return (
    <header className="header">
      <img
        src={logo}
        alt="место"
        className="header__logo"
      />
    </header>
  );
}

export default Header;
