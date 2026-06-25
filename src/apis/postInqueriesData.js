// export const postInqueriesData = async (url = "", data) => {
//     // Use relative URL so Next.js rewrites proxy it (avoids CORS on client-side)
//     const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_URL}`;
//     const api_url = `${baseUrl}/${url}`;
//     try {
//         const response = await fetch(api_url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });
//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         throw error;
//     }
// };

const getBaseUrl = () => {
    return `https://apps.peceduglobal.com/api/public`;
};

export const postInqueriesData = async (url = "", data) => {
    const api_url =
        url === "contact"
            ? `${getBaseUrl()}/contact`
            : `${getBaseUrl()}/${url}`;
    try {
        const response = await fetch(api_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });

        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            console.error(
                "Invalid JSON response from server:",
                text.substring(0, 100),
            );
            throw new Error("Server returned non-JSON response");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
