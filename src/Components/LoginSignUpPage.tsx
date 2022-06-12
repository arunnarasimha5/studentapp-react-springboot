import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonWarningPopup } from "./WarningPopup";

export type LoginCredentailsType = {
  userName: string;
  password: string;
};

type LoginSignUpPageProps = {
  loginButtonOnClick: (loginData: LoginCredentailsType) => void;
};

export const noWarningObj = {
  showWarning: false,
  warningMsg: "",
};

export const LoginSignUpPage: FC<LoginSignUpPageProps> = ({
  loginButtonOnClick,
}) => {
  let navigate = useNavigate();

  const [usrNme, setUsrNme] = useState("");
  const [pass, setPass] = useState("");
  const [showWarning, setShowWaring] = useState(noWarningObj);
  const loginButtonClickHandler = () => {
    if (usrNme.length && pass.length) {
      loginButtonOnClick({ userName: usrNme, password: pass });
    } else {
      setShowWaring({
        showWarning: true,
        warningMsg: "All Fields Are Mandatory",
      });
    }
  };
  return (
    <div className="Auth-form-content">
      <h3 className="Auth-form-title">Student Sign In</h3>
      <div className="form-group mt-3">
        <label>Username</label>
        <input
          type="email"
          className="form-control mt-1"
          placeholder="Enter username"
          required
          onChange={(e) => setUsrNme(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control mt-1"
          placeholder="Enter password"
          required
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <div className="d-grid gap-2 mt-3">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={loginButtonClickHandler}
        >
          Log In
        </button>
      </div>
      <button
        className="btn btn-secondary m-3"
        onClick={() => navigate("/sign-up")}
      >
        New User ? Sign Up
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
