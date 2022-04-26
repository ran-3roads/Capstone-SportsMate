import React, { useState } from "react";
import Image from "next/image";
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
import logo from "../../assets/images/logos/white-text.png";
import axios from "axios";
import cookie from 'react-cookies';
import cookies from "next-cookies";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState('false');
  const router = useRouter();
  const toggle = () => setIsOpen(!isOpen);
  const coa = cookie.loadAll();
  const allCookies = cookies(coa);
  const refreshTokenByCookie = allCookies['refreshToken'];
  let LoginNav = null;
  if(refreshTokenByCookie!=undefined){
    console.log("로그인중임")
    LoginNav = <NavItem>
    <Link href="/logout">
      <a
        className={
          router.pathname == "/logout"
            ? "text-white nav-link"
            : "nav-link"
        }
      >
        로그아웃                   </a>
    </Link>
  </NavItem>
  }
  else{
    console.log("로그인중아님")
    LoginNav = <NavItem>
    <Link href="/login">
      <a
        className={
          router.pathname == "/login"
            ? "text-white nav-link"
            : "nav-link"
        }
      >
        로그인                    </a>
    </Link>
    </NavItem>
  }
   return (
    <div className="topbar" id="top"  >

      <div className="header6">
        <Container className="po-relative">
          <Navbar className="navbar-expand-lg h6-nav-bar">
            <NavbarBrand href="/">
              <Image src={logo} alt="wrapkit" />
            </NavbarBrand>
            <NavbarToggler onClick={toggle}>
              <span className="ti-menu"></span>
            </NavbarToggler>
            <Collapse
              isOpen={isOpen}
              navbar
              className="hover-dropdown ml-auto"
              id="h6-info"
            >
              <Nav navbar className="ml-test">
                {LoginNav}
                <NavItem>
                  <Link href="/signup">
                    <a
                      className={
                        router.pathname == "/signup"
                          ? "text-white nav-link"
                          : "nav-link"
                      }
                    >
                      회원가입                    </a>
                  </Link>
                </NavItem>
              </Nav>
              <Nav navbar className="ml-auto">
                <NavItem>
                  <Link href="/">
                    <a
                      className={
                        router.pathname == "/"
                          ? "text-white nav-link"
                          : "nav-link"
                      }
                    >
                      Home                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/party">
                    <a
                      className={
                        router.pathname == "/party"
                          ? "text-white nav-link"
                          : "nav-link"
                      }
                    >
                      Party
                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/guide">
                    <a
                      className={
                        router.pathname == "/guide"
                          ? "text-white nav-link"
                          : "nav-link"
                      }
                    >
                      guide
                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/recruit">
                    <a
                      className={
                        router.pathname == "/recruit"
                          ? "text-white nav-link"
                          : "nav-link"
                      }
                    >
                      용병
                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/mypage">
                    <a
                      className={
                        router.pathname == "/mypage"
                          ? "text-white nav-link"
                          : "nav-link"
                      }
                    >
                      MY
                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/basic">
                    <a
                      className={
                        router.pathname == "/basic"
                          ? "text-white nav-link"
                          : "nav-link"
                      }
                    >
                      basic(참고용)
                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/party/1/info">
                    <a
                      className={
                        router.pathname == "/party/1/info"
                          ? "text-white nav-link"
                          : "nav-link"
                      }
                    >
                      test중
                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/party/1/info/modify">
                    <a
                      className={
                        router.pathname == "/party/1/info/modify"
                          ? "text-white nav-link"
                          : "nav-link"
                      }
                    >
                      test2중
                    </a>
                  </Link>
                </NavItem>
              </Nav>
              
            </Collapse>
          </Navbar>
        </Container>
      </div>
    </div>
  );
};

export default Header;