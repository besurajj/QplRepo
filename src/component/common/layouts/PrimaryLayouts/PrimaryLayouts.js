import React, { memo, useEffect } from "react";
import "./PrimaryLayouts.scss";
import LeftSidebar from "../../ui/LeftSidebar/LeftSidebar";
import { Header } from "../../ui";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetFilters } from "../../../../redux/filters";

const PrimaryLayouts = ({ className, title }) => {
  return (
    <main className={`primary-layout ${className}`}>
      <div className="primary-layout__left">
        <LeftSidebar />
      </div>
      <div className="primary-layout__right">
        <Header title={title} />
        <div className="primary-layout__right__pages">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default memo(PrimaryLayouts);
