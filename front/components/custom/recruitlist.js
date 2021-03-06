/* eslint-disable */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Button,
  Pagination,
  Form,
  FormGroup,
  PaginationItem,
  PaginationLink,
  Container,
  Row,
  Col,
  Input,
} from "reactstrap";
import footballimg from "../../assets/images/landingpage/football.png";
import valleyballimg from "../../assets/images/landingpage/valleyball.png";
import basketballimg from "../../assets/images/landingpage/basketball.png";
import pingpongimg from "../../assets/images/landingpage/pingpong.png";
import badmintonimg from "../../assets/images/landingpage/badminton.png";

import { useState, useEffect } from "react";
import axios from "axios";
import cookie from "react-cookies";
import cookies from "next-cookies";

const myLoader = ({ src }) => {
  if (src == "BADMINTON") return badmintonimg.src;
  else if (src == "PINGPONG") return pingpongimg.src;
  else if (src == "VALLEYBALL") return valleyballimg.src;
  else if (src == "BASKETBALL") return basketballimg.src;
  else return footballimg.src;
};

const RList = () => {
  const coa = cookie.loadAll();
  const allCookies = cookies(coa);
  const refreshTokenByCookie = allCookies["refreshToken"];
  const [recruits, setRecruits] = useState([]);
  useEffect(() => {
    axios
      .get("/match/public/board")
      .then(function (response) {
        if (response.status == 200) {
          setRecruits(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  let result = [...recruits];
  let logcontents = null;
  const [currentPage, setCurrentPage] = useState(0);
  const [location, setLocation] = useState("all");
  const [sports_name, setSports_name] = useState("all");
  const [party_title, setParty_title] = useState("");
  const [search, setSearch] = useState("");
  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };
  const onchangeLocation = (e) => {
    setLocation(e.target.value);
    setCurrentPage(0);
  };
  const onchangeSports_name = (e) => {
    setSports_name(e.target.value);
    setCurrentPage(0);
  };
  const onchangeParty_title = (e) => {
    setParty_title(e.target.value);
    setCurrentPage(0);
  };
  if (location == "all" && sports_name == "all") {
    let i = 0;
    result = null;
    result = new Array();
    if (search == "") result = [...recruits];
    else {
      recruits.map((p) => {
        if (p.title.indexOf(search) != -1) {
          result[i] = { ...p };
          i++;
        }
      });
    }
  } else if (location == "all") {
    let i = 0;
    result = null;
    result = new Array();
    if (search == "")
      recruits.map((p) => {
        if (p.sportsName == sports_name) {
          result[i] = { ...p };
          i++;
        }
      });
    else
      recruits.map((p) => {
        if (p.sportsName == sports_name && p.title.indexOf(search) != -1) {
          result[i] = { ...p };
          i++;
        }
      });
  } else if (sports_name == "all") {
    let i = 0;
    result = null;
    result = new Array();
    if (search == "")
      recruits.map((p) => {
        if (p.location == location) {
          result[i] = { ...p };
          i++;
        }
      });
    else
      recruits.map((p) => {
        if (p.location == location && p.title.indexOf(search) != -1) {
          result[i] = { ...p };
          i++;
        }
      });
  } else {
    let i = 0;
    result = null;
    result = new Array();
    if (search == "")
      recruits.map((p) => {
        if (p.sportsName == sports_name && p.location == location) {
          result[i] = { ...p };
          i++;
        }
      });
    else
      recruits.map((p) => {
        if (
          p.sportsName == sports_name &&
          p.location == location &&
          p.title.indexOf(search) != -1
        ) {
          result[i] = { ...p };
          i++;
        }
      });
  }
  let content = null;
  if (result.length == 0)
    content = (
      <div style={{ height: 500, display: "flex", width: "100%" }}>
        <div style={{ margin: "auto" }}>
          <h1>No such party</h1>
        </div>
      </div>
    );
  const pageSize = 4;
  const pagesCount = Math.ceil(result.length / pageSize);
  if (refreshTokenByCookie != undefined) {
    logcontents = result
      .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
      .map((p) => {
        let sportsname = undefined;
        if (p.sportsName == "FOOTBALL") sportsname = "??????";
        else if (p.sportsName == "VALLEYBALL") sportsname = "??????";
        else if (p.sportsName == "BASKETBALL") sportsname = "??????";
        else if (p.sportsName == "PINGPONG") sportsname = "??????";
        else if (p.sportsName == "SOCCER") sportsname = "??????";
        else if (p.sportsName == "BADMINTON") sportsname = "????????????";
        return (
          <li className="mItem">
            <Link href={`/recruit/${p.matchBoardId}/info`}>
              <div className="mUri">
                <div class="mcover">
                  <div className="mImage">
                    <span className="mInner">
                      <Image
                        loader={myLoader}
                        src={p.sportsName}
                        unoptimized={false}
                        width={80}
                        height={80}
                        alt="??????????????????"
                      />
                    </span>
                  </div>
                </div>
                <div class="mName">
                  <strong class="name">
                    <a>{p.title}</a>
                  </strong>
                  <a>{"??????:" + sportsname + "  ??????:" + p.location}</a>
                  <p className="pSubTxt">
                    {"?????? ??????/??????: " + p.day + "/" + p.time}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        );
      });
  } else {
    logcontents = result
      .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
      .map((p) => {
        let sportsname = undefined;
        if (p.sportsName == "FOOTBALL") sportsname = "??????";
        else if (p.sportsName == "VALLEYBALL") sportsname = "??????";
        else if (p.sportsName == "BASKETBALL") sportsname = "??????";
        else if (p.sportsName == "PINGPONG") sportsname = "??????";
        else if (p.sportsName == "SOCCER") sportsname = "??????";
        else if (p.sportsName == "BADMINTON") sportsname = "????????????";
        return (
          <li className="mItem">
            <a
              onClick={(e) => {
                e.preventDefault;
                alert("????????? ??? ???????????????");
              }}
            >
              <div className="mUri">
                <div class="mcover">
                  <div className="mImage">
                    <span className="mInner">
                      <Image
                        loader={myLoader}
                        src={p.sportsName}
                        unoptimized={false}
                        width={80}
                        height={80}
                        alt="??????????????????"
                      />
                    </span>
                  </div>
                </div>
                <div class="mName">
                  <strong class="name">
                    <a>{p.title}</a>
                  </strong>
                  <a>{"??????:" + sportsname + "  ??????:" + p.location}</a>
                  <p className="pSubTxt">
                    {"?????? ??????/??????: " + p.day + "/" + p.time}
                  </p>
                </div>
              </div>
            </a>
          </li>
        );
      });
  }
  return (
    <div>
      <div className="spacer" id="pagination-component">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <h1 className="title font-bold">????????????</h1>
              <h6 className="subtitle">?????? ??????</h6>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <div>
              <span className="partyfilter">
                <Input
                  type="select"
                  name="sports_name"
                  value={sports_name}
                  onChange={onchangeSports_name}
                >
                  <option value="all" selected>
                    ????????????(??????)
                  </option>
                  <option value="SOCCER">??????</option>
                  <option value="FOOTBALL">??????</option>
                  <option value="VALLEYBALL">??????</option>
                  <option value="BADMINTON">????????????</option>
                  <option value="BASKETBALL">??????</option>
                  <option value="PINGPONG">??????</option>
                </Input>
              </span>
            </div>
            <div>
              <span className="partyfilter">
                <Input
                  type="select"
                  name="location"
                  value={location}
                  onChange={onchangeLocation}
                >
                  <option value="all" selected>
                    ????????????(??????)
                  </option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="????????????">????????????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="????????????">????????????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="????????????">????????????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="??????">??????</option>
                  <option value="?????????">?????????</option>
                </Input>
              </span>
            </div>
            <div>
              <span className="partyfilter">
                <Input
                  type="text"
                  className="form-control"
                  id="party_name"
                  placeholder="???????????? ???????????????"
                  value={party_title}
                  onChange={onchangeParty_title}
                />
              </span>
            </div>
            <div>
              <span className="partyfilter">
                <Button
                  className="btn btn-inverse waves-effect waves-light"
                  onClick={(event) => {
                    event.preventDefault();
                    let tmp = party_title;
                    setSearch(tmp);
                  }}
                >
                  ??????
                </Button>
              </span>
            </div>
            <div>
              <span className="partyfilter">
                <Button
                  className="btn btn-inverse waves-effect waves-light"
                  onClick={(event) => {
                    event.preventDefault();
                    setSearch("");
                    setLocation("all");
                    setSports_name("all");
                    setParty_title("");
                    setCurrentPage(0);
                  }}
                >
                  ?????????????????????
                </Button>
              </span>
            </div>
          </Row>
        </Container>
        <Container>
          <ul className="mList">
            <div style={{ height: 500, width: "100%" }}>
              {logcontents}
              {content}
            </div>
          </ul>
          <div className="pagination-wrapper">
            <Pagination aria-label="Page navigation example">
              <PaginationItem disabled={currentPage <= 0}>
                <PaginationLink
                  onClick={(e) => handleClick(e, currentPage - 1)}
                  previous
                  href="#"
                />
              </PaginationItem>

              {[...Array(pagesCount)].map((page, i) => (
                <PaginationItem active={i === currentPage} key={i}>
                  <PaginationLink onClick={(e) => handleClick(e, i)} href="#">
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem disabled={currentPage >= pagesCount - 1}>
                <PaginationLink
                  onClick={(e) => handleClick(e, currentPage + 1)}
                  next
                  href="#"
                />
              </PaginationItem>
            </Pagination>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default RList;
