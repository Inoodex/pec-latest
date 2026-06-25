const base = () => {
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");
    const basePath = process.env.NEXT_PUBLIC_BASE_URL || "/api/public";
    return `${siteUrl}${basePath}`;
};

export const getChatSettings = async () => {
    const res = await fetch(`${base()}/chat/settings`, { cache: "no-store" });
    const data = await res.json();
    return data?.data || null;
};

export const initChat = async (email) => {
    const res = await fetch(`${base()}/chat/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data?.data || null;
};

export const sendChatMessage = async ({ conversation_id, message, sender_id, sender_type = "Guest" }) => {
    const res = await fetch(`${base()}/chat/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation_id, message, sender_id, sender_type }),
    });
    const data = await res.json();
    return data?.data || null;
};

export const getChatHistory = async (conversationId) => {
    const res = await fetch(`${base()}/chat/history?conversation_id=${conversationId}`, { cache: "no-store" });
    const data = await res.json();
    return data?.data || [];
};
