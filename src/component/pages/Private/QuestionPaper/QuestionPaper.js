import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CommonTable from "../../../common/ui/CommonTable/CommonTable";
import UpdatePointsModal from "../../../common/ui/Modals/UpdatePoints/UpdatePointsModal";
import { apiCallGet } from "../../../../axios/axios";
import { API_URLS, API_DATA_LIMIT, ROUTES } from "../../../../utils/constants";
import PaginationWrapper from "../../../common/ui/PaginationWrapper/PaginationWrapper";
import { EditIconPensil } from "../../../../assets/images/svg/SvgIcon";
import "./QuestionPaper.scss";
import { CommonBtn } from "../../../common/ui";
import { getSerialNumbers } from "../../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../../../redux/topic";
import { Link, useNavigate } from "react-router-dom";

const QuestionPaper = () => {
  const [topicData, setTopicData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataCount, setDataCount] = useState(0);
  const [offset, setOffset] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchTopicData = async () => {
    setIsLoading(true);
    try {
      const response = await apiCallGet(
        `${API_URLS.GET_TOPIC}/${offset}/${API_DATA_LIMIT}`
      );

      if (response && !response.error) {
        const Topic = response?.data?.rows;
        
        const count = response?.data?.count;
        setTopicData(Topic);
        setDataCount(count);
        dispatch(setData(Topic));
      } else {
        console.error("Error fetching settings data");
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopicData();
  }, [offset]);

  const pageChangeHandler = (newOffset) => {
    setOffset(newOffset);
  };

  const handleEditClick = (data) => {
    setShowModal(true);
    setInitialData(data);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  console.log("thgis is topic data ",topicData)
  const handleBackClick = () => {
    navigate(-1); // This goes back one step in the history stack (similar to clicking the browser's back button)
  };

  return (
    <section className="armory point_management_page">
      {/* <Button onClick={() => handleBackClick()}>Back</Button> */}
      {/* <CommonBtn title={"Add Topic"} role={"btn"} onClick={handleOpenModal} /> */}
      <Container fluid>
        <th>Question Paper List's</th>
        <Row>
          <Col>
        <CommonTable
          className="armory_table point_management_table"
          loading={{ isLoading, columns: 2 }}
        >
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Exam List</th>
              {/* <th>Description </th> */}
              {/* <th>Status</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
                {!isLoading && topicData?.length > 0 ? (
                  topicData.map((data, index) => (
                    <tr key={data.id}>
                      <td>{getSerialNumbers(index, offset, API_DATA_LIMIT)}</td>
                      <td>{data.name}</td>
                      {/* <td>{data.description}</td> */}
                      {/* <td>{data.status}</td> */}
                      <td>
                        {/* <button
                          className="edit-icon"
                          onClick={() => handleEditClick(data)}
                        >
                          <EditIconPensil />
                        </button> */}
                        <Link
                          to={`${ROUTES.TOPIC}/${data.name}`}
                          // target="_blank"
                          className="ms-3 fs-4 text-decoration-underline fw-bold"
                        >
                          Question Paper's
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      {isLoading ? "Loading..." : "No data available"}
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

      {/* Modal for updating points per level */}
      {/* {showModal && (
        <UpdatePointsModal
          show={showModal}
          handleClose={() => {
            setShowModal(false);
            setInitialData("");
          }}
          title={"Topic"}
          fetchTopicData={fetchTopicData}
          initialData={initialData}
        />
      )} */}
    </section>
  );
};

export default QuestionPaper;
