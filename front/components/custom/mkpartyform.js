import React from "react";
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
import { Spin } from "antd";
import "antd/dist/antd.css";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Popup from "./popup";
const party = {
  sportsName: "",
  location: "",
  intro: "",
  title: "",
};
const MkpartyForm = (props) => {
  const [popup, setPopup] = useState({
    open: false,
    title: "",
    message: "",
    callback: false,
  });

  const [sportsName, setSportsName] = useState(party.sportsName);
  const [location, setLocation] = useState(party.location);
  const [intro, setIntro] = useState(party.intro);
  const [title, setTitle] = useState(party.title);
  const [image, setImage] = useState({
    image_file: undefined,
    preview_URL: undefined,
  });
  const [loaded, setLoaded] = useState(false);

  const onchangeSportsName = (e) => {
    setSportsName(e.target.value);
  };
  const onchangeLocation = (e) => {
    setLocation(e.target.value);
  };
  const onchangeIntro = (e) => {
    setIntro(e.target.value);
  };
  const onchangeTitle = (e) => {
    setTitle(e.target.value);
  };
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
        message: "????????? ??????????????????!",
        callback: function () {
          document.location.href = "/";
        },
      });
    } else {
      alert("????????? ???????????????!");
    }
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
              <h1 className="title font-bold">?????? ?????????</h1>
              <h6 className="subtitle">
                ????????? ????????? ??????????????? ????????? ???????????????
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md="12">
            <Form
              className="col"
              id="mkpartyForm"
              onSubmit={function (event) {
                event.preventDefault();
                if (
                  event.target.title.value == "" ||
                  event.target.sportsName.value == "" ||
                  event.target.location.value == "" ||
                  event.target.intro.value == ""
                ) {
                  if (event.target.title.value == "")
                    alert("??????????????? ??????????????????.");
                  else if (event.target.sportsName.value == "")
                    alert("????????? ??????????????????");
                  else if (event.target.location.value == "")
                    alert("????????? ??????????????????");
                  else if (event.target.intro.value == "")
                    alert("???????????? ??????????????????.");
                } else {
                  axios
                    .post(
                      "/party/mkparty",
                      {
                        title: event.target.title.value,
                        sportsName: event.target.sportsName.value,
                        intro: event.target.intro.value,
                        info: "?????? ????????? ??????????????????", //???????????? ??????
                        location: event.target.location.value,
                      } /*,formData ????????????*/
                    )
                    .then(function (response) {
                      if (image.image_file != undefined)
                        sendImageToServer(response.data);
                      else
                        setPopup({
                          open: true,
                          title: "Confirm",
                          message: "????????? ??????????????????!",
                          callback: function () {
                            document.location.href = "/";
                          },
                        });
                    })
                    .catch(function (error) {
                      if (error.response.status == 405) {
                        alert("????????? ?????????????????????.");
                      }
                      console.log(error);
                    });
                }
              }}
            >
              <FormGroup className="col-md-6">
                <Label htmlFor="title">?????? ??????</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter party name"
                  value={title}
                  onChange={onchangeTitle}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="sportsName">?????? ??????</Label>
                <Input
                  type="select"
                  name="sportsName"
                  value={sportsName}
                  onChange={onchangeSportsName}
                >
                  <option value="" selected disabled>
                    ?????? ??????
                  </option>
                  <option value="SOCCER">??????</option>
                  <option value="FOOTBALL">??????</option>
                  <option value="VALLEYBALL">??????</option>
                  <option value="BADMINTON">????????????</option>
                  <option value="BASKETBALL">??????</option>
                  <option value="PINGPONG">??????</option>
                </Input>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="location">?????? ??????</Label>
                <Label htmlFor="sportsName">?????? ??????</Label>
                <Input
                  type="select"
                  name="location"
                  value={location}
                  onChange={onchangeLocation}
                >
                  <option value="" selected disabled>
                    ????????????
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
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="intro">?????? ?????????</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="intro"
                  placeholder="???????????? ??????????????????"
                  value={intro}
                  onChange={onchangeIntro}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="image">?????? ????????? ?????????</Label>
                <div className="uploader-wrapper">
                  <div className="upload-button">
                    <Button
                      className="btn btn-success waves-effect waves-light m-r-10"
                      onClick={() => inputRef.click()}
                    >
                      ????????? ????????????
                    </Button>
                    <Button
                      className="btn btn-success waves-effect waves-light m-r-10"
                      onClick={deleteImage}
                      danger
                    >
                      ????????? ??????
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
                      <Spin className="img-spinner" tip="????????? ???????????????" />
                    )}
                  </div>
                </div>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Button
                  type="submit"
                  className="btn btn-success waves-effect waves-light m-r-10"
                >
                  ?????? ?????????
                </Button>
                <Link href={`/party`}>
                  <Button
                    type="reset"
                    className="btn btn-inverse waves-effect waves-light"
                  >
                    ??????
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
export default MkpartyForm;
