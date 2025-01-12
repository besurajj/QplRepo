import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DollerIcon } from "../../../assets/images/svg/SvgIcon";
import { CommonBtn } from "../ui";
import "./CommonCard.scss";
const CommonCard = ({
  className,
  title,
  img,
  hash,
  to,
  subtitle,
  price,
  btnTitle,
  title2,
  title3,
  value,
  onClick,
  onClickCallback,
  item,
}) => {
  const [like, Setlike] = useState(true);

  const likeHanlde = () => {
    Setlike(!like);
  };
  return (
    <>
      <div className={`common_card ${className}`}>
        <div>
          <div className="common_card_thumb_outer">
            {/* <button className="common_card_like" onClick={likeHanlde}>
            {like ? (
              <>
                <HeartIcon />
              </>
            ) : (
              <>
                <HeartIconFilled />
              </>
            )}
          </button> */}
            <Link to={to} state={{ data: item }} className="common_card_thumb">
              <img src={img} alt="" />
              {hash && <span className="common_card_thumb_hash">{hash}</span>}
            </Link>
          </div>
          {/* <div className="common_card_content"> */}
          <div className="common_title">
            <div className="common_card_head">
              <h4 title={title}>{title}</h4>
              {subtitle && <p>{subtitle}</p>}
            </div>
            <p className="common_card_value">
              {title2 && title3 ? (
                <React.Fragment>
                  Portion Listed: {title2}
                  {value && <span>{value}</span>}
                  Available Portion: {title3}
                  {value && <span>{value}</span>}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {title2 ? (
                    <React.Fragment>
                      Portion Listed: {title2}
                      {value && <span>{value}</span>}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      Available Portion: {title3}
                      {value && <span>{value}</span>}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </p>
          </div>
        </div>

        {price && (
          <>
            <div className="common_card_price">
              <Row>
                <Col>
                  <div className="common_card_price_left">
                    {subtitle && <span>Price</span>}
                    <h5>
                      <DollerIcon />
                      {price}
                    </h5>
                  </div>
                </Col>
                <Col className="ps-xl-0">
                  <div className="common_card_price_right">
                    <CommonBtn
                      title={btnTitle}
                      className="outline-btn-primary"
                      onClick={onClick}
                      role="link"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </>
        )}
        {/* </div> */}
      </div>
    </>
  );
};
export default CommonCard;
