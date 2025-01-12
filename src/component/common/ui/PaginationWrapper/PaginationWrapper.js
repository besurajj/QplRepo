import React from "react";
import "./PaginationWrapper.scss";
import Pagination from "react-js-pagination";
import { debounce } from "../../../../utils/utils";

const PaginationWrapper = (props) => {
  const { limit, page, count, onChange } = props;

  const decouncedOnChangeHandler = debounce(
    (e) => e !== page && onChange(e),
    300
  );

  return (
    <Pagination
      className="paginationStyle"
      activePage={page}
      itemsCountPerPage={limit}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      onChange={decouncedOnChangeHandler}
      itemClass="page-item"
      linkClass="page-link"
      // hideFirstLastPages={true}
    />
  );
};

export default PaginationWrapper;
