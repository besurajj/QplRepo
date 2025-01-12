import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // To access URL params
import CommonTable from "../../../common/ui/CommonTable/CommonTable";
import PaginationWrapper from "../../../common/ui/PaginationWrapper/PaginationWrapper";
import { API_DATA_LIMIT } from "../../../../utils/constants";

function ViewQuestions() {
  const { subject } = useParams(); // Get subject from URL
  const selectedSubject = useSelector((state) => state.exam.selectedSubject);
  const examData = useSelector((state) => {
    console.log("this is ", state.exam);
    return state.exam;
  });
  console.log("this is inside the viewQuestions", selectedSubject);

  // Find the exam data for the selected subject
  // const currentExam = Array.isArray(examData)
  //   ? examData.find((exam) => {
  //       console.log(
  //         `Exam subject: ${exam.subject}, URL subject: ${subject}, Redux subject: ${selectedSubject}`
  //       );
  //       return (
  //         (exam.subject &&
  //           exam.subject.toLowerCase() === subject?.toLowerCase()) ||
  //         (exam.subject &&
  //           exam.subject.toLowerCase() === selectedSubject?.toLowerCase())
  //       );
  //     })
  //   : null;

  //   console.log("this is current exam", currentExam);
  //   useEffect(() => {
  //     if (!currentExam) {
  //       console.log("Exam not found for this subject");
  //     }
  //   }, [currentExam]);

  return (
    <section className="user_management">
      <h1>{selectedSubject}</h1>
      <Container fluid>
        <Row>
          <Col>
            <CommonTable
              className="user_management_table"
              //     loading={{ isLoading, rows: 5, columns: 7 }}
            >
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Question</th>
                  <th>Option A</th>
                  <th>Option B</th>
                  <th>Option C</th>
                  <th>Option D</th>
                  <th>Correct Answer</th>
                </tr>
              </thead>
              <tbody>
                {/* {currentExam.questions.map((question, index) => (
                <tr key={question.id}>
                  <td>{index + 1}</td>
                  <td>{question.question}</td>
                  <td>{question.options.A}</td>
                  <td>{question.options.B}</td>
                  <td>{question.options.C}</td>
                  <td>{question.options.D}</td>
                  <td>{question.correctAnswer}</td>
             
                ) : (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center" }}>
                      NO RECORD FOUND
                    </td>
                  
                  </tr>
              ))} */}
              </tbody>
            </CommonTable>

            {/* {totalExam > API_DATA_LIMIT && (
              <div className="page_nation">
                <PaginationWrapper
                  limit={API_DATA_LIMIT}
                  //    page={offset}
                  //    count={totalUsers}
                  //    onChange={pageChangeHandler}
                />
              </div>
            )} */}
          </Col>
        </Row>
      </Container>
      {/* {showModal && (
        <ResultModal
          show={showModal}
          handleClose={() => {
            setShowModal(false);
          }}
          initialData={initialData}
          title={"Result"}
        />
      )} */}
    </section>
  );
}

export default ViewQuestions;
