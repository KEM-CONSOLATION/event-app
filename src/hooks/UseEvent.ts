import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchEvents = async () => {
  const { data } = await axios.get("/api/events");
  return data;
};

export const useEvents = () => {
  return useQuery(["events"], fetchEvents);
};
