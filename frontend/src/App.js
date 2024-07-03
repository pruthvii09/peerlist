import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Scroll from "./pages/Scroll";
import Project from "./pages/Project";
import Jobs from "./pages/Jobs";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
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
    path: "/:id",
    element: <Profile />,
  },
  {
    path: "/:id/edit",
    element: <EditProfile />,
  },
]);
function App() {
  return (
    <div className=" pl-0">
      <div className="lg:w-[1200px] w-full min-h-screen mx-auto flex font-body">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
