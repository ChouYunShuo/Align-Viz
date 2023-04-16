interface AlignedStringProps {
  string1: string;
  string2: string;
}
const GlobalAlignedStr: React.FC<AlignedStringProps> = ({
  string1,
  string2,
}) => {
  return (
    <div className="flex flex-col">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${string1.length}, minmax(0, 1fr))`,
          gap: "0.25rem",
        }}
      >
        {Array.from(string1).map((char1, index) => (
          <span key={index}>{char1}</span>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${string2.length}, minmax(0, 1fr))`,
          gap: "0.25rem",
        }}
      >
        {Array.from(string2).map((char2, index) => (
          <span key={index}>{char2}</span>
        ))}
      </div>
    </div>
  );
};

export default GlobalAlignedStr;
