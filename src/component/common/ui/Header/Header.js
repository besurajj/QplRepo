import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import itemIcon from "../../../../assets/images/icons/profile-icon.svg";
import Customdropdown from "../Customdropdown/Customdropdown";
import "./Header.scss";
import { Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import QplGrey from "../../../../assets/images/img/QplGrey.png";
import useLogout from "../../../../customHooks/useLogout";
import { ROUTES } from "../../../../utils/constants";
import { checkUndefiendValue, titleCase } from "../../../../utils/utils";
import LogoutIcon from "../../../../assets/images/icons/log-out.svg";
const Header = () => {
  const { pathname } = useLocation();
  const [logout] = useLogout();
  let navigate = useNavigate();

  const amountoptions = [
    // {
    //   value: "profile-setting",
    //   label: "Profile Setting",
    //   itemIcon: itemIcon,
    // },
    {
      value: "logout",
      label: "Logout",
      itemIcon: LogoutIcon,
    },
  ];
  const titles = [
    // { route: [ROUTES.DASHBOARD], title: "Dashboard" },
    { route: [ROUTES.EXAM_MANAGEMENT], title: "Exam's" },
    { route: [ROUTES.QUEST_PAPER], title: "Question Paper's" },
    { route: [ROUTES.CREATE_EXAM], title: "Create Exam" },
    { route: [ROUTES.CREATE_PAPER], title: "Create Paper" },
  ];

  const headerTitle = useMemo(() => {
    let title;
    titles.forEach((item) => {
      if (pathname.includes(item.route)) {
        title = item.title;
      }
    });
    return title;
  }, [pathname]);
  const dropdownItemClickHandler = (menu) => {
    switch (menu) {
      case "profile-setting":
        navigate(ROUTES.PROFILE_SETTING);
        break;
      case "logout":
        logout();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div className="top_header">
      <div className="header_logo">
        <Link>
          <Image
            alt="logo"
            src={QplGrey}
            className="img-logo"
            style={{
              width: 80,
              height: "60px",
              objectFit: "cover",
              backgroundColor: "grey",
            }}
          />
        </Link>
      </div>
      <div className="header_right">
        <div className="heading">{headerTitle}</div>
        <div className="header_right_links">
          <Customdropdown
            toggleInfo={{
              toggleTitle: titleCase(
                checkUndefiendValue("Raging Bull Admin", "--")
              ),
            }}
            dropdownItems={amountoptions}
            dropdownItemInfo={{
              itemIcon: itemIcon,
              itemClickHandler: dropdownItemClickHandler,
            }}
            className="header_dropdown"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
