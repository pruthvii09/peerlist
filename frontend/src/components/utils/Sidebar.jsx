import React from "react";
import { Search, ArrowRight } from "lucide-react";
import Navlink from "./Navlink";
import Button from "./ui/Button";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import { useSelector } from "react-redux";
import { getCurrentWeekNumber } from "../../utils/functions";
import Project from "../../assets/icons/Project";
import Job from "../../assets/icons/Job";
import Home from "../../assets/icons/Home";
import Message from "../../assets/icons/Message";
import Network from "../../assets/icons/Network";
const currentWeekNumber = getCurrentWeekNumber();

const routes = [
  {
    title: "Scroll",
    href: "/scroll",
    icon: Home,
  },
  {
    title: "Projects",
    href: `/projects/week/${currentWeekNumber}`,
    icon: Project,
  },
  {
    title: "Jobs",
    href: "/jobs",
    icon: Job,
  },

  {
    title: "Search",
    href: "/search",
    icon: Search,
  },
  {
    title: "My Network",
    href: "/my-network",
    icon: Network,
    authOnly: true,
  },
  {
    title: "Inbox",
    href: "/inbox",
    icon: Message,
    authOnly: true,
  },
];
const Sidebar = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  return (
    <div className="md:flex block w-full">
      <div className="md:w-[212px] w-full fixed z-[99] md:h-screen h-auto border-r border-gray-300">
        <Link to={"/"} className="md:flex hidden flex-col gap-8">
          <img width={124} height={32} className="py-3" src={Logo} alt="" />
        </Link>
        <div className="fixed overflow-y-auto bottom-0 right-0 left-0 grid grid-cols-5 w-full bg-white border-t border-gray-300 md:relative md:bottom-auto md:right-auto md:left-auto md:flex md:flex-col md:mt-5 md:h-auto md:bg-transparent md:border-t-0 px-2">
          {routes.map((route, i) => {
            if (route.authOnly && !user) {
              // Skip rendering this route if it's auth-only and the user is not authenticated
              return null;
            }
            if (route.title === "My Network") {
              return (
                <div className="md:block hidden">
                  <Navlink
                    key={i}
                    title={route.title}
                    href={route.href}
                    icon={route.icon}
                  />
                </div>
              );
            }
            return (
              <Navlink
                key={i}
                title={route.title}
                href={route.href}
                icon={route.icon}
              />
            );
          })}
          {user && (
            <Link
              to={`/user/${user?.username}`}
              className="md:flex hidden md:flex-row flex-col md:mt-4 mt-0 group items-center gap-2 md:py-2.5 py-3 hover:cursor-pointer"
            >
              <img
                width={24}
                height={24}
                className="rounded-full h-6 w-6 object-cover"
                src={user?.profileImageUrl}
                alt=""
              />
              <span className="group-hover:translate-x-1 text-[10px] md:text-base transition-all ease-in-out">
                {user?.firstname ? user?.firstname : "Profile"}
              </span>
            </Link>
          )}
        </div>
        <div className="bg-[#F6F8FA] hidden md:block py-4 px-2 mt-8 mr-6 border border-gray-300 rounded-lg">
          <img
            src="https://peerlist.io/images/profile-mobile-app.webp"
            alt=""
          />
          <div className="text-center flex items-center gap-1 justify-center flex-col">
            <h1 className="text-2xl font-instrumentic italic">
              Peerlist Mobile App
            </h1>
            <span className="text-xs  text-gray-600">
              Stay Connected with your peers, even on the go!
            </span>
            <Button
              title="Download App"
              className="text-white font-medium bg-black rounded-full text-xs px-2 py-1"
              iconConfig={{ icon: ArrowRight, size: 16 }}
            />
          </div>
        </div>
      </div>
      <div className="md:pl-[212px] pl-0">{children}</div>
    </div>
  );
};

export default Sidebar;
