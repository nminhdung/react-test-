import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";

const TableUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    //call api
    getAllUsers();
  }, []);
  const getAllUsers = async () => {
    let res = await fetchAllUser();
    if (res && res.data && res.data.data) {
      setUsers(res.data.data);
    }
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.length > 0 &&
          users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default TableUsers;
