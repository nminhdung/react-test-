import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteUser } from "../services/UserService";
const ModalConfirm = (props) => {
  const { show, handleClose, userDelete, handleDeleteForm } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const handleConfirm = async () => {
    let res = await deleteUser(userDelete.id);
    if (res && +res.statusCode === 204) {
      toast.success("Delete user succeed");
      handleDeleteForm(userDelete);
      handleClose();
    } else {
      toast.error("error delete user");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-addnew">
            This action can't be undone! Do you want to delete this user?
            <b>email={userDelete.email}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirm()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
