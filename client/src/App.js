import "./App.css";
import routes from "./routes/Routes";
import { Routes } from "react-router-dom/dist";

function App() {
  return (
    <>
      <Routes>{routes.map((val) => val)}</Routes>
    </>
  );
}

export default App;
