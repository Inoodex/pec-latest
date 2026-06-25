import { getHomeData } from "@/apis/getData";
import ServicesSection from "@/sections/servicesSection";

const Services = async () => {
    const { home } = await getHomeData("home", 60);
    return (
        <div className="md:py-20 py-10 pt-30 bg-gray-100">
            <ServicesSection services={home.services} />
        </div>
    );
};

export default Services;
