import { useState } from "react";
import { URLusers, addItem } from "../utils";

const NewUser = ({ usersLength, dataUsers, setAddUser, changeStatus }) => {
  const [newUser, setNewUser] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addNewUser = async () => {
    let ifExists = true;
    let counterId = usersLength;
    let newArr = [];

    while (ifExists) {
      counterId += 1;
      newArr = dataUsers.filter((user) => user.id === counterId);

      if (newArr.length === 0) {
        ifExists = false;
      }
    }

    setAddUser({
      id: counterId,
      name: newUser.name,
      username: " ",
      email: newUser.email,
      address: {
        street: " ",
        suite: " ",
        city: " ",
        zipcode: " ",
        geo: {
          lat: " ",
          lng: " ",
        },
      },
      phone: " ",
      website: " ",
      company: {
        name: " ",
        catchPhrase: " ",
        bs: " ",
      },
    });

    const { data } = await addItem(URLusers, newUser);
    console.log(data);

    closeForm();
  };

  const closeForm = () => {
    changeStatus(false);
  };

  return (
    <div>
      <h2>Add new user</h2>

      <label>Name: </label>
      <input name="name" type="text" onChange={handleChange} />

      <label>Email: </label>
      <input name="email" type="text" onChange={handleChange} />

      <button className="button buttonMargin" onClick={closeForm}>
        Cancel
      </button>

      <button className="button buttonColor" onClick={addNewUser}>
        Add
      </button>
    </div>
  );
};

export default NewUser;
