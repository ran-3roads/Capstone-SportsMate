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
import noimg from "../../assets/images/landingpage/noimg.png";
import { useState, useEffect } from "react";
import axios from "axios";
const PList = () => {
  const [partys, setPartys] = useState([]);
  useEffect(() => {
    axios
      .get("/party/public/all")
      .then(function (response) {
        if (response.status == 200) {
          setPartys(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  let result = [...partys];
  const [currentPage, setCurrentPage] = useState(0);
  const [location, setLocation] = useState("all");
  const [sportsName, setSportsName] = useState("all");
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
  const onchangeSportsName = (e) => {
    setSportsName(e.target.value);
    setCurrentPage(0);
  };
  const onchangeParty_title = (e) => {
    setParty_title(e.target.value);
    setCurrentPage(0);
  };
  if (location == "all" && sportsName == "all") {
    let i = 0;
    result = null;
    result = new Array();
    if (search == "") result = [...partys];
    else {
      partys.map((p) => {
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
      partys.map((p) => {
        if (p.sportsName == sportsName) {
          result[i] = { ...p };
          i++;
        }
      });
    else
      partys.map((p) => {
        if (p.sportsName == sportsName && p.title.indexOf(search) != -1) {
          result[i] = { ...p };
          i++;
        }
      });
  } else if (sportsName == "all") {
    let i = 0;
    result = null;
    result = new Array();
    if (search == "")
      partys.map((p) => {
        if (p.location == location) {
          result[i] = { ...p };
          i++;
        }
      });
    else
      partys.map((p) => {
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
      partys.map((p) => {
        if (p.sportsName == sportsName && p.location == location) {
          result[i] = { ...p };
          i++;
        }
      });
    else
      partys.map((p) => {
        if (
          p.sportsName == sportsName &&
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
                  name="sportsName"
                  value={sportsName}
                  onChange={onchangeSportsName}
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
                    setSportsName("all");
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
              {result
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
                      <Link href={`/party/${p.id}/info`}>
                        <div className="mUri">
                          <div class="mcover">
                            <div className="mImage">
                              <span className="mInner">
                                <Image
                                  src={`https://capstonesportsmate.s3.ap-northeast-2.amazonaws.com/party/${p.id}.png`}
                                  unoptimized={true}
                                  onError={(e) => {
                                    e.target.src = noimg.src;
                                  }}
                                  width={80}
                                  height={80}
                                />
                              </span>
                            </div>
                          </div>
                          <div class="mName">
                            <strong class="name">
                              <a>{p.title}</a>
                            </strong>
                            <a>
                              {"??????:" + sportsname + "  ??????:" + p.location}
                            </a>
                            <p className="pSubTxt">{p.intro}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
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

export default PList;
