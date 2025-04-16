import React from 'react';

const LocationMap = () => {
  return (
    <div className="container mx-auto my-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Our Location</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Sales Office</h3>
              <p className="text-gray-700">
                # 39-11-3/2, 1st Floor, Above Punjab National Bank, Muralinagar, 
                Bank Street, Sector-11, Visakhapatnam - 530007, AP, India.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Register Office - Godown</h3>
              <p className="text-gray-700">
                #HIG No. 76, OPP Ebenezer Nursing Home, Aganampudi to Duvvada Rly Station Rd, Talarivanipalem, Visakhapatnam, 530053
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 pt-4">
              <div>
                <h4 className="font-bold">Contact</h4>
                <p className="text-gray-700">+91 9348754999 / +91 8096666686</p>
              </div>
              <div>
                <h4 className="font-bold">Email</h4>
                <p className="text-gray-700">info@classique.co.in</p>
              </div>
            </div>
          </div>
          
          <div className="h-96 rounded-lg overflow-hidden shadow-md">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.5786417154097!2d83.29822307503106!3d17.728539783879014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3943a9d5638c65%3A0x4c8ef658b5f38e54!2sMuralinagar%2C%20Sector-11%2C%20Visakhapatnam%2C%20Andhra%20Pradesh%20530007!5e0!3m2!1sen!2sin!4v1709728175292!5m2!1sen!2sin"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Classique Engineering Enterprises Location Map"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;