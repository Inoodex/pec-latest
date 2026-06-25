"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
    User,
    Mail,
    Phone,
    GraduationCap,
    School,
    BookOpen,
    Globe,
    Calendar,
    Clock,
    X,
    CheckCircle,
    Loader2,
} from "lucide-react";
import Heading from "@/components/heading";
import Image from "next/image";
import { getCountriesData } from "@/apis/getCountriesData";
import { getUniversitiesData } from "@/apis/getUniversities";
import { getCoursesData } from "@/apis/getCoursesData";
import { postInqueriesData } from "@/apis/postInqueriesData";
import { bookConsultation, getSlotByDate } from "@/apis/consultBookingApi";

const ApplicationForm = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        english_proficiency: "NO",
        proficiency_score: "",
        last_qualification: "MBA or Masters",
        last_result: "",
        preferred_university: "",
        preferred_course: "",
        preferred_country: "",
        preferred_date: "",
        preferred_time: "",
    });
    const [countries, setCountries] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    // Available slots state
    const [availableSlots, setAvailableSlots] = useState([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [selectedSlotId, setSelectedSlotId] = useState("");

    // Booking Modal States
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingStep, setBookingStep] = useState('booking');
    const [bookingData, setBookingData] = useState({
        preferredDate: "",
        preferredTime: "",
        schedule_id: "",
    });

    // 1. Dynamic Cascading: Filter universities based on selected country
    const filteredUniversities = useMemo(() => {
        if (!formData.preferred_country) return [];
        const preferredCountry = formData.preferred_country.toLowerCase();

        const selectedCountryObj = countries.find(
            (c) => c.name?.toLowerCase() === preferredCountry,
        );
        const selectedCountryId = selectedCountryObj?.id || selectedCountryObj?._id;

        return universities.filter((uni) => {
            if (
                selectedCountryId &&
                (uni.country_id === selectedCountryId ||
                    uni.country?.id === selectedCountryId ||
                    uni.country?._id === selectedCountryId)
            ) {
                return true;
            }
            const uniCountry = uni.country?.name || uni.country_name || uni.country;
            return (
                typeof uniCountry === "string" &&
                uniCountry.toLowerCase() === preferredCountry
            );
        });
    }, [formData.preferred_country, universities, countries]);

    // 2. Dynamic Cascading: Map available courses based on selected university
    const availableCourses = useMemo(() => {
        if (!formData.preferred_university) return [];
        const preferredUni = formData.preferred_university.toLowerCase();

        const selectedUniObj = universities.find(
            (u) => u.name?.toLowerCase() === preferredUni,
        );
        const selectedUniId = selectedUniObj?.id || selectedUniObj?._id;

        const cmsCourses = courses
            .filter((course) => {
                if (
                    selectedUniId &&
                    (course.university_id === selectedUniId ||
                        course.university?.id === selectedUniId ||
                        course.university?._id === selectedUniId)
                ) {
                    return true;
                }
                const courseUni = course.university?.name ||
                    course.university_name ||
                    course.university;
                return (
                    typeof courseUni === "string" &&
                    courseUni.toLowerCase() === preferredUni
                );
            })
            .map((course) => course.name || course.title);

        if (cmsCourses.length > 0) {
            return cmsCourses;
        }

        return [
            "Help Me To Decide",
            "Data Science",
            "Artificial Intelligence",
            "Cybersecurity",
            "Software Engineering",
            "Cloud Computing",
            "Automation and Robotics",
            "Renewable Energy Engineering",
            "Mechatronics",
            "Industrial Engineering",
            "Electrical Power Engineering",
            "Financial Technology (FinTech)",
            "Economics",
            "Investment Management",
            "Risk Management",
            "Banking and Finance",
            "Business Analytics",
            "Supply Chain Management",
            "Industrial Engineering & Management",
            "Renewable Energy Management",
            "Technology Management",
            "Public Health",
            "Health Informatics",
            "Healthcare Management",
            "Epidemiology",
            "Biostatistics",
        ];
    }, [formData.preferred_university, universities, courses]);

    // Fetch slots automatically when date changes
    useEffect(() => {
        const fetchSlots = async () => {
            if (!formData.preferred_date) {
                setAvailableSlots([]);
                setSelectedSlotId("");
                setFormData(prev => ({ ...prev, preferred_time: "" }));
                return;
            }

            setIsLoadingSlots(true);
            
            try {
                const response = await getSlotByDate(formData.preferred_date);
                
                let slots = [];
                
                if (response) {
                    if (response.data && Array.isArray(response.data)) {
                        slots = response.data;
                    } else if (response.slots && Array.isArray(response.slots)) {
                        slots = response.slots;
                    } else if (Array.isArray(response)) {
                        slots = response;
                    } else if (response.result && Array.isArray(response.result)) {
                        slots = response.result;
                    } else if (response.items && Array.isArray(response.items)) {
                        slots = response.items;
                    } else if (response.available_slots && Array.isArray(response.available_slots)) {
                        slots = response.available_slots;
                    } else if (typeof response === 'object') {
                        const keys = Object.keys(response);
                        for (const key of keys) {
                            if (Array.isArray(response[key]) && response[key].length > 0) {
                                slots = response[key];
                                break;
                            }
                        }
                    }
                }
                
                if (slots.length === 0) {
                    setAvailableSlots([]);
                    setSelectedSlotId("");
                    setFormData(prev => ({ ...prev, preferred_time: "" }));
                } else {
                    const validSlots = slots.filter(slot => {
                        const hasId = slot.id || slot._id;
                        const hasTime = slot.start_time || slot.startTime || slot.time || slot.slot_time;
                        return hasId && hasTime;
                    });
                    
                    if (validSlots.length === 0) {
                        setAvailableSlots([]);
                        setSelectedSlotId("");
                        setFormData(prev => ({ ...prev, preferred_time: "" }));
                    } else {
                        setAvailableSlots(validSlots);
                        const firstSlot = validSlots[0];
                        const slotId = firstSlot.id || firstSlot._id;
                        const startTime = firstSlot.start_time || firstSlot.startTime || firstSlot.time || firstSlot.slot_time;
                        const endTime = firstSlot.end_time || firstSlot.endTime;
                        const timeDisplay = endTime ? `${startTime} - ${endTime}` : startTime;
                        
                        setSelectedSlotId(slotId);
                        setFormData(prev => ({ ...prev, preferred_time: timeDisplay }));
                    }
                }
                
            } catch (error) {
                console.error("❌ Error fetching slots:", error);
                setAvailableSlots([]);
                setSelectedSlotId("");
                setFormData(prev => ({ ...prev, preferred_time: "" }));
            } finally {
                setIsLoadingSlots(false);
            }
        };

        fetchSlots();
    }, [formData.preferred_date]);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countriesRes = await getCountriesData(
                    "countries?per_page=1000",
                );
                const countryList = Array.isArray(countriesRes)
                    ? countriesRes
                    : countriesRes?.data?.data ||
                      countriesRes?.data ||
                      countriesRes?.countries ||
                      [];
                setCountries(countryList);

                const universitiesRes = await getUniversitiesData(
                    "universities?per_page=1000",
                );
                const uniList = Array.isArray(universitiesRes)
                    ? universitiesRes
                    : universitiesRes?.data?.data ||
                      universitiesRes?.data ||
                      universitiesRes?.universities ||
                      [];
                setUniversities(uniList);

                const coursesRes = await getCoursesData(
                    "courses?per_page=5000",
                );
                const courseList = Array.isArray(coursesRes)
                    ? coursesRes
                    : coursesRes?.data?.data ||
                      coursesRes?.data ||
                      coursesRes?.courses ||
                      [];
                setCourses(courseList);
            } catch (error) {
                console.error(
                    "Error loading dynamically cascaded data:",
                    error,
                );
            }
        };
        fetchData();
    }, []);

    // Handle slot selection from dropdown
    const handleSlotSelect = (e) => {
        const selectedValue = e.target.value;
        
        if (!selectedValue) {
            setSelectedSlotId("");
            setFormData(prev => ({ ...prev, preferred_time: "" }));
            return;
        }
        
        const selectedSlot = availableSlots.find(slot => {
            const slotId = slot.id || slot._id;
            return String(slotId) === String(selectedValue);
        });
        
        if (selectedSlot) {
            const slotId = selectedSlot.id || selectedSlot._id;
            const startTime = selectedSlot.start_time || selectedSlot.startTime || selectedSlot.time || selectedSlot.slot_time;
            const endTime = selectedSlot.end_time || selectedSlot.endTime;
            const timeDisplay = endTime ? `${startTime} - ${endTime}` : startTime;
            
            setSelectedSlotId(slotId);
            setFormData(prev => ({ ...prev, preferred_time: timeDisplay }));
        }
    };

    // Handle main form submission - Opens booking modal
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.first_name || !formData.email || !formData.phone) {
            setToast({
                type: "error",
                message: "Please fill in all required fields.",
            });
            return;
        }

        if (!formData.preferred_date) {
            setToast({
                type: "error",
                message: "Please select a preferred date.",
            });
            return;
        }

        if (!formData.preferred_time) {
            setToast({
                type: "error",
                message: "Please select a time slot.",
            });
            return;
        }

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setShowBookingModal(true);
        setBookingStep('booking');
        setBookingData({
            preferredDate: formData.preferred_date,
            preferredTime: formData.preferred_time,
            schedule_id: selectedSlotId,
        });
        
        setIsSubmitting(false);
    };

    // Handle final submission - both APIs
    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setToast(null);

        try {
            const inquiryPayload = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                phone: formData.phone,
                type: "university_apply",
                additional_info: {
                    ielts_proficiency: formData.english_proficiency,
                    ielts_score: formData.proficiency_score,
                    last_education: formData.last_qualification,
                    cgpa: formData.last_result,
                    preferred_country: formData.preferred_country,
                    preferred_university: formData.preferred_university,
                    preferred_course: formData.preferred_course,
                    preferred_date: formData.preferred_date,
                    preferred_time: formData.preferred_time,
                    message: "",
                },
            };

            const inquiryResponse = await postInqueriesData("inquiry", inquiryPayload);

            const bookingPayload = {
                name: `${formData.first_name} ${formData.last_name}`.trim(),
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                phone: formData.phone,
                schedule_id: selectedSlotId,
                meeting_type: "online",
                additional_info: {
                    preferred_date: formData.preferred_date,
                    preferred_time: formData.preferred_time,
                    purpose: "University Application",
                    preferred_university: formData.preferred_university,
                    preferred_course: formData.preferred_course,
                },
            };

            const bookingResponse = await bookConsultation(bookingPayload);

            const inquirySuccess = inquiryResponse &&
                (inquiryResponse.success ||
                    inquiryResponse.status === "success" ||
                    inquiryResponse.id ||
                    inquiryResponse.data);

            const bookingSuccess = bookingResponse &&
                (bookingResponse.success ||
                    bookingResponse.status === "success" ||
                    bookingResponse.id ||
                    bookingResponse.data);

            if (inquirySuccess && bookingSuccess) {
                setBookingStep('success');
                // No toast message - only show in modal

                setTimeout(() => {
                    setFormData({
                        first_name: "",
                        last_name: "",
                        email: "",
                        phone: "",
                        english_proficiency: "NO",
                        proficiency_score: "",
                        last_qualification: "MBA or Masters",
                        last_result: "",
                        preferred_university: "",
                        preferred_course: "",
                        preferred_country: "",
                        preferred_date: "",
                        preferred_time: "",
                    });
                    setAvailableSlots([]);
                    setSelectedSlotId("");
                }, 2000);
            } else {
                throw new Error("One or both submissions failed");
            }
        } catch (error) {
            console.error("❌ Submission error:", error);
            setToast({
                type: "error",
                message: error.message || "Failed to complete submission. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setShowBookingModal(false);
        setBookingStep('booking');
        setBookingData({
            preferredDate: "",
            preferredTime: "",
            schedule_id: "",
        });
        // Reset form after modal close if success
        if (bookingStep === 'success') {
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                english_proficiency: "NO",
                proficiency_score: "",
                last_qualification: "MBA or Masters",
                last_result: "",
                preferred_university: "",
                preferred_course: "",
                preferred_country: "",
                preferred_date: "",
                preferred_time: "",
            });
            setAvailableSlots([]);
            setSelectedSlotId("");
            setBookingStep('booking');
        }
    };

    return (
        <div className="bg-gray-100 p-4 md:py-20 md:pt-40 pt-30 py-10 relative">
            <Heading
                title="Consult with Our"
                highlight="Expert!"
                color={false}
                paragraph="Book your FREE online consultation with our expert team today! Just share your details to get started all from the comfort of your home."
            />
            <div className="flex flex-col lg:flex-row justify-center items-center max-w-7xl mx-auto border border-slate-300 p-3 bg-white rounded-4xl">
                <div className="w-full lg:w-6/12">
                    <Image
                        src={"/images/contact-image.webp"}
                        alt="contact image"
                        height={1000}
                        className="w-full h-full rounded-3xl"
                        width={1000}
                    />
                </div>
                <div className="w-full lg:w-6/12 mt-5 lg:mt-0 bg-white rounded-r-3xl overflow-hidden">
                    <div className="px-2 md:p-10">
                        <form className="space-y-6" onSubmit={handleFormSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-lg font-semibold text-black flex items-center gap-2">
                                        First Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            value={formData.first_name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    first_name: e.target.value,
                                                })
                                            }
                                            className="px-4 pl-10 w-full h-12 outline-none ring ring-brand-primary/50 bg-gray-100 rounded-lg"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-lg font-semibold text-black flex items-center gap-2">
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            value={formData.last_name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    last_name: e.target.value,
                                                })
                                            }
                                            className="px-4 pl-10 h-12 w-full outline-none ring ring-brand-primary/50 bg-gray-100 rounded-lg"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-lg font-semibold text-black flex items-center gap-2">
                                        Email{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    email: e.target.value,
                                                })
                                            }
                                            className="px-4 w-full pl-10 h-12 outline-none ring ring-brand-primary/50 bg-gray-100 rounded-lg"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-lg font-semibold text-black flex items-center gap-2">
                                        Contact Number{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                                        <input
                                            type="tel"
                                            placeholder="Mobile Number"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    phone: e.target.value,
                                                })
                                            }
                                            className="px-4 pl-10 w-full h-12 outline-none ring ring-brand-primary/50 bg-gray-100 rounded-lg"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col justify-between gap-2">
                                    <p className="text-lg font-semibold text-black">
                                        Do you have IELTS or any English
                                        proficiency?
                                    </p>
                                    <div className="flex gap-6">
                                        <select
                                            name="proficiency"
                                            id="proficiency"
                                            value={formData.english_proficiency}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    english_proficiency:
                                                        e.target.value,
                                                })
                                            }
                                            className="px-4 w-full py-2 outline-none ring ring-brand-primary/50 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>
                                                Select Proficiency
                                            </option>
                                            <option value="IELTS">IELTS</option>
                                            <option value="PTE">PTE</option>
                                            <option value="TOEFL">TOEFL</option>
                                            <option value="WAEC">WAEC</option>
                                            <option value="NECO">NECO</option>
                                            <option value="Duolingo">
                                                Duolingo
                                            </option>
                                            <option value="OIETC">OIETC</option>
                                            <option value="MOI">MOI</option>
                                            <option value="Others">
                                                Others
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between gap-2">
                                    <p className="text-lg font-semibold text-black">
                                        English proficiency score?
                                    </p>
                                    <div className="relative">
                                        <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5 z-10" />
                                        <input
                                            type="text"
                                            placeholder="Score"
                                            value={formData.proficiency_score}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    proficiency_score:
                                                        e.target.value,
                                                })
                                            }
                                            className="px-4 pl-10 w-full h-12 outline-none ring ring-brand-primary/50 bg-gray-100 rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col justify-between gap-2">
                                    <label className="text-lg font-semibold text-black">
                                        Last educational qualification:
                                    </label>
                                    <div className="relative">
                                        <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5 z-10" />
                                        <select
                                            value={formData.last_qualification}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    last_qualification:
                                                        e.target.value,
                                                })
                                            }
                                            className="px-4 pl-10 w-full h-12 outline-none ring ring-brand-primary/50 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                                        >
                                            <option value="MBA or Masters">
                                                MBA or Masters
                                            </option>
                                            <option value="Bachelors">
                                                Bachelors
                                            </option>
                                            <option value="Diploma">
                                                Diploma
                                            </option>
                                            <option value="Vocational">
                                                Vocational
                                            </option>
                                            <option value="HSC">HSC</option>
                                            <option value="SSC">SSC</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between gap-2">
                                    <label className="text-lg font-semibold text-black">
                                        Last academic result:
                                    </label>
                                    <div className="relative">
                                        <School className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5 z-10" />
                                        <input
                                            type="text"
                                            placeholder="GPA / CGPA"
                                            value={formData.last_result}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    last_result: e.target.value,
                                                })
                                            }
                                            className="px-4 pl-10 w-full h-12 outline-none ring ring-brand-primary/50 bg-gray-100 rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-lg font-semibold text-black">
                                        Preferred Country
                                    </label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5 z-10" />
                                        <select
                                            value={formData.preferred_country}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    preferred_country:
                                                        e.target.value,
                                                    preferred_university: "",
                                                    preferred_course: "",
                                                });
                                            }}
                                            className="px-4 w-full h-12 pl-10 outline-none ring ring-brand-primary/50 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                                            required
                                        >
                                            <option value="" disabled>
                                                Select Preferred Country
                                            </option>
                                            <option value="help_me">
                                                Help Me To Decide
                                            </option>
                                            {countries.map((c) => (
                                                <option
                                                    key={c.id || c.name}
                                                    value={c.name}
                                                >
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-lg font-semibold text-black">
                                        Preferred University
                                    </label>
                                    <div className="relative">
                                        <School className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5 z-10" />
                                        <select
                                            value={
                                                formData.preferred_university
                                            }
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    preferred_university:
                                                        e.target.value,
                                                    preferred_course: "",
                                                });
                                            }}
                                            disabled={
                                                !formData.preferred_country
                                            }
                                            className="h-12 px-4 pl-10 w-full outline-none ring ring-brand-primary/50 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                                            required
                                        >
                                            <option value="" disabled>
                                                {formData.preferred_country
                                                    ? "Select Preferred University"
                                                    : "Select Country First"}
                                            </option>
                                            <option value="help_me">
                                                Help Me To Decide
                                            </option>
                                            {filteredUniversities.map((uni) => (
                                                <option
                                                    key={uni.id || uni.name}
                                                    value={uni.name}
                                                >
                                                    {uni.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-lg font-semibold text-black">
                                    Preferred Course
                                </label>
                                <div className="relative">
                                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5 z-10" />
                                    <select
                                        value={formData.preferred_course}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                preferred_course:
                                                    e.target.value,
                                            })
                                        }
                                        disabled={
                                            !formData.preferred_university
                                        }
                                        className={`px-4 w-full h-12 pl-10 outline-none ring ring-brand-primary/50 bg-gray-100 rounded-lg appearance-none cursor-pointer ${
                                            !formData.preferred_university
                                                ? "opacity-60 cursor-not-allowed"
                                                : ""
                                        }`}
                                        required
                                    >
                                        <option value="" disabled>
                                            {formData.preferred_university
                                                ? "Select Preferred Course"
                                                : "Select University First"}
                                        </option>
                                        {availableCourses.map((courseName) => (
                                            <option
                                                key={courseName}
                                                value={courseName}
                                            >
                                                {courseName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Preferred Date with Auto Slot Fetch */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-lg font-semibold text-black">
                                        Preferred Date <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                                        <input
                                            type="date"
                                            value={formData.preferred_date}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    preferred_date: e.target.value,
                                                })
                                            }
                                            min={new Date().toISOString().split('T')[0]}
                                            className="px-4 w-full py-2 pl-10 outline-none ring ring-brand-primary/50 bg-gray-100 rounded-lg"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-lg font-semibold text-black">
                                        Preferred Time <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                                        <select
                                            value={selectedSlotId}
                                            onChange={handleSlotSelect}
                                            disabled={!formData.preferred_date || isLoadingSlots || availableSlots.length === 0}
                                            className={`px-4 w-full h-12 pl-10 outline-none ring ring-brand-primary/50 bg-gray-100 rounded-lg appearance-none cursor-pointer ${
                                                !formData.preferred_date || isLoadingSlots || availableSlots.length === 0
                                                    ? "opacity-60 cursor-not-allowed"
                                                    : ""
                                            }`}
                                            required
                                        >
                                            <option value="" disabled>
                                                {isLoadingSlots ? "Loading slots..." : 
                                                 !formData.preferred_date ? "Select date first" :
                                                 availableSlots.length === 0 ? "No slots available" : 
                                                 "Select time slot"}
                                            </option>
                                            {availableSlots.map((slot) => {
                                                const slotId = slot.id || slot._id;
                                                const startTime = slot.start_time || slot.startTime || slot.time || slot.slot_time;
                                                const endTime = slot.end_time || slot.endTime;
                                                const timeDisplay = endTime ? `${startTime} - ${endTime}` : startTime;
                                                
                                                return (
                                                    <option key={slotId} value={slotId}>
                                                        {timeDisplay}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    {isLoadingSlots && (
                                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Loading slots...
                                        </p>
                                    )}
                                   
                                </div>
                            </div>

                            {/* Fixed Apply Button - Always at bottom */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !formData.preferred_date || !formData.preferred_time}
                                    className={`w-full bg-brand-primary hover:bg-brand-accent text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-200 uppercase tracking-wider flex items-center justify-center gap-2 ${
                                        isSubmitting || !formData.preferred_date || !formData.preferred_time
                                            ? "opacity-75 cursor-not-allowed"
                                            : "cursor-pointer"
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Apply Now"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Booking Modal - Success message only in modal */}
            {showBookingModal && (
                <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm transition-opacity duration-300">
                    <div
                        className="absolute inset-0 cursor-pointer"
                        onClick={closeModal}
                    ></div>

                    <div className="relative w-full max-w-2xl bg-white text-gray-900 border border-gray-200 rounded-3xl overflow-hidden shadow-2xl z-10 transform scale-100 transition-all duration-300 max-h-[90vh] flex flex-col">
                        <div className="relative p-6 border-b border-brand-primary/20 bg-(--nav-background) text-white flex justify-between items-center shrink-0">
                            <div>
                                <span className="text-2xl font-bold text-white">PECEDU Global</span>
                                <h2 className="text-lg font-medium">Book Consultation</h2>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="overflow-y-scroll scroll-none p-6 md:p-8 flex-1 scrollbar-thin bg-white text-gray-900">
                            {bookingStep === 'success' ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="bg-emerald-50 p-4 rounded-full mb-6 animate-bounce">
                                        <CheckCircle className="w-16 h-16 text-emerald-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        Application & Booking Successful!
                                    </h3>
                                    <p className="text-gray-600 max-w-md mb-8">
                                        Thank you for choosing PECEDU Global,{" "}
                                        <span className="font-semibold">{formData.first_name} {formData.last_name}</span>! 
                                        Your application has been submitted and consultation booked for{" "}
                                        <span className="font-semibold">{bookingData.preferredDate}</span>{" "}
                                        at{" "}
                                        <span className="font-semibold">{bookingData.preferredTime}</span>.
                                    </p>
                                    <button
                                        onClick={closeModal}
                                        className="px-8 py-3 bg-brand-accent hover:bg-brand-primary text-white font-semibold rounded-xl transition duration-300 shadow-md cursor-pointer"
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Booking Summary</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Name:</span>
                                                <span className="font-medium">{formData.first_name} {formData.last_name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Email:</span>
                                                <span className="font-medium">{formData.email}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Phone:</span>
                                                <span className="font-medium">{formData.phone}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Date:</span>
                                                <span className="font-medium">{bookingData.preferredDate}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Time:</span>
                                                <span className="font-medium">{bookingData.preferredTime}</span>
                                            </div>
                                            {formData.preferred_university && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">University:</span>
                                                    <span className="font-medium">{formData.preferred_university}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleFinalSubmit}
                                        disabled={isSubmitting}
                                        className={`w-full bg-brand-primary hover:bg-brand-accent text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-200 uppercase tracking-wider flex justify-center items-center ${
                                            isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                                Submitting...
                                            </>
                                        ) : (
                                            "Confirm & Apply"
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification - Only for errors, not success */}
            {toast && toast.type === 'error' && (
                <div
                    className={`fixed bottom-5 right-5 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 text-white border transition-all duration-300 transform translate-y-0 bg-red-600 border-red-500`}
                >
                    <X className="w-6 h-6 shrink-0" />
                    <div>
                        <p className="font-semibold text-sm">{toast.message}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationForm;