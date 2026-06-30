import Heading from "@/components/heading";
import ContactForm from "@/sections/contact/contactForm";

const Contact = async () => {
  let siteData = null;
  try {
    const res = await fetch(
      "https://apps.peceduglobal.com/api/public/site_info",
      {
        next: { revalidate: 3600 },
      },
    );
    const data = await res.json();
    if (data?.success) {
      siteData = data;
    }
  } catch (error) {
    console.error("Failed to fetch contact details:", error);
  }

  const footer_phone = siteData?.footer_info?.phone || "";
  const footer_email = siteData?.footer_info?.email || "";
  const site_phone = siteData?.site_settings?.contact_phone || "";
  const site_email = siteData?.site_settings?.contact_email || "";
  const site_map = siteData?.site_settings?.map_url || "";
  const site_address = siteData?.site_settings?.address || "Startech, Dhaka, Bangladesh";

  const phone1 = site_phone || "+8801349523464";
  const phone2 = footer_phone || "+8801630082236";
  const email1 = site_email || "pec.info.bd@gmail.com";
  const email2 = footer_email || "info@peceduglobal.com";
  const mapLink = site_map || "https://www.google.com/maps";
  const address = site_address || "Startech, Dhaka, Bangladesh";

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="md:py-20 py-10 md:pt-40 pt-30 max-w-7xl mx-auto">
        <Heading
          title="Join the"
          highlight="Conversation"
          color={false}
          paragraph="Feel free to send us a message anytime."
        />
        
        <div className="flex items-center px-4">
          <div className="w-full bg-white p-6 md:p-10 rounded-3xl md:rounded-4xl flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch shadow-xl mx-auto">
            
            {/* Left Side - Contact Info */}
            <div className="w-full lg:w-6/12 flex flex-col">
              <div className="bg-gray-100 p-5 rounded-3xl flex-1 flex flex-col">
                <h2 className="text-3xl font-semibold text-brand-primary mb-4">
                  Get in Touch
                </h2>
                
                <h3 className="text-xl text-gray-800 font-semibold">
                  Phone
                </h3>
                <p className="text-gray-900 font-medium mt-1">
                  {phone1}
                </p>
                <p className="text-gray-900 font-medium mt-1">
                  {phone2}
                </p>

                <h3 className="text-xl text-gray-800 font-semibold mt-4">
                  E-mail
                </h3>
                <p className="text-gray-900 font-medium mt-1">
                  {email1}
                </p>
                <p className="text-gray-900 font-medium mt-1">
                  {email2}
                </p>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="w-full lg:w-6/12 flex flex-col">
              <div className="bg-gray-100 p-5 rounded-3xl flex-1 flex flex-col">
                <h2 className="text-3xl font-semibold text-brand-primary mb-4">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
            
          </div>
        </div>

        {/* Location Section - Left: Address, Right: Map */}
        <div className="mt-10 px-4">
          <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-4xl shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-brand-primary">
                Find Our <span className="text-gray-800">Location</span>
              </h2>
              <p className="text-gray-500 mt-2">
                Visit us at our office or find us on Google Maps
              </p>
            </div>

            {/* Left: Address | Right: Map */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Left Side - Address */}
              <div className="w-full lg:w-5/12">
                <div className="bg-gray-50 p-6 rounded-2xl h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Our Address</h3>
                  </div>
                  
                  <p className="text-gray-700 text-base leading-relaxed">
                    {address}
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-start gap-3 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-primary mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <div>
                        <p className="text-gray-500 text-xs font-medium">PHONE</p>
                        <p className="text-gray-700">{phone1}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-primary mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <div>
                        <p className="text-gray-500 text-xs font-medium">EMAIL</p>
                        <p className="text-gray-700">{email1}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      Open Now
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500 text-xs">Mon - Fri: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Map */}
              <div className="w-full lg:w-7/12">
                <div className="bg-gray-50 rounded-2xl overflow-hidden h-[280px] lg:h-[320px] relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.8375!2d90.3355395!3d23.8236368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ5JzI1LjEiTiA5MMKwMjAnMDguMCJF!5e0!3m2!1sen!2sbd!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                    title="Google Maps"
                  ></iframe>
                  
                  {/* Map Overlay Button */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                    <a 
                      href={mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-gray-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Open in Google Maps
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;