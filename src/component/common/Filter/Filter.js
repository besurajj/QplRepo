import React, { useCallback, useEffect, useRef } from "react";
import { Form, Formik, useFormik, useFormikContext } from "formik";
import * as Yup from "yup";
import "./Filter.scss";
import { CommonBtn, FormikControls } from "../ui";
import Customdropdown from "../ui/Customdropdown/Customdropdown";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../../redux/filters";
import { debounce } from "../../../utils/utils";
import { useState } from "react";
import { useMemo } from "react";
import moment from "moment";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import { city } from "../../pages/Private/CreateNFT/nftdata";

const Filter = ({
  isMan,
  isEmail,
  to,
  selectors,
  onClick,
  title,
  isDropdown,
  isStartdate,
  isToDate,
  isButton,
  isSearch,
  page,
  placeholdertext,
  Isdisabled,
  background,
  isSelect,
}) => {
  const initialValues = {
    search: "",
    startDate: "",
    endDate: "",

    mail: "",
    password: "",
    toggle: false,
    status: "All",
  };
  // hooks
  const dispatch = useDispatch();
  // states
  const filters = useSelector((state) => state.filters);
  const [filtered, setFiltered] = useState({});

  // const validationSchema = Yup.object({
  //   mail: Yup.string(),
  //   password: Yup.string(),
  //   check: Yup.string(),
  //   startDate: Yup.string(),
  //   endDate: Yup.string(),
  // });

  const isSpecialChar = (str) => {
    // Regular expression to check for special characters
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return specialCharRegex.test(str);
  };

  const validationSchema = Yup.object({
    search: Yup.string().trim("text should be trimmed"),
    // startDate: Yup.string().required("Please enter a correct start date"),
    // endDate: Yup.string().required("Please enter a correct end date"),
  });
  const onSubmit = (values) => {
    dispatch(setFilters(values));
  };
  const options = [
    {
      to: "#/action-1",
      value: "INR",
      label: "Sell",
    },
    {
      to: "#/action-2",
      value: "INR",
      label: "Buy",
    },
  ];

  const debouncedDispatch = useCallback(
    debounce((values) => dispatch(setFilters(values)), 500),
    []
  );

  const inputOnChangeHandler = (e, formik) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    // if (!isMan === true) {
    //   // Check if isMan is true
    //   if (isSpecialChar(value)) {
    //     // Don't update the formik field if it contains special characters
    //     return;
    //   }
    // }

    setFiltered({ ...filtered, [name]: value });

    debouncedDispatch({ key: name, value: value.trim() });
  };

  const selectClickCallback = (selectedItem, name) => {
    if (name === "country") {
      // setFiltered({ ...filtered, [name]: selectedItem.name, city: "" });
    } else {
      // setFiltered({
      //   ...filtered,
      //   [name]: page == "CreateNFT" ? selectedItem : selectedItem?.name,
      // });
    }
  };
  // useEffect(() => {
  //   filtered && debouncedDispatch(filtered);
  //   return () => {
  //     debouncedDispatch({});
  //   };
  // }, [filtered]);

  return (
    <div className="filter_form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {(formik, handleChange) => {
          return (
            <Form className="admin_form">
              {/* {isDropdown && (
                <div className="filter_dropdown">
                  <p>Sort By</p>
                  <Customdropdown
                    title="Buy"
                    className="buy_dropdown"
                    dropdownItems={options}
                  />
                </div>
              )} */}

              {isEmail && (
                <FormikControls
                  label="Email"
                  placeholder="Search by Email"
                  control="input"
                  type="email"
                  onChange={(e) => inputOnChangeHandler(e, formik)}
                  onBlur={formik.handleBlur}
                  value={filters?.mail}
                  formik={formik}
                  name="mail"
                />
              )}

              {isSearch && (
                <FormikControls
                  label="Search"
                  placeholder={placeholdertext}
                  control="input"
                  type="search"
                  onChange={(e) => inputOnChangeHandler(e, formik)}
                  onBlur={formik.handleBlur}
                  value={formik.values.search}
                  formik={formik}
                  name="search"
                  className="form_search form-control"
                />
              )}
              {isSelect && (
                <div style={{ width: "200px", marginBottom: "10px" }}>
                  <Select
                    // options={city}
                    defaultValue="Select City"
                    onChange={(name) => selectClickCallback(name, "city")}
                    placeholder={placeholdertext}
                  />
                </div>
              )}
              {isStartdate && (
                <FormikControls
                  label="From Date"
                  placeholder="Enter your email"
                  className="form_date form-control"
                  control="input"
                  type="date"
                  onChange={(e) => inputOnChangeHandler(e, formik)}
                  onBlur={formik.handleBlur}
                  value={formik.values.startDate}
                  formik={formik}
                  rightIcon={
                    formik.values.startDate && (
                      <FontAwesomeIcon icon={faXmark} />
                    )
                  }
                  rightIconClick={() => {
                    dispatch(setFilters({ key: "startDate", value: "" }));
                    formik.setFieldValue("startDate", "");
                  }}
                  max={formik.values.endDate || moment().format("YYYY-MM-DD")}
                  name="startDate"
                />
              )}
              {isToDate && (
                <FormikControls
                  label="To Date"
                  placeholder="Enter your email"
                  className="form_date form-control"
                  control="input"
                  type="date"
                  onChange={(e) => inputOnChangeHandler(e, formik)}
                  onBlur={formik.handleBlur}
                  value={formik.values.endDate}
                  rightIcon={
                    formik.values.endDate && <FontAwesomeIcon icon={faXmark} />
                  }
                  rightIconClick={() => {
                    dispatch(setFilters({ key: "endDate", value: "" }));
                    formik.setFieldValue("endDate", "");
                  }}
                  formik={formik}
                  min={formik.values.startDate}
                  max={moment().format("YYYY-MM-DD")}
                  name="endDate"
                />
              )}

              {selectors?.length > 0 &&
                selectors?.map((item) => (
                  <div key={item.name} className="filter_select">
                    <FormikControls
                      label={item?.label}
                      defaultText={item.defaultOption}
                      optionsList={item.options}
                      onClickCallback={selectClickCallback}
                      control="select"
                      type="text"
                      formik={formik}
                      name={item.name}
                      disabled={item.name === "city" ? Isdisabled : ""}
                      background={
                        item.name === "city" && background ? "#f5f5f547" : ""
                      }
                    />
                  </div>
                ))}
            </Form>
          );
        }}
      </Formik>
      {isButton && (
        <div className="common_btn">
          <CommonBtn
            title={title}
            role="link"
            to={to}
            className="exportBtn"
            onClick={onClick}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
