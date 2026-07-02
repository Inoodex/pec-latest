"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import {
    IoChatboxEllipsesOutline,
    IoClose,
    IoPaperPlaneOutline,
    IoSend,
} from "react-icons/io5";
import Pusher from "pusher-js";
import { getFooterInfo } from "@/apis/getFooterInfo";
import { getChatSettings, initChat, sendChatMessage, getChatHistory } from "@/apis/chatApi";

const LS_CONVERSATION = "pecedu_chat_conversation_id";
const LS_TOKEN = "pecedu_chat_guest_token";
const LS_EMAIL = "pecedu_chat_email";

const LiveChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");
    const [conversationId, setConversationId] = useState(null);
    const [guestToken, setGuestToken] = useState(null);
    const [showEmailForm, setShowEmailForm] = useState(true);
    const [pusher, setPusher] = useState(null);
    const [whatsappNumber, setWhatsappNumber] = useState("8801712121212");
    const [unreadCount, setUnreadCount] = useState(0);

    const messagesEndRef = useRef(null);
    const channelRef = useRef(null);
    const prevMsgIds = useRef(new Set());
    const isOpenRef = useRef(false);
    const dedupedMessages = useMemo(() => {
        const seen = new Set();
        return messages.filter(m => {
            if (seen.has(m.id)) return false;
            seen.add(m.id);
            return true;
        });
    }, [messages]);

    useEffect(() => {
        const fetchWhatsApp = async () => {
            try {
                const res = await getFooterInfo();
                if (res?.site_settings?.whatsapp) setWhatsappNumber(res.site_settings.whatsapp);
                else if (res?.site_settings?.whatsapp_number) setWhatsappNumber(res.site_settings.whatsapp_number);
                else if (res?.site_settings?.phone) setWhatsappNumber(res.site_settings.phone);
                else if (res?.footer_info?.phone) setWhatsappNumber(res.footer_info.phone);
            } catch (err) {
                console.error("Failed to load whatsapp number", err);
            }
        };
        fetchWhatsApp();

        const savedConvId = localStorage.getItem(LS_CONVERSATION);
        const savedToken = localStorage.getItem(LS_TOKEN);
        const savedEmail = localStorage.getItem(LS_EMAIL);
        if (savedConvId && savedToken) {
            setConversationId(Number(savedConvId));
            setGuestToken(savedToken);
            setShowEmailForm(false);
            setEmail(savedEmail || "");
            loadHistory(Number(savedConvId));
        }
    }, []);

    const formattedNumber = whatsappNumber.replace(/[^\d+]/g, "");
    const whatsappLink = `https://wa.me/${formattedNumber}?text=${encodeURIComponent("Hello PECEDU Global, I need help with study abroad guidance.")}`;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ block: "end" });
    }, [isOpen]);

    useEffect(() => {
        if (messages.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages]);

    const loadHistory = async (convId) => {
        try {
            const history = await getChatHistory(convId);
            if (history?.length > 0) {
                const seen = new Set();
                setMessages(history.reduce((acc, m) => {
                    if (seen.has(m.id)) return acc;
                    seen.add(m.id);
                    prevMsgIds.current.add(m.id);
                    acc.push({
                        id: m.id,
                        text: m.message,
                        sender: m.sender_type?.includes("User") ? "support" : "user",
                    });
                    return acc;
                }, []));
            }
        } catch (err) {
            console.error("Failed to load chat history", err);
        }
    };

    const setupPusher = useCallback(async (convId) => {
        try {
            const settings = await getChatSettings();
            if (!settings) return;
            if (settings.pusher_driver !== "pusher" && settings.pusher_driver !== "custom") return;

            const options = { forceTLS: (settings.pusher_scheme || "https") === "https" };
            if (settings.pusher_driver === "custom" && settings.pusher_host) {
                options.wsHost = settings.pusher_host;
                options.wsPort = settings.pusher_port || 443;
            } else {
                options.cluster = settings.pusher_cluster;
            }

            const pusherInstance = new Pusher(settings.pusher_key, options);
            setPusher(pusherInstance);

            pusherInstance.connection.bind("connected", () => {
                console.log("Pusher connected");
            });

            pusherInstance.connection.bind("error", (err) => {
                console.error("Pusher connection error", err);
            });

            const channelName = `chat.${convId}`;
            const channel = pusherInstance.subscribe(channelName);
            channelRef.current = channel;

            channel.bind("pusher:subscription_succeeded", () => {
                console.log("Pusher subscribed to", channelName);
            });

            channel.bind("pusher:subscription_error", (err) => {
                console.error("Pusher subscription error", channelName, err);
            });

            channel.bind("pusher:subscription_count", (data) => {
                console.log("Pusher subscription count:", data);
            });

            const handleEvent = (data) => {
                const raw = typeof data === "string" ? JSON.parse(data) : data;
                const msg = raw.message || raw;
                if (!msg || !msg.sender_type || msg.sender_type?.includes("Guest")) return;
                if (prevMsgIds.current.has(msg.id)) return;
                prevMsgIds.current.add(msg.id);
                if (isOpenRef.current) {
                    setMessages((prev) => [...prev, { id: msg.id, text: msg.message, sender: "support" }]);
                } else {
                    setUnreadCount((u) => u + 1);
                }
            };

            channel.bind("message.sent", handleEvent);
            channel.bind("App\\Events\\MessageSent", handleEvent);
            channel.bind("App.Events.MessageSent", handleEvent);
            channel.bind("Illuminate\\Broadcasting\\BroadcastEvent", handleEvent);
        } catch (err) {
            console.error("Pusher setup failed", err);
        }
    }, []);

    const handleInitChat = async (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setLoading(true);
        setError("");
        try {
            const data = await initChat(email.trim());
            if (!data) { setError("Failed to start chat. Try again."); return; }
            setConversationId(data.conversation_id);
            setGuestToken(data.guest_token);
            localStorage.setItem(LS_CONVERSATION, data.conversation_id);
            localStorage.setItem(LS_TOKEN, data.guest_token);
            localStorage.setItem(LS_EMAIL, email.trim());
            setShowEmailForm(false);
            setupPusher(data.conversation_id);
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const text = message.trim();
        if (!text || !conversationId || sending) return;

        const tempId = Date.now();
        setMessages((prev) => [...prev, { id: tempId, text, sender: "user" }]);
        setMessage("");
        setSending(true);

        try {
            const result = await sendChatMessage({
                conversation_id: conversationId,
                message: text,
                sender_id: guestToken,
                sender_type: "Guest",
            });
            if (result?.id) {
                prevMsgIds.current.add(result.id);
                setMessages((prev) => prev.map((m) => (m.id === tempId ? { ...m, id: result.id } : m)));
            }
        } catch (err) {
            setMessages((prev) => prev.map((m) =>
                m.id === tempId ? { ...m, text: `${m.text} (failed to send)` } : m
            ));
        } finally {
            setSending(false);
        }
    };

    const closeChat = () => {
        setIsOpen(false);
        isOpenRef.current = false;
        if (channelRef.current) {
            channelRef.current.unbind_all();
            channelRef.current.unsubscribe();
            channelRef.current = null;
        }
        if (pusher) {
            pusher.disconnect();
            setPusher(null);
        }
    };

    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    useEffect(() => {
        if (!conversationId) return;
        const interval = setInterval(async () => {
            try {
                const history = await getChatHistory(conversationId);
                if (!history?.length) return;
                const newMsgs = history.filter(m => !prevMsgIds.current.has(m.id) && m.sender_type?.includes("User"));
                if (newMsgs.length === 0) return;
                newMsgs.forEach(m => prevMsgIds.current.add(m.id));
                if (isOpenRef.current) {
                    setMessages((prev) => [
                        ...prev,
                        ...newMsgs.map(m => ({ id: m.id, text: m.message, sender: "support" })),
                    ]);
                } else {
                    setUnreadCount((u) => u + newMsgs.length);
                }
            } catch (e) {}
        }, 10000);
        return () => clearInterval(interval);
    }, [conversationId]);

    const openChat = () => {
        setIsOpen(true);
        isOpenRef.current = true;
        setUnreadCount(0);
        if (conversationId) {
            loadHistory(conversationId);
            setupPusher(conversationId);
        }
    };

    useEffect(() => {
        return () => {
            if (channelRef.current) {
                channelRef.current.unbind_all();
                channelRef.current.unsubscribe();
            }
            if (pusher) pusher.disconnect();
        };
    }, [pusher]);

    return (
        <div className="pointer-events-none fixed inset-x-3 bottom-20 sm:bottom-24 z-50 sm:inset-x-auto sm:right-5">
            <div className="pointer-events-auto relative ml-auto w-fit">
                {isOpen && (
                    <div className="absolute right-0 bottom-full flex max-h-[calc(100vh-12rem)] w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-brand-accent bg-background shadow-2xl sm:w-96">
                        <div className="flex shrink-0 items-center justify-between bg-brand-primary px-4 py-3 text-brand-contrast">
                            <div>
                                <p className="text-sm font-semibold">PECEDU Live Chat</p>
                                <p className="text-xs text-brand-soft-text">Usually replies in a few minutes</p>
                            </div>
                            <button
                                type="button"
                                onClick={closeChat}
                                className="rounded-full p-1.5 transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                                aria-label="Close live chat"
                            >
                                <IoClose size={20} />
                            </button>
                        </div>

                        {showEmailForm ? (
                            <div className="px-4 py-6">
                                <p className="mb-4 text-sm text-foreground">
                                    Hi! Enter your email to start a conversation with our support team.
                                </p>
                                <form onSubmit={handleInitChat} className="space-y-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        required
                                        className="w-full rounded-full border border-brand-muted bg-background px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-foreground/50 focus:border-brand-primary"
                                    />
                                    {error && <p className="text-xs text-red-500">{error}</p>}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-4 py-2.5 text-sm font-semibold text-brand-contrast transition hover:bg-brand-accent disabled:opacity-60"
                                    >
                                        {loading ? "Starting..." : "Start Chat"}
                                        <IoSend size={16} />
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <>
                                <div className="h-60 max-h-full min-h-20 space-y-3 scroll-none overflow-y-auto px-3 py-4 sm:h-60 sm:px-4">
                                    {messages.length === 0 && (
                                        <p className="text-center text-sm text-foreground/50">No messages yet. Ask us anything!</p>
                                    )}
                                    {dedupedMessages.map((chatMessage) => {
                                        const isUser = chatMessage.sender === "user";
                                        return (
                                            <div
                                                key={chatMessage.id}
                                                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                                            >
                                                <p
                                                    className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                                                        isUser
                                                            ? "bg-brand-primary text-brand-contrast"
                                                            : "bg-brand-secondary text-foreground"
                                                    }`}
                                                >
                                                    {chatMessage.text}
                                                </p>
                                            </div>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>

                                <div className="shrink-0 px-3 py-3 sm:px-4">
                                    <form onSubmit={handleSendMessage} className="flex gap-2 bg-transparent">
                                        <input
                                            type="text"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Type your message..."
                                            className="min-w-0 flex-1 rounded-full border border-brand-muted bg-background px-4 py-2 text-sm text-foreground outline-none transition placeholder:text-foreground/50 focus:border-brand-primary"
                                        />
                                        <button
                                            type="submit"
                                            disabled={sending || !message.trim()}
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-brand-contrast transition hover:bg-brand-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 disabled:opacity-50"
                                            aria-label="Send message"
                                        >
                                            <IoPaperPlaneOutline size={18} />
                                        </button>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className={`pointer-events-auto ${isOpen ? "hidden" : "flex"} flex-col items-end justify-center gap-2`}>
                <button
                    type="button"
                    onClick={openChat}
                    className="relative rounded-full bg-brand-primary cursor-pointer p-3 text-brand-contrast shadow-lg transition hover:bg-brand-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                    aria-label="Open live chat"
                >
                    <IoChatboxEllipsesOutline size={20} />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white shadow">
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                    )}
                </button>
                <div>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        className="rounded-full inline-flex bg-green-500 cursor-pointer p-3 text-brand-contrast shadow-lg transition hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                        rel="noreferrer"
                    >
                        <BsWhatsapp size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LiveChat;
