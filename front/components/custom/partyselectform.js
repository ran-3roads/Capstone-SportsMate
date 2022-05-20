import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink,
  Row,
  Col,
} from "reactstrap";
const PartySelect = () => {
  const router = useRouter();
 const {id} = router.query;
 const [isOpen, setIsOpen] = useState(false);
 const toggle = () => setIsOpen(!isOpen);
   return (
    <div className="topbar" id="top">
      <div className="partyheader6">
        <Container className="po-relative">
        <Navbar className="navbar-expand-lg h6-nav-bar">
          <NavbarToggler onClick={toggle} />
           <Collapse isOpen={isOpen} navbar className="hover-dropdown ml-auto">
           <div className="n_party">
                  <Link href={`/party/${id}/info`}>
                  <div className="select_font"><a>정보</a></div>
                  </Link>  
                </div>
                <div className="n_party">
                  <Link href={`/party/${id}/board`}>
                    <div className="select_font"><a>게시판</a></div>
                  </Link>     
                </div>
                <div className="n_party">
                  <Link href={`/party/${id}/schedule`}>
                  <div className="select_font"><a>일정</a></div>
                  </Link>
                </div>
                </Collapse>
                </Navbar>
              </Container>
            </div>
    </div>
  );
};

export default PartySelect;