import React from "react";

const JobCard = ({ job }) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <a
      href={
        job.application_link.startsWith("http") ||
        job.application_link.startsWith("https")
          ? job.application_link
          : `https://${job.application_link}`
      }
      target="_blank"
      rel="noreferrer"
      className="md:px-8 px-2 w-full cursor-pointer hover:bg-[#F8FAFB] py-6 flex items-start gap-2"
    >
      <div className="px-2 py-2 border border-gray-300 rounded-2xl">
        <img
          width={40}
          height={40}
          className="rounded-full"
          src="https://d26c7l40gvbbg2.cloudfront.net/media/companyempty.png"
          alt=""
        />
      </div>
      <div className="flex flex-col">
        <p className="text-sm">
          <span className="font-semibold">{job.title}</span> at {job.company}
        </p>
        <p className="text-xs text-gray-600 flex gap-2">
          <span>{job.location}</span>
          <span>{capitalizeFirstLetter(job.type)}</span>{" "}
          <span>{job.experience}+ years</span>
        </p>
        {job?.skills && (
          <div className="flex items-center justify-center gap-1 flex-wrap mt-1">
            {job?.skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center text-xs gap-1 px-3 py-1 border border-gray-200 rounded-full"
              >
                <img
                  height={16}
                  width={16}
                  className="w-4 h-4"
                  src={skill.logo}
                  alt=""
                />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </a>
  );
};

export default JobCard;
