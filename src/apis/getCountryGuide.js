export const getCountryGuide = async (id = "", revalidate) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_URL}`;
    const api_url = `${baseUrl}/pages/country-guide/${id}`;
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
