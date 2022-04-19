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
  return (
    <div className="topbar" id="top">
      <div className="party_header6">
        <Container className="po-relative">
            <Row>
                <div>
                  <Link href="/party/info">
                    <a
                      className={
                        router.pathname == "/party/info"
                          ? "text-white nav-link"
                          : "nav-link"
                      }
                    >
                      정보                    </a>
                  </Link>
                  </div>
                  <div>
                  <Link href="../../../pages/party/[id]/board">
                    <a>
                      게시판
                    </a>
                  </Link>
                  </div>
                  <div>
                  <Link href="/party/schedule">
                    <a
                      className={
                        router.pathname == "/party/schedule"
                          ? "text-white nav-link"
                          : "nav-link"
                      }
                    >
                      일정
                    </a>
                  </Link>
                  </div>
                </Row>  
        </Container>
      </div>
    </div>
  );
};

export default PartySelect;