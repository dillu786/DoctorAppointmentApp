const About=()=>{
    return(
        <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">Dr. Faruq Azam</h1>
        
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
  src="https://i.ibb.co/QFfjwbt/Screenshot-118.png"
  alt="Dr. Faruq Azam"
  width={400}
  height={500}
  className="w-full object-cover h-64"
/>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">Dr. Faruq Azam</h2>
                <p className="text-gray-600 text-center mb-4">Internal Medicine Specialist</p>
                <div className="flex justify-center mb-4">
                  {/* {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))} */}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    {/* <Phone className="w-5 h-5 mr-3 text-blue-500" /> */}
                    <span>+91 8882956581</span>
                  </div>
                  <div className="flex items-center">
                    {/* <Mail className="w-5 h-5 mr-3 text-blue-500" /> */}
                    <span>dr.faruq.azam@example.com</span>
                  </div>
                  <div className="flex flex-col items-center">
                    {/* <MapPin className="w-5 h-5 mr-3 text-blue-500" /> */}
                    <span className="mr-5">Family Healthcare Center, A-226,Street no 25/5</span>
                    <span>Near A to Z pharmacy,Gurunanak Nagar,Bhagirathi vihar phase 2,delhi,india 110094 </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                {/* <Clock className="w-5 h-5 mr-2 text-blue-500" /> */}
                Appointment Information
              </h3>
              <p className="mb-2"><strong>Consultation Fee:</strong> Rs. 100</p>
              <p className="mb-2"><strong>Duration:</strong> 30 minutes</p>
              <p className="mb-4"><strong>Types:</strong> In-person and Telemedicine</p>
              <h4 className="font-semibold mb-2">Office Hours:</h4>
              <ul className="list-none mb-4 ml-4">
                <li>Monday - Friday: 9:00 AM - 5:00 PM</li>
                <li>Saturday: 9:00 AM - 1:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
              <button className="w-full bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 font-semibold">
                Book an Appointment
              </button>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">Professional Profile</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Dr. Faruq Azam is a highly respected Internal Medicine specialist with over 5 years of experience in providing exceptional patient care. Known for his compassionate approach and expertise in managing complex medical conditions, Dr. Azam is dedicated to improving the health and well-being of his patients through personalized, evidence-based treatments and preventive care strategies.
              </p>
              <p className="text-gray-700 leading-relaxed">
                With a strong background in research and a commitment to staying at the forefront of medical advancements, Dr. Azam integrates the latest medical knowledge and technologies into his practice, ensuring that his patients receive the most effective and up-to-date care available.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-800">
                {/* <Award className="w-5 h-5 mr-2 text-blue-500" /> */}
                Qualifications and Education
              </h3>
              <ul className="list-disc list-inside mb-4 ml-4 text-gray-700 space-y-2">
                <li>MBBS - UCMS & Guru teg bahadur Hospital (GTB HOSPITAL) Delhi (Year)</li>
                <li>Worked in various goverment and private hospitals in Delhi</li>
                <li>Work experience from Guru teg bahadur hospital, Babu jagjivan ram medical (delhi)</li>
                <li>Baba saheb ambedkar medical college in (delhi)</li>
                <li>Continuous Medical Education credits in various subspecialties</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-800">
                {/* <Clipboard className="w-5 h-5 mr-2 text-blue-500" /> */}
                Areas of Expertise
              </h3>
              <ul className="grid grid-cols-2 gap-4 mb-4 ml-4 text-gray-700">
                <li className="flex items-center"> Cardiovascular Health</li>
                <li className="flex items-center"> Diabetes Management</li>
                <li className="flex items-center"> Geriatric Care</li>
                <li className="flex items-center"> Preventive Medicine</li>
                <li className="flex items-center"> Womens Health</li>
                <li className="flex items-center"> Mens Health</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-800">
                {/* <BookOpen className="w-5 h-5 mr-2 text-blue-500" /> */}
                Professional Memberships & Achievements
              </h3>
              <ul className="list-disc list-inside mb-4 ml-4 text-gray-700 space-y-2">
                <li>Fellow, American College of Physicians</li>
                <li>Member, American Medical Association</li>
                <li>Member, State Medical Board</li>
                <li>Top Doctor award, Cityville Medical Society (Year)</li>
                <li>Published researcher with articles in renowned medical journals</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-800">
                {/* <Users className="w-5 h-5 mr-2 text-blue-500" /> */}
                Patient Testimonials
              </h3>
              <div className="space-y-4">
                <blockquote className="italic text-gray-600 border-l-4 border-blue-500 pl-4">
                  Dr. Azam is an exceptional physician. His thorough approach and genuine care for his patients make every visit reassuring and productive. - Sarah M.
                </blockquote>
                <blockquote className="italic text-gray-600 border-l-4 border-blue-500 pl-4">
                  I have never met a doctor so dedicated to his patients well-being. Dr. Azam goes above and beyond in providing comprehensive care. - John D.
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}

export default About