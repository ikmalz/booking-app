import { getRevenueAndReserve, getTotalCustomers } from "@/lib/data";
import { LuChartArea, LuShoppingCart, LuUsers } from "react-icons/lu";
import { formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";

const DashboardCards = async () => {
  const [data, customer] = await Promise.all([
    getRevenueAndReserve(),
    getTotalCustomers(),
  ]);

  if (!data || !customer) return notFound();

  const cards = [
    {
      title: "Total Revenue",
      value: formatCurrency(data.revenue),
      icon: <LuChartArea className="size-10 text-white" />,
      bg: "from-green-400 to-green-600",
    },
    {
      title: "Total Reservation",
      value: data.reserve,
      icon: <LuShoppingCart className="size-10 text-white" />,
      bg: "from-red-400 to-red-600",
    },
    {
      title: "Total Customer",
      value: customer.length,
      icon: <LuUsers className="size-10 text-white" />,
      bg: "from-blue-400 to-blue-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3 mt-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="flex items-center bg-white rounded-2xl shadow-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          <div
            className={`p-6 bg-gradient-to-r ${card.bg} flex items-center justify-center rounded-l-xl`}
          >
            {card.icon}
          </div>
          <div className="px-5 py-4 text-gray-700 flex-1">
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">
              {card.title}
            </h3>
            <p className="text-3xl font-bold mt-1">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
