import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Scroll from "./pages/Scroll";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer } from "react-toastify";

import Project from "./pages/Project";
import Jobs from "./pages/Jobs";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import DetailModal from "./components/modals/DetailModal";
import { useSelector } from "react-redux";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import ViewProject from "./pages/ViewProject";
import JobPreference from "./pages/JobPreference";
import UserPosts from "./pages/UserPosts";
import UserResume from "./pages/UserResume";
import AddExperience from "./pages/AddExperience";
import AddEducation from "./pages/AddEducation";
import NotFound from "./pages/NotFound";
import SinglePost from "./pages/SinglePost";
import Notification from "./pages/Notifications";
import MyNetwork from "./pages/MyNetwork";
import EditExperience from "./pages/EditExperience";
import Account from "./pages/Account";
import Inbox from "./pages/Inbox";
import UserUpvoted from "./pages/UserUpvoted";
import Analytics from "./pages/Analytics";
import Edit from "./pages/Edit";
const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/scroll" /> },
  {
    path: "/scroll",
    element: <Scroll />,
  },
  {
    path: "/edit",
    element: <Edit />,
  },
  {
    path: "/scroll/post/:id",
    element: <SinglePost />,
  },
  {
    path: "/projects/week/:week",
    element: <Project />,
  },
  {
    path: "/notifications",
    element: <Notification />,
  },
  {
    path: "/my-network",
    element: <MyNetwork />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/inbox",
    element: <Inbox />,
  },
  {
    path: "/user/:id",
    element: <Profile />,
  },
  {
    path: "/:id/settings/edit",
    element: <EditProfile />,
  },
  {
    path: "/:id/settings/account",
    element: <Account />,
  },
  {
    path: "/:id/settings/job-preference",
    element: <JobPreference />,
  },
  {
    path: "/:id/posts",
    element: <UserPosts />,
  },
  {
    path: "/user/upvotes",
    element: <UserUpvoted />,
  },
  {
    path: "/user/profile-analytics",
    element: <Analytics />,
  },
  {
    path: "/:id/resume",
    element: <UserResume />,
  },
  {
    path: "/:id/resume/add-experience",
    element: <AddExperience />,
  },
  {
    path: "/:id/resume/edit-experience/:expId",
    element: <EditExperience />,
  },
  {
    path: "/:id/resume/add-education",
    element: <AddEducation />,
  },
  {
    path: "/projects/add-project",
    element: <AddProject />,
  },
  {
    path: "/projects/edit-project/:id",
    element: <EditProject />,
  },
  {
    path: "/projects/view/:id",
    element: <ViewProject />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
function App() {
  const { user } = useSelector((store) => store.user);
  return (
    <div className=" pl-0">
      <div className="lg:w-[1200px] w-full min-h-screen mx-auto flex font-body">
        <RouterProvider router={router} />
      </div>
      {user && <>{!user.username && <DetailModal />}</>}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
