import React, { useState } from "react";
import api from "./api"
import { useNavigate } from "react-router-dom";

function CreateUsers() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        api.post("/createUser", { name, email, age })
            .then(result => {
                console.log(result)
                navigate('/')
            })
            .catch(err => console.log(err))
    }



    return (
        <div className="container py-4">
            <div className="card-shadow p-4 mx-auto" style={{ maxwidth: "500px" }}>
                <h2 className="text-center mb-3">Add New User</h2>
                <form onSubmit={Submit}>
                    <div className="mb-3">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control"
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Enter Email" className="form-control"
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Age</label>
                        <input type="number" placeholder="Enter Age" className="form-control"
                            onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <button className="btn btn-success w-100">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default CreateUsers;
