import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./App.css";
import AllRoutes from "./components/Routes/AllRoutes";
import { Stack } from "@mui/material";

function App() {
  return (
    <Stack sx={{ width: "100%" }}>
      <Navbar />
      <Stack sx={{ width: { xs: "100%", md: "80%" }, margin: "0 auto" }}>
        <AllRoutes />
      </Stack>
      <Footer />
    </Stack>
  );
}

export default App;
