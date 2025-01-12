import { Image } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import logo from "../../../../assets/images/img/LoginLogo.png";
import women from "../../../../assets/images/img/women2.png";
import { CloseIcon } from "../../../../assets/images/svg/SvgIcon";
import { CommonBtn } from "../../ui";
import "./AuthLayout.scss";

const AuthLayout = ({
  isForgot,
  isLogin,
  children,
  mainImg,
  alt,
  title,
  text,
  className,
  isButton,
  isOtherMethodHide,
  bottomText,
}) => {
  return (
    <main
      className={`auth-layout before-logIn ${className}`}
      style={{ padding: 0 }}
    >
      {isButton === true ? (
        ""
      ) : (
        <CommonBtn
          role="link"
          to="/"
          iconBefore={<CloseIcon />}
          className="auth-layout__closeBtn icon border-0"
        />
      )}
      <div className="LogIn-Outer">
        {/* <h2 className="containerbackground">
          Antier <br />
          <span>Solutions</span>
        </h2> */}
        <Container>
          <div className="Log-in-page">
            <Row className="align-items-center">
              <Col lg={12}>
                <div className="card-login">
                  <div className="auth-card">
                    {isLogin === true ? (
                      <h1
                        className="loginPage__right__heading"
                      >
                        <Image
                          src={logo}
                          alt="Logo"
                          style={{
                            height: "200px",
                            width: "200px",
                            objectFit: "contain",

                          }}
                        />
                      </h1>
                    ) : (
                      ""
                    )}
                    {isForgot === true ? (
                      <h1 className="loginPage__right__heading">
                        Forgot Password
                      </h1>
                    ) : (
                      ""
                    )}
                    {children}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </main>
  );
};

export default AuthLayout;
