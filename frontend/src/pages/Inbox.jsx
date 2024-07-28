import React, { useState } from "react";
import Sidebar from "../components/utils/Sidebar";
import { MessageCirclePlus } from "lucide-react";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import InboxMessage from "../components/inbox/InboxMessage";
import { useModal } from "../context/ModalContext";
import Conversations from "../components/inbox/Conversations";
import { useMediaQuery } from "react-responsive";

const Inbox = () => {
  const { showModal } = useModal();
  const [recept, setRecept] = useState(null);
  const isMediumOrLarger = useMediaQuery({ query: "(min-width: 768px)" });
  console.log("recept => ", recept);
  return (
    <Sidebar>
      <div className="flex">
        <div className="md:w-[640px] w-full">
          <ComponentHeader
            title="Inbox"
            children={
              <div
                onClick={() => showModal("search", { setRecept: setRecept })}
                className="flex cursor-pointer items-center gap-1 bg-[#00aa45] px-3 py-0.5 rounded-full border-2 border-[#219653]"
              >
                <MessageCirclePlus size={16} className="text-white" />
                <span className="text-xs text-white">New Message</span>
              </div>
            }
          />

          <InboxMessage recept={recept} setRecept={setRecept} />
        </div>
        <Rightsidebar>
          <div className="mt-4 flex flex-col gap-4">
            <Conversations recept={recept} setRecept={setRecept} />
          </div>
        </Rightsidebar>
      </div>
      {!isMediumOrLarger && (
        <Conversations recept={recept} setRecept={setRecept} />
      )}
    </Sidebar>
  );
};

export default Inbox;
