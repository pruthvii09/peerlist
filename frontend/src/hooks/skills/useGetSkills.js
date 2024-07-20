// useSkillSearch.js
import { useQuery } from "@tanstack/react-query";

const fetchSkills = async (search) => {
  const response = await fetch(`http://localhost:4000/skills/${search}`);
  if (!response.ok) {
    throw new Error("Failed to fetch skills");
  }
  const data = await response.json();
  return data;
};

export const useSkillSearch = (search) => {
  return useQuery({
    queryKey: ["skills", search],
    queryFn: () => fetchSkills(search),
    enabled: search.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
