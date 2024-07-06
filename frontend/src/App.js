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
const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/scroll" /> },
  {
    path: "/scroll",
    element: <Scroll />,
  },
  {
    path: "/projects",
    element: <Project />,
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
    path: "/:username",
    element: <Profile />,
  },
  {
    path: "/:id/edit",
    element: <EditProfile />,
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
