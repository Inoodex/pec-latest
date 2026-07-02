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
  const site_address = siteData?.site_settings?.contact_address || "Mirpur 11, Dhaka, Bangladesh";

  const phoneNumbers = site_phone ? site_phone.split(',').map(p => p.trim()) : [];
  const footerPhones = footer_phone ? footer_phone.split(',').map(p => p.trim()) : [];
  const allPhones = [...phoneNumbers, ...footerPhones];

  const emailAddresses = site_email ? site_email.split(',').map(e => e.trim()) : [];
  const footerEmails = footer_email ? footer_email.split(',').map(e => e.trim()) : [];
  const allEmails = [...emailAddresses, ...footerEmails];

  const phone1 = allPhones[0] || "+8801349523464";
  const phone2 = allPhones[1] || "+8801630082236";
  const email1 = allEmails[0] || "pec.info.bd@gmail.com";
  const email2 = allEmails[1] || "info@peceduglobal.com";
  const mapLink = site_map || "https://www.google.com/maps";
  const address = site_address || "Mirpur 11, Dhaka, Bangladesh";

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="md:py-20 py-10 md:pt-40 pt-30 max-w-7xl mx-auto">
        <Heading
          title="Join the"
          highlight="Conversation"
          color={false}
          paragraph="Feel free to send us a message anytime."
        />
        
        {/* Main Contact Section - Left: Office Address + Get in Touch, Right: Form */}
        <div className="flex items-center px-4">
          <div className="w-full bg-white p-6 md:p-10 rounded-3xl md:rounded-4xl flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch shadow-xl mx-auto border border-gray-100">
            
            {/* Left Side */}
            <div className="w-full lg:w-6/12 flex flex-col gap-4">
              
              {/* Box: BD Address */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-5 md:p-6 rounded-3xl flex-1 flex flex-col border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-brand-primary rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Bangladesh <span className="text-brand-primary">Address</span>
                  </h2>
                </div>

                <div className="bg-white rounded-2xl p-4 border-l-4 border-brand-primary shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-brand-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Visit Us</p>
                      <p className="text-gray-800 font-medium text-sm leading-relaxed">Mirpur 11, Dhaka, Bangladesh</p>
                      <p className="text-gray-600 text-xs mt-0.5">E1, Ghoroa Mor, Dhaka 1216</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm text-gray-800 font-semibold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Phone
                  </h3>
                  <p className="text-gray-900 font-medium text-sm mt-0.5 ml-6">{phone1}</p>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm text-gray-800 font-semibold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    E-mail
                  </h3>
                  <p className="text-gray-900 font-medium text-sm mt-0.5 ml-6">{email1}</p>
                </div>
              </div>

              {/* Box: Romania Address */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-5 md:p-6 rounded-3xl flex-1 flex flex-col border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-brand-primary rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Romania <span className="text-brand-primary">Address</span>
                  </h2>
                </div>

                <div className="bg-white rounded-2xl p-4 border-l-4 border-brand-primary shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-brand-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Visit Us</p>
                      <p className="text-gray-800 font-medium text-sm leading-relaxed">B-dul Iuliu Maniu 17, București</p>
                      <p className="text-gray-600 text-xs mt-0.5">Sector 6, Bucharest, Romania</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm text-gray-800 font-semibold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Phone
                  </h3>
                  <p className="text-gray-900 font-medium text-sm mt-0.5 ml-6">{phone2}</p>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm text-gray-800 font-semibold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    E-mail
                  </h3>
                  <p className="text-gray-900 font-medium text-sm mt-0.5 ml-6">{email2}</p>
                </div>
              </div>

            </div>

            {/* Right Side - Contact Form (Send Us a Message) */}
            <div className="w-full lg:w-6/12 flex flex-col">
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-3xl flex-1 flex flex-col border border-gray-200 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-10 bg-brand-primary rounded-full"></div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Send <span className="text-brand-primary">Message</span>
                  </h2>
                </div>
                <ContactForm />
              </div>
            </div>
            
          </div>
        </div>

        {/* ===== Location Section: Map ===== */}
        <div className="mt-10 px-4">
          <div className="w-full bg-white p-6 md:p-10 rounded-3xl md:rounded-4xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Find Our <span className="text-brand-primary">Location</span>
              </h2>
              <div className="w-16 h-1 bg-brand-primary rounded-full mx-auto mt-3"></div>
              <p className="text-gray-500 mt-3 text-sm">
                Visit us at our office or find us on Google Maps
              </p>
            </div>

            <div className="w-full">
              <div className="bg-gray-50 rounded-2xl overflow-hidden h-[280px] lg:h-[400px] relative border border-gray-200 shadow-inner">
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
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                  <a 
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm hover:bg-white shadow-xl text-gray-700 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 border border-gray-200 hover:shadow-2xl"
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
  );
};

export default Contact;