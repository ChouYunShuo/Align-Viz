import React, { FC } from "react";
import styles from "../../styles/Cell.module.css";
interface CellProps {
  cellSize: string;
  row: number;
  col: number;
  content: number;
  cellStatus: "localpath" | "visited" | "unvisited" | "path";
  bgColor?: string;
}

const Cell: FC<CellProps> = ({ cellSize, content, cellStatus, bgColor }) => {
  let backgroundColor = "white";
  const extraClassName =
    cellStatus === "localpath"
      ? "localpath"
      : cellStatus === "visited"
      ? "visited"
      : cellStatus === "path"
      ? "path"
      : "";

  // if (cellStatus === "current") {
  //   backgroundColor = "blue";
  // } else if (cellStatus === "visited") {
  //   backgroundColor = "green";
  // } else if (cellStatus === "path") {
  //   backgroundColor = "yellow";
  // }
  // if (bgColor && cellStatus === "path") {
  //   backgroundColor = bgColor;
  // }

  const cellStyle = {
    display: "flex",
    backgroundColor: extraClassName === "localpath" ? bgColor : backgroundColor,
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    width: cellSize,
    height: cellSize,
  };

  return (
    <div
      className={
        extraClassName === "visited"
          ? styles.cellvisited
          : extraClassName === "path"
          ? styles.cellpath
          : extraClassName === "localpath"
          ? styles.localpath
          : ""
      }
      style={cellStyle}
    >
      {content}
    </div>
  );
};

export default Cell;
