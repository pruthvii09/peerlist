import { Search, X } from "lucide-react";
import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import useSearchProfile from "../../hooks/profile/useSearchProfile";
import useDebounce from "../../hooks/useDebounce";

const SearchModal = ({ setRecept }) => {
  const { hideModal } = useModal();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { data } = useSearchProfile(debouncedQuery);
  console.log(data);
  const handleUserSelect = (user) => {
    setRecept(user);
    hideModal();
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed hover:cursor-default inset-0 flex justify-center items-start z-[999] pt-20 bg-black bg-opacity-50 backdrop-blur-md"
    >
      <div className="bg-white md:w-[380px] w-[350px]  rounded-2xl shadow-lg flex flex-col min-h-min relative">
        <div className="flex justify-between items-center border-b border-gray-300 py-3 px-6">
          <h1 className="text-sm font-semibold">New Message</h1>
          <div className="cursor-pointer" onClick={() => hideModal()}>
            <X size={18} />
          </div>
        </div>
        <div className=" flex items-center justify-between border-b border-gray-300">
          <div className="flex-1 px-4 py-3">
            <input
              className="outline-none placeholder:text-sm"
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search People"
            />
          </div>
          <div className="px-4">
            <Search size={18} className="text-gray-600" />
          </div>
        </div>
        <div className="py-3">
          <div className="w-[350px] absolute shadow-2xl top-[105px] md:right-4 right-0 bg-white rounded border border-gray-300">
            {data?.map((user, i) => (
              <div
                key={i}
                className="px-4 py-2 flex items-start gap-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleUserSelect(user)}
              >
                <div className="">
                  <img
                    src={user?.profileImageUrl}
                    className="w-8 h-8 rounded-full object-cover"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-sm font-semibold">
                    {user.firstname} {user.lastname}
                  </h1>
                  <p className="text-xs text-gray-600 paragraph-clamp">
                    {user.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
