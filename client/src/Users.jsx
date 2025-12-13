import React, { useState, useEffect } from "react";
import api from "./api"
import { Link } from "react-router-dom";

function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [ageFilter, setAgeFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("none");

    useEffect(() => {
        api.get("/")
            .then(result => setUsers(result.data))
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        api.delete("/deleteUser/" + id)
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    const filteredUsers = users.filter((user) => {
        const s = search.toLowerCase();
        return (
            user.name.toLowerCase().includes(s) ||
            user.email.toLowerCase().includes(s)
        );
    });

    // Age Filter 
    const ageFiltered = filteredUsers.filter((user) => {
        if (ageFilter === "all") return true;
        if (ageFilter === "below30") return user.age < 30;
        if (ageFilter === "30to50") return user.age >= 30 && user.age <= 50;
        if (ageFilter === "above50") return user.age > 50;
    });

    //Sorting
    const sortedUsers = [...ageFiltered].sort((a, b) => {
        if (sortOrder === "nameAsc") return a.name.localeCompare(b.name);
        if (sortOrder === "nameDesc") return b.name.localeCompare(a.name);
        if (sortOrder === "ageAsc") return a.age - b.age;
        if (sortOrder === "ageDesc") return b.age - a.age;
        return 0;
    });


    return (
        <div className="conatiner py-4 vh-100">
            <div className="card shadow p-4">
                <h2 className="text-center mb-3">User Management System</h2>

                {/* Search + Filters */}
                <div className="row g-2 mb-3">

                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name or email"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="col-md-4">
                        <select className="form-select" value={ageFilter}
                            onChange={(e) => setAgeFilter(e.target.value)}>
                            <option value="all">All Ages</option>
                            <option value="below30">Below 30</option>
                            <option value="30to50">30 - 50</option>
                            <option value="above50">Above 50</option>
                        </select>
                    </div>

                    <div className="col-md-4">
                        <select className="form-select" value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="none">Sort By</option>
                            <option value="nameAsc">Name (A-Z)</option>
                            <option value="nameDesc">Name (Z-A)</option>
                            <option value="ageAsc">Age (Low-High)</option>
                            <option value="ageDesc">Age (High-Low)</option>
                        </select>
                    </div>

                </div>

                <div className="d-flex justify-content-end mb-3">
                    <Link to="/create" className='btn btn-success'>Add +</Link></div>
                <div className="table-responsive">
                    <table className="table table-bordered text-center">
                        <thead className="table-light">
                            <tr >
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th width="25%">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sortedUsers.length > 0 ? (
                                sortedUsers.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.age}</td>
                                        <td className="d-flex justify-content-center gap-2 flex-wrap">
                                            <Link to={`/read/${user._id}`} className="btn btn-primary btn-sm">Read</Link>
                                            <Link to={`/update/${user._id}`} className="btn btn-info btn-sm">Update</Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4">No users found</td></tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}
export default Users;