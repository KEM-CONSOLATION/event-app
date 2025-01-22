"use client";

import DashboardLayout from "@/components/DashboardLayout";
import Table from "@/components/Table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_APP_SERVER_DOMAIN as string;

const Events = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/events`);
      return response.data;
    },
  });

  const columns = [
    { id: "id", label: "ID" },
    { id: "title", label: "Title" },
    { id: "date", label: "Date" },
    { id: "time", label: "Time" },
    { id: "organizer", label: "Organizer" },
    { id: "category", label: "Category" },
    { id: "description", label: "Description" },
    {
      id: "petsAllowed",
      label: "Pets Allowed",
      format: (value: string | number | boolean) =>
        value === true ? "Yes" : value === false ? "No" : String(value),
    },
    { id: "location", label: "Location" },
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <p>Error loading events.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <p className="text-lg mb-4">Manage all Events here.</p>
      <Table columns={columns} data={data} />
    </DashboardLayout>
  );
};

export default Events;
