import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _ from "lodash";

const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});

  const handleClose = () => {
    setShowModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
  };
  const getAllUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
      setUsers(res.data);
    }
  };
  const handlePageClick = ({ selected }) => {
    getAllUsers(selected + 1);
  };
  const handleEditUser = (user) => {
    setShowEditModal(true);
    setDataUserEdit(user);
  };
  const handleUpdateTable = (user) => {
    setUsers([...users, user]);
  };

  useEffect(() => {
    //call api
    getAllUsers(1);
  }, []);

  const handleEditFormModal = (userEdited) => {
    let cloneUsers = _.cloneDeep(users);
    let index = users.findIndex((item) => item.id === userEdited.id);
    cloneUsers[index].first_name = userEdited.first_name;
    setUsers(cloneUsers);
    console.log(users, cloneUsers);
  };
  const handleDelete = (user) => {
    setShowDeleteModal(true);
    setDataUserDelete(user);
    console.log(user);
  };
  const handleDeleteForm = (user) => {
    let cloneUsers = _.cloneDeep(users);

    cloneUsers = users.filter((item) => item.id !== user.id);
    setUsers(cloneUsers);
  };
  return (
    <>
      <div className="my-3 add-new">
        <h3> List users:</h3>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          Add new user
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
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
                  <td>
                    <button
                      className="btn btn-warning mx-3 "
                      onClick={() => handleEditUser(user)}
                    >
                      edit
                    </button>
                    <button
                      className="btn btn-danger "
                      onClick={() => handleDelete(user)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <ModalAddNew
        show={showModal}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={showEditModal}
        userEdit={dataUserEdit}
        handleClose={handleClose}
        handleEditFormModal={handleEditFormModal}
      />
      <ModalConfirm
        show={showDeleteModal}
        handleClose={handleClose}
        userDelete={dataUserDelete}
        handleDeleteForm={handleDeleteForm}
      />
    </>
  );
};

export default TableUsers;
