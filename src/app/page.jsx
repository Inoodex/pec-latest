import AboutSection from "@/sections/aboutSection";
import BlogsSection from "@/sections/blogsSection";
import ComparisonSection from "@/sections/comparisonSection";
import GlobalClients from "@/sections/globalClientSection";
import HeroAnimation from "@/sections/heroSection";
import PartnerSection from "@/sections/partnerSection";
import TeamSection from "@/sections/teamSection";
import WhyChooseUs from "@/sections/whyChooseUs";
import ServicesSection from "@/sections/servicesSection";
import Navigation from "@/sections/navigation";
import VoucherSection from "@/sections/voucher";
import { getHomeData } from "@/apis/getData";
import BenefitsSection from "@/sections/benefitSection";

const Home = async () => {
    const { home } = await getHomeData("home", 60);
    return (
        <div className="bg-background text-foreground transition-colors overflow-x-hidden duration-200">
            <HeroAnimation hero_sliders={home.hero_sliders} />
            <AboutSection aboutCompany={home.about_the_company} />
            <Navigation textSlides={home?.home_page[0]} />
            <WhyChooseUs chooseUs={home.why_choose_us} />
            <BenefitsSection />
            <GlobalClients statistics={home.statistics} />
            {/* <TeamSection officials={home.team_members} /> */}
            <ServicesSection services={home.services} />
            <ComparisonSection comparison={home.comparison} />
            <PartnerSection partners={home.partners} />
            {/* <VoucherSection redem={home.terms} /> */}
            <BlogsSection blogs={home.latest_blogs} />
        </div>
    );
};

export default Home;
