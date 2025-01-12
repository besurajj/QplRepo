import React from "react";
import "./CommonTable.scss";
import { Table } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import CustomPlaceholder from "../CustomPlaceholder/CustomPlaceholder";

const CommonTable = ({ className, children, loading = {} }) => {
  const { rows, columns, isLoading } = loading;
  return (
    <>
      <div className={`common_table ${className}`}>
        {isLoading ? (
          <Table responsive>
            <thead>
              <tr>
                {Array.from({ length: columns }).map((item) => (
                  <th>
                    <CustomPlaceholder size={6} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rows }).map((item) => (
                <tr>
                  {Array.from({ length: columns }).map((item) => (
                    <td>
                      <CustomPlaceholder size={6} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          // <PerfectScrollbar>
          <Table responsive>{children}</Table>
          // </PerfectScrollbar>
        )}
      </div>
    </>
  );
};

export default CommonTable;
