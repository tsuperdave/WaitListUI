/* eslint-disable no-useless-escape */
import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Media,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Row,
  Col,
  FormFeedback,
  Spinner,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { createRef } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { TimePicker } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./passenger.css";
import { T, TF, LanguageList, Config } from "react-translator-component";
import { translate } from "../../language/translations.js";
import dayjs from "dayjs";
import { parsePhoneNumber } from "react-phone-number-input";

const PassengerForm = () => {
  let initialPassengerState = {
    env: "",
    isProd: false,
    loungeCode: "",
    loungeName: "",
    language: "en",
    waitlistEmailLogo: "",
    s3Url: "",
    name: "",
    email: "",
    phoneNumber: "",
    departureTime: "",
    guests: "0",
  };

  let initialLoungeInfo = {
    LoungeName: "",
    LoungeCode: "",
    WaitlistEmailLogo: "",
  };

  let initialErrorsState = {
    error: false,
    errorMsg: "",
    nameErr: false,
    nameErrMsg: "",
    emailErr: false,
    emailErrMsg: "",
    phoneErr: false,
    phoneErrMsg: "",
    guestsErr: false,
    guestsErrMsg: "",
    timeErr: false,
    timeErrMsg: "",
    apiCallErr: false,
    apiCallErrMsg: "",
  };

  // Sets default Language and list for available lang selections
  //Config.default = "en";

  // List of Languages and files for translation text
  Config.list = {
    en: {
      text: "English",
      icon: "./flags/en.svg",
      file: translate.en,
    },
    // ar: {
    //   text: "عربي",
    //   icon: "./flags/ar.svg",
    //   file: translate.ar,
    // },
    // de: {
    //   text: "Deutsch",
    //   icon: "./flags/de.svg",
    //   file: translate.de,
    // },
    es: {
      text: "Español",
      icon: "./flags/es.svg",
      file: translate.es,
    },
    // fr: {
    //   text: "Français",
    //   icon: "./flags/fr.svg",
    //   file: translate.fr,
    // },
    // it: {
    //   text: "Italiano",
    //   icon: "./flags/it.svg",
    //   file: translate.it,
    // },
    pt: {
      text: "Portuguese",
      icon: "./flags/pt.svg",
      file: translate.pt,
    },
    // ru: {
    //   text: "Pусский",
    //   icon: "./flags/ru.svg",
    //   file: translate.ru,
    // },
  };

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [agree, setAgree] = useState(false);
  const [userInfo, setUserInfo] = useState(initialPassengerState);
  const [loungeInfo, setLoungeInfo] = useState(initialLoungeInfo);
  const [img, setImg] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [errors, setErrors] = useState(initialErrorsState);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const pageUrl = window.location.href;

  let isProdEnv = process.env.NODE_ENV === "production" ? true : false;
  let envUrl = "";
  let envArsLms = pageUrl.includes("lms") ? "lms" : "ars";
  let s3Url = process.env.REACT_APP_S3_PREFIX;
  let loungeCode = isProdEnv
    ? pageUrl.substring(pageUrl.lastIndexOf("/") + 1)
    : process.env.REACT_APP_TEST_LOUNGE_CODE;

  //const captchaRef = createRef();

  // Event handler to call the verification on form submit
  const handleReCaptchaVerify = useCallback(
    (e) => {
      e.preventDefault();
      if (!executeRecaptcha) {
        return;
      }

      const token = executeRecaptcha("checkRecaptcha").then((token) => {
        axios({
          method: "post",
          url: "https://www.google.com/recaptcha/api/siteverify",
          body: `secret=${process.env.REACT_APP_GCAPTCHA_SECRET}&response=${token}`,
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.score > 0.5) {
              // Save data to the database from here
              res.status(200).json({
                status: "success",
                message: "Enquiry submitted successfully",
              });
            } else {
              res.status(200).json({
                status: "failure",
                message: "Google ReCaptcha Failure",
              });
            }
          });
      });
    },
    [executeRecaptcha]
  );

  // fetch image logo and set to var on component load if one does not already exist
  // sets ENV and Lounge Logo from URL
  // prevents page reload after first render
  useEffect(() => {
    setUserInfo({ ...userInfo, env: envArsLms, loungeCode: loungeCode });
    if (!img) FetchLoungeInfo();
  }, []);

  // build ENV url based on URL when loading. Defaults to ARS
  const createEnvUrl = () => {
    let newUrl = "";

    if (isProdEnv) {
      if (!pageUrl.includes("qa")) {
        newUrl = pageUrl.includes("aldpos")
          ? process.env.REACT_APP_ALDPOS_API_PROD
          : process.env.REACT_APP_LMS_API_PROD;
      } else {
        newUrl = pageUrl.includes("aldpos")
          ? process.env.REACT_APP_ALDPOS_API_DEV
          : process.env.REACT_APP_LMS_API_DEV;
      }
    } else {
      newUrl = process.env.REACT_APP_API_LOCAL_URL;
    }
    return newUrl;
  };
  envUrl = createEnvUrl();

  // creates s3 URL for Logo Image
  const createS3Url = () => {
    if (isProdEnv) {
      s3Url += pageUrl.includes("lms")
        ? process.env.REACT_APP_LMS_S3_BUCKET
        : process.env.REACT_APP_ALDPOS_S3_BUCKET;
    } else {
      s3Url += pageUrl.includes("lms")
        ? process.env.REACT_APP_LMS_S3_BUCKET
        : process.env.REACT_APP_ALDPOS_S3_BUCKET;
    }

    return s3Url;
  };
  s3Url = createS3Url();

  // Make API call to get Lounge Logo file name
  // build up S3 Bucket string depending on ENV/LoungeCode
  // set the obj url to Img component on render.
  const FetchLoungeInfo = () => {
    let tempImgUrl = s3Url + process.env.REACT_APP_S3_BUCKET_IMAGES;
    axios({
      method: "post",
      url: envUrl + "getLoungeInfo",
      data: {
        env: envArsLms,
        code: loungeCode,
        isProd: pageUrl.includes("qa") ? false : true
      },
    })
      .then((res) => {
        setLoungeInfo({
          ...loungeInfo,
          LoungeName: res.data.LoungeName,
          LoungeCode: res.data.LoungeCode,
          WaitlistEmailLogo: res.data.WaitlistEmailLogo,
        });
        tempImgUrl += res.data.WaitlistEmailLogo;
        setImgUrl(tempImgUrl);
        setUserInfo({
          ...userInfo,
          loungeCode: res.data.LoungeCode,
          env: envArsLms,
          isProd: pageUrl.includes("qa") ? false : true,
          loungeName: res.data.LoungeName,
          waitlistEmailLogo: res.data.WaitlistEmailLogo,
          s3Url: (s3Url += process.env.REACT_APP_S3_BUCKET_EMAIL),
        });
        if (!res.data.WaitlistEmailLogo == undefined) {
          setImg(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          setErrors({
            ...errors,
            apiCallErr: true,
            apiCallErrMsg: err.response.data,
          });
          //setErrors({...errors, apiCallErr: true, apiCallErrMsg: err.response.data.status})
        } else if (err.request) {
          setErrors({ ...errors, apiCallErr: true, apiCallErrMsg: err.req });
        } else {
          setErrors({ ...errors, apiCallErr: true, apiCallErrMsg: err });
        }
      });
  };

  // Grab User info Object and make Post request to API
  // clear form on success
  // Show modal on success
  // reset userinfo Object
  const AddUserToWaitlist = (userInfo) => {
    setLoading(true);
    axios({
      method: "post",
      url: envUrl + "addToWaitlist",
      data: {
        ...userInfo,
      },
    })
      .then((res) => {
        setLoading(false);
        if (res.data.statusCode !== 200) {
          setErrors({
            ...errors,
            apiCallErr: true,
            apiCallErrMsg: res.data.body || res.data.errorMessage,
          });
        } else if (res.status !== 200) {
          setErrors({
            ...errors,
            apiCallErr: true,
            apiCallErrMsg: res.statusText,
          });
        } else {
          toggleModal();         
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          setErrors({
            ...errors,
            apiCallErr: true,
            apiCallErrMsg: err.response.data,
          });
        } else if (err.request) {
          setErrors({
            ...errors,
            apiCallErr: true,
            apiCallErrMsg: err.request,
          });
        } else {
          setErrors({ ...errors, apiCallErr: true, apiCallErrMsg: err });
        }
      });
  };

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(initialErrorsState);
  
    //handleReCaptchaVerify()
    //const captchaVal = captchaRef.current.getValue();   
    try {
      AddUserToWaitlist(userInfo);    
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setErrors({
          ...errors,
          apiCallErr: true,
          apiCallErrMsg: err.response.data,
        });
      } else if (err.request) {
        setErrors({ ...errors, apiCallErr: true, apiCallErrMsg: err.request });
      } else {
        setErrors({ ...errors, apiCallErr: true, apiCallErrMsg: err });
      }
    }
  };

  // handles form input
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });

    if (e.target.name === "name" && e.target.value.length <= 2) {
      setErrors({
        ...errors,
        nameErr: true,
        nameErrMsg: T("Length must be greater than 2 characers."),
      });
      return;
    } else if (
      e.target.name === "email" &&
      (e.target.value === "" ||
        e.target.value === undefined ||
        e.target.value.length <= 2 ||
        !e.target.value.match(
          new RegExp(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ))
    ) {
      setErrors({
        ...errors,
        emailErr: true,
        emailErrMsg: T("Must enter a valid email address."),
      });
      return;
    } else if (
      e.target.name === "guests" &&
      (e.target.value < 0 || e.target.value > 9)
    ) {
      setErrors({
        ...errors,
        guestsErr: true,
        guestsErrMsg: T("Email incorrect format."),
      });
      return;
    } else if (
      e.target.name === "departureTime" &&
      (e.target.value === "" || e.target.value === undefined)
    ) {
      setErrors({
        ...errors,
        timeErr: true,
        timeErrMsg: T("Please enter a departure time."),
      });
      return;
    } else {
      setErrors(initialErrorsState);
    }
  };

  // hides/shows modal on click/toggle
  // reset passenger info after toggle to preserve state to modal message/translation
  // if modal is active after submission, upon closing will clear the form but retain the ENV inputs/url
  const toggleModal = () => {
    setModal(!modal);
    setLoading(false);
    modal && setUserInfo({ ...userInfo, name: "", email: "", phoneNumber: "1", guests: "0", departureTime: dayjs(new Date()).format("h:mm A") });
  };

  return (
    <>
      {img ? <h1>{TF("Welcome to") + ` ${loungeInfo.LoungeName}!`}</h1> : <h1>Lounge Not Found. Please check QR Code/URL</h1>}
      <Media id="loungeLogo">
        <img src={imgUrl} alt="" />
      </Media>
      <Form id="passengerForm" inline="true" onSubmit={handleSubmit}>
        <FormGroup floating>
          <Input
            invalid={errors.nameErr}
            id="name"
            name="name"
            placeholder="Passenger Name"
            type="text"
            value={userInfo.name}
            onChange={handleChange}
          />
          <Label for="text">{T("Passenger Name")}</Label>
          <FormFeedback>
            {T(
              "Please enter your name. Length must be greater than 2 characers"
            )}
          </FormFeedback>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            invalid={errors.emailErr}
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            value={userInfo.email}
            onChange={handleChange}
          />
          <Label for="email">{T("Email")}</Label>
          <FormFeedback>
            {T("Please enter a valid email address.")}
          </FormFeedback>
        </FormGroup>{" "}
        <FormGroup>
          <PhoneInput
            // isValid={!errors.phoneErr}
            class="phone"
            id="phone"
            name="phoneNumber"
            autoFormat="true"
            country={"us"}
            value={userInfo.phoneNumber}
            onChange={(value, country, e) => {
              setUserInfo({ ...userInfo, phoneNumber: value });
            }}
          />
        </FormGroup>{" "}
        <Row>
          <Col md={6}>
            <FormGroup floating>
              <Input
                id="guests"
                name="guests"
                placeholder="Guests"
                type="number"
                min={0}
                max={9}
                value={userInfo.guests}
                onChange={handleChange}
              />
              <Label for="text">{T("Guests")}</Label>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup floating>
              <TimePicker
                invalid={errors.timeErr}
                allowClear={true}
                id="departureTime"
                name="departureTime"
                placeholder={T("Departure Time")}
                showNow="false"
                format="h:mm A"
                onChange={(time) => {
                  setUserInfo({
                    ...userInfo,
                    departureTime: time.format("h:mm A"),
                  });
                  setErrors({ ...errors, timeErr: false, timeErrMsg: "" });
                }}
              />
              <FormFeedback>{T("Please enter a departure time.")}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>{" "}
        <FormGroup check>
          <Input
            id="checkbox"
            type="checkbox"
            onChange={(e) => setAgree(e.target.checked)}
          />
          <Label check>
            {T(
              "Click here to agree to receive email/SMS alerts from Collinson services regarding Wait list updates"
            )}
          </Label>
        </FormGroup>
        {loading ? (
          <Button id="spinnerBtn" color="primary" disabled>
            <Spinner id="submitSpinner" size="sm" />
            <span>
              {" "}
              {TF("...joining") + ` ${loungeInfo.LoungeName} ` + T("wait list")}
            </span>
          </Button>
        ) : (
          <Button disabled={!agree}>
            <FontAwesomeIcon
              id="submitIcon"
              icon={faArrowRightToBracket}
            ></FontAwesomeIcon>
            {T("Join Wait List")}
          </Button>
        )}
        <Row>
          <Col md={12}>
            {errors.error || errors.apiCallErr ? (
              <Alert id="alert" color="danger" fade={true}>
                {T(errors.errorMsg || errors.apiCallErrMsg)}
              </Alert>
            ) : null}
          </Col>
        </Row>
      </Form>
      {!errors.error && (
        <Modal
          id="modal"
          isOpen={modal}
          toggle={toggleModal}
          centered
          size="lg"
        >
          <ModalHeader toggle={toggleModal}>
            {TF("Thank you") + ` ${userInfo.name}!`}
          </ModalHeader>
          <ModalBody>
            {TF("You have been successfully added to the") +
              ` ${loungeInfo.LoungeName} ` +
              T("wait list! ") +
              T(
                "We will send you an email and/or SMS once space is available."
              )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleModal}>
              {T("Ok")}
            </Button>{" "}
          </ModalFooter>
        </Modal>
      )}
      <div className="languageList">
        <LanguageList Language={userInfo.language} />
        <select
          value={userInfo.language}
          onChange={(e) =>
            setUserInfo({ ...userInfo, language: e.target.value })
          }
        >
          {Object.keys(Config.list).map((key) => (
            <option key={key} value={key}>
              {Config.list[key].text}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default PassengerForm;
