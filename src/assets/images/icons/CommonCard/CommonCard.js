import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  DollerIcon,
  HeartIcon,
  HeartIconFilled,
} from "../../../../assets/images/svg/SvgIcon";
import CommonBtn from "../CommonBtn/CommonBtn";
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
}) => {
  const [like, Setlike] = useState(true);
  const likeHanlde = () => {
    Setlike(!like);
  };
  return (
    <>
      <div className={`common_card ${className}`}>
        <div className="common_card_thumb_outer">
          <button className="common_card_like" onClick={likeHanlde}>
            {like ? (
              <>
                <HeartIcon />
              </>
            ) : (
              <>
                <HeartIconFilled />
              </>
            )}
          </button>
          <Link to={to} className="common_card_thumb">
            <img src={img} alt="" />
            {hash && <span className="common_card_thumb_hash">{hash}</span>}
          </Link>
        </div>
        <div className="common_card_content">
          <div className="common_card_head">
            <h4>{title}</h4>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {price && (
            <>
              <div className="common_card_price">
                <Row>
                  <Col>
                    <div className="common_card_price_left">
                      {subtitle && <span>Price</span>}
                      <h5>
                        <DollerIcon /> {price}
                      </h5>
                    </div>
                  </Col>
                  <Col className="ps-xl-0">
                    <div className="common_card_price_right">
                      <CommonBtn
                        title={btnTitle}
                        className="outline-btn-primary"
                        role="link"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default CommonCard;
