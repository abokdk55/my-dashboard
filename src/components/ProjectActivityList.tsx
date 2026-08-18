import type { ProjectActivity } from "@/lib/dashboard-data";
import { relativeTimeFromNow } from "@/lib/format";

export default function ProjectActivityList({ items }: { items: ProjectActivity[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-sm font-medium text-slate-700">최근 자동 게시 이력</p>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2"
          >
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 truncate text-sm text-indigo-600 hover:text-indigo-700"
              >
                {item.title}
              </a>
            ) : (
              <span className="flex-1 truncate text-sm text-slate-700">{item.title}</span>
            )}
            <span className="shrink-0 text-[11px] text-slate-400">
              {relativeTimeFromNow(item.published_at)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
