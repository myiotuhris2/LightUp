import React, { useState } from "react";

import { BsFillTrashFill, BsFillPencilFill, BsFillEyeFill } from "react-icons/bs";


import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
      // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1); // State to handle user input for page
  const rowsPerPage = 6; // Set the number of rows you want to display per page
 
  // Calculate the total number of pages
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  // Calculate the rows to display on the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  // Handle page change
  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    setInputPage(currentPage - 1); // Sync input with current page
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    setInputPage(currentPage + 1); // Sync input with current page
  };

 // Handle input change for page number
 const handlePageInputChange = (e) => {
  const value = e.target.value;

  // Ensure that the input is a number between 1 and the total number of pages
  if (value >= 1 && value <= totalPages) {
    setInputPage(value);
  }
};

// Handle "Go" button to navigate to the entered page
const handleGoToPage = () => {
  const pageNumber = parseInt(inputPage, 10); // Convert input to integer
  if (pageNumber >= 1 && pageNumber <= totalPages) {
    setCurrentPage(pageNumber);
  }
};






  return (
    <div className="table-wrapper">
      <h3>Recent Applictions:</h3>
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Govt ID Type</th>
          <th>ID Number</th>
          <th>Status</th>
          <th>Load</th>
          <th>Date of Application</th>
          
          <th>Gender</th>
          <th>District</th>
          <th>State</th>
          <th>Pincode</th>
          <th>Ownership</th>
          <th>Category</th>
          <th>Date of Approval</th>
          <th>Modified Date</th>
          <th>Reviewer ID</th>
          <th>Reviewer Name</th>
          
          <th>Reviewer Comments</th>
          <th>Actions</th>

        </tr>
      </thead>
      <tbody>
        {currentRows.map((row, idx) => {
          const statusText =
            row.Status.charAt(0).toUpperCase() + row.Status.slice(1);

          return (
            <tr key={idx} >
              <td>{row.ID}</td>
              <td>{row.Applicant_Name}</td>
              <td>{row.GovtID_Type}</td>
                <td>{row.ID_Number}</td>
              <td>
                <span className={`label label-${row.Status}`}>
                  {statusText}
                </span>
              </td>
              <td>{row.Load_Applied}</td>
              <td>{row.Date_of_Application}</td>
              
                <td>{row.Gender}</td>
                <td>{row.District}</td>
                <td>{row.State}</td>
                <td>{row.Pincode}</td>
                <td>{row.Ownership}</td>
                <td>{row.Category}</td>
                <td>{row.Date_of_Approval || "N/A"}</td> {/* Handle missing Date_of_Approval */}
                <td>{row.Modified_Date}</td>
                <td>{row.Reviewer_ID}</td>
                <td>{row.Reviewer_Name}</td>
                <td>{row.Reviewer_Comments}</td>
                <td className="fit">
                <span className="actions">
                <BsFillEyeFill
                    className="view-btn"
                    
                  />
                  <BsFillTrashFill
                    className="delete-btn"
                    onClick={(e) =>{ 
                      //e.stopPropagation(); // Prevent row click when deleting
                      deleteRow(idx + indexOfFirstRow);
                    }} // Update index for delete
                  />
                  <BsFillPencilFill
                    className="edit-btn"
                    onClick={(e) => {
                     // e.stopPropagation(); // Prevent row click when deleting
                      editRow(idx + indexOfFirstRow);
                    }} // Update index for edit
                  />
                

                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    {/* Pagination controls */}
   
    <div className="pagination-controls">
      <div>
    <span> <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="btn"
      >
        Previous
      </button>
      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="btn"
      >
        Next
      </button>
      </span>
      </div>
       {/* Jump to a specific page */}
       <div>
        <span>
      <input
          type="number"
          value={inputPage}
          onChange={handlePageInputChange}
          className="page-input"
          min="1"
          max={totalPages}
        />
        <button onClick={handleGoToPage} className="btn">
          Go
        </button>
        </span>
        </div>
      
    </div>
    
    
        
  </div>
);
};