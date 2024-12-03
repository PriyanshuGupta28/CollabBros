import { Stack, Typography } from "@mui/material";
import TextEditor from "./components/TextEditor/TextEditor";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Stack sx={{ width: { xs: "95%", md: "80%" } }}>
          <Typography
            variant="h2"
            sx={{ mb: 2 }}
            component={"h1"}
            align="center"
          >
            CollabBros
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mb: 2 }}
            component={"h2"}
            align="center"
          >
            Empowering Collaboration, Live Coding, Text Editing and Language
            sharing web app.
          </Typography>
          <TextEditor />
        </Stack>
      </Stack>
      <Footer />
    </>
  );
}

export default App;
