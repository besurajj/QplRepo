import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PaginationWrapper from "../../../common/ui/PaginationWrapper/PaginationWrapper";
import { API_DATA_LIMIT } from "../../../../utils/constants";
import CommonTable from "../../../common/ui/CommonTable/CommonTable";
import { getSerialNumbers } from "../../../../utils/utils";

const QuizData = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const topic = useSelector((state) => state.topic.selectedTopic.topicContents);
  // console.log("topics ",topic)
  const quizArray = Array.isArray(topic) ? topic : Object.values(topic);
  // const [isLoading, setIsLoading] = useState(true);
  const selectedTopicQuiz = quizArray.find((item) => item.topicContentType);

  console.log("this is selected topic quiz ", selectedTopicQuiz);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const handleAnswerSelection = (questionId, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  // const checkAnswer = (questionId, selectedOption) => {
  //   const question = selectedTopicQuiz.topicContentMcqs.find(
  //     (item) => item.id === questionId
  //   );
  //   return selectedOption === question.correctOption;
  // };

  const totalQuestions = selectedTopicQuiz?.topicContentMcqs?.length || 0;

  console.log("this is total ques", totalQuestions);
  console.log("current page", currentPage);
  const startIndex = (currentPage - 1) * API_DATA_LIMIT;
  const endIndex = startIndex + API_DATA_LIMIT;

  const paginatedQuestions = selectedTopicQuiz?.topicContentMcqs?.slice(
    startIndex,
    endIndex
  );

  console.log("this is paginated quez ", paginatedQuestions);

  const handlePage = (page) => {
    console.log("this is page", page);
    setCurrentPage(page);
  };

  const handleBackClick = () => {
    navigate(-1); // This goes back one step in the history stack (similar to clicking the browser's back button)
  };
  return (
    <section className="armory point_management_page">
      <Container fluid>
        <Button onClick={() => handleBackClick()}>Back</Button>
        <Row>
          <Col>
            <CommonTable
              className="armory_table point_management_table"
              // loading={{ rows: 10, columns: 4 }}
            >
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Questions</th>
                  <th>Options</th>
                  <th>Answers</th>
                </tr>
              </thead>
              <tbody>
                {paginatedQuestions && paginatedQuestions.length > 0 ? (
                  paginatedQuestions?.map((value, index) => (
                    <tr key={value.id}>
                      <td>
                        {getSerialNumbers(index, currentPage, API_DATA_LIMIT)}
                      </td>
                      <td>
                        {" "}
                        <strong>Q{startIndex + index + 1}:</strong>{" "}
                        {value.question}
                      </td>
                      <td>
                        {Object.entries(value.answerOptions).map(
                          ([optionKey, optionValue], optionIndex) => (
                            <div key={optionIndex} className="quiz-option">
                              <input
                                type="radio"
                                disabled
                                id={`option-${value.id}-${optionIndex}`}
                                name={`question-${value.id}`}
                                value={optionValue}
                                onChange={() =>
                                  handleAnswerSelection(value.id, optionValue)
                                }
                              />
                              <label
                                htmlFor={`option-${value.id}-${optionIndex}`}
                              >
                                {optionKey}: {optionValue}
                              </label>
                            </div>
                          )
                        )}
                      </td>
                      <td>{value.answer}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      {"No data available"}
                    </td>
                  </tr>
                )}
              </tbody>
              {totalQuestions > API_DATA_LIMIT && (
                <div className="page_nation">
                  <PaginationWrapper
                    limit={API_DATA_LIMIT}
                    page={currentPage}
                    count={totalQuestions}
                    onChange={handlePage}
                  />
                </div>
              )}
            </CommonTable>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default QuizData;
