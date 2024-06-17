import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PostForm = ({ postData, handleChange, handleSubmit }) => {
    return (
        <div className='col-md-4'>
            <div className="card">
                <div className="card-header">
                    <h3>Add New Data to Employee Form</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type='text'
                                id="name"
                                placeholder='Enter name'
                                name='name'
                                className='form-control my-2'
                                value={postData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="designation">Designation</label>
                            <input
                                type='text'
                                id="designation"
                                placeholder='Enter designation'
                                name='designation'
                                className='form-control'
                                value={postData.designation}
                                onChange={handleChange}
                            />
                        </div>
                        <button type='submit' className='btn btn-info my-2'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const PostList = ({ postList, onEdit, onDelete }) => {
    return (
        <div className='col-md-8'>
            <div className="card">
                <div className="card-header">
                    <h3>Employee Table</h3>
                </div>
                <div className="card-body">
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postList.map((post, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{post.name}</td>
                                    <td>{post.designation}</td>
                                    <td>
                                        <button className='btn btn-sm btn-success mx-2' onClick={() => onEdit(post.id)}>Edit</button>
                                        <button className='btn btn-sm btn-danger' onClick={() => onDelete(post.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const PostManagement = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [postData, setPostData] = useState({
        name: '',
        designation: ''
    });
    const [postList, setPostList] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value
        });
    };

    const getAllData = async () => {
        const result = await axios.get('http://localhost:5000/posts');
        setPostList(result.data);
    };

    useEffect(() => {
        getAllData();
        if (id) {
            axios.get(`http://localhost:5000/posts/${id}`).then(result => {
                setPostData(result.data);
            }).catch(error => console.log(error));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            axios.put(`http://localhost:5000/posts/${id}`, postData).then(result => {
                if (result) {
                    alert('Data Updated Successfully...!');
                    setPostData({ name: '', designation: '' }); 
                    navigate('/Employee'); 
                    getAllData(); 
                } else {
                    alert('Error in saving data');
                }
            });
        } else {
            axios.post('http://localhost:5000/posts', postData).then(result => {
                if (result) {
                    alert('Data Saved Successfully...!');
                    setPostData({ name: '', designation: '' }); 
                    navigate('/Employee'); 
                    getAllData(); 
                } else {
                    alert('Error in saving data');
                }
            });
        }
    };

    const onEdit = (id) => {
        if (id) {
            navigate(`/postForm/${id}`);
        } else {
            setPostData({
                name: '',
                designation: ''
            });
            navigate('/Employee');
        }
    };

    const onDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this record');
        if (confirmDelete) {
            axios.delete(`http://localhost:5000/posts/${id}`).then(result => {
                alert('Record deleted Successfully...!');
                getAllData();
            }).catch(error => alert(error));
        }
    };

    return (
        <div className='container mt-3 row'>
            <PostForm postData={postData} handleChange={handleChange} handleSubmit={handleSubmit} />
            <PostList postList={postList} onEdit={onEdit} onDelete={onDelete} />
        </div>
    );
};

export default PostManagement;
