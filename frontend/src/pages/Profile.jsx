import React from "react";
import Sidebar from "../components/utils/Sidebar";
import { Edit, Plus } from "lucide-react";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import GradientCard from "../components/utils/GradientCard";
import UserProfile from "../components/profile/UserProfile";
import { Link } from "react-router-dom";
import AddProject from "../components/profile/AddProject";

const integrations = [
  {
    id: 1,
    title: "DEV",
    image:
      "https://media.dev.to/cdn-cgi/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png",
  },
  {
    id: 2,
    title: "Github",
    image:
      "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
  },
  {
    id: 3,
    title: "Youtube",
    image:
      "https://t3.ftcdn.net/jpg/07/22/13/68/240_F_722136822_VIVcS7fxKb4ippA6kRYCoLwvS0J69hpB.jpg",
  },
];

const Profile = () => {
  return (
    <Sidebar>
      <div className="flex">
        <div className="sm:w-[640px] w-full">
          <ComponentHeader
            title="Pruthviraj Auti"
            iconConfig={{ icon: Edit }}
            href="/id/edit"
          />
          <div className="border-r border-gray-300">
            <UserProfile />
            <div className="mx-6 flex items-center justify-center gap-10 border-b border-gray-300 text-xs font-semibold">
              <Link className="py-2.5 border-b-2 text-[#00aa45] border-[#00aa45]">
                WORK
              </Link>
              <Link className="py-2.5 hover:border-gray-600 hover:border-b-2">
                ABOUT
              </Link>
              <Link className="py-2.5 hover:border-gray-600 hover:border-b-2">
                RESUME
              </Link>
              <Link className="py-2.5 hover:border-gray-600 hover:border-b-2">
                POSTS
              </Link>
            </div>
            <div className="pt-8 pb-10 w-full px-6">
              <h1 className="font-medium mb-4">Showcase your work from:</h1>
              <div className="grid grid-cols-3 gap-4">
                {integrations?.map((integration) => (
                  <div
                    key={integration.id}
                    className="group hover:cursor-pointer hover:bg-white hover:shadow-md duration-400 ease-linear flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-[#f6f8fa]"
                  >
                    <div className="flex items-center gap-2 ">
                      <img
                        height={16}
                        width={16}
                        src={integration.image}
                        alt=""
                      />
                      <span className="text-sm">{integration.title}</span>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center group-hover:bg-green-600 rounded-full">
                      <Plus
                        className="group-hover:text-white group-hover:-rotate-90 focus-visible:-rotate-90 transition duration-400 ease-linear"
                        size={16}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <AddProject />
          </div>
        </div>
        <Rightsidebar>
          <div className="mt-8 border-r">
            <GradientCard />
          </div>
        </Rightsidebar>
      </div>
    </Sidebar>
  );
};

export default Profile;
