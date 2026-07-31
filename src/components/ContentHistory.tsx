import type { ContentItem } from "@/lib/dashboard-data";

export default function ContentHistory({ items }: { items: ContentItem[] }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <p className="text-sm font-medium text-slate-700">지금까지 만든 콘텐츠 (시니어건강 롱폼)</p>
      <ul className="mt-4 flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
          >
            <span className="text-slate-700">{item.title}</span>
            <span className="text-xs font-medium text-emerald-600">{item.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
