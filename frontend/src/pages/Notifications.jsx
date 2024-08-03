import React from "react";
import Sidebar from "../components/utils/Sidebar";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import GradientCard from "../components/utils/GradientCard";
import GradientCard2 from "../components/utils/GradientCard2";
import useGetNotifications from "../hooks/notifications/useGetNotification";
import NotificationCard from "../components/notification/NotificationCard";
import NotificationCardSkeleton from "../components/skeleton/NotificationCardSkeleton";

const Scroll = () => {
  const { data, isLoading } = useGetNotifications();

  return (
    <Sidebar>
      <div className="flex">
        <div className="md:w-[640px] w-full">
          <ComponentHeader title="Notifications" />
          {/* <Post /> */}
          <div className="mt-[56px] min-h-screen max-h-full border-r border-gray-300">
            {isLoading ? (
              <>
                {Array.from({ length: 10 }).map((_, index) => (
                  <NotificationCardSkeleton key={index} />
                ))}
              </>
            ) : (
              <>
                {data?.length <= 0 ? (
                  <div className="w-full h-screen flex items-center justify-center">
                    You have no notifications
                  </div>
                ) : (
                  <>
                    {data?.map((notification) => (
                      <NotificationCard
                        key={notification?.id}
                        notification={notification}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
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

export default Scroll;
