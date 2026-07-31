export type SummaryCardData = {
  label: string;
  value: string;
  change: number;
};

export const summaryCards: SummaryCardData[] = [
  { label: "총 매출", value: "₩128,500,000", change: 12 },
  { label: "신규 고객 수", value: "342명", change: 8 },
  { label: "진행 중 프로젝트", value: "24개", change: -3 },
  { label: "완료율", value: "87%", change: 5 },
];

export type MonthlyRevenue = {
  month: string;
  revenue: number;
};

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: "2월", revenue: 6200 },
  { month: "3월", revenue: 7800 },
  { month: "4월", revenue: 7100 },
  { month: "5월", revenue: 9400 },
  { month: "6월", revenue: 11200 },
  { month: "7월", revenue: 12850 },
];

export type OrderStatus = "완료" | "진행중" | "취소";

export type Order = {
  id: string;
  customer: string;
  amount: string;
  status: OrderStatus;
  date: string;
};

export const recentOrders: Order[] = [
  { id: "ORD-1032", customer: "김민준", amount: "₩1,240,000", status: "완료", date: "2026-07-29" },
  { id: "ORD-1031", customer: "이서연", amount: "₩890,000", status: "진행중", date: "2026-07-28" },
  { id: "ORD-1030", customer: "박도윤", amount: "₩2,150,000", status: "완료", date: "2026-07-27" },
  { id: "ORD-1029", customer: "최지우", amount: "₩430,000", status: "취소", date: "2026-07-26" },
  { id: "ORD-1028", customer: "정하은", amount: "₩1,780,000", status: "진행중", date: "2026-07-25" },
  { id: "ORD-1027", customer: "강주원", amount: "₩3,020,000", status: "완료", date: "2026-07-24" },
  { id: "ORD-1026", customer: "윤서준", amount: "₩560,000", status: "진행중", date: "2026-07-23" },
  { id: "ORD-1025", customer: "임채원", amount: "₩1,150,000", status: "완료", date: "2026-07-22" },
];
