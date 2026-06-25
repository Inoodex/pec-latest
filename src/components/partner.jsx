import Image from "next/image";

export default function Partner({ partner }) {
  return (
    <a
      href={partner.website}
      target="_blank"
      className="shrink-0 w-48 h-24 flex items-center justify-center p-8 rounded-2xl bg-black/5 border border-black/10 backdrop-blur-md hover:bg-black/10 hover:border-black/20 transition-all duration-300 group"
    >
      <Image
        src={process.env.NEXT_PUBLIC_SITE_URL + "/" + partner.logo}
        fill
        alt={"Image path fail"}
        className="max-h-full max-w-full px-3 object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
      />
    </a>
  );
}
