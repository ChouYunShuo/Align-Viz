import { DpCellType, DirectionType } from "../../types/AlgorithmType";

export function needlemanWunsch(
  seq1: string,
  seq2: string,
  matchScore: number,
  mismatchScore: number,
  gapScore: number
): {
  matrix: DpCellType[][];
  alignment: [string, string];
  globalPath: [number, number][];
} {
  const len1 = seq1.length;
  const len2 = seq2.length;

  // Initialize the scoring matrix with zeros
  const matrix: DpCellType[][] = Array.from({ length: len1 + 1 }, () =>
    Array.from({ length: len2 + 1 }, () => ({
      value: 0,
      direction: "diagonal" as DirectionType,
    }))
  );

  // Fill the first row and column with gap scores
  for (let i = 1; i <= len1; i++) {
    matrix[i][0] = { value: i * gapScore, direction: "up" };
  }
  for (let j = 1; j <= len2; j++) {
    matrix[0][j] = { value: j * gapScore, direction: "left" };
  }

  // Fill the scoring matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const scoreDiagonal =
        matrix[i - 1][j - 1].value +
        (seq1[i - 1] === seq2[j - 1] ? matchScore : mismatchScore);
      const scoreUp = matrix[i - 1][j].value + gapScore;
      const scoreLeft = matrix[i][j - 1].value + gapScore;

      const maxValue = Math.max(scoreDiagonal, scoreUp, scoreLeft);
      const direction: DirectionType =
        maxValue === scoreLeft
          ? "left"
          : maxValue === scoreUp
          ? "up"
          : "diagonal";

      matrix[i][j] = { value: maxValue, direction };
    }
  }

  // Backtracking to find the optimal alignment
  let i = len1;
  let j = len2;
  let alignmentSeq1 = "";
  let alignmentSeq2 = "";
  const optPath: [number, number][] = [];
  while (i > 0 || j > 0) {
    const currentCell = matrix[i][j];
    optPath.push([j, i]);
    if (currentCell.direction === "diagonal") {
      alignmentSeq1 = seq1[i - 1] + alignmentSeq1;
      alignmentSeq2 = seq2[j - 1] + alignmentSeq2;
      i--;
      j--;
    } else if (currentCell.direction === "up") {
      alignmentSeq1 = seq1[i - 1] + alignmentSeq1;
      alignmentSeq2 = "-" + alignmentSeq2;
      i--;
    } else {
      alignmentSeq1 = "-" + alignmentSeq1;
      alignmentSeq2 = seq2[j - 1] + alignmentSeq2;
      j--;
    }
  }
  optPath.push([0, 0]);
  return {
    matrix,
    alignment: [alignmentSeq1, alignmentSeq2],
    globalPath: optPath,
  };
}
