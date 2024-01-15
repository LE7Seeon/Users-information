import { useEffect, useState } from "react";
import "../StyleSheet.css";
import { URLusers, getAll } from "../utils";
import NewUser from "./NewUser";
import Posts from "./Posts";
import Search from "./Search";
import Tasks from "./Tasks";
import User from "./User";

const Users = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [chars, setChars] = useState("");
  const [userSelected, setUserSelected] = useState({});
  const [selectedId, setSelectedId] = useState(0);
  const [isViewTodosPosts, setIsViewTodosPosts] = useState(false);
  const [isViewAddUser, setIsViewAddUser] = useState(false);
  const [borderColor, setBorderColor] = useState(false);

  const setDeleteUser = (id) => {
    const dataUsersCopy = [...dataUsers];
    const index = dataUsersCopy.findIndex((user) => user.id === id);

    if (index != -1) {
      dataUsersCopy.splice(index, 1);
      setDataUsers(dataUsersCopy);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: allUsers } = await getAll(URLusers);
      setDataUsers(allUsers);
    };
    fetchData();
  }, []);

  const searchChars = (newChars) => {
    setChars(newChars);
  };

  const selectedUser = (user) => {
    setUserSelected(user);
    setSelectedId(user.id);
    setIsViewTodosPosts(!isViewTodosPosts);
    setIsViewAddUser(false);
  };

  const changeStatusAddUser = (status) => {
    setIsViewTodosPosts(false);
    setIsViewAddUser(status);
    setUserSelected({});
  };

  const changeColor = (status) => {
    setBorderColor(status);
  };

  const setAddUser = (user) => {
    const dataUsersCopy = [...dataUsers];
    dataUsersCopy.push(user);

    console.log("user", user);

    setDataUsers(dataUsersCopy);
  };

  const updateUser = (updatedUser) => {
    const dataUsersCopy = [...dataUsers];
    const index = dataUsersCopy.findIndex((user) => user.id === updatedUser.id);

    if (index != -1) {
      dataUsersCopy[index] = updatedUser;

      console.log(updatedUser);

      setDataUsers(dataUsersCopy);
    }
  };

  return (
    <div className="grid-users-page">
      <div className="users-area">
        <div className="headerUsers">
          <div className="dSearch">
            <Search searchChars={searchChars} />
          </div>

          <button
            onClick={() => changeStatusAddUser(true)}
            className="dAddUser"
          >
            Add User
          </button>
        </div>

        <div className="users-container">
          {dataUsers.map((user) => {
            return (
              (user.name.includes(chars) || user.email.includes(chars)) && {
                user,
              } && (
                <User
                  key={user.id}
                  user={user}
                  borderColor={borderColor}
                  selectedId={selectedId}
                  selectedUser={selectedUser}
                  setDeleteUser={setDeleteUser}
                  updateUser={updateUser}
                  changeColor={changeColor}
                ></User>
              )
            );
          })}
        </div>
      </div>

      <div className="sidebar-area">
        <h2>
          Name: <span className="userDetails">{userSelected.name}</span>
        </h2>
        <h2>
          User ID: <span className="userDetails">{userSelected.id}</span>
        </h2>
        <hr></hr>

        {isViewTodosPosts && (
          <Tasks changeColor={changeColor} userId={userSelected.id} />
        )}
        {isViewTodosPosts && <Posts userId={userSelected.id} />}
        {isViewAddUser && (
          <NewUser
            setAddUser={setAddUser}
            changeStatus={changeStatusAddUser}
            usersLength={dataUsers.length}
            dataUsers={dataUsers}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
