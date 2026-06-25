const PaymentForm = () => {
    return (
        <div>
            <h2 className="pr-12 text-2xl font-semibold">
                Contact Information
            </h2>
            <form className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2">
                <label htmlFor="name" className="mt-3 col-span-2 md:col-span-1">
                    Full Name <br />
                    <input
                        type="text"
                        className="border border-white/30 bg-white/10 mt-3 py-3 px-4 w-full outline-none rounded-xl transition focus:border-white"
                        placeholder="Full Name"
                        id="name"
                        required
                    />
                </label>

                <label
                    htmlFor="email"
                    className="mt-3 col-span-2 md:col-span-1"
                >
                    Email Address <br />
                    <input
                        type="email"
                        className="border border-white/30 bg-white/10 mt-3 py-3 px-4 w-full outline-none rounded-xl transition focus:border-white"
                        placeholder="Email Address"
                        id="email"
                    />
                </label>
                <label
                    htmlFor="phone"
                    className="mt-3 col-span-2 md:col-span-1"
                >
                    Phone Number <br />
                    <input
                        type="text"
                        className="border border-white/30 bg-white/10 mt-3 py-3 px-4 w-full outline-none rounded-xl transition focus:border-white"
                        placeholder="Phone Number"
                        id="phone"
                    />
                </label>
                <label
                    htmlFor="available date"
                    className="mt-3 col-span-2 md:col-span-1"
                >
                    Available Date <br />
                    <input
                        type="date"
                        className="border border-white/30 bg-white/10 mt-3 py-3 px-4 w-full outline-none rounded-xl transition focus:border-white"
                        placeholder="Available Date"
                        id="available date"
                    />
                </label>
                <label htmlFor="Additional Notes" className="mt-3 col-span-2">
                    Additional Notes <br />
                    <textarea
                        name="Additional Notes"
                        id="Additional Notes"
                        placeholder="Drop you message here..."
                        className="min-h-28 border border-white/30 bg-white/10 mt-3 py-3 px-4 w-full outline-none rounded-xl transition focus:border-white"
                    ></textarea>
                </label>
                <p className="col-span-2 border rounded-2xl p-4 border-white/30 bg-white/10 text-sm leading-6 text-white/85">
                    By submitting this form, you agree to be contacted by PecEdu
                    Global. We respect your privacy and never share your
                    information.
                </p>
                <div className="flex items-center justify-center col-span-2">
                    <button
                        type="submit"
                        className="py-3 rounded-xl border w-full border-white/30 bg-brand-accent cursor-pointer hover:bg-brand-accent/80 text-xl duration-300"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentForm;
