"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";


interface User{
    
        id: string;
        email: string;
        name: string;
        image: string | null;
        
    
}
interface Doctor{
    
        id: string;
        userId: string;
        user:User;
    
}
interface Appointment{
       
            id: string;
            userId: string;
            doctorId: string;
            name: string;
            age: number;
            gender: "Male"|"Female";
            mobileNumber: string;
            reasonOfAppointment: string;
            dateOfAppointment: Date;
            timeOfAppointment: string;
            doctor:Doctor
        
    } 
   

const AppointmentCard = ({ appointment }:{
    appointment:Appointment
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col space-y-2">
    <h3 className="font-semibold">You have the appointment with doctor <span className="text-lg font-bold">{appointment.doctor.user.name}</span> </h3>
    <h3 className="font-medium">Name:{appointment.name}</h3>
    <p><span className="font-medium">Age:</span> {appointment.age}</p>
    <p><span className="font-medium">Gender:</span> {appointment.gender}</p>
    <p><span className="font-medium">Reason:</span> {appointment.reasonOfAppointment as string}</p>
    <p><span className="font-medium">Time:</span> {appointment.timeOfAppointment as string}</p>
    <p><span className="font-medium">Date:</span> {new Date(appointment.dateOfAppointment).toLocaleString()}</p>
  </div>
);

const PatientAppointment: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<{ result: Appointment[] }>("/api/patient");
        console.log(JSON.stringify(response.data.result));
        console.log(response.data.result.map(a=>{console.log(a.doctor.user.name)}))
        setAppointments(response.data.result);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Your Appointments</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin h-10 w-10 text-blue-500" />
        </div>
      ) : appointments && appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment, index) => (
            <AppointmentCard key={index} appointment={appointment} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No appointments found.</p>
      )}
    </div>
  );
};

export default PatientAppointment;