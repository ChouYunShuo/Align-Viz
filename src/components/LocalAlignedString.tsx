interface AlignedStringProps {
  inputstrs: string[][];
}
const LocalAlignedStr: React.FC<AlignedStringProps> = ({ inputstrs }) => {
  return (
    <div className="flex flex-col h-32 overflow-y-auto">
      {inputstrs.map((pair, pairIndex) => {
        const maxLength = Math.max(pair[0].length, pair[1].length);
        return (
          <div
            key={pairIndex}
            className={`${
              pairIndex < inputstrs.length - 1
                ? "border-b border-gray-800 pb-2"
                : ""
            }`}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${maxLength}, minmax(0, 1fr))`,
                gap: "0.125rem",
              }}
            >
              {Array.from(pair[0]).map((char1, index) => (
                <span key={index}>{char1}</span>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${maxLength}, minmax(0, 1fr))`,
                gap: "0.125rem",
              }}
            >
              {Array.from(pair[1]).map((char2, index) => (
                <span key={index}>{char2}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LocalAlignedStr;
