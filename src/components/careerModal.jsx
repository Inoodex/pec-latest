"use client";
import React, { useState } from "react";
import { postInqueriesData } from "@/apis/postInqueriesData";

const CareerModal = ({ open, onClose }) => {
    const [careerForm, setCareerForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        qualification: "",
        position: "",
        lastResult: "",
        coverLetter: "",
    });
    const [cvFile, setCvFile] = useState(null);
    const [careerSubmitting, setCareerSubmitting] = useState(false);
    const [careerSubmitted, setCareerSubmitted] = useState(false);
    const [careerError, setCareerError] = useState(null);

    const handleCareerChange = (e) => {
        const { name, value } = e.target;
        setCareerForm((prev) => ({ ...prev, [name]: value }));
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

    const handleCareerSubmit = async (e) => {
        e.preventDefault();
        setCareerSubmitting(true);
        setCareerError(null);

        try {
            let cv_base64 = null;
            let cv_name = null;
            if (cvFile) {
                cv_base64 = await fileToBase64(cvFile);
                cv_name = cvFile.name;
            }

            const nameParts = (careerForm.fullName || "").trim().split(/\s+/);
            const firstName = nameParts[0] || careerForm.fullName;
            const lastName =
                nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

            const payload = {
                first_name: firstName,
                last_name: lastName,
                name: careerForm.fullName,
                email: careerForm.email,
                phone: careerForm.phone,
                position: careerForm.position,
                type: "career_oppurtunity",
                additional_info: {
                    qualification: careerForm.qualification,
                    last_result: careerForm.lastResult,
                    cover_letter: careerForm.coverLetter,
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
                setCareerSubmitted(true);
                setTimeout(() => {
                    setCareerSubmitted(false);
                    setCareerForm({
                        fullName: "",
                        email: "",
                        phone: "",
                        qualification: "",
                        position: "",
                        lastResult: "",
                        coverLetter: "",
                    });
                    setCvFile(null);
                    onClose && onClose();
                }, 1500);
            } else {
                setCareerError(res?.message || "Failed to submit application");
            }
        } catch (err) {
            console.error("Career submit error:", err);
            setCareerError("Submission failed. Please try again later.");
        } finally {
            setCareerSubmitting(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-md">
            <div className="w-full h-full sm:h-auto sm:max-w-none sm:w-auto flex items-end sm:items-center justify-center p-0 sm:p-4">
                <div className="relative w-full sm:w-[min(90vw,560px)] bg-white/90 backdrop-blur-3xl rounded-t-xl sm:rounded-2xl text-gray-900 max-h-full sm:max-h-[80vh] overflow-y-auto scroll-none shadow-lg p-4 sm:p-6">
                    <button
                        aria-label="Close career modal"
                        onClick={() => onClose && onClose()}
                        className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
                    >
                        ✕
                    </button>
                    <h3 className="text-2xl font-bold mb-2">Join our Team</h3>
                    <p className="mb-4 text-gray-700">
                        {`We're`} excited to have you apply! Please fill out the
                        form below.
                    </p>

                    {careerSubmitted ? (
                        <div className="py-8">
                            <p className="text-green-600 font-semibold">
                                Application submitted successfully.
                            </p>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleCareerSubmit}
                            className="space-y-4"
                        >
                            {careerError && (
                                <p className="text-red-600 text-sm">
                                    {careerError}
                                </p>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                                <div className="sm:col-span-2">
                                    <label className="text-sm text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        name="fullName"
                                        value={careerForm.fullName}
                                        onChange={handleCareerChange}
                                        required
                                        placeholder="Full Name"
                                        className="w-full mt-1 p-2 rounded-md border outline-none border-black/50"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={careerForm.email}
                                        onChange={handleCareerChange}
                                        required
                                        placeholder="Email Address"
                                        className="w-full mt-1 p-2 rounded-md border outline-none border-black/50"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-700">
                                        Contact Number
                                    </label>
                                    <input
                                        name="phone"
                                        value={careerForm.phone}
                                        onChange={handleCareerChange}
                                        required
                                        placeholder="Phone Number"
                                        className="w-full mt-1 p-2 rounded-md border outline-none border-black/50"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-700">
                                        Last Educational Qualification
                                    </label>
                                    <select
                                        name="qualification"
                                        value={careerForm.qualification}
                                        onChange={handleCareerChange}
                                        className="w-full mt-1 p-2 rounded-md border outline-none border-black/50"
                                    >
                                        <option value="">
                                            Select qualification
                                        </option>
                                        <option value="mba">MBA</option>
                                        <option value="master">Master</option>
                                        <option value="bachelors">
                                            Bachelors
                                        </option>
                                        <option value="diploma">Diploma</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-700">
                                        Position
                                    </label>
                                    <select
                                        name="position"
                                        value={careerForm.position}
                                        onChange={handleCareerChange}
                                        className="w-full mt-1 p-2 rounded-md border outline-none border-black/50"
                                    >
                                        <option value="">
                                            Select position
                                        </option>
                                        <option value="Consultant">
                                            Consultant
                                        </option>
                                        <option value="Senior Consultant">
                                            Senior Consultant
                                        </option>
                                        <option value="Admission Counselor">
                                            Admission Counselor
                                        </option>
                                        <option value="Intern">Intern</option>
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-sm text-gray-700">
                                        Last Academy Result
                                    </label>
                                    <input
                                        name="lastResult"
                                        value={careerForm.lastResult}
                                        onChange={handleCareerChange}
                                        placeholder="Last Academy Results"
                                        className="w-full mt-1 p-2 rounded-md border outline-none border-black/50"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-sm text-gray-700">
                                        Cover Letter
                                    </label>
                                    <textarea
                                        name="coverLetter"
                                        value={careerForm.coverLetter}
                                        onChange={handleCareerChange}
                                        rows={5}
                                        className="w-full mt-1 p-2 rounded-md border outline-none border-black/50"
                                        placeholder="Write a short cover letter..."
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-sm text-gray-700">
                                        Upload CV (PDF, DOC)
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className="w-full mt-1 p-2 rounded-md border outline-none border-black/50"
                                    />
                                    {cvFile && (
                                        <p className="text-sm text-gray-700 mt-1">
                                            {cvFile.name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => onClose && onClose()}
                                    className="px-4 py-2 rounded-md bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={careerSubmitting}
                                    className="px-4 py-2 rounded-md bg-brand-accent text-white disabled:opacity-60"
                                >
                                    {careerSubmitting
                                        ? "Submitting..."
                                        : "Submit Application"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CareerModal;
