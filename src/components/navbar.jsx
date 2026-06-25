"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    CheckCircle2,
    ChevronDown,
    Eye,
    EyeOff,
    Loader2,
    Menu,
    User,
    X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { loginPost } from "@/apis/LoginPost";
import { getPopularDestinations } from "@/apis/getPopularDestinations";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

const Navbar = () => {
    const [popularDestination, setPopularDestination] = useState([]);

    useEffect(() => {
        const run = async () => {
            const res = await getPopularDestinations();
            const list = res?.popular_destinations ?? res ?? [];
            setPopularDestination(list);
        };
        run();
    }, []);
    const navData = [
        { name: "Home", href: "/" },
        {
            name: "About",
            href: "",
            children: [
                {
                    name: "About Us",
                    href: "/about/about-us",
                },
                {
                    name: "Our Process",
                    href: "/about/our-process",
                },
                {
                    name: "Our Officials",
                    href: "/about/officials",
                },
                {
                    name: "Scholarship",
                    href: "/about/scholarship",
                },
                {
                    name: "Career",
                    href: "/career",
                },
            ],
        },
        {
            name: "Study Abroad",
            href: "/study-abroad",
            children: [
                {
                    name: "Study in the Asia",
                    href: "/study-abroad/asia",
                },
                {
                    name: "Study in the Europe",
                    href: "/study-abroad/europe",
                },
                {
                    name: "Study in the Australia",
                    href: "/study-abroad/australia",
                },
                {
                    name: "Study in the North America",
                    href: "/study-abroad/north-america",
                },
            ],
        },
        {
            name: "Popular Destinations",
            href: "",
            children: [
                ...popularDestination.map((pd) => ({
                    name: pd.name,
                    iso_code: pd.iso_code,
                    href: `/popular-destinations/${pd.id}`,
                    src: `${process.env.NEXT_PUBLIC_SITE_URL}${pd.thumbnail}`,
                    id: pd.id,
                })),
            ],
        },
        // {
        //   name: "Travel & Tours",
        //   href: "/travel-tours",
        //   children: [
        //     {
        //       name: "Travel Destinations",
        //       href: "/travel-tours/travel-destinations",
        //     },
        //     { name: "Air Tickets", href: "/travel-tours/air-tickets" },
        //     {
        //       name: "Medical & Travel Insurance",
        //       href: "/travel-tours/medical-travel-insurance",
        //     },
        //   ],
        // },

        { name: "Services", href: "/services" },
        { name: "Blogs", href: "/blogs" },
        { name: "Contact", href: "/contact" },
    ];
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileExpanded, setMobileExpanded] = useState(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const loginButtonRef = useRef(null);
    const loginPanelRef = useRef(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     setLoginError("");
    //     setLoginSuccess("");
    //     setLoginLoading(true);
    //     try {
    //         const res = await loginPost({ email, password });
    //         if (res?.success) {
    //             localStorage.setItem("token", res.token);
    //             localStorage.setItem("user", JSON.stringify(res.data));
    //             setLoginSuccess(
    //                 res?.message || "Login successful! Welcome back.",
    //             );
    //             setEmail("");
    //             setPassword("");
    //             setTimeout(() => {
    //                 setIsLoginOpen(false);
    //                 setLoginSuccess("");
    //             }, 2000);
    //         } else {
    //             setLoginError(
    //                 res?.message || "Login failed. Please try again.",
    //             );
    //         }
    //     } catch (err) {
    //         setLoginError("Something went wrong. Please try again.");
    //     } finally {
    //         setLoginLoading(false);
    //     }
    // };


//     const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoginError("");
//     setLoginSuccess("");
//     setLoginLoading(true);
//     try {
//       const res = await loginPost({ email, password });
//       if (res?.success) {
//         localStorage.setItem("token", res.token);
//         localStorage.setItem("user", JSON.stringify(res.data));
//         setLoginSuccess(res?.message || "Login successful! Welcome back.");
//         setEmail("");
//         setPassword("");
//         setTimeout(() => {
//           setIsLoginOpen(false);
//           setLoginSuccess("");
//           redirect(`${res.redirect_url}?token=${res.token}`);
//         }, 1000);
//       } else {
//         setLoginError(res?.message || "Login failed. Please try again.");
//       }
//     } catch (err) {
//       setLoginError("Something went wrong. Please try again.");
//     } finally {
//       setLoginLoading(false);
//     }
//   };
const handleLogin = async (e) => {
  e.preventDefault();
  setLoginError("");
  setLoginSuccess("");
  setLoginLoading(true);
  try {
    const res = await loginPost({ email, password });
    if (res?.success) {
      // টোকেন এক্সট্র্যাক্ট
      const token = res.token || res.data?.token || res.access_token || res.data?.access_token;
      console.log("Extracted Token:", token);

      // Cookie সেটআপ
      const hostname = window.location.hostname;
      const cookieOptions = {
        expires: 30,
        path: "/",
        secure: true,
        sameSite: "None",
      };
      if (hostname.includes("peceduglobal.com")) {
        cookieOptions.domain = ".peceduglobal.com";
      }
      Cookies.set("auth_token", token, cookieOptions);
      Cookies.set("token", token, cookieOptions);

      // localStorage সেটআপ
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }

      // ✅ কোনো মেসেজ সেট করবেন না, সরাসরি রিডাইরেক্ট
      setEmail("");
      setPassword("");
      
      // ✅ লোডিং স্টেট থেকেই রিডাইরেক্ট
      let redirectUrl = res.data?.redirect_url || res?.redirect_url || "https://apps.peceduglobal.com/dashboard";
      
      if (redirectUrl) {
        const separator = redirectUrl.includes("?") ? "&" : "?";
        const finalUrl = `${redirectUrl}${separator}token=${token}`;
        
        // ✅ সাথে সাথেই রিডাইরেক্ট (লোডিং স্টেট থেকেই)
        window.location.href = finalUrl;
      }

      // মডেল বন্ধ করুন (যদি রিডাইরেক্ট না হয়)
      setIsLoginOpen(false);
      
    } else {
      setLoginError(res?.message || "Login failed. Please try again.");
      setLoginLoading(false);
    }
  } catch (err) {
    console.error("Login error:", err);
    setLoginError("Something went wrong. Please try again.");
    setLoginLoading(false);
  }
};


    const toggleMobileDropdown = (idx) => {
        setMobileExpanded(mobileExpanded === idx ? null : idx);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setMobileExpanded(null);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            const isButtonClick = loginButtonRef.current?.contains(
                event.target,
            );
            const isPanelClick = loginPanelRef.current?.contains(event.target);

            if (loginButtonRef.current && !isButtonClick && !isPanelClick) {
                setIsLoginOpen(false);
            }
        };

        if (isLoginOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isLoginOpen]);

    return (
        <nav className=" w-full  top-4 bg-(--nav-background) ">
            <div className="backdrop-blur-xl  transition-colors duration-200 px-2">
                <div className="container mx-auto relative">
                    <div className="w-full flex items-center justify-between  py-3  ">
                        <Link
                            href={"/"}
                            className="flex items-center lg:h-15 h-12 w-25 lg:w-30 gap-2 bg-white rounded-lg"
                            onClick={closeMobileMenu}
                        >
                            <Image
                                src={"/logo/logo.png"}
                                alt="pec edu logo"
                                height={90}
                                width={200}
                            />
                        </Link>

                        <div className="hidden lg:flex items-center lg:gap-4 xl:gap-8">
                            {navData.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="relative group"
                                    onMouseEnter={() => setActiveDropdown(idx)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-1 text-sm xl:text-lg font-medium text-(--nav-text) hover:text-brand-muted transition-all py-2"
                                    >
                                        {item.name}
                                        {item.children && (
                                            <ChevronDown
                                                size={14}
                                                className={`transition-transform duration-300 ${activeDropdown === idx ? "rotate-180" : ""}`}
                                            />
                                        )}
                                    </Link>

                                    <AnimatePresence>
                                        {item.children &&
                                            activeDropdown === idx && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: 10,
                                                        scale: 0.95,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                        scale: 1,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        y: 10,
                                                        scale: 0.95,
                                                    }}
                                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-70 bg-white/95 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 p-2"
                                                >
                                                    {item?.children?.map(
                                                        (child, cIdx) => (
                                                            <Link
                                                                key={cIdx}
                                                                href={
                                                                    child.href
                                                                }
                                                                className="block px-4 py-2 text-lg text-gray-700 hover:bg-brand-secondary hover:text-brand-primary rounded-lg transition-colors"
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    {child.src && (
                                                                        <div>
                                                                            <Image
                                                                                src={
                                                                                    child?.src
                                                                                }
                                                                                className="h-10 w-10 rounded-lg object-cover"
                                                                                width={
                                                                                    1000
                                                                                }
                                                                                height={
                                                                                    1000
                                                                                }
                                                                                alt={
                                                                                    child.name
                                                                                }
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    {child.name}
                                                                </div>
                                                            </Link>
                                                        ),
                                                    )}
                                                </motion.div>
                                            )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        <div
                            ref={loginButtonRef}
                            className="relative flex items-center gap-2"
                        >
                          
                            <button
                                type="button"
                                aria-label="Toggle login form"
                                aria-expanded={isLoginOpen}
                                onClick={() => {
                                    setIsLoginOpen(!isLoginOpen);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="p-1.5 bg-white/10 hover:bg-white/20 shadow-xl shadow-black/20 duration-300 hover:scale-105 cursor-pointer rounded-full"
                            >
                                <User size={22} stroke="#FFF" />
                            </button>
                        </div>

                        <button
                            className="lg:hidden text-white p-2"
                            onClick={() => {
                                setIsMobileMenuOpen(!isMobileMenuOpen);
                                setIsLoginOpen(false);
                            }}
                        >
                            {isMobileMenuOpen ? (
                                <X size={28} />
                            ) : (
                                <Menu size={28} />
                            )}
                        </button>
                    </div>

                    <AnimatePresence>
                        {isLoginOpen && (
                            <motion.div
                                ref={loginPanelRef}
                                initial={{
                                    opacity: 0,
                                    y: 12,
                                    scale: 0.96,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 12,
                                    scale: 0.96,
                                }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 top-full mt-3 w-full rounded-2xl border border-white/20 bg-white p-5 text-slate-900 shadow-2xl shadow-black/25 sm:w-96"
                            >
                                <form
                                    className="space-y-4"
                                    onSubmit={handleLogin}
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-950">
                                            Login
                                        </h3>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Access your account with email or
                                            phone.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="login-email-phone"
                                            className="text-sm font-medium text-slate-700"
                                        >
                                            Email or phone
                                        </label>
                                        <input
                                            id="login-email-phone"
                                            type="text"
                                            autoComplete="username"
                                            placeholder="Email or phone number"
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between gap-3">
                                            <label
                                                htmlFor="login-password"
                                                className="text-sm font-medium text-slate-700"
                                            >
                                                Password
                                            </label>
                                            <Link
                                                href="/forgot-password"
                                                className="shrink-0 text-sm font-medium text-brand-primary hover:text-brand-accent/60"
                                            >
                                                Forgot?
                                            </Link>
                                        </div>
                                        <div className="relative">
                                            <input
                                                id="login-password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                autoComplete="current-password"
                                                placeholder="Enter password"
                                                className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-11 text-sm outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword,
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                                aria-label={
                                                    showPassword
                                                        ? "Hide password"
                                                        : "Show password"
                                                }
                                            >
                                                {showPassword ? (
                                                    <EyeOff size={18} />
                                                ) : (
                                                    <Eye size={18} />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {loginError && (
                                        <p className="flex items-center justify-center gap-1.5 text-sm text-red-500 text-center">
                                            {loginError}
                                        </p>
                                    )}

                                    {loginSuccess && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center justify-center gap-1.5 text-sm text-green-600 font-medium text-center"
                                        >
                                            <CheckCircle2 size={16} />
                                            {loginSuccess}
                                        </motion.p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loginLoading}
                                        className="w-full rounded-xl bg-brand-accent cursor-pointer px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-brand-primary disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loginLoading && (
                                            <Loader2
                                                size={16}
                                                className="animate-spin"
                                            />
                                        )}
                                        {loginLoading
                                            ? "Logging in..."
                                            : "Login"}
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute top-full left-0 bg-[var(--nav-background)] right-0 mt-3 lg:hidden backdrop-blur-2xl rounded-3xl border border-[var(--nav-border)] shadow-2xl overflow-hidden p-4"
                            >
                                <div className="flex flex-col gap-2">
                                    {navData.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="border-b border-gray-100 last:border-0"
                                        >
                                            {item.children ? (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleMobileDropdown(
                                                            idx,
                                                        )
                                                    }
                                                    className="w-full flex items-center justify-between py-4 px-2 text-white font-semibold"
                                                >
                                                    {item.name}
                                                    <ChevronDown
                                                        size={18}
                                                        className={`transition-transform ${mobileExpanded === idx ? "rotate-180" : ""}`}
                                                    />
                                                </button>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    onClick={closeMobileMenu}
                                                    className="w-full flex items-center justify-between py-4 px-2 text-white font-semibold"
                                                >
                                                    {item.name}
                                                </Link>
                                            )}

                                            <AnimatePresence>
                                                {item.children &&
                                                    mobileExpanded === idx && (
                                                        <motion.div
                                                            initial={{
                                                                height: 0,
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                height: "auto",
                                                                opacity: 1,
                                                            }}
                                                            exit={{
                                                                height: 0,
                                                                opacity: 0,
                                                            }}
                                                            className="overflow-hidden bg-black/15 rounded-xl mb-2"
                                                        >
                                                            <div className="flex flex-col py-2 px-4 gap-3">
                                                                {item.children.map(
                                                                    (
                                                                        child,
                                                                        cIdx,
                                                                    ) => (
                                                                        <Link
                                                                            key={
                                                                                cIdx
                                                                            }
                                                                            href={
                                                                                child.href
                                                                            }
                                                                            onClick={
                                                                                closeMobileMenu
                                                                            }
                                                                            className="text-white text-sm py-1"
                                                                        >
                                                                            {
                                                                                child.name
                                                                            }
                                                                        </Link>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                    <Link
                                        href={"/apply-now"}
                                        onClick={closeMobileMenu}
                                        className="px-4 flex items-center gap-1 py-2.5 bg-black/10 text-white justify-center rounded-xl font-semibold"
                                    >
                                        Apply Now
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
