import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer } from "react-toastify";
import DetailModal from "./components/modals/DetailModal";

import {
  Account,
  AddEducation,
  AddExperience,
  AddJob,
  AddProject,
  Analytics,
  Edit,
  EditExperience,
  EditProfile,
  EditProject,
  Home,
  Inbox,
  JobPreference,
  Jobs,
  MyNetwork,
  NotFound,
  Notifications,
  Profile,
  Project,
  Scroll,
  Search,
  SinglePost,
  UserPosts,
  UserResume,
  UserUpvoted,
  ViewProject,
} from "./pages";
import { useSelector } from "react-redux";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
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
    element: <Notifications />,
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
    path: "/add-job",
    element: <AddJob />,
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
    <div className="pl-0">
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
