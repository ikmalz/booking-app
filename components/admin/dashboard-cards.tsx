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
      icon: <LuChartArea className="size-6 text-gray-600" />,
    },
    {
      title: "Total Reservation",
      value: data.reserve,
      icon: <LuShoppingCart className="size-6 text-gray-600" />,
    },
    {
      title: "Total Customer",
      value: customer.length,
      icon: <LuUsers className="size-6 text-gray-600" />,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3 mt-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="flex items-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
        >
          {/* Icon */}
          <div className="p-4 bg-gray-100 rounded-l-2xl flex items-center justify-center">
            <div className="h-13 w-12 flex items-center justify-center rounded-xl bg-gray-200">
              {card.icon}
            </div>
          </div>

          {/* Content */}
          <div className="px-5 py-4 text-gray-700 flex-1">
            <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500">
              {card.title}
            </h3>
            <p className="text-2xl font-semibold mt-1 text-gray-800">
              {card.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
