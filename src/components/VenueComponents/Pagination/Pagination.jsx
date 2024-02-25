import React from 'react';
import './pagination.css';

const PaginationComponent = ({ currentPage, onPageChange }) => {
	return (
		<div className="pagination-container">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				Previous
			</button>
			<span>Page {currentPage}</span>
			<button onClick={() => onPageChange(currentPage + 1)}>Next</button>
		</div>
	);
};

export default PaginationComponent;
