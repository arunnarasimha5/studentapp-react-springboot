import { FC } from "react";
import { BackendResponse } from "./SignUpPage";

type StudentDetailsDisplayPageProps = {
  deatailsData?: BackendResponse;
  deleteButtonClick: () => void;
  updateButtonClick: () => void;
  signOutOnClick: () => void;
};

export const StudentDetailsDisplayPage: FC<StudentDetailsDisplayPageProps> = ({
  deatailsData,
  deleteButtonClick,
  updateButtonClick,
  signOutOnClick,
}) => (
  <div className="Auth-form-content">
    <h3 className="Auth-form-title">Welcome</h3>
    <div className="form-group mt-3">
      <label>Full Name : {deatailsData?.fullName}</label>
    </div>
    <div className="form-group mt-3">
      <label>User Name : {deatailsData?.userName} </label>
    </div>
    <div className="form-group mt-3">
      <label>Roll No : {deatailsData?.id}</label>
    </div>
    <div className="form-group mt-3">
      <label>Department : {deatailsData?.department}</label>
    </div>
    <div className="form-group mt-3">
      <label>Email : {deatailsData?.email}</label>
    </div>

    <nav className="footer-section m-3">
      <div className="section-1 my-3">
        {" "}
        <button
          className="btn btn-secondary btn-sm"
          onClick={deleteButtonClick}
        >
          Delete
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={updateButtonClick}
        >
          Update
        </button>
      </div>

      <button className="btn btn-primary btn-sm" onClick={signOutOnClick}>
        Sign Out
      </button>
    </nav>
  </div>
);
