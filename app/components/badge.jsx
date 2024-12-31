const Badge = ({ badgeType, textValue }) => {
  const badgeStyles = {
    "blue-badge": "text-blue-700 bg-blue-100",
    "green-badge": "text-green-700 bg-green-100",
    "yellow-badge": "text-yellow-700 bg-yellow-100",
    "red-badge": "text-red-700 bg-red-100",
    "gray-badge": "text-gray-700 bg-gray-100",
    "dark-gray-badge": "text-white bg-gray-800",
  };

  const baseStyles = "px-3 py-1 text-sm font-medium rounded-full";

  return (
    <span className={`${baseStyles} ${badgeStyles[badgeType] || ""}`}>
      {textValue}
    </span>
  );
};

// export default function BadgeExample() {
//   return (
//     <div className="flex space-x-2">
//       {/* Example of using the Badge component */}
//       <Badge badgeType="blue-badge" textValue="Hallo" />
//       <Badge badgeType="green-badge" textValue="Product" />
//       <Badge badgeType="red-badge" textValue="Bug Fix" />
//     </div>
//   );
// }

export default Badge