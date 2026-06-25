export const getUniversityDetails = async (id = "", revalidate) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_URL}`;
    // Fetch all universities since there's no single university endpoint
    const api_url = `${baseUrl}/universities?per_page=1000`;
    try {
        const response = await fetch(api_url, {
            next: { revalidate: revalidate ?? 60 },
        });

        if (!response.ok) {
            console.error(
                `API Error ${response.status}: ${response.statusText}`,
            );
            return null;
        }

        const text = await response.text();
        try {
            const json = JSON.parse(text);
            const allUniversities = json?.data?.data || [];
            // Find the specific university by ID
            const matchedUniversity = allUniversities.find(
                (u) => String(u.id) === String(id),
            );
            return matchedUniversity ? { data: matchedUniversity } : null;
        } catch (e) {
            console.error("Invalid JSON response:", text.substring(0, 100));
            return null;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
