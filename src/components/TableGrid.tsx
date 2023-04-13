import React, { FC, useEffect, useState, useRef } from "react";
import Cell from "./Cell";
import { needlemanWunsch } from "../algorithms/GlobalAlignment";
import { SmithWaterman } from "../algorithms/LocalAlignment";
import { DpCellType, DisplayMatrixProps } from "../../types/AlgorithmType";
interface TableGridProps {
  seq1: string;
  seq2: string;
}

const TableGrid: FC<TableGridProps> = ({ seq1, seq2 }) => {
  const cellSize = "50px";
  const cols = seq1.length + 2;
  const rows = seq2.length + 2;
  const matchScore = 1;
  const mismatchScore = -1;
  const gapScore = -2;
  const [NWDpMatrix, setNWDpMatrix] = useState<DpCellType[][]>(null);
  const [optNWPath, setOptNWPath] = useState<[number, number][]>(null);
  const [SWDpMatrix, setSWDpMatrix] = useState<number[][]>(null);
  const [optSWPath, setOptSWPath] = useState<[number, number, string][]>(null);

  const [displayMatrix, setDisplayMatrix] = useState<DisplayMatrixProps[][]>(
    Array.from({ length: cols - 1 }, () =>
      Array.from({ length: rows - 1 }, () => ({
        value: 0,
        cellStatus: "unvisited",
      }))
    )
  );

  useEffect(() => {
    resetAll();
    const result = needlemanWunsch(
      seq1,
      seq2,
      matchScore,
      mismatchScore,
      gapScore
    );
    const result1 = SmithWaterman(
      seq1,
      seq2,
      matchScore,
      mismatchScore,
      gapScore
    );
    console.log("Global Matrix:", result.matrix);
    console.log("Global Alignment:", result.alignment);
    console.log("Local Matrix:", result1.scoreMatrix);
    console.log("Local Alignment:", result1.tracebacks);
    setNWDpMatrix(result.matrix);
    setOptNWPath(result.globalPath);
    setSWDpMatrix(result1.scoreMatrix);
    setOptSWPath(result1.localPaths);
  }, [seq1, seq2]);

  const currentPositionRef = useRef<[number, number]>([0, 0]);
  const previousPositionRef = useRef<[number, number]>([0, 0]);
  const pathCntRef = useRef<number>(0);
  const SWPathidxRef: React.MutableRefObject<[number, number][]> = useRef<
    [number, number][]
  >([]);

  useEffect(() => {
    const updateMatrix = async () => {
      const [currentRow, currentCol] = currentPositionRef.current;
      const [previousRow, previousCol] = previousPositionRef.current;
      const pathCnt = pathCntRef.current;
      if (!NWDpMatrix || pathCnt >= optNWPath.length) {
        return;
      }
      if (currentRow >= rows - 1 || currentCol >= cols - 1) {
        //const alignmentPath = findAlignmentPath(NWDpMatrix, seq1, seq2);

        for (const [pathRow, pathCol] of optNWPath) {
          console.log(pathCol, pathRow);
          await new Promise((resolve) => setTimeout(resolve, 100));
          pathCntRef.current = pathCnt + 1;
          setDisplayMatrix((prevMatrix) => {
            const newMatrix = JSON.parse(JSON.stringify(prevMatrix));
            newMatrix[pathCol][pathRow].cellStatus = "path";
            return newMatrix;
          });
        }
      } else {
        setDisplayMatrix((prevMatrix) => {
          const newMatrix = JSON.parse(JSON.stringify(prevMatrix));
          newMatrix[currentCol][currentRow] = {
            value: NWDpMatrix[currentCol][currentRow].value,
            cellStatus: "current",
          };
          newMatrix[previousCol][previousRow].cellStatus = "visited";
          previousPositionRef.current = [currentRow, currentCol];

          if (currentCol < cols - 2) {
            currentPositionRef.current = [currentRow, currentCol + 1];
          } else {
            currentPositionRef.current = [currentRow + 1, 0];
          }

          return newMatrix;
        });
        setTimeout(updateMatrix, 10);
      }
    };

    updateMatrix();
  }, [NWDpMatrix]);
  const resetAll = () => {
    currentPositionRef.current = [0, 0];
    previousPositionRef.current = [0, 0];
    pathCntRef.current = 0;
    // setDisplayMatrix(
    //   Array.from({ length: cols - 1 }, () =>
    //     Array.from({ length: rows - 1 }, () => ({
    //       value: 0,
    //       cellStatus: "unvisited",
    //     }))
    //   )
    // );
    console.log(123456);
  };

  // useEffect(() => {
  //   const updateMatrix = async () => {
  //     const [currentRow, currentCol] = currentPositionRef.current;
  //     const [previousRow, previousCol] = previousPositionRef.current;

  //     if (!SWDpMatrix) {
  //       return;
  //     }
  //     if (currentRow >= rows - 1 || currentCol >= cols - 1) {
  //       for (const [pathRow, pathCol, color] of optSWPath) {
  //         console.log(pathCol, pathRow, pathCntRef.current);

  //         await new Promise((resolve) => setTimeout(resolve, 100));

  //         setDisplayMatrix((prevMatrix) => {
  //           const newMatrix = JSON.parse(JSON.stringify(prevMatrix));
  //           newMatrix[pathCol][pathRow].cellStatus = "path";
  //           newMatrix[pathCol][pathRow].bgColor = color;

  //           return newMatrix;
  //         });
  //       }

  //       return;
  //     } else {
  //       setDisplayMatrix((prevMatrix) => {
  //         const newMatrix = JSON.parse(JSON.stringify(prevMatrix));
  //         newMatrix[currentCol][currentRow] = {
  //           value: SWDpMatrix[currentCol][currentRow],
  //           cellStatus: "current",
  //         };
  //         newMatrix[previousCol][previousRow].cellStatus = "visited";
  //         previousPositionRef.current = [currentRow, currentCol];

  //         if (currentCol < cols - 2) {
  //           currentPositionRef.current = [currentRow, currentCol + 1];
  //         } else {
  //           currentPositionRef.current = [currentRow + 1, 0];
  //         }
  //         if (
  //           currentPositionRef.current[0] >= rows - 1 ||
  //           currentPositionRef.current[1] >= cols - 1
  //         ) {
  //           newMatrix[previousPositionRef.current[1]][
  //             previousPositionRef.current[0]
  //           ].cellStatus = "visited";
  //         }
  //         return newMatrix;
  //       });
  //       setTimeout(updateMatrix, 10);
  //     }
  //   };

  //   updateMatrix();
  // }, [SWDpMatrix, rows, cols]);

  const tableStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize})`,
    gridTemplateRows: `repeat(${rows}, ${cellSize})`,
    gap: "1px",
    backgroundColor: "black",
    width: `calc(${cellSize} * ${cols} + ${cols - 1}px)`,
    height: `calc(${cellSize} * ${rows} + ${rows - 1}px)`,
  };

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
          NWDpMatrix != null &&
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
    <>
      <div style={tableStyle}>{cells}</div>
    </>
  );
};

export default TableGrid;
