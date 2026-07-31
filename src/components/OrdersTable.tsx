import { recentOrders, type OrderStatus } from "@/lib/dummy-data";

const statusStyle: Record<OrderStatus, string> = {
  완료: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  진행중: "bg-amber-50 text-amber-700 ring-amber-200",
  취소: "bg-rose-50 text-rose-700 ring-rose-200",
};

export default function OrdersTable() {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <p className="text-sm font-medium text-slate-700">최근 주문</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400">
              <th className="py-2 pr-4 font-medium">주문번호</th>
              <th className="py-2 pr-4 font-medium">고객명</th>
              <th className="py-2 pr-4 font-medium">금액</th>
              <th className="py-2 pr-4 font-medium">상태</th>
              <th className="py-2 pr-4 font-medium">날짜</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b border-slate-50 last:border-0">
                <td className="py-3 pr-4 text-slate-700">{order.id}</td>
                <td className="py-3 pr-4 text-slate-700">{order.customer}</td>
                <td className="py-3 pr-4 text-slate-700">{order.amount}</td>
                <td className="py-3 pr-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyle[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 pr-4 text-slate-500">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
