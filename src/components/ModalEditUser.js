import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { putUpdateUser } from "../services/UserService";

const ModalEditUser = (props) => {
  const { show, userEdit, handleClose, handleEditFormModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEidtUser = async () => {
    let res = await putUpdateUser(userEdit.id, name, job);
    if (res && res.updatedAt) {
      handleEditFormModal({ first_name: name, id: userEdit.id });
      toast.success("Updated user success");
      handleClose();
    } else {
      console.log("error");
    }
    console.log(res);
  };
  useEffect(() => {
    if (show) {
      setName(userEdit.first_name);
    }
  }, [userEdit]);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-addnew">
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputJob" className="form-label">
                Job
              </label>
              <input
                type="text"
                className="form-control"
                id="inputJob"
                placeholder="Enter job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEidtUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
