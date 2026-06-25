export const getUniversityGuide = async (id = "", revalidate) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_URL}`;
    const api_url = `${baseUrl}/pages/university-guide/${id}`;
    try {
        const response = await fetch(api_url, {
            next: { revalidate: revalidate ?? 60 },
        });

        const text = await response.text();
        try {
            const json = JSON.parse(text);
            return json?.success ? json : null;
        } catch (e) {
            console?.error(
                "Invalid JSON response from university guide:",
                text.substring(0, 100),
            );
            return null;
        }
    } catch (error) {
        console?.error("Error fetching university guide:", error);
        return null;
    }
};
