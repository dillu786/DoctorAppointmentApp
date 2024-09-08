// pages/doctor/slots.tsx
"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { boolean, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { showSuccessToast,showErrorToast } from "../_components/BookAppointmet"
import Loader from "../_components/Loader";
import { Toaster } from "sonner"
// Define Zod schema for validation
const SlotSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  slot: z.string().min(1, { message: "slot time is required" }),
  description: z.string().optional(),
})

type SlotSchemaType = z.infer<typeof SlotSchema>

export default function DoctorSlots() {
  const [slots, setSlots] = useState<SlotSchemaType[]>([]);
  const [isDuplicate,SetIsDuplicate]=useState(false);
  const [isLoading,setIsloading]=useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<SlotSchemaType>({
    resolver: zodResolver(SlotSchema),
  })
  const convertInAMPM=(time:string):string=>{
    let hour= parseInt(time.split(":")[0])
    if(hour>=12){
      hour=hour%12;
      return `${hour}:${time.split(":")[1]}PM`
    }
    else{
      return `${hour}:${time.split(":")[1]}AM`
    }
  }

  function onSave(){
    let availableSlots=slots.map(a=>{
        let dateAndSlots:{date:string, slot:string};
         dateAndSlots={date:a.date, slot: `${convertInAMPM(a.slot)}`}
         return dateAndSlots;
    });
    setIsloading(true);
    axios.post("/api/doctor/slots",{
        method:"POST",
        body:JSON.stringify(availableSlots)
    }).then(res=>{
        showSuccessToast("Slots added Successfully")
        setIsloading(false);
  }).catch(err=>{
    showErrorToast("Something went wrong")
  });
  }
  const onSubmit = (data: SlotSchemaType) => {
    let isDuplicate=false;
   slots.forEach(ele=>{
          if(ele.date==data.date && ele.slot===data.slot){
            SetIsDuplicate(true);
            isDuplicate=true;
          }
   })
     
   if(!isDuplicate){
    setSlots([...slots, data])
   }
   
    //reset() // Reset the form after submission
   // console.log(slots);
   
   // let modifiedSlots=getSlotsInAMPM(availableSlots.map(a=>a.slot));
    //console.log(availableSlots);

  }


  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Fill Available Slots</CardTitle>
        </CardHeader>
        <CardContent>
            {isLoading && <Loader/>}
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" {...register("date")} />
              {errors.date && <p className="text-red-500">{errors.date.message}</p>}
            </div>

            <div>
              <Label htmlFor="startTime">Slot</Label>
              <Input id="slot" type="time" {...register("slot")} />
              {errors.slot && <p className="text-red-500">{errors.slot.message}</p>}
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea id="description" placeholder="Description of the slot" {...register("description")} />
            </div>

            <Button type="submit">Add Slot</Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Available Slots</h2>
        <ul>
          {slots.map((slot, index) => (
            <li key={index} className="border p-4 my-2">
              <strong>Date:</strong> {slot.date} | <strong>Time:</strong> {slot.slot} 
              {slot.description && <p><strong>Description:</strong> {slot.description}</p>}
            </li>
          ))}
          {isDuplicate &&<div className="text-sm text-red-500">Duplicate slot is not allowed</div>}
        </ul>
      </div>
      <div className="flex justify-center">
      {slots.length>0 && <Button onClick={onSave} className=" mx-7 my-2 w-full flex justify-center" type="submit">Save</Button>}
      </div>
      <Toaster position="bottom-center" />
    </div>
  )
}
