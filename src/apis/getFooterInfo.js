export const getFooterInfo = async (revalidate) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_URL}`;
    const api_url = `${baseUrl}/site_info`;

    for (let i = 0; i < 3; i++) {
        try {
            const response = await fetch(api_url, {
                next: { revalidate: revalidate ?? 60 },
            });
            const text = await response.text();
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            try {
                if (text) return JSON.parse(text);
            } catch (e) {
                if (i < 2) {
                    await new Promise(res => setTimeout(res, 1000));
                    continue;
                }
                console.error("Failed to parse getFooterInfo response:", e);
                return null;
            }
            
            if (i === 2) return null;
        } catch (error) {
            if (i < 2) {
                await new Promise(res => setTimeout(res, 1000));
                continue;
            }
            console.error("Error fetching data:", error);
            return null;
        }
    }
};
