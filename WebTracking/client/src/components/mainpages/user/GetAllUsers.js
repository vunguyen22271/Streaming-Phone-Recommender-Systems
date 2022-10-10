import React, { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
function GetAllUsers() {
  const state = useContext(GlobalState);
  const [users, setUsers] = useState([]);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  useEffect(() => {
    if (token && isAdmin) {
      const getAllUsers = async () => {
        try {
          const res = await axios.get("/user/get_user", {
            headers: { Authorization: token },
          });
          setUsers(res.data);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getAllUsers();
    }
  }, [token, isAdmin, setUsers]);
  return (
    <div className="user-page">
      <h2 style={{textAlign: "center",margin: "20px",textTransform: "capitalize",color: "#ee4d2d",}}>User List </h2>
      <h4 style={{marginTop: "20px", marginBottom: "18px", fontSize: "20px", textTransform: "capitalize",}}>The total number of Users is {users.length}</h4>
      <div>
        <table id="users">
          <thead>
            <tr>
              <th>Username</th>
              <th>Registration Date</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((items) => (
              <tr key={items._id}>
                <td>{items.name}</td>
                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                <td>{items.email}</td>
                <td>{items.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default GetAllUsers;
