import {
  Users,
  FolderKanban,
  ClipboardList,
  UserRound,
} from "lucide-react";

const KPICards = () => {

  // Dashboard वर दाखवायचे KPI Cards
  const cards = [
    {
      title: "Citizens",
      value: "1,245",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Projects",
      value: "52",
      icon: FolderKanban,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Requests",
      value: "218",
      icon: ClipboardList,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Officers",
      value: "86",
      icon: UserRound,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => {

        // प्रत्येक card चा icon
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition"
          >

            {/* Icon + Title */}
            <div className="flex items-center justify-between">

              <div>
                <h3 className="text-gray-500 text-sm font-medium">
                  {card.title}
                </h3>

                {/* KPI Value */}
                <p className="text-3xl font-bold text-slate-800 mt-2">
                  {card.value}
                </p>
              </div>


              {/* Card Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg}`}
              >
                <Icon
                  size={24}
                  className={card.iconColor}
                />
              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default KPICards;