import { useEffect, useState } from "react";
import "./App.css";
import routes from "./routes/Routes";
import { Routes } from "react-router-dom/dist";
import { Center, Spinner } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  async function getUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({
        type: "login",
        payload: user,
      });
    }
  }

  useEffect(() => {
    getUser();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Center w="100vw" h="100vh">
          <Spinner size={"xl"} />
        </Center>
      ) : (
        <Routes>{routes.map((val) => val)}</Routes>
      )}
    </>
  );
}

export default App;
