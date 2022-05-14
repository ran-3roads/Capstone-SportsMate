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
import cookie from "react-cookies";
import cookies from "next-cookies";
import { useEffect } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState("false");
  const [notice, setNotice] = useState([]);
  const router = useRouter();
  const toggle = () => setIsOpen(!isOpen);
  const coa = cookie.loadAll();
  const allCookies = cookies(coa);
  const refreshTokenByCookie = allCookies["refreshToken"];
  let LoginNav = null;
  let NoticeNav = null;
  let myNav = null;
  let SignupNav = null;
  if (refreshTokenByCookie != undefined) {
    useEffect(() => {
      axios
        .get(`/notice`)
        .then(function (response) {
          if (response.status == 200) {
            setNotice(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);
    LoginNav = (
      <NavItem>
        <Link href="/logout">
          <a
            className={
              router.pathname == "/logout" ? "text-white nav-link" : "nav-link"
            }
          >
            로그아웃{" "}
          </a>
        </Link>
      </NavItem>
    );
    if (notice.filter((n) => n.noticeStatus == "UNCONFIRM").length == 0)
      NoticeNav = (
        <NavItem>
          <Link href="/notice">
            <a
              className={
                router.pathname == "/notice"
                  ? "text-white nav-link"
                  : "nav-link"
              }
            >
              알림{" "}
            </a>
          </Link>
        </NavItem>
      );
    else {
      NoticeNav = (
        <NavItem>
          <Link href="/notice">
            <a
              className={
                router.pathname == "/notice"
                  ? "text-white nav-link"
                  : "nav-link"
              }
            >
              알림({notice.filter((n) => n.noticeStatus == "UNCONFIRM").length}){" "}
            </a>
          </Link>
        </NavItem>
      );
    }
    myNav = (
      <NavItem>
        <Link href="/mypage">
          <a
            className={
              router.pathname == "/mypage" ? "text-white nav-link" : "nav-link"
            }
          >
            MY
          </a>
        </Link>
      </NavItem>
    );
  } else {
    console.log("로그인중아님");
    LoginNav = (
      <NavItem>
        <Link href="/login">
          <a
            className={
              router.pathname == "/login" ? "text-white nav-link" : "nav-link"
            }
          >
            로그인{" "}
          </a>
        </Link>
      </NavItem>
    );
    SignupNav = (
      <NavItem>
        <Link href="/signup">
          <a
            className={
              router.pathname == "/signup" ? "text-white nav-link" : "nav-link"
            }
          >
            회원가입{" "}
          </a>
        </Link>
      </NavItem>
    );
  }
  return (
    <div className="topbar" id="top">
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
                {SignupNav}
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
                      Home{" "}
                    </a>
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
                {myNav}
                {NoticeNav}
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </div>
    </div>
  );
};

export default Header;
