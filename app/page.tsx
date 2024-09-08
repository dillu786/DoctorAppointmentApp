"use client"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { SelectTrigger,SelectValue,SelectContent,SelectItem,Select } from "@radix-ui/react-select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useSession,signIn,signOut } from "next-auth/react"
import Header from "./_components/Header"
import { BookAppointment } from "./_components/BookAppointmet"
import { Patient } from "./_components/BookAppointmet"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Phone } from "lucide-react"
import { Span } from "next/dist/trace"
import GenderSelect from "./_components/GenderSelect"
export interface Errors{
  name:boolean
  phone:boolean
  reason:boolean
  age:boolean
  gender:boolean
}
export default function Component() {

  const session=useSession();
  const router=useRouter();
  const [errors,setErrors]=useState<Errors>({
    name:false,
    phone:false,
    reason:false,
    age:false,
    gender:false
  });
  const [user,setUser]=useState<Patient>({
    name:"",
    phone:"",
    email:"",
    reason:"",
    gender:""

  });
 

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));

        if (name === "name" && value.length <= 2) {
          setErrors((prev) => ({
            ...prev,
            [name]: true
          }));
        } else if (name === "name" && value.length > 2) {
          setErrors((prev) => ({
            ...prev,
            [name]: false
          }));
        }
    
        if (name === "phone" && value.length !== 10) {
          setErrors((prev) => ({
            ...prev,
            [name]: true
          }));
        } else if (name === "phone" && value.length === 10) {
          setErrors((prev) => ({
            ...prev,
            [name]: false
          }));
        }
    
        if (name === "reason" && value.length <= 5) {
          setErrors((prev) => ({
            ...prev,
            [name]: true
          }));
        } else if (name === "reason" && value.length > 5) {
          setErrors((prev) => ({
            ...prev,
            [name]: false
          }));
        }
      }

  

 
  const scrollToAppointment = () => {
    if(!session.data?.user){
      signIn();
    } 
    const element = document.getElementById("appointment");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  //console.log(errors);
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header/>
      <main className="flex-1">
        <section className="w-full py-12 lg:py-24 ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Book an Appointment with Dr. Faruq Azam
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Experience personalized healthcare with our trusted family physician. Schedule your appointment
                    today.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button onClick={scrollToAppointment} className="mx-auto mt-4">
                 Book an Appointment
                 </Button>
                </div>
              </div>
              <img
                src="azambhai.jpeg"
                width="550"
                height="550"
                alt="Doctor"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:w-fit"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div>
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-xl font-bold">About Dr. Azam</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Experienced Family Physician</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Dr. Faruque Azam is a board-certified family physician with over 15 years of experience providing
                    comprehensive and personalized healthcare to patients of all ages. He is dedicated to building
                    long-term relationships with his patients and helping them achieve their best health.
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold">Specialties</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>Family Medicine</li>
                      <li>Preventive Care</li>
                      <li>Chronic Disease Management</li>
                    </ul>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold">Experience</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>5+ Years in Practice</li>
                      <li>Board Certified</li>
                      <li>Trusted by Patients</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <img
                  src="doctors-nurses.jpg"
                  width="550"
                  height="310"
                  alt="Doctor"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="appointment" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Schedule Your Appointment</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Fill out the form below to book an appointment with Dr. Azam. We'll get back to you as soon as
                    possible to confirm your appointment.
                  </p>
                </div>
              </div>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Book an Appointment</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter your name"name="name" value={user.name} onChange={handleChange} />
                          
                        {user.name && errors["name"]==true &&<span className="text-xs text-red-500">Name must be greater than 2 character</span>}
                      </div>
                     
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" value={user.phone as number} onChange={handleChange} placeholder="Enter your mobile number" />
                        {user.phone && errors["phone"]==true && <span className="text-xs text-red-500">Mobile number must be 10 digits</span> }
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="age">Age</Label>
                        <Input id="age" placeholder="Enter your age"name="age" value={user.age} onChange={handleChange} />
                          
                        {user.age && errors["age"]==true &&<span className="text-xs text-red-500">Age is a required field</span>}
                      </div>
                     
                      <div>
                       
                      <GenderSelect value={user.gender} onChange={handleChange} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email"value={user.email} placeholder="Enter your Email" onChange={handleChange} />
                    </div>
                    <div>
                      <Label htmlFor="reason">Reason for Appointment</Label>
                      <Textarea id="reason" name="reason"value={user.reason} onChange={handleChange} placeholder="Describe your reason for the appointment" />
                      {user.reason &&  errors["reason"]==true && <span className="text-xs text-red-500">Reason of Appointment must be greater than 5 character</span> }
                    </div>
                    <div className="grid gap-2">
                </div>
                
               { <BookAppointment errors={errors} patient={
                user
                }/>}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Family Health Care Center. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
        </nav>
      </footer>
    </div>
  )
}
//@ts-ignore
function CrossIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
    </svg>
  )
}