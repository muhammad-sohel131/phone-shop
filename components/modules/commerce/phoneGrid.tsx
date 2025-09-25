
import type { TPhone } from "@/lib/db";
import PhoneCard from "./phoneCard";

type PhoneGridProps = { phones: TPhone[] };

export default function PhoneGrid({ phones }: PhoneGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {phones.map((phone) => (
        <PhoneCard key={phone._id} phone={phone} />
      ))}
    </div>
  );
}
