import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import Layout from "./views/Layout";
import Home from "./views/Home";
import Posts from "./views/Posts";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
