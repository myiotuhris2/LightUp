
import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue, isEditing, rows }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      ID: "",
      Applicant_Name: "",
      Gender: "",
      District: "",
      State: "",
      Pincode: "",
      Ownership: "",
      GovtID_Type: "",
      ID_Number: "",
      Category: "",
      Load_Applied: "",
      Date_of_Application: "",
      Date_of_Approval: "",
      Modified_Date: "",
      Status: "",
      Reviewer_ID: "",
      Reviewer_Name: "",
      Reviewer_Comments: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    const { ID, Applicant_Name, Load_Applied, Status, Date_of_Application } = formState;
    let errorMessages = [];

    if (!ID) errorMessages.push("ID");
    if (!Applicant_Name) errorMessages.push("Applicant_Name");
    if (!Status) errorMessages.push("Status");
    
    // Ensure load is less than or equal to 200
    if (Number(Load_Applied) > 200) {
      errorMessages.push("Load must be ≤ 200");
    }

    if (!Date_of_Application) errorMessages.push("Date of Application");

     // Check for duplicate ID
     const isDuplicateID = rows.some(row => row.ID === ID && !isEditing);
     if (isDuplicateID) {
       errorMessages.push("Duplicate ID found");
     }
    console.log(isDuplicateID);
    if (errorMessages.length > 0) {
      setErrors(errorMessages.join(", "));
      return false;
    } else {
      setErrors("");
      return true;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="ID">ID</label>
            <input name="ID" type="number" onChange={handleChange} value={formState.ID} />
          </div>
          <div className="form-group">
            <label htmlFor="Applicant_Name">Applicant_Name</label>
            <textarea
              name="Applicant_Name"
              onChange={handleChange}
              value={formState.Applicant_Name}
             
            />
          </div>
          <div className="form-group">
            <label htmlFor="Status">Status</label>
            <select
              name="Status"
              onChange={handleChange}
              value={formState.Status}
              className="options"
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Connection Released">Connection Released</option>
              <option value="Approved">Approved</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Pincode">Pincode</label>
            <input name="Pincode" type="number" onChange={handleChange} value={formState.Pincode} />
          </div>
          <div className="form-group">
            <label htmlFor="Ownership">Ownership</label>
            <select name="Ownership" className="options" onChange={handleChange} value={formState.Ownership}>
            <option value="">Select Ownership</option>
              <option value="INDIVIDUAL">INDIVIDUAL</option>
              <option value="JOINT">JOINT</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="GovtID_Type">Govt ID Type</label>
            <input
              name="GovtID_Type"
              type="text"
              onChange={handleChange}
              value={formState.GovtID_Type}
              disabled={isEditing}// Make this field non-editable
            />
          </div>
          <div className="form-group">
            <label htmlFor="ID_Number">Govt ID Number</label>
            <input
              name="ID_Number"
              type="number"
              onChange={handleChange}
              value={formState.ID_Number}
              disabled={isEditing} // Make this field non-editable
            />
          </div>
          <div className="form-group">
            <label htmlFor="Category">Category</label>
            <select name="Category" className="options" onChange={handleChange} value={formState.Category}>
            <option value="">Select Category</option>
              <option value="Commerical">Commercial</option>
              <option value="Residential">Residential</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Load_Applied">Load_Applied</label>
            <input name="Load_Applied" onChange={handleChange} value={formState.Load_Applied} />
          </div>
          
          <div className="form-group">
            <label htmlFor="Date_of_Application">Date of Application</label>
            <input
              type="date"
              name="Date_of_Application"
              onChange={handleChange}
              value={formState.Date_of_Application}
              datatype="yyyy-MM-dd"
              disabled={isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Gender">Gender</label>
            <select name="Gender" className="options" onChange={handleChange} value={formState.Gender}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="District">District</label>
            <input name="District" type="text" onChange={handleChange} value={formState.District} />
          </div>
          <div className="form-group">
            <label htmlFor="State">State</label>
            <input name="State" type="text" onChange={handleChange} value={formState.State} />
          </div>
          <div className="form-group">
            <label htmlFor="Date_of_Approval">Date of Approval</label>
            <input
              type="date"
              name="Date_of_Approval"
              onChange={handleChange}
              value={formState.Date_of_Approval}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Modified_Date">Modified Date</label>
            <input
              type="date"
              name="Modified_Date"
              onChange={handleChange}
              value={formState.Modified_Date}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Reviewer_ID">Reviewer ID</label>
            <input
              name="Reviewer_ID"
              type="number"
              onChange={handleChange}
              value={formState.Reviewer_ID}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Reviewer_Name">Reviewer Name</label>
            <input
              name="Reviewer_Name"
              type="text"
              onChange={handleChange}
              value={formState.Reviewer_Name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Reviewer_Comments">Reviewer Comments</label>
            <textarea
              name="Reviewer_Comments"
              onChange={handleChange}
              value={formState.Reviewer_Comments}
            />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
