import { Dot } from "lucide-react";
import Link from "next/link";

export default function QuickLink({ blocks }) {
  return (
    <section className="flex items-center gap-2">
      {blocks.map((block) => (
        <div key={block.id} className="flex items-center gap-2">
          <Link
            href={block.link_url || "/"}
            className="text-brand-contrast text-nowrap text-3xl font-bold"
          >
            {block.section_title}
          </Link>
          <Dot stroke="#FFF" size={40} strokeWidth={4} />
        </div>
      ))}
    </section>
  );
}
