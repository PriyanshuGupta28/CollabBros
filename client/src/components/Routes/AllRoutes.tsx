import { Route, Routes } from "react-router-dom";
import TextEditor from "../TextEditor/TextEditor";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<TextEditor />} // Renders TextEditor when on / route
        />
        <Route
          path="/room/:roomId"
          element={<TextEditor />} // Renders TextEditor when on /:roomId route
        />
      </Routes>
    </>
  );
};
export default AllRoutes;
