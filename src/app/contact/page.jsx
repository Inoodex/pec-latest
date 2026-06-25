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
    // console.log("Fetched contact details:", data);
    if (data?.success) {
      siteData = data;
    }
  } catch (error) {
    console.error("Failed to fetch contact details:", error);
  }

  // console.log("sitedata",siteData);

  // const addressText = siteData?.site_settings?.contact_address || "";
  // const phoneText = siteData?.site_settings?.contact_phone || "";
  // const phoneText2 = siteData?.site_settings?.contact_phone2 || "";
  // const emailText =
  //   siteData?.site_settings?.contact_email || "pec.info.bd@gmail.com";
  // const emailText1 = "info@peceduglobal.com";

  const footer_phone=siteData?.footer_info?.phone || "";
  const footer_email=siteData?.footer_info?.email || "";
  const site_phone=siteData?.site_settings?.contact_phone || "";
  const site_email=siteData?.site_settings?.contact_email || "";

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
            
            {/* Left Side - Phone & Email */}
            <div className="w-full lg:w-6/12 flex flex-col">
              <div className="bg-gray-100 p-5 rounded-3xl flex-1 flex flex-col">
                <h2 className="text-base text-gray-500 mb-4 text-bold">
                 Greetings Task
                </h2>
               
                <h3 className="text-xl text-brand-accent font-medium">
                  Phone
                </h3>
                <p className="text-gray-600 font-light mt-1">
                  {site_phone}
                </p>
                <p className="text-gray-600 font-light mt-1">
                  {footer_phone}
                </p>

                
                <p className="text-gray-600 font-light mt-1">
                  {site_email}
                </p>
                <p className="text-gray-600 font-light mt-1">
                  {footer_email}
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
      </div>
    </div>
  );
};

export default Contact;