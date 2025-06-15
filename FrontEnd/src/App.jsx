import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "../middleware/ProtectedRoutes";
import Login from "./pages/Login";
import BlogPage from "./pages/BlogPage";
import SignUp from "./pages/SignUp";
import Success from "./pages/Success";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/blog" element={<BlogPage />}></Route>
        </Route>
        <Route path="/success" element={<Success />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
