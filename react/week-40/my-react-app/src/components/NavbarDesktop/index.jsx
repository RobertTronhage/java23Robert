function NavbarDesktop() {
  return (
    <nav className="nav-desktop">
      <ul>
        <li className="company-name">Elektriker Jansson</li>
        <li className="button"><a href="#">Om oss</a></li>
        <li className="button"><a href="#">Tjänster</a></li>
        <li className="button"><a href="#">Kontakt</a></li>
        <li className="button"><a href="#">maila oss!</a></li>
        <li className="button button--cta call-desktop"><i className="fa-solid fa-phone-volume fa-lg"></i><strong> Ring +460 123 45 67</strong></li>
      </ul>
    </nav>
  )
}

export default NavbarDesktop