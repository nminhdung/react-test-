import React, { useEffect, useState } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _, { debounce } from "lodash";
import Papa from "papaparse";
import "../styles/table.scss";
import { toast } from "react-toastify";

const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const [searchTerm, setSearchTerm] = useState("");

  const [dataExport, setDataExport] = useState([]);

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
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUsers = _.cloneDeep(users);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setUsers(cloneListUsers);
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
  };
  const handleDelete = (user) => {
    setShowDeleteModal(true);
    setDataUserDelete(user);
  };
  const handleDeleteForm = (user) => {
    let cloneUsers = _.cloneDeep(users);

    cloneUsers = users.filter((item) => item.id !== user.id);
    setUsers(cloneUsers);
  };
  const handleSearch = debounce((e) => {
    let keyword = e.target.value;
    if (keyword) {
      console.log("search");
      let cloneListUsers = _.cloneDeep(users);
      cloneListUsers = cloneListUsers.filter((item) =>
        item.email.includes(keyword)
      );
      setUsers(cloneListUsers);
    } else {
      getAllUsers(1);
    }
  }, 1000);

  // const csvData = [
  //   ["firstname", "lastname", "email"],
  //   ["Ahmed", "Tomi", "ah@smthing.co.com"],
  //   ["Raed", "Labes", "rl@smthing.co.com"],
  //   ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  // ];
  // custom data theo csvData
  const getUsersExport = (event, done) => {
    let result = [];
    if (users && users.length > 0) {
      //customize header
      result.push(["Id", "Email", "First Name", "Last Name"]);
      users.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };
  const handleImport = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Upload only accept csv file...");
        return;
      }
      // Parse local CSV file
      Papa.parse(file, {
        // header:true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error("Wrong format CSV header");
              } else {
                let result = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                  }
                });
                setUsers([...users, ...result]);
              }
            } else {
              toast.error("Wrong format CSV file");
            }
          } else {
            toast.error("Not found data on CSV file");
          }
        },
      });
    }
  };
  return (
    <>
      <div className="my-3 add-new d-sm-flex">
        <h3> List users:</h3>
        <div className="d-flex align-items-center gap-1 mt-sm-0 mt-2">
          <label htmlFor="import" className="btn btn-warning">
            <i className="fa-solid fa-cloud-arrow-up px-1"></i>
            Import
          </label>
          <input
            type="file"
            id="import"
            onChange={(e) => handleImport(e)}
            hidden
          />

          <CSVLink
            data={dataExport}
            asyncOnClick={true}
            onClick={getUsersExport}
            filename={"users.csv"}
            className="btn btn-primary"
          >
            <i className="fa-solid fa-cloud-arrow-down px-1"></i>Export
          </CSVLink>
          <button
            className="btn btn-success d-flex gap-2 align-items-center"
            onClick={() => setShowModal(true)}
          >
            <i className="fa-solid fa-circle-plus "></i>
            Add new
          </button>
        </div>
      </div>
      <div className="col-12 col-sm-4 my-3">
        <input
          className="form-control"
          type="text"
          placeholder="Search user by Email"
          // value={searchTerm}
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div className="customize-table">
        {" "}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <div className=" sort-header">
                  <span>ID</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort("desc", "id")}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort("asc", "id")}
                    ></i>
                  </span>
                </div>
              </th>
              <th>Email </th>
              <th>
                <div className="sort-header">
                  <span>First Name</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort("desc", "first_name")}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort("asc", "first_name")}
                    ></i>
                  </span>
                </div>
              </th>
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
      </div>

      <ReactPaginate
      className="d-flex justify-content-center list-unstyled"
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
