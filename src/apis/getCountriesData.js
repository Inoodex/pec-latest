export const getCountriesData = async (url = "", revalidate) => {
    // Use relative URL so Next.js rewrites proxy it (avoids CORS on client-side)
    const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_URL}`;
    const api_url = `${baseUrl}/${url}`;
    try {
        const response = await fetch(api_url, {
            next: { revalidate: revalidate ?? 60 },
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
