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
              <h1 className="title font-bold">파티검색</h1>
              <h6 className="subtitle">파티 목록</h6>
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
                    종목선택(전체)
                  </option>
                  <option value="SOCCER">축구</option>
                  <option value="FOOTBALL">풋살</option>
                  <option value="VALLEYBALL">배구</option>
                  <option value="BADMINTON">배드민턴</option>
                  <option value="BASKETBALL">농구</option>
                  <option value="PINGPONG">탁구</option>
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
                    지역선택(전체)
                  </option>
                  <option value="강남구">강남구</option>
                  <option value="강동구">강동구</option>
                  <option value="강북구">강북구</option>
                  <option value="강서구">강서구</option>
                  <option value="관악구">관악구</option>
                  <option value="광진구">광진구</option>
                  <option value="구로구">구로구</option>
                  <option value="금천구">금천구</option>
                  <option value="노원구">노원구</option>
                  <option value="도봉구">도봉구</option>
                  <option value="동대문구">동대문구</option>
                  <option value="동작구">동작구</option>
                  <option value="마포구">마포구</option>
                  <option value="서대문구">서대문구</option>
                  <option value="서초구">서초구</option>
                  <option value="성동구">성동구</option>
                  <option value="성북구">성북구</option>
                  <option value="송파구">송파구</option>
                  <option value="양천구">양천구</option>
                  <option value="영등포구">영등포구</option>
                  <option value="용산구">용산구</option>
                  <option value="은평구">은평구</option>
                  <option value="종로구">종로구</option>
                  <option value="중구">중구</option>
                  <option value="중랑구">중랑구</option>
                </Input>
              </span>
            </div>
            <div>
              <span className="partyfilter">
                <Input
                  type="text"
                  className="form-control"
                  id="party_name"
                  placeholder="파티명을 검색하세요"
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
                  검색
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
                  검색필터초기화
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
                  if (p.sportsName == "FOOTBALL") sportsname = "풋볼";
                  else if (p.sportsName == "VALLEYBALL") sportsname = "배구";
                  else if (p.sportsName == "BASKETBALL") sportsname = "농구";
                  else if (p.sportsName == "PINGPONG") sportsname = "탁구";
                  else if (p.sportsName == "SOCCER") sportsname = "축구";
                  else if (p.sportsName == "BADMINTON") sportsname = "배드민턴";
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
                              {"종목:" + sportsname + "  지역:" + p.location}
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
