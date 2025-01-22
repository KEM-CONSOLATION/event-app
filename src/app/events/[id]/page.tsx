"use client";
import axios from "axios";
import React from "react";
import { baseURL } from "../page";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/DashboardLayout";
import { useParams, useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

const EventDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      if (!id) return;
      const response = await axios.get(`${baseURL}/events/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-full">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-full">
          <p className="text-xl text-red-500">Error loading event details.</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-full">
          <p className="text-xl text-gray-600">No event found.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <button
          className="mb-6 px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
          onClick={() => router.back()}
        >
          <BiArrowBack />
        </button>

        <div className="bg-white p-6 rounded-lg shadow-md space-y-[20px]">
          <div className="grid lg:flex items-center justify-between">
            <p className="text-xl font-semibold text-gray-700">Organizer:</p>
            <p className="text-xl text-gray-600"> {data.organizer}</p>
          </div>
          <div className="grid lg:flex items-center justify-between">
            <p className="text-xl font-semibold text-gray-700">Title:</p>
            <p className="text-xl text-gray-600">{data.title}</p>
          </div>
          <div className="grid lg:flex items-center justify-between">
            <p className="text-xl font-semibold text-gray-700">Date:</p>
            <p className="text-xl text-gray-600">{data.date}</p>
          </div>
          <div className="grid lg:flex items-center justify-between">
            <p className="text-xl font-semibold text-gray-700">Description:</p>
            <p className="text-xl text-gray-600">{data.description}</p>
          </div>

          <div className="grid lg:flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-700">Location:</h3>
            <p className="text-xl text-gray-600">{data.location}</p>
          </div>

          <div className="grid lg:flex items-center justify-between">
            <p className="text-xl font-semibold text-gray-700">Time:</p>
            <p className="text-xl text-gray-600">{data.time}</p>
          </div>

          <div className="grid lg:flex items-center justify-between">
            <p className="text-xl font-semibold text-gray-700">Pets Allowed:</p>
            <p className="text-xl text-gray-600">
              {data.petsAllowed === false ? "No" : "Yes"}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EventDetails;
