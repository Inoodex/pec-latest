import { getAboutData, getHomeData } from "@/apis/getData";
import AgentModal from "@/components/agentModal";
const About = async () => {
    return (
        <section className="overflow-x-hidden ">
            <div className="bg-foreground">
                <AgentModal />
            </div>
        </section>
    );
};

export default About;
