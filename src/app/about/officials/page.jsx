import { getHomeData } from "@/apis/getData";
import TeamSection from "@/sections/teamSection";

const Officials = async () => {
    const { home } = await getHomeData("home", 60);

    return (
        <div className="md:py-20 py-10 pt-30 bg-foreground">
            <TeamSection officials={home.team_members} />
        </div>
    );
};

export default Officials;
