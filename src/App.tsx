import "./App.css";
import "./styles/Root.css";
import "./styles/NewestPost.css";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import Layout from "./views/Layout";
import Home from "./views/Home";
import Posts from "./views/Posts";
import MyPostsView from "./views/MyPostsView";
import { Logout } from "./views/Logout";
import SinglePost from "./views/SinglePost";
import Tasks from "./views/Tasks";
import { UserProvider } from "./contexts/UserContext";
import ScrollToTop from "react-scroll-to-top";
import { ShowFromTop } from "./components/ShowFromTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

import Leaderboard from "./views/Leaderboard";

import { Profile } from "./views/Profile";

<FontAwesomeIcon icon={faChevronUp} />;

const App = () => {
  return (
    <Router>
      <ShowFromTop />
      <ScrollToTop
        smooth
        color="#fff"
        component={<FontAwesomeIcon icon={faChevronUp} />}
        className="scroll-to-top-btn"
      />
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/single" element={<SinglePost />} />
            <Route path="/myTasks" element={<Tasks />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/myposts" element={<MyPostsView />} />

            <Route path="/leaderboard" element={<Leaderboard />} />

            <Route path="/profile" element={<Profile />} />

          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
