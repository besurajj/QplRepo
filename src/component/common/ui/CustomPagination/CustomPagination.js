import React from 'react';
import { Pagination } from 'react-bootstrap';
import "./CustomPagination.scss";

const CustomPagination = ({ className }) => {
    return (
        <>
            <Pagination className={`custom_paginate ${className}`}>
                <Pagination.Prev/>
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>

                <Pagination.Ellipsis className='ellipsis'/>
                <Pagination.Item>{15}</Pagination.Item>
                <Pagination.Next />
            </Pagination>
        </>
    );
};

export default CustomPagination;