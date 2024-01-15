import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./StyleSheet.css";
import Header from "./Components/Header";
import Users from "./Components/Users";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="grid-container">
      <Header />
      <Users />
    </div>
  );
}

export default App;
