import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { postCreateUser } from "../services/UserService";

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const handleSave = async () => {
    let res = await postCreateUser(name, job);
    console.log(res);
    if (res && res.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("Created user succeed");
      handleUpdateTable({ first_name: name, id: res.id });
    } else {
      toast.error("An error...");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
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
          <Button variant="primary" onClick={() => handleSave()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
