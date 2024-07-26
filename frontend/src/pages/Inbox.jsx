import React from "react";
import Sidebar from "../components/utils/Sidebar";
import { MessageCirclePlus } from "lucide-react";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import GradientCard from "../components/utils/GradientCard";
import GradientCard2 from "../components/utils/GradientCard2";
import InboxMessage from "../components/inbox/InboxMessage";
import { useModal } from "../context/ModalContext";

const Inbox = () => {
  const { showModal } = useModal();
  return (
    <Sidebar>
      <div className="flex">
        <div className="md:w-[640px] w-full">
          <ComponentHeader
            title="Inbox"
            children={
              <div
                onClick={() => showModal("search")}
                className="flex cursor-pointer items-center gap-1 bg-[#00aa45] px-3 py-0.5 rounded-full border-2 border-[#219653]"
              >
                <MessageCirclePlus size={16} className="text-white" />
                <span className="text-xs text-white">New Message</span>
              </div>
            }
          />
          <InboxMessage />
        </div>
        <Rightsidebar>
          <div className="mt-8 flex flex-col gap-4 px-6">
            <GradientCard />
            <GradientCard2 />
          </div>
        </Rightsidebar>
      </div>
    </Sidebar>
  );
};

export default Inbox;
