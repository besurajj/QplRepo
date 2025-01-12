import { memo, useCallback, useEffect, useState } from "react";
import "./ExamManagement.scss";
import { Button, Col, Container, Row } from "react-bootstrap";
import CommonTable from "../../../common/ui/CommonTable/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import { apiCallGet } from "../../../../axios/axios";
import { debounce } from "../../../../utils/utils";
import {
  API_DATA_LIMIT,
  API_URLS,
  PAGES,
  PLACEHOLDER_TEXT,
  ROUTES,
} from "../../../../utils/constants";
import PaginationWrapper from "../../../common/ui/PaginationWrapper/PaginationWrapper";
import { Link, useLocation } from "react-router-dom";

import Filter from "../../../common/Filter/Filter";

import ResultModal from "../../../common/ui/Modals/ResultModal/ResultModal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setExams, setSelectedSubject } from "../../../../redux/exam";

const ExamManagement = () => {
  const location = useLocation();
  const initialSelectedOption = location.state?.selectedOption || "Total User";

  const examData = [
    {
      srNo: 1,
      subject: "Mathematics",
      name: "Algebra Test",
      description: "Basic algebra concepts test",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      duration: "1 hour",
      totalQuestions: 20,
      passingMarks: 15,
      type: "Online",
      examDate: "2025-01-15",
      examCode: "MATH101",
      maxMarks: 20,
      rollNumberAssignment: "Auto",
      questions: [
        {
          id: 1,
          question: "What is the value of x in the equation 2x + 3 = 7?",
          options: {
            A: "1",
            B: "2",
            C: "3",
            D: "4",
          },
          correctAnswer: "B",
        },
        {
          id: 2,
          question: "Simplify: (3x^2 + 2x) + (x^2 - x)",
          options: {
            A: "4x^2 + x",
            B: "2x^2 + x",
            C: "3x^2 - x",
            D: "4x^2 - x",
          },
          correctAnswer: "A",
        },
        {
          id: 3,
          question: "What is the square root of 81?",
          options: {
            A: "7",
            B: "8",
            C: "9",
            D: "10",
          },
          correctAnswer: "C",
        },
        // Add remaining 17 questions here...
      ],
    },
    {
      srNo: 2,
      subject: "Science",
      name: "Physics Midterm",
      description: "Covers Newton's laws and basic mechanics",
      startTime: "1:00 PM",
      endTime: "2:30 PM",
      duration: "1.5 hours",
      totalQuestions: 20,
      passingMarks: 20,
      type: "Offline",
      examDate: "2025-01-16",
      examCode: "SCI202",
      maxMarks: 30,
      rollNumberAssignment: "Manual",
      questions: [
        {
          id: 1,
          question: "What is the SI unit of force?",
          options: {
            A: "Pascal",
            B: "Joule",
            C: "Newton",
            D: "Watt",
          },
          correctAnswer: "C",
        },
        {
          id: 2,
          question: "Who formulated the three laws of motion?",
          options: {
            A: "Albert Einstein",
            B: "Isaac Newton",
            C: "Galileo Galilei",
            D: "Nikola Tesla",
          },
          correctAnswer: "B",
        },
        {
          id: 3,
          question: "Which of these is an example of a non-contact force?",
          options: {
            A: "Friction",
            B: "Magnetic force",
            C: "Tension",
            D: "Normal force",
          },
          correctAnswer: "B",
        },
        // Add remaining 17 questions here...
      ],
    },
    {
      srNo: 3,
      subject: "English",
      name: "Grammar Test",
      description: "Test on tenses, verbs, and sentence structure",
      startTime: "9:00 AM",
      endTime: "10:00 AM",
      duration: "1 hour",
      totalQuestions: 20,
      passingMarks: 18,
      type: "Online",
      examDate: "2025-01-17",
      examCode: "ENG303",
      maxMarks: 25,
      rollNumberAssignment: "Auto",
      questions: [
        {
          id: 1,
          question: "Choose the correct sentence:",
          options: {
            A: "She don't like apples.",
            B: "She doesn't likes apples.",
            C: "She doesn't like apples.",
            D: "She don't likes apples.",
          },
          correctAnswer: "C",
        },
        {
          id: 2,
          question: "What is the past tense of 'run'?",
          options: {
            A: "Ran",
            B: "Running",
            C: "Runned",
            D: "Runs",
          },
          correctAnswer: "A",
        },
        {
          id: 3,
          question: "Which of the following is a noun?",
          options: {
            A: "Quickly",
            B: "Jump",
            C: "Happiness",
            D: "Run",
          },
          correctAnswer: "C",
        },
        // Add remaining 17 questions here...
      ],
    },
    // Add more exams with questions for History and Computer Science...
  ];
  const dispatch = useDispatch();
  dispatch(setExams(examData));
  const [initialData, setInitialData] = useState(null);
  const [confirmationData, setConfirmationData] = useState({});
  const [examPaper, setExamPaper] = useState({});
  // const [examData, setExamData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [totalExam, setTotalExam] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);
  const [showModal, setShowModal] = useState(false);
  console.log("exam data", examData);
  const limit = API_DATA_LIMIT;
  const filters = useSelector((state) => state.filters);
  const selectedGame = useSelector((state) => state.user.gameId);
  // const getAllExam = async (offset) => {
  //   setIsLoading(true);
  //   try {
  //     const url = `${API_URLS.GET_EXAMS}/${limit}/${offset}`;

  //     let res = await apiCallGet(url, false, false);

  //     if (!res?.error) {
  //       setExamData(res?.data?.rows || []);
  //       setTotalExam(res?.data?.count || 0);
  //       console.log("this is exams response", res);
  //     } else {
  //       throw new Error("Couldn't get users!");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const debouncedToggleUserStatus = useCallback(
  //   debounce(() => toggleUserStatus(), 500),
  //   [confirmationData]
  // );

  const getExamPaper = async (offset) => {
    setIsLoading(true);
    try {
      const url = `${API_URLS.GET_PAPER}/${limit}/${offset}`;
      let res = await apiCallGet(url, false, false);

      if (!res?.error) {
        setExamPaper(res?.data?.rows || []);
        // setTotalExam(res?.data?.count || 0);
        console.log("this is exams response", res);
      } else {
        throw new Error("Couldn't get users!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewQuestions = (subject) => {
    console.log("subject", subject);
    dispatch(setSelectedSubject(subject));
    // alert("hello there")
    // getAllExam();
  };

  // const pageChangeHandler = (newPage) => {
  //   getAllUsers(newPage);
  //   setOffset(newPage);
  // };
  useEffect(() => {
    // const newOffset = 1;
    // getAllExam(newOffset);
    // setOffset(newOffset);
  }, [filters, selectedOption]);

  return (
    <section className="user_management">
      <Container fluid>
        <Row>
          <Col>
            <div className="usermanagent_filter">
              <Filter
                isSearch
                page={PAGES.user}
                isMan={true}
                placeholdertext={`Search by ${PLACEHOLDER_TEXT.NAME}`}
                placeholdertextdebouncedToggleUserStatus={`Search by ${PLACEHOLDER_TEXT.NAME}`}
              />
            </div>

            <CommonTable
              className="user_management_table"
              loading={{ isLoading, rows: 5, columns: 7 }}
            >
              <thead>
                <tr>
                  <th>Sr.No.</th>
                  <th>Subject</th>
                  <th>Exam Name</th>
                  <th>Description </th>
                  <th>Start Time </th>
                  <th>End Time </th>
                  <th>Duration</th>
                  <th>Total Questions</th>
                  <th>Passing Marks</th>
                  <th>Type</th>
                  <th>Exam Date</th>
                  <th>Exam-Code</th>
                  <th>Max Marks</th>
                  <th>Roll-Number Assignment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {examData && Object.values(examData).length > 0 ? (
                  Object.values(examData).map((item, index) => (
                    <tr key={item.id || index} className="text-center">
                      <td>{index + 1}</td>
                      <td>{item.subject || "--"}</td>
                      <td>{item.name || "--"}</td>
                      {/* total questions */}
                      <td>{item.description || "--"}</td>
                      <td>{item.startTime || "--"}</td>
                      <td>{item.endTime || "--"}</td>
                      <td>{item.duration || "--"}</td>
                      <td>{item.totalQuestions || "--"}</td>
                      <td>{item.passingMarks || "--"}</td>
                      <td>{item.type || "--"}</td>
                      <td>{item.examDate || "--"}</td>
                      <td>{item.examCode || "--"}</td>
                      <td>{item.maxMarks || "--"}</td>
                      <td>{item.rollNumberAssignment || "--"}</td>
                      <th>
                        <Link
                          className="mt-5"
                          onClick={() => handleViewQuestions(item.subject)}
                          // to={`/admin/exam/${item.subject}`}
                          to={`${ROUTES.VIEW_QUESTIONS}/${item.subject}`}
                        >
                          View Questions
                        </Link>
                      </th>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center" }}>
                      NO RECORD FOUND
                    </td>
                  </tr>
                )}
              </tbody>
            </CommonTable>

            {totalExam > API_DATA_LIMIT && (
              <div className="page_nation">
                <PaginationWrapper
                  limit={API_DATA_LIMIT}
                  page={offset}
                  count={totalUsers}
                  onChange={pageChangeHandler}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
      {showModal && (
        <ResultModal
          show={showModal}
          handleClose={() => {
            setShowModal(false);
          }}
          initialData={initialData}
          title={"Result"}
        />
      )}
    </section>
  );
};

export default memo(ExamManagement);
