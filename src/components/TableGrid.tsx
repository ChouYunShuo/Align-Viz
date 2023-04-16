import React, { FC } from "react";
import Cell from "./Cell";

import { DpCellType, DisplayMatrixProps } from "../../types/AlgorithmType";

interface TableGridProps {
  displayMatrix: DisplayMatrixProps[][];
  seq1: string;
  seq2: string;
}

const TableGrid: FC<TableGridProps> = ({ displayMatrix, seq1, seq2 }) => {
  const cellSize = "50px";
  const cols = seq1.length + 2;
  const rows = seq2.length + 2;

  const tableStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize})`,
    gridTemplateRows: `repeat(${rows}, ${cellSize})`,
    gap: "1px",
    width: `calc(${cellSize} * ${cols} + ${cols - 1}px)`,
    height: `calc(${cellSize} * ${rows} + ${rows - 1}px)`,
    maxWidth: "100%",
  };
  //console.log("In TableGrid");
  const cells = [];
  let seq1_idx = 0;
  let seq2_idx = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let content;
      let isDpCell = false;
      if ((i <= 1 && j === 0) || (i === 0 && j === 1)) {
        content = "";
      } else if (i == 0) {
        content = seq1[seq1_idx++];
      } else if (j == 0) {
        content = seq2[seq2_idx++];
      } else {
        if (
          displayMatrix != undefined &&
          displayMatrix[j - 1][i - 1] != undefined
        ) {
          isDpCell = true;
          content = displayMatrix[j - 1][i - 1].value;
        }
      }

      cells.push(
        <Cell
          key={`${i}-${j}`}
          cellSize={cellSize}
          row={i}
          col={j}
          content={content}
          cellStatus={
            isDpCell ? displayMatrix[j - 1][i - 1].cellStatus : "unvisited"
          }
          bgColor={
            isDpCell && displayMatrix[j - 1][i - 1].bgColor
              ? displayMatrix[j - 1][i - 1].bgColor
              : null
          }
        ></Cell>
      );
    }
  }

  return (
    <div className="overflow-x-auto w-full h-3/4 bg-slate-200 rounded-lg">
      <div style={tableStyle}>{cells}</div>
    </div>
  );
};

export default React.memo(TableGrid);
