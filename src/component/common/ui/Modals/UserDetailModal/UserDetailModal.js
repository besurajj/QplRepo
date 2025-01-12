// import React from "react";
// import "./UserDetailModal.scss";
// import CommonModal from "../CommonModal/CommonModal";
// import { checkUndefiendValue, truncateName } from "../../../../../utils/utils";
// import CommonTable from "../../CommonTable/CommonTable";
// import moment from "moment";
// import { API_DATA_LIMIT } from "../../../../../utils/constants";
// import PaginationWrapper from "../../PaginationWrapper/PaginationWrapper";

// const UserDetailModal = ({
//   show,
//   onHide,
//   doctorFullDe,
//   offsets,
//   setOffSets,
// }) => {
//   return (
//     <>
//       <CommonModal
//         size={"xxl"}
//         show={show}
//         onHide={onHide}
//         closeButton
//         className="userDetail_modal"
//         heading="Doctor Appointment Details"
//       >
//         <CommonTable className="user_management_table">
//           <thead>
//             <tr>
//               <th>Sr No.</th>
//               <th>Patient Name</th>
//               <th>Medication</th>
//               <th>Appointment Date</th>
//               <th>Start Time</th>
//               <th>End Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {doctorFullDe?.count > 0 ? (
//               doctorFullDe?.rows?.map((item, index) => (
//                 <tr key={index}>
//                   <td>{offsets * 10 - 10 + index + 1}</td>
//                   <td>{item?.patientName}</td>
//                   <td>{checkUndefiendValue(item?.medication, "--")}</td>
//                   <td>
//                     {checkUndefiendValue(
//                       moment(item?.appointment).format("DD-MM-YYYY", "--")
//                     )}
//                   </td>
//                   <td>{checkUndefiendValue(item?.startTime, "--")}</td>
//                   <td>{checkUndefiendValue(item?.endTime, "--")}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={7} style={{ textAlign: "center" }}>
//                   No data found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </CommonTable>

//         <div className="page_nation">
//           <PaginationWrapper
//             limit={API_DATA_LIMIT}
//             page={offsets}
//             count={doctorFullDe?.count}
//             onChange={(e) => setOffSets(e)}
//           />
//         </div>
//       </CommonModal>
//     </>
//   );
// };

// export default UserDetailModal;
