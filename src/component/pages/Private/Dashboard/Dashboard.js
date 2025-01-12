import React, { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./Dashboard.scss";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { API_URLS, ROUTES } from "../../../../utils/constants";
import { apiCallGet } from "../../../../axios/axios";
import dashboardCard from "../../../../assets/images/img/dashboard-card.png";
import CustomPlaceholder from "../../../common/ui/CustomPlaceholder/CustomPlaceholder";

const Dashboard = () => {
  const [counts, setCounts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const DASHBOARD_DATA = useMemo(
    () => [
      {
        icon: dashboardCard,
        title: "Total User",
        label: "Total User",
        to: ROUTES.EXAM_MANAGEMENT,
        count: counts?.userDetailsCount.totalUsers ?? 0,
      },
      {
        icon: dashboardCard,
        label: "Completed User",
        title: "ACTIVE",
        to: ROUTES.EXAM_MANAGEMENT,
        count: counts?.userDetailsCount.completedUser ?? 0,
      },

      {
        icon: dashboardCard,
        label: "Onboarded User",
        title: "INACTIVE",
        to: ROUTES.EXAM_MANAGEMENT,
        count: counts?.userDetailsCount.onboardedUser ?? 0,
      },
      {
        icon: dashboardCard,
        label: "Total Topic ",
        title: "recent",
        to: ROUTES.QUEST_PAPER,
        count: counts?.userDetailsCount?.totalTopic ?? 0,
      },
      // {
      //   icon: dashboardCard,
      //   label: "Daily Active User",
      //   title: "daily",
      //   to: ROUTES.USER_MANAGEMENT,
      //   count: counts?.userDetailsCount?.dailyActiveUsers ?? 0
      // },
      // {
      //   icon: dashboardCard,
      //   label: "Weekly Active User",
      //   title: "weekly",
      //   to: ROUTES.USER_MANAGEMENT,
      //   count: counts?.userDetailsCount?.weeklyActiveUsers ?? 0
      // },
      // {
      //   icon: dashboardCard,
      //   label: "Monthly Active User",
      //   title: "monthly",
      //   to: ROUTES.USER_MANAGEMENT,
      //   count: counts?.userDetailsCount?.monthlyActiveUsers ?? 0
      // },
      // {
      //   icon: dashboardCard,
      //   label: "Online User",
      //   title: "online",
      //   to: ROUTES.USER_MANAGEMENT,
      //   count: counts?.userDetailsCount?.onlineUsers ?? 0
      // },
    ],
    [counts]
  );

  // const getCounts = async () => {
  //   setIsLoading(true);
  //   try {
  //     let res = await apiCallGet(API_URLS.DASHBOARD, {}, false, true);
  //     if (!res?.error) {
  //       setCounts(res?.data);
  //     } else {
  //       throw new Error("Couldn't get counts!");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getCounts();
  // }, []);

  const handleBoxClick = (route, title) => {
    navigate(route, { state: { selectedOption: title } });
  };
  return (
    <div className="Admin_dashboard">
      <div className="dashboard_data">
        <Row>
          {DASHBOARD_DATA?.map((item, index) => (
            <Col sm={6} md={6} xxl={4} className="d-flex" key={index}>
              <div
                className="w-100 h-100 dashbord_box"
                onClick={() => handleBoxClick(item.to, item.title)}
              >
                <img src={item.icon} alt="user-icon" />
                <div>
                  <p>{item?.label}</p>
                  <h3>
                    {isLoading ? <CustomPlaceholder size={4} /> : item?.count}
                  </h3>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
