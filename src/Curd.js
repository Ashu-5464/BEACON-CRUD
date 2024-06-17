import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Curd = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [empObj, setEmpObj] = useState({
        id: 0,
        empName: "",
        empContactNo: "",
        empEmail: "",
        salary: 0
    });

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = async () => {
        try {
            const result = await axios.get("http://localhost:5000/employees");
            setEmployeeList(result.data);
            alert('Employee fetch successful');
        } catch (error) {
            console.error("Error fetching data", error);
            alert('Failed to fetch employees');
        }
    };

    const updateForm = (event, key) => {
        setEmpObj(prevObj => ({ ...prevObj, [key]: event.target.value }));
    };

    const onEdit = (employee) => {
        setEmpObj(employee);
    };

    const onDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/employees/${id}`);
            alert("Employee deleted successfully");
            getAllEmployees();
        } catch (error) {
            console.error("Error deleting employee", error);
            alert("Failed to delete employee");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            if (empObj.id === 0) {
              
                await axios.post("http://localhost:5000/employees", empObj);
                alert('Employee created successfully');
            } else {
              
                await axios.put(`http://localhost:5000/employees/${empObj.id}`, empObj);
                alert('Employee updated successfully');
            }
            
           
            setEmpObj({ id: 0, empName: "", empContactNo: "", empEmail: "", salary: 0 });
            
           
            getAllEmployees();
        } catch (error) {
            console.error(`Error ${empObj.id === 0 ? 'creating' : 'updating'} employee`, error);
            alert(`Failed to ${empObj.id === 0 ? 'create' : 'update'} employee`);
        }
    };
    
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    {JSON.stringify(empObj)}
                    <div className='col-8'>
                        <div className='card-header bg-primary'>
                            <h3>Employee List</h3>
                        </div>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>SrNo</th>
                                    <th>Emp Name</th>
                                    <th>Contact No</th>
                                    <th>Emp Email</th>
                                    <th>Emp Salary</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    employeeList.map((emp, index) => (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{emp.empName}</td>
                                            <td>{emp.empContactNo}</td>
                                            <td>{emp.empEmail}</td>
                                            <td>{emp.salary}</td>
                                            <td>
                                                <button className='btn btn-primary' onClick={() => onEdit(emp)}>Edit</button>
                                                <button className='btn btn-danger' onClick={() => onDelete(emp.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='col-4'>
                        <div className='card'>
                            <div className='card-header bg-primary'>
                                <h3>Employee Form</h3>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={handleSubmit}>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label>Employee Name</label>
                                            <input type='text' className='form-control' value={empObj.empName}
                                                onChange={(event) => updateForm(event, 'empName')} required />
                                        </div>
                                        <div className='col-6'>
                                            <label>Contact No</label>
                                            <input type='text' className='form-control' value={empObj.empContactNo}
                                                onChange={(event) => updateForm(event, 'empContactNo')} required />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label>Email</label>
                                            <input type='email' className='form-control' value={empObj.empEmail}
                                                onChange={(event) => updateForm(event, 'empEmail')} required />
                                        </div>
                                        <div className='col-6'>
                                            <label>Salary</label>
                                            <input type='number' className='form-control' value={empObj.salary}
                                                onChange={(event) => updateForm(event, 'salary')} required />
                                        </div>
                                    </div>
                                    <div className='card-footer'>
                                        <button type='submit' className='btn btn-primary'>
                                            {empObj.id === 0 ? 'Save' : 'Update'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Curd;
