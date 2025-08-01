import React from "react";
import CircularProgressBar from "../../components/CircularProgressBar";

const CardBox = () => {
  const cards = [
    { title: "Card 1", content: "This is card 1 content" },
    { title: "Card 2", content: "This is card 2 content" },
    { title: "Card 3", content: "This is card 3 content" },
    { title: "Card 4", content: "This is card 4 content" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 flex flex-col"
        >
          {/* Header */}
          <div className="bg-green-100 text-green-800 text-sm sm:text-base font-semibold px-4 py-2 border-b border-green-300">
            Header
          </div>

          {/* Content */}
          <div className="p-4 flex-grow">
            <h5 className="text-lg font-semibold mb-2">{card.title}</h5>
            <p className="text-gray-600 text-sm sm:text-base">{card.content}</p>
          </div>

          {/* Footer */}
          <div className="flex justify-center pb-4">
            <CircularProgressBar percentage={75} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardBox;
