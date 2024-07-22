import React from "react";
import Sidebar from "../components/utils/Sidebar";
import { SlidersHorizontal } from "lucide-react";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import SinglePostComponent from "../components/scroll/SinglePostComponent";
import { useParams } from "react-router-dom";
import useFetchSinglePost from "../hooks/post/useGetSinglePost";
import HighlightCard from "../components/profile/HighlightCard";

const SinglePost = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchSinglePost(id);

  return (
    <Sidebar>
      <div className="flex">
        <div className="sm:w-[640px] w-full">
          <ComponentHeader
            title="Post by Someone"
            iconConfig={{ icon: SlidersHorizontal }}
          />
          <SinglePostComponent data={data} isLoading={isLoading} />
        </div>
        <Rightsidebar>
          <div className="mt-8 flex flex-col gap-4">
            <HighlightCard user={data?.user} />
          </div>
        </Rightsidebar>
      </div>
    </Sidebar>
  );
};

export default SinglePost;
