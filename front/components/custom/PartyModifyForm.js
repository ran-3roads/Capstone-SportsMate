import React, { useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useState, useEffect } from "react";
import { Spin } from "antd";
import "antd/dist/antd.css";
import Popup from "./popup";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const PartyModifyForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [partyinfo, setPartyinfo] = useState({});
  const [image, setImage] = useState({
    image_file: undefined,
    preview_URL: undefined,
  });
  const [loaded, setLoaded] = useState(false);
  let inputRef;

  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      setLoaded("loading");
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
      setLoaded(true);
    };
  };

  const deleteImage = () => {
    setImage({
      image_file: "",
      preview_URL: "img/default_image.png",
    });
    setLoaded(false);
  };
  const sendImageToServer = async (id) => {
    if (image.image_file) {
      const formData = new FormData();
      formData.append("multipartFile", image.image_file);
      formData.append("id", id);
      formData.append("imageCategory", "PARTY");

      try {
        await axios.post("/file/image", formData);
      } catch (error) {
        console.log(error);
        return;
      }
      setPopup({
        open: true,
        title: "Confirm",
        message: "파티를 만들었습니다!",
        callback: function () {
          document.location.href = "/";
        },
      });
    } else {
      alert("사진을 등록하세요!");
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(`/party/public/${id}/info`)
      .then(function (response) {
        if (response.status == 200) {
          setPartyinfo(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [router.isReady]);
  const [popup, setPopup] = useState({
    open: false,
    title: "",
    message: "",
    callback: false,
  });

  const [info, setInfo] = useState(partyinfo.info);
  const [sportsName, setSportsName] = useState(partyinfo.sportsName);
  const [location, setLocation] = useState(partyinfo.location);
  const [intro, setIntro] = useState(partyinfo.intro);
  const [title, setTitle] = useState(partyinfo.title);

  const onchangeSportsName = (e) => {
    console.log(e.target.value);
    setSportsName(e.target.value);
  };
  const onchangeLocation = (e) => {
    console.log(e.target.value);
    setLocation(e.target.value);
  };
  const onchangeIntro = (e) => {
    console.log(e.target.value);
    setIntro(e.target.value);
  };
  const onchangeTitle = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };
  const onchangeInfo = (e) => {
    console.log(e.target.value);
    setInfo(e.target.value);
  };

  return (
    <div>
      <Popup
        open={popup.open}
        setPopup={setPopup}
        message={popup.message}
        title={popup.title}
        callback={popup.callback}
      />
      <div className="spacer" id="forms-component">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <h1 className="title font-bold">파티 수정</h1>
              <h6 className="subtitle">파티 정보를 변경하세요</h6>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md="12">
            <Form
              className="col"
              id="ModifyForm"
              onSubmit={function (event) {
                event.preventDefault();
                console.log();
                axios
                  .put(`/party/${id}`, {
                    title: event.target.title.value,
                    sportsName: event.target.sportsName.value,
                    intro: event.target.intro.value,
                    info: event.target.info.value,
                    location: event.target.location.value,
                  })
                  .then(function (response) {
                    if (image.image_file != undefined) sendImageToServer(id);
                    else
                      setPopup({
                        open: true,
                        title: "Confirm",
                        message: "파티를 만들었습니다!",
                        callback: function () {
                          document.location.href = "/";
                        },
                      });
                  })
                  .catch(function (error) {
                    //error
                    console.log(error);
                  });
              }}
            >
              <FormGroup className="col-md-6">
                <Label htmlFor="title">파티 이름</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="title"
                  defaultValue={title ? title : partyinfo.title}
                  onChange={onchangeTitle}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="sportsName">활동 선택</Label>
                <Input
                  type="select"
                  name="sportsName"
                  value={sportsName}
                  onChange={onchangeSportsName}
                >
                  <option value={partyinfo.sportsName} selected disabled>
                    종목
                  </option>
                  <option value="SOCCER">축구</option>
                  <option value="FOOTBALL">풋살</option>
                  <option value="VALLEYBALL">배구</option>
                  <option value="BADMINTON">배드민턴</option>
                  <option value="BASKETBALL">농구</option>
                  <option value="PINGPONG">탁구</option>
                </Input>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="location">지역 선택</Label>
                <Input
                  type="select"
                  name="location"
                  value={location}
                  onChange={onchangeLocation}
                >
                  <option value={partyinfo.location} selected disabled>
                    지역선택
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
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="intro">파티 소개글</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="intro"
                  defaultValue={intro ? intro : partyinfo.intro}
                  onChange={onchangeIntro}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="info">파티 정보글</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="info"
                  defaultValue={info ? info : partyinfo.info}
                  onChange={onchangeInfo}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="image">파티 이미지 변경</Label>
                <div className="uploader-wrapper">
                  <div className="upload-button">
                    <Button
                      className="btn btn-success waves-effect waves-light m-r-10"
                      onClick={() => inputRef.click()}
                    >
                      이미지 가져오기
                    </Button>
                    <Button
                      className="btn btn-success waves-effect waves-light m-r-10"
                      onClick={deleteImage}
                      danger
                    >
                      이미지 제거
                    </Button>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={saveImage}
                    ref={(refParam) => (inputRef = refParam)}
                    style={{ display: "none" }}
                  />
                  <div className="img-wrapper">
                    {loaded === false || loaded === true ? (
                      <img src={image.preview_URL} />
                    ) : (
                      <Spin className="img-spinner" tip="이미지 불러오는중" />
                    )}
                  </div>
                </div>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Button
                  type="submit"
                  className="btn btn-success waves-effect waves-light m-r-10"
                >
                  수정
                </Button>
                <Link href={`/party/${id}/info`}>
                  <Button
                    type="reset"
                    className="btn btn-inverse waves-effect waves-light"
                  >
                    취소
                  </Button>
                </Link>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PartyModifyForm;
