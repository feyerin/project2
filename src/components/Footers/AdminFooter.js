
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  getYear() {
    return new Date().getFullYear();
  }

  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © {this.getYear()}{" "}
              <a
                className="font-weight-bold ml-1"
                href="https://anterin.id"
                rel="noopener noreferrer"
                target="_blank"
              >
                Anterin Digital Nusantara
              </a>
            </div>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
