import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { Toaster, toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { useEffect, useState } from "react"
import { CalendarDays, Clock, Divide } from "lucide-react"
import { set } from "date-fns"
import { da } from "date-fns/locale"
import { DialogClose } from "@radix-ui/react-dialog"
import { Errors } from "../page"
import { startOfDay } from "date-fns"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import Loader from "./Loader";
export const showDefaultToast = () => toast('This is a default toast');
export const showSuccessToast = (msg: string) => toast.success(msg);
export const showErrorToast = (err: string) => toast.error(err);
import { GenderOption } from "./GenderSelect";
export interface Patient {
    name: string,
    phone: Number | string,
    email: string,
    reason: string,
    age: number|undefined,
    gender: GenderOption
    date?: Date,
    time?: string,
    doctorId:string
}

export function BookAppointment({ patient, errors,doctorId
}: {
    patient: Patient,
    errors: Errors,
    doctorId:string
}) {
    const session = useSession();
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [timeslot, setTimeSlot] = useState<string[] | any[]>([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    function CheckAuthentication() {
        if (!session.data?.user) {
            signIn();
            showSuccessToast("User Successfully Logged In");
        }
    }

    useEffect(() => {
        getTime(date);
    }, [date])
    const getTime = async (date: Date | undefined) => {
        let timeList: any[] = [];
        console.log(date?.getUTCDate());
        setIsloading(true);
        let availableSlots = fetch("/api/doctor/availableSlots?date=" + date).then(res => {
            return res.json()
        }).then(res => {
            let data = res;
            console.log(data);
            setIsloading(false);
            if (data.data.length == 0) {
                for (let i = 10; i < 12; i++) {
                    let interval = i + ":00 AM";
                    timeList.push(interval);
                    let interval2 = i + ":30 AM";
                    timeList.push(interval2);
                }
                for (let i = 1; i <= 10; i++) {
                    let interval = i + ":00 PM";
                    timeList.push(interval);
                    let interval2 = i + ":30 PM";
                    timeList.push(interval2);
                }
            }
            else {
                timeList = data.data.map((a: any) => a.slot);
                console.log("settimeslot");
            }

            setTimeSlot(timeList);
        })
    }

    const handleSubmit = () => {
        const data: Patient = {
            name: patient.name,
            age: Number(patient.age),
            gender: patient.gender,
            email: patient.email,
            date: date ,
            time: selectedTimeSlot,
            reason: patient.reason,
            phone: patient.phone,
            doctorId:doctorId
        }
        console.log(data);
        setIsDialogOpen(false);
        axios.post("/api/patient", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(a => {
            showSuccessToast("Your Appointment with Dr. Azam has been booked successfully")
        }).catch(err => {
            showErrorToast("Something went wrong");
        })
    }
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={CheckAuthentication} disabled={(errors.name || errors.phone || errors.reason) || patient.age == undefined || patient.email.length == 0 || patient.gender?.length == 0 || patient.reason.length == 0 || patient.phone === undefined}>BookAppointMent</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Book Appointment</DialogTitle>
                    <DialogDescription>
                        <>
                            {isLoading && <Loader />}
                            <div className="grid grid-cols-1 mt-2 md:grid-cols-2">
                                <div className="flex flex-col gap-3 ">
                                    <h2 className="flex gap-2">
                                        <CalendarDays className=" h-5" />
                                        Select Date
                                    </h2>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(newDate: Date | undefined) => { setDate(newDate) }}
                                        className="rounded-md border w-[300px]"
                                        disabled={(newDate) => { return newDate < startOfDay(new Date()) }}
                                    />
                                </div>
                                <div>
                                    <div className="mt-6 ml-2">
                                        <h2 className="flex gap-3 items-center font-bold">
                                            <Clock className="h-5 w-5" />
                                            Select Time Slot
                                        </h2>

                                    </div>
                                    <div className=" border rounded-sm mt-1 ml-2 pl-4 py-4 gap-2 grid grid-cols-3">
                                        {timeslot.map(slot => <div key={slot} className="">
                                            <div onClick={() => { setSelectedTimeSlot(slot) }} className={`w-20 border p-1 text-center rounded-full ${selectedTimeSlot === slot ? 'bg-black text-white' : ''}`}>
                                                {slot}
                                            </div>
                                        </div>)}
                                    </div>
                                </div>
                                <Toaster position="bottom-center" />
                            </div>
                        </>




                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex justify-between">
                    <DialogClose asChild>
                        <Button className="text-red-500" type="button" variant="outline">Close</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} type="submit" disabled={selectedTimeSlot == "" ? true : false}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
