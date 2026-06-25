// "use client";
// import Heading from "@/components/heading";
// import StudyCountry from "@/sections/study-abroad/studyCountry";
// import { MapPin } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

import Link from "next/link";

// const universitiesObject = {
//     Asia: [
//         {
//             id: 1,
//             name: "University of Wolverhampton",
//             url: `/universities/wolverhampton`,
//             logo: "/study_abroad/university-of-wolverhampton.webp",
//             location: "Edmonton, London",
//             students: "680K+",
//             tuition: "$10K-$38K",
//             universities: "160+",
//             desc: "The University of Wolverhampton is a dynamic and inclusive institution committed to providing high-quality education and fostering personal and professional growth for its diverse student community.",
//         },
//         {
//             id: 2,
//             name: "University of Gloucestershire",
//             url: `/universities/gloucestershire`,
//             logo: "/study_abroad/university-of-wolverhampton.webp",
//             location: "Edmonton, London",
//             students: "680K+",
//             tuition: "$10K-$38K",
//             universities: "160+",
//             desc: "In the United Kingdom, the University of Gloucestershire is a reputable university that provides a variety of academic programs. The institution offers students a well-rounded education in a lively and encouraging environment and is renowned for its emphasis on sustainability and community engagement.",
//         },
//         {
//             id: 3,
//             name: "University of Derby",
//             url: `/universities/derby`,
//             logo: "/study_abroad/university-of-wolverhampton.webp",
//             location: "Edmonton, London",
//             students: "680K+",
//             tuition: "$10K-$38K",
//             universities: "160+",
//             desc: "University of Derby ranks Top 5 in UK employability and Top 25 for student satisfaction, emphasizing innovation, industry-aligned programs, and a new £14.4M Bioscience Superlab.",
//         },
//         {
//             id: 4,
//             name: "Bangor University",
//             url: `/universities/bangor`,
//             logo: "/study_abroad/university-of-wolverhampton.webp",
//             location: "Edmonton, London",
//             students: "680K+",
//             tuition: "$10K-$38K",
//             universities: "160+",
//             desc: "Bangor University, ranked in the top third globally and top 75 UK universities, excels in international research networks and citations per faculty, with strong sustainability and a coastal campus in Wales.",
//         },
//     ],
//     Europe: [
//         {
//             id: 1,
//             name: "University of Oxford",
//             url: "https://oxforduniversity.com.uk",
//             logo: "/study_abroad/university-of-wolverhampton.webp",
//             location: "Edmonton, London",
//             desc: "The University of Wolverhampton is a dynamic and inclusive institution committed to providing high-quality education and fostering personal and professional growth for its diverse student community.",
//         },
//         {
//             id: 2,
//             name: "University of Cambridge",
//             url: "https://oxforduniversity.com.uk",
//             logo: "/study_abroad/oxford.webp",
//             location: "Edmonton, London",
//         },
//         {
//             id: 3,
//             name: "Imperial College London",
//             url: "https://oxforduniversity.com.uk",
//             logo: "/study_abroad/oxford.webp",
//             location: "Edmonton, London",
//         },
//         {
//             id: 4,
//             name: "King's College London",
//             url: "https://oxforduniversity.com.uk",
//             logo: "/study_abroad/oxford.webp",
//             location: "Edmonton, London",
//         },
//     ],
//     NorthAmerica: [
//         {
//             id: 1,
//             name: "University of Oxford",
//             url: "https://oxforduniversity.com.uk",
//             logo: "/study_abroad/oxford.webp",
//             location: "Edmonton, London",
//         },
//         {
//             id: 2,
//             name: "University of Cambridge",
//             url: "https://oxforduniversity.com.uk",
//             logo: "/study_abroad/oxford.webp",
//             location: "Edmonton, London",
//         },
//         {
//             id: 3,
//             name: "Imperial College London",
//             url: "https://oxforduniversity.com.uk",
//             logo: "/study_abroad/oxford.webp",
//             location: "Edmonton, London",
//         },
//         {
//             id: 4,
//             name: "King's College London",
//             url: "https://oxforduniversity.com.uk",
//             logo: "/study_abroad/oxford.webp",
//             location: "Edmonton, London",
//         },
//     ],
//     SouthAmerica: [
//         {
//             id: 1,
//             name: "University of Oxford",
//             url: "https://oxforduniversity.com.uk",
//             logo: "/study_abroad/oxford.webp",
//             location: "Edmonton, London",
//         },
//         {
//             id: 2,
//             name: "University of Cambridge",
//             url: "https://oxforduniversity.com.uk",
//             logo: "/study_abroad/oxford.webp",
//             location: "Edmonton, London",
//         },
//         {
//             id: 3,
//             name: "Imperial College London",
//             url: "https://oxforduniversity.com.uk",
//             logo: "/study_abroad/oxford.webp",
//             location: "Edmonton, London",
//         },
//         {
//             id: 4,
//             name: "King's College London",
//             url: "https://oxforduniversity.com.uk",
//             logo: "/study_abroad/oxford.webp",
//             location: "Edmonton, London",
//         },
//     ],
//     Australia: [
//         {
//             id: 1,
//             name: "University of Oxford",
//             url: "https://oxforduniversity.com.uk",
//             logo: "/study_abroad/oxford.webp",
//             location: "Edmonton, London",
//         },
//         {
//             id: 2,
//             name: "University of Cambridge",
//             url: "https://oxforduniversity.com.uk",
//             logo: "/study_abroad/oxford.webp",
//             location: "Edmonton, London",
//         },
//         {
//             id: 3,
//             name: "Imperial College London",
//             url: "https://oxforduniversity.com.uk",
//             logo: "/study_abroad/oxford.webp",
//             location: "Edmonton, London",
//         },
//         {
//             id: 4,
//             name: "King's College London",
//             url: "https://oxforduniversity.com.uk",
//             logo: "/study_abroad/oxford.webp",
//             location: "Edmonton, London",
//         },
//     ],
// };

// const PopularDestinations = () => {
//     const [isActive, setIsActive] = useState(0);
//     const [selectedCountry, setSelectedCountry] = useState("Asia");
//     const [universities, setUniversites] = useState(
//         universitiesObject[selectedCountry],
//     );
//     const countries = Object.keys(universitiesObject);
//     useEffect(() => {
//         countries.filter((country) => {
//             if (selectedCountry === country) {
//                 setUniversites(universitiesObject[country]);
//             }
//         });
//     }, [selectedCountry, countries]);
//     return (
//         <section className="bg-gray-100">
//             <div className="md:py-20 bg-foreground py-10">
//                 <StudyCountry />
//             </div>
//             <div className="md:py-20 py-10">
//                 <Heading
//                     title="Choose Top University from"
//                     highlight="Continents"
//                     color={false}
//                     paragraph="Begin your journey by selecting a continent. Discover countries, cultures, and experiences waiting for you."
//                 />
//                 <div className="bg-white shadow max-w-fit mx-auto gap-2 p-2 scroll-none overflow-x-scroll scroll-none rounded-full flex justify-between">
//                     {countries.map((country, idx) => (
//                         <button
//                             key={idx}
//                             onClick={() => {
//                                 setIsActive(idx);
//                                 setSelectedCountry(country);
//                             }}
//                             className={`${isActive === idx ? "bg-gray-500 text-white" : "bg-gray-100"} px-4 cursor-pointer text-sm md:text-base py-1 rounded-full`}
//                         >
//                             {country}
//                         </button>
//                     ))}
//                     <select
//                         name=""
//                         id=""
//                         className="outline-none px-4 cursor-pointer text-sm md:text-base py-1 rounded-full bg-gray-100"
//                     >
//                         <option value="">Price Range - ৳</option>
//                         <option value="0-50000">৳0 - ৳3,50,000</option>
//                         <option value="50000-100000">
//                             ৳3,50,000 - ৳5,50,000
//                         </option>
//                         <option value="100000+">Above ৳5,50,000+</option>
//                     </select>
//                 </div>
//                 <h3 className="text-xl max-w-7xl text-gray-500 mx-auto my-5">
//                     Showing{" "}
//                     <span className="text-gray-900">
//                         {universities?.length}
//                     </span>{" "}
//                     Top Universities of {selectedCountry}
//                 </h3>
//                 <div className="mt-5 max-w-7xl mx-auto">
//                     {universities?.map((university) => (
//                         <Link
//                             href={university.url}
//                             key={university.id}
//                             className="bg-white shadow flex flex-col md:flex-row items-center mb-5 p-3 rounded-4xl gap-5"
//                         >
//                             <div className="md:w-4/12 w-full p-2">
//                                 <Image
//                                     src={university.logo}
//                                     alt={university.name}
//                                     height={1000}
//                                     width={1000}
//                                     loading="eager"
//                                 />
//                             </div>
//                             <div className="bg-gray-100 md:w-8/12 w-full rounded-3xl p-5">
//                                 <div>
//                                     <p className="text-gray-400 text-sm font-light flex items-center gap-1">
//                                         <MapPin
//                                             strokeWidth={1}
//                                             size={14}
//                                             className="text-gray-400"
//                                         />
//                                         {university.location}
//                                     </p>
//                                 </div>
//                                 <h2 className="text-2xl my-1 font-semibold">
//                                     {university.name}
//                                 </h2>
//                                 <p className="text-base text-gray-600">
//                                     {university.desc}
//                                 </p>
//                                 <p>{university?.students} Students</p>
//                                 <p>{university?.tuition} Tuition</p>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default PopularDestinations;

const PopularDestinations = async () => {
     return (
          <div className="flex items-center flex-col justify-center h-screen">
               <h1 className="text-2xl font-semibold mb-3">
                    Page Destinations Under Development!
               </h1>
               <Link
                    href={"/"}
                    className="shadow-xl shadow-brand-accent/60 text-white rounded-2xl py-2 px-4 bg-brand-primary "
               >
                    Go To Home
               </Link>
          </div>
     );
};

export default PopularDestinations;
