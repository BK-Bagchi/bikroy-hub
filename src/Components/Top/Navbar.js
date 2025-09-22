import { useHistory } from "react-router-dom";
import useAuth from "../../Hooks/JWTDecode";

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const history = useHistory();

  return (
    <>
      <section className="top">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container d-flex align-items-center">
            <div className="d-flex justify-content-center" id="navbarText">
              <img
                className="logo-small"
                src={require(`../../Resources/images/Bikroy_hub_white_bg.PNG`)}
                alt="bikroyhub logo"
                onClick={() => {
                  history.push("/");
                }}
              />
            </div>
            <div className="d-flex justify-content-center" id="navbarText">
              {isLoggedIn ? (
                <img
                  className="myAccountLoginBtn"
                  src={
                    user.photoURL ||
                    require("../../Resources/images/Default_DP.png")
                  }
                  alt="Profile at navbar"
                  onClick={() => {
                    history.push("/myAccount");
                  }}
                />
              ) : (
                <button
                  className="login"
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </nav>
      </section>
      <section className="middle">
        <div className="name d-flex align-items-center justify-content-center flex-column">
          <p>Bikroy Hub</p>
          <div className="slogan d-flex mb-2">
            <p>Buy </p>
            <p>and </p>
            <p>Sell </p>
            <p>Quickly</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
