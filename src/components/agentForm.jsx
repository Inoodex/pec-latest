"use client";
import React, { useState } from "react";
import { postInqueriesData } from "@/apis/postInqueriesData";

const AgentForm = () => {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        qualification: "",
        position: "",
        // lastResult: "",
        type: "become_agent",
        message: "",
    });
    const [cvFile, setCvFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        setCvFile(file || null);
    };

    const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(file);
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            let cv_base64 = null;
            let cv_name = null;
            if (cvFile) {
                cv_base64 = await fileToBase64(cvFile);
                cv_name = cvFile.name;
            }

            const nameParts = (form.fullName || "").trim().split(/\s+/);
            const firstName = nameParts[0] || form.fullName;
            const lastName =
                nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

            const payload = {
                first_name: firstName,
                last_name: lastName,
                name: form.fullName,
                email: form.email,
                phone: form.phone,
                type: "agent_application",
                additional_info: {
                    company: form.company,
                    qualification: form.qualification,
                    position: form.position,
                    last_result: form.lastResult,
                    message: form.message,
                },
                additional_info_file: cv_base64
                    ? { name: cv_name, file: cv_base64 }
                    : null,
            };

            const res = await postInqueriesData("inquiry", payload);
            if (
                res &&
                (res.success || res.status === "success" || res.id || res.data)
            ) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    setForm({
                        fullName: "",
                        email: "",
                        phone: "",
                        company: "",
                        qualification: "",
                        position: "",
                        lastResult: "",
                        message: "",
                    });
                    setCvFile(null);
                }, 1500);
            } else {
                setError(res?.message || "Submission failed");
            }
        } catch (err) {
            console.error("Agent submit error:", err);
            setError("Submission failed. Try again later.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-5 rounded-2xl text-black">
            <h2 className="md:text-3xl text-2xl font-semibold mb-2">
                Become an Agent
            </h2>
            <p className="text-sm text-gray-600 mb-6">
                Partner with us and expand your business with reliable education
                and immigration services.
            </p>

            {submitted ? (
                <p className="text-green-600 font-medium">
                    Application submitted. {`We'll`} contact you soon.
                </p>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 w-full text-left"
                >
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-700">
                                Full Name
                            </label>
                            <input
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                required
                                placeholder="Full Name"
                                className="w-full mt-1 p-2 border border-gray-300 outline-none rounded-md text-black placeholder-gray-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                placeholder="Email Address"
                                className="w-full p-2 border border-gray-300 rounded-md outline-none text-black placeholder-gray-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">
                                Contact Number
                            </label>
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className="w-full mt-1 p-2 border border-gray-300 outline-none rounded-md text-black placeholder-gray-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">
                                Company (optional)
                            </label>
                            <input
                                name="company"
                                value={form.company}
                                onChange={handleChange}
                                placeholder="Company"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black placeholder-gray-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">
                                Last Educational Qualification
                            </label>
                            <select
                                name="qualification"
                                value={form.qualification}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black"
                            >
                                <option value="">Select qualification</option>
                                <option value="mba">MBA</option>
                                <option value="master">Master</option>
                                <option value="bachelors">Bachelors</option>
                                <option value="diploma">Diploma</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">
                                Position
                            </label>
                            <select
                                name="position"
                                value={form.position}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black"
                            >
                                <option value="">Select position</option>
                                <option value="Admission Counselor">Admission Counselor</option>
                                <option value="Recruitment Agent">Recruitment Agent</option>
                                <option value="Education Consultant Partner">Education Consultant Partner</option>
                                <option value="Regional Representative">Regional Representative</option>
                                <option value="Referral Partner">Referral Partner</option>
                                <option value="Marketing Ambassador">Marketing Ambassador</option>
                                <option value="consultant">Consultant</option>
                                <option value="senior_consultant">Senior Consultant</option>
                                <option value="intern">Intern</option>
                                <option value="">Others</option>
                            </select>
                        </div>

                        {/* last academic result comment out */}
                        {/* <div>
                            <label className="text-sm text-gray-600">
                                Last Academy Result
                            </label>
                            <input
                                name="lastResult"
                                value={form.lastResult}
                                onChange={handleChange}
                                placeholder="e.g., CGPA or percentage"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black placeholder-gray-500"
                            />
                        </div> */}

                        <div className="md:col-span-2">
                            <label className="text-sm text-gray-600">
                                Cover Letter
                            </label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black placeholder-gray-500"
                                placeholder="Tell us about your experience or how you'd like to partner"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm text-gray-600">
                                Upload CV (optional)
                            </label>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            />
                            {cvFile && (
                                <p className="text-sm text-gray-200 mt-1">
                                    {cvFile.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-6 py-2 rounded-md bg-brand-accent text-white"
                        >
                            {submitting ? "Submitting..." : "Apply as Agent"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AgentForm;
