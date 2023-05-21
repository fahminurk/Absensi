import { useEffect, useState } from "react";
import "./App.css";
import routes from "./routes/Routes";
import { Routes } from "react-router-dom/dist";
import { Center, Spinner } from "@chakra-ui/react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
