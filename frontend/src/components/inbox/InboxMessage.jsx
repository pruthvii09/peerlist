import React from "react";
import Hand from "../../assets/icons/Hand";
import { BadgeCheck, Slash } from "lucide-react";
import Chat from "./Chat";

const InboxMessage = ({ recept, setRecept }) => {
  return (
    <div>
      {!recept ? (
        <div className="mt-[52px] hidden h-[calc(100vh-52px)] w-[640px] border-r border-gray-300 md:flex items-center justify-center ">
          <div className="px-24">
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
                    Ensure your messages are clear and professional to avoid
                    being perceived as spammy or scammy.
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
                    Ensure your messages are clear and professional to avoid
                    being perceived as spammy or scammy.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center flex flex-col gap-2 items-center justify-center">
              <p className="text-xs ">
                Select an existing conversation or start a new one.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Chat setRecept={setRecept} recept={recept} />
      )}
    </div>
  );
};

export default InboxMessage;
