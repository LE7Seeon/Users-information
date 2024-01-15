import { useState } from "react";
import "../StyleSheet.css";
import { URLusers, deleteItem, updateItem } from "../utils";

const User = ({
  user,
  selectedId,
  selectedUser,
  changeColor,
  borderColor,
  setDeleteUser,
  updateUser,
}) => {
  const [userData, setUserData] = useState(user);
  const [otherData, setOtherData] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();

    updateUser(userData);

    if (userData.id <= 10) {
      const { data } = await updateItem(URLusers, userData.id, userData);
      console.log(data);
    }
  };

  const deleteUser = async () => {
    setDeleteUser(userData.id);

    if (userData.id <= 10) {
      const { data } = await deleteItem(URLusers, userData.id);
      console.log(data);
    }
  };

  const openOtherData = () => {
    setOtherData(true);
  };

  const closeOtherData = () => {
    setOtherData(false);
  };

  const changeById = () => {
    selectedUser(userData);
    changeColor(false);
  };

  return (
    <div
      className="user"
      style={{
        border:
          selectedId == userData.id && borderColor
            ? "2px solid #16A085"
            : "2px solid salmon",
        backgroundColor: selectedId == userData.id ? "#ffe1cc" : "white",
      }}
    >
      <form onSubmit={handelSubmit}>
        <label onClick={changeById}>User ID: {user.id}</label>
        <br></br>

        <label>Name: </label>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <br></br>

        <label>Email: </label>
        <input
          type="text"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <br></br>

        <label
          className="txtOtherData"
          onMouseOver={openOtherData}
          onClick={closeOtherData}
        >
          {otherData ? "-" : "+"} Other Data
        </label>

        <div style={{ display: otherData ? "block" : "none" }}>
          <hr />

          <label>Street: </label>
          <input
            type="text"
            value={userData.address.street}
            onChange={(e) =>
              setUserData({
                ...userData,
                address: { ...userData.address, street: e.target.value },
              })
            }
          />
          <br></br>

          <label>City: </label>
          <input
            type="text"
            value={userData.address.city}
            onChange={(e) =>
              setUserData({
                ...userData,
                address: { ...userData.address, city: e.target.value },
              })
            }
          />
          <br></br>

          <label>ZipCode: </label>
          <input
            type="text"
            value={userData.address.zipcode}
            onChange={(e) =>
              setUserData({
                ...userData,
                address: { ...userData.address, zipcode: e.target.value },
              })
            }
          />
          <br></br>

          <br></br>
          <hr />
        </div>
        <br></br>

        <button className="button buttonMargin buttonColor" type="submit">
          Update
        </button>

        <button className="button" onClick={deleteUser}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default User;
