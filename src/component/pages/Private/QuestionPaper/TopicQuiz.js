import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationWrapper from "../../../common/ui/PaginationWrapper/PaginationWrapper";
import { Button, Col, Container, Row } from "react-bootstrap";
import CommonTable from "../../../common/ui/CommonTable/CommonTable";
import { API_DATA_LIMIT, ROUTES } from "../../../../utils/constants";
import { getSerialNumbers } from "../../../../utils/utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setTopicData } from "../../../../redux/topic";

const TopicQuiz = () => {
  const navigate = useNavigate();
  const { name } = useParams(); 
  const dispatch = useDispatch();

  const quiz = useSelector((state) => state.topic.data);

  const quizArray = Array.isArray(quiz) ? quiz : Object.values(quiz);

  const selectedTopic = quizArray.find((item) => item.name === name);

  if (selectedTopic) {
    dispatch(setTopicData(selectedTopic));
  }

  const handleBackClick = () => {
    navigate(-1); // This goes back one step in the history stack (similar to clicking the browser's back button)
  };
  const dataCount = 10;

  const offset = 1;
  return (
    <section className="armory point_management_page">
      <Container fluid>
        <Button onClick={() => handleBackClick()}>Back</Button>
        <Row>
          <Col>
            <CommonTable className="armory_table point_management_table">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Topic Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedTopic ? (
                  selectedTopic.topicContents.map((value, index) => (
                    <tr key={value.id}>
                      <td>{getSerialNumbers(index, offset, API_DATA_LIMIT)}</td>
                      <td>{value.topicContentType}</td>
                      <td>{value.status}</td>
                      <td>
                        <Link
                          to={`${ROUTES.TOPIC}/${name}/${value.topicContentType}`}
                          className="ms-3 fs-4 text-decoration-underline fw-bold"
                        >
                          Quiz
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No quizzes available
                    </td>
                  </tr>
                )}
              </tbody>
            </CommonTable>
            {/* Pagination */}
            {dataCount > API_DATA_LIMIT && (
              <div className="page_nation">
                <PaginationWrapper
                  limit={API_DATA_LIMIT}
                  page={offset}
                  count={dataCount}
                  onChange={pageChangeHandler}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TopicQuiz;
