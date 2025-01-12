import { useState } from "react";
import { Button, Image, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import QplGrey from "../../../../assets/images/img/QplGrey.png";
import LoginLogo from "../../../../assets/images/img/LoginLogo.png";
import { resetFilters } from "../../../../redux/filters";
import { ROUTES } from "../../../../utils/constants";
import dashboard from "../../../../assets/images/img/dashboard-sidebar.png";
import userManagement from "../../../../assets/images/img/user-management.png";
import CreateExam from "../../../../assets/images/img/CreateExam.png";
import pointManagement from "../../../../assets/images/img/point-management.png";
import CreatePaper from "../../../../assets/images/img/CreatePaper.png";
// import settingIcon from '../../../../assets/images/icons/setting-icon.svg'
import settingIcon from "../../../../assets/images/img/setting-icon.png";
import "./LeftSidebar.scss";

const LeftSidebar = ({ name, ...props }) => {
  const dispatch = useDispatch();

  // Local States
  const [Active, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const [active] = useState(false);

  // Redux States
  const { role } = useSelector((state) => state.user);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Headerdata = [
    // {
    //   home_icon: dashboard,
    //   title: "Dashboard",
    //   to: ROUTES.DASHBOARD,
    // },
    {
      home_icon: userManagement,
      title: "Exam",
      to: ROUTES.EXAM_MANAGEMENT,
    },
    {
      home_icon: pointManagement,
      title: "Question Paper",
      to: ROUTES.QUEST_PAPER,
    },
    {
      home_icon: CreateExam,
      title: "Create Exam",
      to: ROUTES.CREATE_EXAM,
    },
    {
      home_icon: CreatePaper,
      title: "Create Question Paper",
      to: ROUTES.CREATE_PAPER,
    },
  ];

  return (
    <>
      <div className={`Admin_leftside_layout`}>
        <div className="header_logo">
          <Link className="d-block text-center">
            <Image
              alt="logo"
              src={QplGrey}
              fluid
              style={{
                width: 100,
                height: "80px",
                objectFit: "cover",
              }}
            />
          </Link>
        </div>

        <div className="header_links">
          <ul>
            {Headerdata.map((data, index) => {
              return (
                true && (
                  <li key={index}>
                    <NavLink
                      to={data.to}
                      onClick={() => dispatch(resetFilters())}
                    >
                      <img src={data.home_icon} alt="home_title" />
                      {data.title}
                    </NavLink>
                  </li>
                )
              );
            })}
            {/* <div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => (
                  <Form className="admin_form">
                    <FormikControls
                      defaultText={defaultSelectText}
                      optionsList={countryList}
                      control="select"
                      type="text"
                      formik={formik}
                      name="documentType"
                      variant="sidebar_select"
                    />
                  </Form>
                )}
              </Formik>
            </div> */}
          </ul>
          {/* </PerfectScrollbar> */}
        </div>
      </div>

      {/* --------------------Responsive------------------------ */}
      {/* <button
        className={`toggleBtn ${active ? "active" : ""}`}
        onClick={() => setActive(!active)}
      >
        <span className="menu-line"></span>
        <span className="menu-line"></span>
        <span className="menu-line"></span>
      </button> */}
      <Button className={`toggleBtn`} onClick={show ? handleClose : handleShow}>
        <div className={`menu_btn ${show ? "close_menu" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Button>

      <Offcanvas
        className="Admin_leftside_layout "
        style={{ width: "250px" }}
        show={show}
        onHide={handleClose}
        responsive="lg"
      >
        <Offcanvas.Header closeVariant="white">
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ padding: "0", overflow: "unset" }}>
          <Link to="/" className="d-block text-center sidebar_logo">
            <Image
              alt="logo"
              src={LoginLogo}
              fluid
              style={{ width: 100, height: "80px", objectFit: "cover" }}
            />
          </Link>
          <div className="header_links">
            {/* <PerfectScrollbar> */}
            <ul>
              {Headerdata.map((data, index) => {
                return (
                  true && (
                    <li key={index}>
                      <NavLink to={data.to} end onClick={() => setShow(false)}>
                        <img src={data.home_icon} alt="home_title" />
                        {data.title}
                      </NavLink>
                    </li>
                  )
                );
              })}
              {/* <div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => (
                  <Form className="admin_form">
                    <FormikControls
                      defaultText={defaultSelectText}
                      optionsList={countryList}
                      control="select"
                      type="text"
                      formik={formik}
                      name="documentType"
                      variant="sidebar_select"
                    />
                  </Form>
                )}
              </Formik>
            </div> */}
            </ul>
            {/* </PerfectScrollbar> */}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default LeftSidebar;
