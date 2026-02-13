interface KeyTakeawaysProps {
  takeaways: string[];
}

export const KeyTakeaways = ({ takeaways }: KeyTakeawaysProps) => {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <div className="key-takeaways bg-gray-50 border-2 border-black p-6 mb-8" data-speakable="true">
      <h2 className="lr-heading-m mb-4">
        Key Takeaways
      </h2>
      <ul className="space-y-3">
        {takeaways.map((takeaway, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
              {index + 1}
            </span>
            <span className="lr-body">{takeaway}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
