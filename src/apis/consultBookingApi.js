export const getConsultants = async () => {
    const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_URL}`;
    const api_url = `${baseUrl}/consultants/global-availability`;
    try {
        const response = await fetch(api_url, {
            next: { revalidate: 60 },
        });
        return await response.json();
    } catch (error) {
        console.error("Consultants Fetch Error:", error);
        throw error;
    }
};

export const getAvailableDates = async (consultant_id, month, year) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_URL}`;
    const api_url = `${baseUrl}/consultants/available-dates?consultant_id=${consultant_id}&month=${month}&year=${year}`;
    try {
        const response = await fetch(api_url, {
            next: { revalidate: 60 },
        });
        return await response.json();
    } catch (error) {
        console.error("Available Dates Error:", error);
        throw error;
    }
};

export const getConsultantSlots = async (consultant_id, date) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_URL}`;
    const api_url = `${baseUrl}/consultants/slots?consultant_id=${consultant_id}&date=${date}`;
    try {
        const response = await fetch(api_url, {
            next: { revalidate: 60 },
        });
        return await response.json();
    } catch (error) {
        console.error("Slots Fetch Error:", error);
        throw error;
    }
};

export const bookConsultation = async (payload) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_URL}`;
    const api_url = `${baseUrl}/consultants/book-appointment`;
    try {
        const response = await fetch(api_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        return await response.json();
    } catch (error) {
        console.error("Booking Error:", error);
        throw error;
    }
};

export const getSlotByDate = async (date = "") => {
    const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_URL}`;
    const api_url = `${baseUrl}/consultants/slots-by-date?date=${date}`;
    try {
        const response = await fetch(api_url);
        return await response.json();
    } catch (error) {
        console.error("Booking Error:", error);
        throw error;
    }
};
