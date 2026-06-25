export const getUniversitiesByCountry = async (id = "", revalidate = 60) => {
    // Use relative URL so Next.js rewrites proxy it (avoids CORS on client-side)
    const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_URL}`;
    const api_url = `${baseUrl}/universities?country_id=${id}&per_page=1000`;
    try {
        const response = await fetch(api_url, {
            next: { revalidate },
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
