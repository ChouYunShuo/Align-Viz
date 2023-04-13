import React, { FC } from "react";
interface TestProps {
  title?: string;
  name?: string;
}

interface CellProps {
  cellSize: string;
  row: number;
  col: number;
  content: number;
  cellStatus: "current" | "visited" | "unvisited" | "path";
  bgColor?: string;
}
const Cell: FC<CellProps> = ({
  cellSize,
  row,
  col,
  content,
  cellStatus,
  bgColor,
}) => {
  let backgroundColor = "white";

  if (cellStatus === "current") {
    backgroundColor = "blue";
  } else if (cellStatus === "visited") {
    backgroundColor = "green";
  } else if (cellStatus === "path") {
    backgroundColor = "yellow";
  }
  if (bgColor && cellStatus === "path") {
    backgroundColor = bgColor;
  }

  const cellStyle = {
    display: "flex",
    backgroundColor: backgroundColor,
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    width: cellSize,
    height: cellSize,
  };

  return <div style={cellStyle}>{content}</div>;
};

export default Cell;
