"use client"
import React, { useEffect, useState } from "react";
import { getAllAppointments } from "../actions/lib";
import { Patient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";

const AppointmentCard = ({ appointment }:{appointment:any}) => (
  <div className="m-2 p-4 border shadow-sm rounded-lg bg-white hover:shadow-md transition-shadow duration-300 w-full max-w-md">
    <h3 className="text-lg font-semibold mb-2">{appointment.name}</h3>
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div><span className="font-medium">Age:</span> {appointment.age}</div>
      <div><span className="font-medium">Gender:</span> {appointment.gender}</div>
      <div><span className="font-medium">Mobile:</span> {appointment.mobileNumber}</div>
      <div className="col-span-2"><span className="font-medium">Reason:</span> {appointment.reasonOfAppointment}</div>
      <div className="col-span-2"><span className="font-medium">Date:</span> {new Date(appointment.dateOfAppointment).toLocaleString()}</div>
      <div className="col-span-2"><span className="font-medium">Time:</span> {appointment.timeOfAppointment}</div>
    </div>
  </div>
);

export default function Appointments() {
  const [appointments, setAppointments] = useState<Patient[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      setIsLoading(true);
      getAllAppointments(session.user.email)
        .then(res => {
          setAppointments(res);
          setIsLoading(false);
        })
        .catch(error => {
          console.error("Error fetching appointments:", error);
          setIsLoading(false);
        });
    }
  }, [session]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">My Appointments</h2>
      <h1 className="text-center font-bold text-2xl">Patient Details</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin h-8 w-8 text-blue-500" />
        </div>
      ) : appointments?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((appointment, index) => (
            <AppointmentCard key={index} appointment={appointment} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No appointments found.</p>
      )}
    </div>
  );
}