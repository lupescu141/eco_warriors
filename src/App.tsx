import "./App.css";
import "./styles/Root.css";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import Layout from "./views/Layout";
import Home from "./views/Home";
import Posts from "./views/Posts";
import SinglePost from "./views/SinglePost";
import Tasks from "./views/Tasks";
import { UserProvider } from "./contexts/UserContext";
import Logout from "./components/Logout";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/single" element={<SinglePost />} />
            <Route path="/myTasks" element={<Tasks />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
