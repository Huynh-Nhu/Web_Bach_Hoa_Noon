import styles from "../setPassword/setPassword.css";
function SetPasswordForm(props) {
  const handleEmailSet = (e) => {
    const emailStaff = e.target.value;
    props.handleEmailChange(emailStaff);
  };
  const handlePassword = (e) => {
    const passwordOld = e.target.value;
    props.handlePasswordOldChange(passwordOld);
  };
  const handleNewPassword = (e) => {
    const passwordNew = e.target.value;
    props.handlePasswordNewChange(passwordNew);
  };

  return (
    <div className="container">
      <div className="row set-pass">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={props.handleSetPass} className="form-setPass">
            <div className="row mb-3 ">
              <label
                htmlFor="emailSetPass"
                className="col-sm-2 col-form-label "
              >
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  value={props.emailPass}
                  onChange={handleEmailSet}
                  className="form-control"
                  id="emailSetPass"
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="passwordOld" className="col-sm-2 col-form-label">
                Password
              </label>
              <div className="col-sm-10">
                <input
                  value={props.passwordOld}
                  onChange={handlePassword}
                  type="password"
                  className="form-control"
                  id="passwordOld"
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="newPassword" className="col-sm-2 col-form-label">
                New Password
              </label>
              <div className="col-sm-10">
                <input
                  value={props.passwordNew}
                  onChange={handleNewPassword}
                  type="password"
                  className="form-control"
                  id="newPassword"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>
        </div>
      </div>

      
    </div>
  );
}

export default SetPasswordForm;
