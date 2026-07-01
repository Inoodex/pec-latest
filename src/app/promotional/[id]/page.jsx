import PromotionalSection from "@/sections/promotionalSection";

export default async function PromotionalPage({ params }) {
    const { id } = await params;
    const pageNumber = parseInt(id?.split("-").pop(), 10) || 1;
    return <PromotionalSection pageNumber={pageNumber} />;
}
