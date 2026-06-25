// import Heading from "@/components/heading";
// import Image from "next/image";
// import Link from "next/link";

// export const continents = [
//     {
//         id: 1,
//         name: "Asia",
//         countries: [
//             {
//                 id: 1,
//                 name: "Bangladesh",
//                 code: "BD",
//                 src: "/university/university_of_wolverhampton.webp",
//                 university: [
//                     {
//                         id: 1,
//                         name: "University of Wolverhampton",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/university-of-wolverhampton.webp",
//                         location: "Edmonton, London",
//                         desc: "The University of Wolverhampton is a dynamic and inclusive institution committed to providing high-quality education and fostering personal and professional growth for its diverse student community.",
//                     },
//                     {
//                         id: 2,
//                         name: "University of Gloucestershire",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/university-of-wolverhampton.webp",
//                         location: "Edmonton, London",
//                         desc: "In the United Kingdom, the University of Gloucestershire is a reputable university that provides a variety of academic programs. The institution offers students a well-rounded education in a lively and encouraging environment and is renowned for its emphasis on sustainability and community engagement.",
//                     },
//                     {
//                         id: 3,
//                         name: "University of Derby",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/university-of-wolverhampton.webp",
//                         location: "Edmonton, London",
//                         desc: "University of Derby ranks Top 5 in UK employability and Top 25 for student satisfaction, emphasizing innovation, industry-aligned programs, and a new £14.4M Bioscience Superlab.",
//                     },
//                     {
//                         id: 4,
//                         name: "Bangor University",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/university-of-wolverhampton.webp",
//                         location: "Edmonton, London",
//                         desc: "Bangor University, ranked in the top third globally and top 75 UK universities, excels in international research networks and citations per faculty, with strong sustainability and a coastal campus in Wales.",
//                     },
//                 ],
//             },
//             {
//                 id: 2,
//                 name: "India",
//                 code: "IN",
//                 src: "/university/university_of_wolverhampton.webp",
//                 university: [
//                     {
//                         id: 1,
//                         name: "University of Oxford",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/university-of-wolverhampton.webp",
//                         location: "Edmonton, London",
//                         desc: "The University of Wolverhampton is a dynamic and inclusive institution committed to providing high-quality education and fostering personal and professional growth for its diverse student community.",
//                     },
//                     {
//                         id: 2,
//                         name: "University of Cambridge",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 3,
//                         name: "Imperial College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 4,
//                         name: "King's College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                 ],
//             },
//             {
//                 id: 3,
//                 name: "China",
//                 code: "CN",
//                 src: "/university/university_of_wolverhampton.webp",
//                 university: [
//                     {
//                         id: 1,
//                         name: "University of Oxford",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/university-of-wolverhampton.webp",
//                         location: "Edmonton, London",
//                         desc: "The University of Wolverhampton is a dynamic and inclusive institution committed to providing high-quality education and fostering personal and professional growth for its diverse student community.",
//                     },
//                     {
//                         id: 2,
//                         name: "University of Cambridge",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 3,
//                         name: "Imperial College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 4,
//                         name: "King's College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                 ],
//             },
//             {
//                 id: 4,
//                 name: "Japan",
//                 code: "JP",
//                 src: "/university/university_of_wolverhampton.webp",
//                 university: [
//                     {
//                         id: 1,
//                         name: "University of Oxford",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/university-of-wolverhampton.webp",
//                         location: "Edmonton, London",
//                         desc: "The University of Wolverhampton is a dynamic and inclusive institution committed to providing high-quality education and fostering personal and professional growth for its diverse student community.",
//                     },
//                     {
//                         id: 2,
//                         name: "University of Cambridge",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 3,
//                         name: "Imperial College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 4,
//                         name: "King's College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                 ],
//             },
//             {
//                 id: 5,
//                 name: "South Korea",
//                 code: "KR",
//                 src: "/university/university_of_wolverhampton.webp",
//                 university: [
//                     {
//                         id: 1,
//                         name: "University of Oxford",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/university-of-wolverhampton.webp",
//                         location: "Edmonton, London",
//                         desc: "The University of Wolverhampton is a dynamic and inclusive institution committed to providing high-quality education and fostering personal and professional growth for its diverse student community.",
//                     },
//                     {
//                         id: 2,
//                         name: "University of Cambridge",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 3,
//                         name: "Imperial College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 4,
//                         name: "King's College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                 ],
//             },
//             {
//                 id: 6,
//                 name: "Malaysia",
//                 code: "MY",
//                 src: "/university/university_of_wolverhampton.webp",
//                 university: [
//                     {
//                         id: 1,
//                         name: "University of Oxford",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/university-of-wolverhampton.webp",
//                         location: "Edmonton, London",
//                         desc: "The University of Wolverhampton is a dynamic and inclusive institution committed to providing high-quality education and fostering personal and professional growth for its diverse student community.",
//                     },
//                     {
//                         id: 2,
//                         name: "University of Cambridge",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 3,
//                         name: "Imperial College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 4,
//                         name: "King's College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                 ],
//             },
//             {
//                 id: 7,
//                 name: "Singapore",
//                 code: "SG",
//                 src: "/university/university_of_wolverhampton.webp",
//                 university: [
//                     {
//                         id: 1,
//                         name: "University of Oxford",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/university-of-wolverhampton.webp",
//                         location: "Edmonton, London",
//                         desc: "The University of Wolverhampton is a dynamic and inclusive institution committed to providing high-quality education and fostering personal and professional growth for its diverse student community.",
//                     },
//                     {
//                         id: 2,
//                         name: "University of Cambridge",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 3,
//                         name: "Imperial College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 4,
//                         name: "King's College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                 ],
//             },
//             {
//                 id: 8,
//                 name: "Thailand",
//                 code: "TH",
//                 src: "/university/university_of_wolverhampton.webp",
//                 university: [
//                     {
//                         id: 1,
//                         name: "University of Oxford",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/university-of-wolverhampton.webp",
//                         location: "Edmonton, London",
//                         desc: "The University of Wolverhampton is a dynamic and inclusive institution committed to providing high-quality education and fostering personal and professional growth for its diverse student community.",
//                     },
//                     {
//                         id: 2,
//                         name: "University of Cambridge",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 3,
//                         name: "Imperial College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 4,
//                         name: "King's College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                 ],
//             },
//             {
//                 id: 9,
//                 name: "Pakistan",
//                 code: "PK",
//                 src: "/university/university_of_wolverhampton.webp",
//                 university: [
//                     {
//                         id: 1,
//                         name: "University of Oxford",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/university-of-wolverhampton.webp",
//                         location: "Edmonton, London",
//                         desc: "The University of Wolverhampton is a dynamic and inclusive institution committed to providing high-quality education and fostering personal and professional growth for its diverse student community.",
//                     },
//                     {
//                         id: 2,
//                         name: "University of Cambridge",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 3,
//                         name: "Imperial College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 4,
//                         name: "King's College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                 ],
//             },
//             {
//                 id: 10,
//                 name: "Indonesia",
//                 code: "ID",
//                 src: "/university/university_of_wolverhampton.webp",
//                 university: [
//                     {
//                         id: 1,
//                         name: "University of Oxford",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/university-of-wolverhampton.webp",
//                         location: "Edmonton, London",
//                         desc: "The University of Wolverhampton is a dynamic and inclusive institution committed to providing high-quality education and fostering personal and professional growth for its diverse student community.",
//                     },
//                     {
//                         id: 2,
//                         name: "University of Cambridge",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 3,
//                         name: "Imperial College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                     {
//                         id: 4,
//                         name: "King's College London",
//                         url: "https://oxforduniversity.com.uk",
//                         logo: "/study_abroad/oxford.webp",
//                         location: "Edmonton, London",
//                     },
//                 ],
//             },
//         ],
//     },

//     {
//         id: 2,
//         name: "Europe",
//         countries: [
//             { id: 1, name: "United Kingdom", code: "GB" },
//             { id: 2, name: "Germany", code: "DE" },
//             { id: 3, name: "France", code: "FR" },
//             { id: 4, name: "Italy", code: "IT" },
//             { id: 5, name: "Spain", code: "ES" },
//             { id: 6, name: "Netherlands", code: "NL" },
//             { id: 7, name: "Sweden", code: "SE" },
//             { id: 8, name: "Switzerland", code: "CH" },
//             { id: 9, name: "Norway", code: "NO" },
//             { id: 10, name: "Denmark", code: "DK" },
//         ],
//     },

//     {
//         id: 3,
//         name: "America",
//         countries: [
//             { id: 1, name: "United States", code: "US" },
//             { id: 2, name: "Canada", code: "CA" },
//             { id: 3, name: "Mexico", code: "MX" },
//             { id: 4, name: "Cuba", code: "CU" },
//             { id: 5, name: "Jamaica", code: "JM" },
//             { id: 6, name: "Brazil", code: "BR" },
//             { id: 7, name: "Argentina", code: "AR" },
//             { id: 8, name: "Chile", code: "CL" },
//             { id: 9, name: "Colombia", code: "CO" },
//             { id: 10, name: "Peru", code: "PE" },
//         ],
//     },

//     {
//         id: 5,
//         name: "Africa",
//         countries: [
//             { id: 1, name: "Nigeria", code: "NG" },
//             { id: 2, name: "South Africa", code: "ZA" },
//             { id: 3, name: "Egypt", code: "EG" },
//             { id: 4, name: "Kenya", code: "KE" },
//             { id: 5, name: "Morocco", code: "MA" },
//         ],
//     },

//     {
//         id: 6,
//         name: "Australia",
//         countries: [
//             { id: 1, name: "Australia", code: "AU" },
//             { id: 2, name: "New Zealand", code: "NZ" },
//             { id: 3, name: "Fiji", code: "FJ" },
//             { id: 4, name: "Papua New Guinea", code: "PG" },
//         ],
//     },

//     {
//         id: 7,
//         name: "Antarctica",
//         countries: [
//             { id: 1, name: "Australia", code: "AU" },
//             { id: 2, name: "New Zealand", code: "NZ" },
//             { id: 3, name: "Fiji", code: "FJ" },
//             { id: 4, name: "Papua New Guinea", code: "PG" },
//         ],
//     },
// ];
// const SingleCountry = async ({ params }) => {
//     const countryParams = await params;

//     const selectedContinent = continents.find(
//         (continent) =>
//             continent.name.toLowerCase() ===
//             countryParams.country.toLowerCase(),
//     );
//     const countries = selectedContinent?.countries || [];

//     return (
//         <section className="bg-gray-100">
//             <div className="max-w-7xl mx-auto md:py-20 py-10 md:pt-40">
//                 <Heading
//                     title="Country for Study Abroad"
//                     color={false}
//                     highlight={`${countryParams.country.toUpperCase()}`}
//                     paragraph="Discover the unique experiences, cuisine, and attractions each country has to offer."
//                 />

//                 <p className="text-center text-2xl font-medium">
//                     Select Your Country of{" "}
//                     {selectedContinent?.name || countryParams.country}
//                 </p>

//                 <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
//                     {countries.map((country) => (
//                         <Link
//                             href={`/popular-destinations/${country.name
//                                 .toLowerCase()
//                                 .replace(/\s+/g, "-")}`}
//                             key={country?.id}
//                             className="bg-white rounded-xl p-4 shadow transition hover:-translate-y-1 hover:shadow-lg"
//                         >
//                             {country?.src ? (
//                                 <div className="overflow-hidden rounded-lg">
//                                     <Image
//                                         src={country.src}
//                                         alt={country.name}
//                                         height={200}
//                                         width={500}
//                                         className="h-48 w-full hover:scale-115 duration-300 object-cover"
//                                     />
//                                 </div>
//                             ) : (
//                                 <div className="flex h-48 w-full items-center justify-center rounded-lg bg-gray-100">
//                                     <span className="text-5xl font-bold text-brand-primary">
//                                         {country.code}
//                                     </span>
//                                 </div>
//                             )}

//                             <h2 className="mt-3 text-xl font-semibold">
//                                 {country?.name}
//                             </h2>

//                             <p className="text-gray-500">
//                                 Country Code: {country?.code}
//                             </p>
//                             <button className="w-full py-2 px-4 rounded-xl bg-brand-accent mt-2 text-white cursor-pointer font-semibold">
//                                 View Details
//                             </button>
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default SingleCountry;
