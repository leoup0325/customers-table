import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { withTranslation } from "react-i18next";

const lngs = [
  { code: "en", nativeName: "English" },
  { code: "fr", nativeName: "Francais" },
];

function Header({ i18n }) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Leonardo's test</Navbar.Brand>

        <Nav className="ml-auto">
          <NavDropdown
            title={lngs.find((lng) => lng.code === i18n.language)?.nativeName}
            id="basic-nav-dropdown"
            className="justify-content-end"
          >
            {lngs.map((lng) => (
              <NavDropdown.Item
                key={lng.code}
                onClick={() => i18n.changeLanguage(lng.code)}
              >
                {lng.nativeName}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default withTranslation()(Header);
