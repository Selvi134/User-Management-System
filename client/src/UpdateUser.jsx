import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./api";

function UpdateUser() {

    const { id } = useParams() //to get id from url
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        api.get("/getUser/" + id)
            .then(result => {
                console.log(result)
                setName(result.data.name)
                setEmail(result.data.email)
                setAge(result.data.age)
            })

            .catch(err => console.log(err))
    }, [])

    const Update = (e) => {
        e.preventDefault()
        api.put("/updateUser/" + id, { name, email, age })
            .then(result => {
                console.log(result)
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container py-4">
            <div className="card-shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
                <h2 className="text-center mb-3">Update User</h2>
                <form onSubmit={Update}>
                    <div className="mb-3">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control" value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Enter Email" className="form-control" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Age</label>
                        <input type="number" placeholder="Enter Age" className="form-control" value={age}
                            onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <button className="btn btn-success w-100">Update</button>
                </form>
            </div>
        </div>
    )
}
export default UpdateUser;
