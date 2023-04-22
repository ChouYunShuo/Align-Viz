import { DpCellType, DirectionType } from "../../types/AlgorithmType";
const colors = [
  "rgb(255, 0, 0)",
  "rgb(255, 128, 0)",
  "rgb(255, 255, 0)",
  "rgb(128, 255, 0)",
  "rgb(0, 153, 0)",
  "rgb(0, 255, 255)",
  "rgb(0, 102, 204)",
  "rgb(0, 0, 255)",
  "rgb(127, 0, 255)",
  "rgb(255, 0, 255)",
  // Add more colors if you have more local alignments
];

export function SmithWaterman(
  seq1: string,
  seq2: string,
  matchScore: number,
  mismatchScore: number,
  gapScore: number
): {
  scoreMatrix: number[][];
  tracebacks: string[][];
  localPaths: [number, number, string][];
  maxScore: number;
} {
  const len1 = seq1.length;
  const len2 = seq2.length;

  // Initialize the scoring matrix with zeros
  const scoreMatrix: number[][] = Array.from({ length: len1 + 1 }, () =>
    Array(len2 + 1).fill(0)
  );

  // Fill the scoring matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const scoreDiagonal =
        scoreMatrix[i - 1][j - 1] +
        (seq1[i - 1] === seq2[j - 1] ? matchScore : mismatchScore);
      const scoreUp = scoreMatrix[i - 1][j] + gapScore;
      const scoreLeft = scoreMatrix[i][j - 1] + gapScore;

      scoreMatrix[i][j] = Math.max(scoreDiagonal, scoreUp, scoreLeft, 0);
    }
  }

  // Find local maximum(s) in the scoring matrix
  const localMaxima: [number, number, number][] = [];
  let maxScore = 0;
  for (let i = 0; i <= len1; i++) {
    for (let j = 0; j <= len2; j++) {
      if (scoreMatrix[i][j] > maxScore) {
        maxScore = scoreMatrix[i][j];
        localMaxima.length = 0;
        localMaxima.push([i, j, maxScore]);
      } else if (scoreMatrix[i][j] === maxScore && maxScore !== 0) {
        localMaxima.push([i, j, maxScore]);
      }
    }
  }
  // Perform traceback for each local maximum
  const tracebacks: string[][] = [];
  const localPaths: [number, number, string][] = [];
  const traceback = (
    i: number,
    j: number,
    alignment1: string,
    alignment2: string,
    color: string
  ) => {
    if (scoreMatrix[i][j] === 0) {
      tracebacks.push([
        alignment1.split("").reverse().join(""),
        alignment2.split("").reverse().join(""),
      ]);
      return;
    }

    if (
      i > 0 &&
      j > 0 &&
      scoreMatrix[i][j] ===
        scoreMatrix[i - 1][j - 1] +
          (seq1[i - 1] === seq2[j - 1] ? matchScore : mismatchScore)
    ) {
      localPaths.push([j, i, color]);
      traceback(
        i - 1,
        j - 1,
        alignment1 + seq1[i - 1],
        alignment2 + seq2[j - 1],
        color
      );
    } else if (
      i > 0 &&
      scoreMatrix[i][j] === scoreMatrix[i - 1][j] + gapScore
    ) {
      localPaths.push([j, i, color]);
      traceback(i - 1, j, alignment1 + seq1[i - 1], alignment2 + "-", color);
    } else if (
      j > 0 &&
      scoreMatrix[i][j] === scoreMatrix[i][j - 1] + gapScore
    ) {
      localPaths.push([j, i, color]);
      traceback(i, j - 1, alignment1 + "-", alignment2 + seq2[j - 1], color);
    }
  };
  //console.log(localMaxima);
  localMaxima.forEach(([i, j], idx) => {
    traceback(i, j, "", "", colors[idx]);
  });

  return { scoreMatrix, tracebacks, localPaths, maxScore };
}
