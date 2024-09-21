import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Cross, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from 'sonner';
import { showSuccessToast } from './BookAppointmet';
import { IsUserDoctor } from '../actions/lib';
import Image from 'next/image';

type UserType = "Doctor" | "Patient" | undefined;

type MenuItem = {
  id: number;
  name: string;
  path: string;
};

const initialMenu: MenuItem[] = [
  { id: 1, name: "Explore", path: "/explore" },
  { id: 2, name: "Contact Us", path: "/" },
  { id: 3, name: "Home", path: "/" },
];

export default function Header() {
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu);
  const [userType, setUserType] = useState<UserType>(undefined);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const effectRan= useRef(false)
  const router = useRouter();
    
  useEffect(()=> {
   
    if(effectRan.current===true) return;
    console.log('Hi')
    if (session?.user?.email) {
      
        
      IsUserDoctor(session.user.email).then(isDoctor => {
        setUserType(isDoctor ? "Doctor" : "Patient");
        let menuCopy=[...menu];
        menuCopy.push({
            id: 4,
            name: "My Appointments",
            path: isDoctor ? "/appointments" : "/patient"
          });
          if(isDoctor){
            menuCopy.push({
                id: 5,
                name: "Add Slots",
                path: "/doctor"
            })
          }
        setMenu(menuCopy);
      
      });
    }

    () => effectRan.current=true;
  }, [session?.user?.email]);

  const handleSignInOut = () => {
    if (session?.user) {
      signOut();
     showSuccessToast('User Logged out successfully');
    } else {
      signIn();
      showSuccessToast("User Logged In successfully");  
     
    }
  };

  return (
    <>
   
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center" prefetch={false}>
              <Cross className="h-6 w-6 mr-2" />
              <span className="text-xl font-bold text-slate-700">Family Health Care Center</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {menu.map(item => (
              <Link
                key={item.id}
                href={item.path}
                className="text-slate-700 hover:text-blue-700 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            <Button onClick={handleSignInOut} className="mr-2">
              {session?.user ? 'Sign Out' : 'Sign In'}
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            {menu.map(item => (
              <Link
                key={item.id}
                href={item.path}
                className="block py-2 text-slate-700 hover:text-blue-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <Toaster position="bottom-center" />
    </header>

    
    </>
  );
}