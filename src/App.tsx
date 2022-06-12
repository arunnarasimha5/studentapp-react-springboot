import "./App.css";
import {
  LoginCredentailsType,
  LoginSignUpPage,
  noWarningObj,
} from "./Components/LoginSignUpPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BackendResponse,
  SignUpAndUpdatePage,
  SignUpCredentails,
} from "./Components/SignUpPage";
import { DataPost } from "./Components/AxiosFuctions";
import { useState } from "react";
import { CommonWarningPopup } from "./Components/WarningPopup";
import { StudentDetailsDisplayPage } from "./Components/StudentDetailsDisplayPage";

function App() {
  let navigate = useNavigate();

  const [showWarning, setShowWaring] = useState(noWarningObj);
  const [studentDeatils, setStudentDeatils] = useState<BackendResponse>();
  const loginClickHandler = async (e: LoginCredentailsType) => {
    setShowWaring(noWarningObj);
    const reply: BackendResponse = await DataPost(
      "http://localhost:8080/login",
      e
    );
    if (reply.error !== null) {
      setShowWaring({ showWarning: true, warningMsg: reply.error as string });
    } else {
      setStudentDeatils(reply);
      navigate("/student-deatils");
    }
  };

  const signUpClickHandler = async (
    e: SignUpCredentails | BackendResponse,
    isSignUp: boolean
  ) => {
    setShowWaring(noWarningObj);
    console.log("here");
    const reply: boolean = await DataPost(
      `http://localhost:8080/${isSignUp ? "signup" : "update"}`,
      isSignUp ? (e as SignUpCredentails) : (e as BackendResponse)
    );

    if (reply) {
      setShowWaring({
        showWarning: true,
        warningMsg: isSignUp
          ? "Account Created. Please Sign In"
          : "Account Updated",
      });
      navigate("/");
    } else {
      setShowWaring({
        showWarning: true,
        warningMsg: "Username already exists. Please choose another one.",
      });
    }
  };

  const deleteButtonHandler = async () => {
    setShowWaring({
      showWarning: true,
      warningMsg: "This Action Will Delete Your Record !!",
    });
    const reply = await DataPost(
      "http://localhost:8080/delete",
      studentDeatils as BackendResponse
    );
    console.log(reply);
    setStudentDeatils(undefined);
    navigate("/");
  };

  return (
    <>
      {" "}
      <Routes>
        <Route
          path="/"
          element={
            <LoginSignUpPage loginButtonOnClick={(e) => loginClickHandler(e)} />
          }
        />
        <Route
          path="/sign-up"
          element={
            <SignUpAndUpdatePage
              signUpButtonClick={(e) =>
                signUpClickHandler(e as SignUpCredentails, true)
              }
              isSignUp
            />
          }
        />
        <Route
          path="/student-deatils"
          element={
            <StudentDetailsDisplayPage
              deatailsData={studentDeatils}
              deleteButtonClick={deleteButtonHandler}
              updateButtonClick={() => navigate("/update-details")}
              signOutOnClick={() => {
                setStudentDeatils(undefined);
                navigate("/");
              }}
            />
          }
        />
        <Route
          path="/update-details"
          element={
            <SignUpAndUpdatePage
              signUpButtonClick={(e) =>
                signUpClickHandler(e as BackendResponse, false)
              }
              isSignUp={false}
              studentDeatils={studentDeatils}
            />
          }
        />
      </Routes>
      <CommonWarningPopup
        showWarning={showWarning.showWarning}
        warningTitle="Attention !"
        warningMessage={showWarning.warningMsg}
        onCloseWarning={() => setShowWaring(noWarningObj)}
        onOkClick={() => {
          setShowWaring(noWarningObj);
        }}
      />
    </>
  );
}

export default App;
