export const getTravelDestinations = async (url = "", revalidate) => {
    const isServer = typeof window === "undefined";
    const baseUrl = isServer
        ? `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_URL}`
        : process.env.NEXT_PUBLIC_BASE_URL;
    const api_url = `${baseUrl}/pages/${url}`;
    try {
        const response = await fetch(api_url, {
            next: {
                revalidate: revalidate || 60,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const getTravelCountryCard = async (countryID = 2, revalidate) => {
    const isServer = typeof window === "undefined";
    const baseUrl = isServer
        ? `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_URL}`
        : process.env.NEXT_PUBLIC_BASE_URL;
    const api_url = `${baseUrl}/pages/country/${countryID}/type/travel_destinations`;
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
