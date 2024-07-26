import React from "react";
import Hand from "../../assets/Hand";
import { BadgeCheck, Slash } from "lucide-react";
import Button from "../utils/ui/Button";
import { useModal } from "../../context/ModalContext";

const InboxMessage = () => {
  const { showModal } = useModal();
  return (
    <div className="mt-[52px] h-[calc(100vh-52px)] w-[640px] border-r border-gray-300 flex items-center justify-center ">
      <div className="px-20">
        <p className="uppercase font-semibold text-xs tracking-wider text-gray-700 text-center">
          Peerlist inbox
        </p>
        <div className="flex items-center flex-col gap-6 justify-center mt-4">
          <div className="flex gap-4">
            <Hand />
            <div>
              <h1 className="text-sm font-semibold">
                Be more than just hi's and hello's.
              </h1>
              <p className="text-xs font-light text-gray-600">
                Ensure your messages are clear and professional to avoid being
                perceived as spammy or scammy.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <BadgeCheck size={35} />
            <div>
              <h1 className="text-sm font-semibold">
                Only available to verified peers
              </h1>
              <p className="text-xs font-light text-gray-600">
                Only receive messages from genuine, verified people, free of
                bots and spam.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Slash size={35} className="-rotate-12" />
            <div>
              <h1 className="text-sm font-semibold">
                Be more than just hi's and hello's.
              </h1>
              <p className="text-xs font-light text-gray-600">
                Ensure your messages are clear and professional to avoid being
                perceived as spammy or scammy.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center flex flex-col gap-2 items-center justify-center">
          <p className="text-xs ">
            Select an existing conversation or start a new one.
          </p>
          <Button
            onClick={() => showModal("search")}
            className="text-xs bg-[#00aa45] text-white px-3 py-0.5 rounded-full border-2 border-[#219653]"
            title="New Message"
          />
        </div>
      </div>
    </div>
  );
};

export default InboxMessage;
