import { FC, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { noWarningObj } from "./LoginSignUpPage";
import { CommonWarningPopup } from "./WarningPopup";

export type BackendResponse = {
  id: number;
  fullName: string;
  userName: string;
  password: string;
  department: string;
  email: string;
  error?: string;
};

export type SignUpCredentails = {
  fullName: string;
  userName: string;
  password: string;
  department: string;
  email: string;
};

type SignUpPageProps = {
  signUpButtonClick: (signUpdata: BackendResponse | SignUpCredentails) => void;
  isSignUp: boolean;
  studentDeatils?: BackendResponse;
};

export const SignUpAndUpdatePage: FC<SignUpPageProps> = ({
  signUpButtonClick,
  isSignUp,
  studentDeatils,
}) => {
  let navigate = useNavigate();
  const [fullName, setFullName] = useState(
    isSignUp ? "" : (studentDeatils?.fullName as string)
  );
  const [usrNme, setUsrNme] = useState("");
  const [pass, setPass] = useState(
    isSignUp ? "" : (studentDeatils?.password as string)
  );
  const [email, setEmail] = useState(
    isSignUp ? "" : (studentDeatils?.email as string)
  );
  const [department, setDeaprtment] = useState(
    isSignUp ? "Select Department" : (studentDeatils?.department as string)
  );
  const [showWarning, setShowWaring] = useState(noWarningObj);
  const handleSignUp = () => {
    if (
      (usrNme.length || !isSignUp) &&
      pass.length &&
      fullName.length &&
      email.length &&
      department !== "Select Department"
    ) {
      isSignUp
        ? signUpButtonClick({
            userName: usrNme,
            password: pass,
            fullName,
            department,
            email: email as string,
          })
        : signUpButtonClick({
            userName: studentDeatils?.userName as string,
            password: pass,
            fullName,
            id: studentDeatils?.id,
            department,
            email: email as string,
          });
    } else {
      setShowWaring({
        showWarning: true,
        warningMsg: "All Fields Are Mandatory Or Enter a Valid Mobile Number",
      });
    }
  };

  return (
    <div className="Auth-form-content">
      <h3 className="Auth-form-title">
        {isSignUp ? "Student Sign Up" : "Student Details Update"}
      </h3>
      {!isSignUp && (
        <h6 className="Auth-form-title">
          Please Note That UserName Cannot Be Changed
        </h6>
      )}
      <div className="form-group mt-3">
        <label>Full Name</label>
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Enter Full Name"
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        />
      </div>
      {isSignUp && (
        <div className="form-group mt-3">
          <label>User Name</label>
          <input
            type="text"
            className="form-control mt-1"
            placeholder="Enter username"
            required
            onChange={(e) => setUsrNme(e.target.value)}
            value={usrNme}
          />
        </div>
      )}
      <div className="form-group mt-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control mt-1"
          placeholder="Enter password"
          required
          onChange={(e) => setPass(e.target.value)}
          value={pass}
        />
      </div>
      <div className="form-group mt-3">
        <label>Email</label>
        <input
          type="tel"
          className="form-control mt-1"
          placeholder="Enter Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="form-group mt-3">
        <label>Select Department</label>
        <DropdownButton
          title={department}
          id="dropdown-split-variants-info"
          variant="info"
          onSelect={(e) => setDeaprtment(e as string)}
          className="department-dropdown"
        >
          <Dropdown.Item eventKey="Science">Science</Dropdown.Item>
          <Dropdown.Item eventKey="Commerce">Commerce</Dropdown.Item>
          <Dropdown.Item eventKey="IT">IT</Dropdown.Item>
          <Dropdown.Item eventKey="Arts">Arts</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="d-grid gap-2 mt-3">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSignUp}
        >
          {isSignUp ? "Sign Up" : "Update"}
        </button>
      </div>

      <button
        className="btn btn-secondary m-3"
        onClick={() =>
          isSignUp ? navigate("/") : navigate("/student-deatils")
        }
      >
        {isSignUp ? "Already User ? Sign In" : " Back"}
      </button>

      <CommonWarningPopup
        showWarning={showWarning.showWarning}
        warningTitle="Attention !"
        warningMessage={showWarning.warningMsg}
        onCloseWarning={() => setShowWaring(noWarningObj)}
        onOkClick={() => {
          setShowWaring(noWarningObj);
        }}
      />
    </div>
  );
};
