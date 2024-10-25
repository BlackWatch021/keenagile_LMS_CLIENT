import { Check } from "lucide-react";

const NestedList = ({ data }) => {
  const renderList = (items) => {
    return (
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-x-10 gap-y-8 px-4 py-3 border-white">
        {Object.entries(items).map(([key, value]) => (
          <div key={key} className="flex text-xs ">
            <div>
              <Check size={17} className="mr-2 text-[#2d2f31]/50" />
            </div>
            <p className="text-[#2d2f31]/80 cursor-default">{value}</p>
          </div>
        ))}
      </div>
    );
  };

  return <>{renderList(data)}</>;
};

export default NestedList;
