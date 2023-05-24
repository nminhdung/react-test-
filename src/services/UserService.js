import axios from "./customize-axios";

const fetchAllUser = (page) => {
  return axios.get(`api/users?page=${page}`);
};

const postCreateUser = (newName, newJob) => {
  return axios.post("api/users", { name: newName, job: newJob });
};
const putUpdateUser = (id, updateName, updateJob) => {
  return axios.put(`api/users/${id}`, { name: updateName, job: updateJob });
};
const deleteUser = (id) => {
  return axios.delete(`api/user/${id}`);
};
export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser };
