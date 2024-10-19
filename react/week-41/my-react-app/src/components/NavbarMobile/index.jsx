function NavbarMobile() {
  return (
    <nav className="nav-mobile">
        <ul>
          <li>Elektriker Jansson</li>
          <li className="call"><i className="fa-solid fa-phone-volume fa-lg"></i><strong> Ring +460 123 45 67</strong></li>
          <li className="hamburger"><a href="#"><i className="fa-solid fa-bars fa-lg"></i></a></li>
        </ul>
      </nav>
  )
}

export default NavbarMobile