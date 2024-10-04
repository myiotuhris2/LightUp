import { useState,useEffect,forwardRef} from "react";

import "./App.css";
import { Table } from "./components/Table";
import { Modal } from "./components/Modal";
import DatePicker from "react-datepicker"; // Import the date picker
import "react-datepicker/dist/react-datepicker.css"; // Import its styles

import { BsPlus } from "react-icons/bs";


function App() {
  const CustomInput = forwardRef(({ value, onClick, placeholderText }, ref) => (
    <input
     
      onClick={onClick}
      ref={ref}
      style={{
        backgroundColor: "transparent",
        border:"none",
        textAlign:"center",
        borderBottom: "2px solid #6759ff",
        padding: "1em 0.3em",
      
      }}
      placeholder={placeholderText}
      value={value}
    >
      
    </input>
  ));


  const [modalOpen, setModalOpen] = useState(false);
  // Date range filter state
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // New state for the search term
  const [filteredRows, setFilteredRows] = useState([]);

   // Load rows from localStorage when the component mounts
   //useEffect(() => {
    //const storedRows = JSON.parse(localStorage.getItem("rows"));
    //if (storedRows) {
    //  setRows(storedRows);
    //}
 // }, []);

   // Load rows from users.json when the component mounts
   useEffect(() => {
    const storedRows = JSON.parse(localStorage.getItem("rows"))||[];
    if (storedRows.length>0) {
      setRows(storedRows);
      setFilteredRows(storedRows);
     
    } else {
      // If no data in localStorage, fetch from JSON
      fetch("/users.json")
        .then((response) => response.json())
        .then((data) => {
          setRows(data);
          setFilteredRows(data);
          localStorage.setItem("rows", JSON.stringify(data)); // Save fetched data to localStorage
        })
        .catch((error) => console.error("Error loading users:", error));
      
    }
  }, []);

     // Function to save rows to localStorage
  const saveRowsToLocalStorage = (updatedRows) => {
    localStorage.setItem("rows", JSON.stringify(updatedRows));
  };

  useEffect(() => {
    let filteredData = rows;

    // Filter based on the search term (status)
    if (searchTerm) {
      filteredData = filteredData.filter((row) =>
        row.ID.toString()===searchTerm
      );
    }

    // Filter based on the date range
    if (startDate && endDate) {
      filteredData = filteredData.filter((row) => {
        const rowDate = new Date(row.Date_of_Application); // Convert the date string back into a Date object
        return rowDate >= startDate && rowDate <= endDate;
      });
    }

    setFilteredRows(filteredData);
  }, [startDate, endDate, searchTerm, rows]);

  const handleDeleteRow = (targetIndex) => {
    if (rows[targetIndex].Status === "Rejected") {
      const updatedRows = rows.filter((_, idx) => idx !== targetIndex);
      setRows(updatedRows);
      saveRowsToLocalStorage(updatedRows); // Save the updated rows to localStorage
    } else {
      alert("Only rows with 'Rejected' status can be deleted.");
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    let updatedRows;
    if (rowToEdit === null) {
      updatedRows = [...rows, newRow];
    } else {
      updatedRows = rows.map((currRow, idx) => {
        if (idx !== rowToEdit) return currRow;
        return newRow;
      });
    }
    setRows(updatedRows);
    saveRowsToLocalStorage(updatedRows); // Save the updated rows to localStorage
  };

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  
 
  

  return (
    <>
    
     
            <div className="my-app">
            <div className="search-wrapper">
         
            <input
            type="search"
            placeholder="Search by Applicant ID..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
    
          />
          <i class="fa fa-search"></i>
       
          </div>
           <div className="App">
            
             
              {/* Main app content */}
      {/* Search input for filtering by status */}
      
     
        
        <div className="date-picker">
        <button className="btn">Filter</button>
         <div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            isClearable
           customInput={<CustomInput placeholderText="Select Start Date"/>}
           
          />
        </div> 
        <div>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select End Date"
            isClearable
            customInput={<CustomInput placeholderText="Select End Date"/>}
            
          />
          </div>
        </div>
        </div>
   
      <Table rows={filteredRows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btnApp">
        <span><BsPlus size={20}/>Add Row</span>
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]
          
          }
          isEditing={rowToEdit!==null}
          rows={rows}
        />
      )}
    </div>
    
    
 
</>
  );
}

export default App


