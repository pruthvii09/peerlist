import React, { useEffect } from "react";
import Sidebar from "../components/utils/Sidebar";
import { SlidersHorizontal } from "lucide-react";
import ComponentHeader from "../components/utils/ComponentHeader";
import Post from "../components/scroll/Post";
import Rightsidebar from "../components/utils/Rightsidebar";
import GradientCard from "../components/utils/GradientCard";
import GradientCard2 from "../components/utils/GradientCard2";
import { useModal } from "../context/ModalContext";
import { toast } from "react-toastify";

const Scroll = () => {
  const { showModal } = useModal();
  const handleIconClick = () => {
    showModal("preference");
  };
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    if (codeParam && localStorage.getItem("accessToken") === null) {
      async function getAccessToken() {
        await fetch(
          `${process.env.REACT_APP_BASE_URL}/users/getToken?code=` + codeParam,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            toast.success("Github Integrated..");
            if (data?.access_token) {
              localStorage.setItem("accessToken", data.access_token);
            }
          });
      }
      getAccessToken();
    }
  }, []);
  return (
    <Sidebar>
      <div className="flex">
        <div className="md:w-[640px] w-full">
          <ComponentHeader
            title="Scroll"
            iconConfig={{ icon: SlidersHorizontal }}
            onIconClick={handleIconClick}
          />
          <Post />
        </div>
        <Rightsidebar>
          <div className="mt-8 flex flex-col gap-4">
            <GradientCard />
            <GradientCard2 />
          </div>
        </Rightsidebar>
      </div>
    </Sidebar>
  );
};

export default Scroll;
