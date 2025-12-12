import React, { useState, useEffect } from 'react'
import api from './api'
import { useParams, Link } from 'react-router-dom'

function ReadUser() {
    const { id } = useParams()
    const [user, setUsers] = useState([])

    useEffect(() => {
        api.get("/getUser/" + id)
            .then(result => setUsers(result.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div className="container py-4">
            <div className="card-shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
                <div className="text-center mb-3"><h2>User Details</h2></div>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <Link to="/" className='btn btn-success w-100 mt-3'>Back to Users</Link>
            </div>
        </div>
    )

}
export default ReadUser;