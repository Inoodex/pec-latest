const getBaseUrl = () => {
    const isServer = typeof window === "undefined";
    return isServer
        ? `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_URL}`
        : process.env.NEXT_PUBLIC_BASE_URL;
};

export const getHomeData = async (url = "", revalidate) => {
    const api_url = `${getBaseUrl()}/${url}`;
    try {
        const response = await fetch(api_url, {
            next: { revalidate: revalidate ?? 60 },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const getBlogData = async (url = "", revalidate) => {
    const api_url = `${getBaseUrl()}/${url}`;
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

export const getSingleBlogData = async (url = "", revalidate) => {
    const api_url = `${getBaseUrl()}/blogs/${url}`;
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

export const getAboutData = async (url = "", revalidate) => {
    const api_url = `${getBaseUrl()}/pages/${url}`;
    try {
        const response = await fetch(api_url, {
            next: { revalidate: revalidate ?? 60 },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const getStudyAbroadData = async (url = "", revalidate) => {
    const api_url = `${getBaseUrl()}/pages/${url}`;
    try {
        const response = await fetch(api_url, {
            next: { revalidate: revalidate ?? 60 },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
