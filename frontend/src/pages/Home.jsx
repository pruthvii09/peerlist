import React, { useEffect } from "react";
import Logo from "../assets/Logo.svg";
import Button from "../components/utils/ui/Button";
import { useModal } from "../context/ModalContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { showModal } = useModal();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  useEffect(() => {
    if (user) {
      navigate("/scroll");
    }
  }, [user, navigate]);
  return (
    <div className="border-r border-l border-gray-300 w-full">
      <div className="w-[200px] h-[200px] absolute top-[30%] left-[20%] translate-x-[-50%] translate-y-[-50%] bg-green-500 rounded-full opacity-40 blur-[120px] pointer-events-none"></div>
      <div className="w-[200px] h-[200px] absolute top-[70%] right-[0%] translate-x-[-50%] translate-y-[-50%] bg-green-500 rounded-full opacity-40 blur-[120px] pointer-events-none"></div>
      <div className="flex items-center justify-between px-10 py-2 border-b border-gray-300 min-h-[52px] h-[52px]">
        <div>
          <img src={Logo} alt="Logo" />
        </div>
        <div className="flex items-center gap-6">
          <Button
            title="Log in"
            onClick={() => showModal("login")}
            className="bg-[#24292e] text-sm border-2 border-[#24292e] px-4 py-1 text-white rounded-full"
          />
          <Button
            title="Join Now"
            onClick={() => showModal("signup")}
            className="bg-[#00aa45] text-white hidden md:block border-2 border-[#219653] rounded-full px-3.5 py-0.5 hover:bg-[#219653]"
          />
        </div>
      </div>
      <div
        className="flex items-center justify-center flex-col w-full"
        style={{ height: "calc(100vh - 52px)" }}
      >
        <h1 className="font-instrumentic italic text-[56px] md:text-[120px] text-center leading-[110%] mb-10 md:mb-8">
          <i className="font-instrumentic italic">The Professional Network</i>
          <span className="text-zinc-500 font-instrumentic italic">
            {" "}
            for people in tech!
          </span>
        </h1>
        {/* <h2 className="md:text-[110px] sm:text-7xl text-3xl text-zinc-500 font-instrumentic italic">
          for people in tech!
        </h2> */}
        <div className="mt-4">
          <Button
            title="Join Now"
            onClick={() => showModal("signup")}
            className="px-10 py-3 text-2xl bg-[#00aa45] text-white border-2 border-[#219653] rounded-full hover:bg-[#219653]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
