import Head from "next/head";
import { DpCellType, DisplayMatrixProps } from "../types/AlgorithmType";
import TableGrid from "../src/components/TableGrid";
import TopBar from "../src/components/TopBar";
import GlobalAlignedStr from "../src/components/GlobalAlignedString";
import LocalAlignedStr from "../src/components/LocalAlignedString";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { needlemanWunsch } from "../src/algorithms/GlobalAlignment";
import { SmithWaterman } from "../src/algorithms/LocalAlignment";

const init_seq1 = "#######################";
const init_seq2 = "##########";

function Home() {
  const [seq1, setSeq1] = useState<string>(init_seq1);
  const [seq2, setSeq2] = useState<string>(init_seq2);
  const [mode, setMode] = useState<"Global" | "Local">("Global");
  const [matchScore, setMatchScore] = useState<number>(1);
  const [mismatchScore, setMismatchScore] = useState<number>(-1);
  const [gapScore, setGapScore] = useState<number>(2);
  const [alignScore, setAlignScore] = useState<number>(0);
  const cols = seq1.length + 2;
  const rows = seq2.length + 2;

  const [NWDpMatrix, setNWDpMatrix] = useState<DpCellType[][]>(null);
  const [optNWPath, setOptNWPath] = useState<[number, number][]>(null);
  const [NWAlignRes, setNWAlignRes] = useState<[string, string]>(null);
  const [SWDpMatrix, setSWDpMatrix] = useState<number[][]>(null);
  const [optSWPath, setOptSWPath] = useState<[number, number, string][]>(null);
  const [SWAlignRes, setSWAlignRes] = useState<string[][]>(null);
  const currentPositionRef = useRef<[number, number]>([0, 0]);
  const previousPositionRef = useRef<[number, number]>([0, 0]);

  const [displayMatrix, setDisplayMatrix] = useState<DisplayMatrixProps[][]>(
    Array.from({ length: cols - 1 }, () =>
      Array.from({ length: rows - 1 }, () => ({
        value: 0,
        cellStatus: "unvisited" as const,
      }))
    )
  );
  const handleSend = useCallback(
    (
      input1: string,
      input2: string,
      mode: "Global" | "Local",
      matchScore: string,
      mismatchScore: string,
      gapScore: string
    ) => {
      setSeq1(input1);
      setSeq2(input2);
      setMode(mode);
      setMatchScore(parseInt(matchScore));
      setMismatchScore(parseInt(mismatchScore));
      setGapScore(parseInt(gapScore));
      setDisplayMatrix(
        Array.from({ length: input1.length + 1 }, () =>
          Array.from({ length: input2.length + 1 }, () => ({
            value: 0,
            cellStatus: "unvisited" as const,
          }))
        )
      );
      runAlignments(
        input1,
        input2,
        mode,
        parseInt(matchScore),
        parseInt(mismatchScore),
        parseInt(gapScore)
      );
    },
    []
  );

  const handleReset = useCallback(() => {
    currentPositionRef.current = [0, 0];
    previousPositionRef.current = [0, 0];
    setSeq1(init_seq1);
    setSeq2(init_seq2);
    setDisplayMatrix(
      Array.from({ length: init_seq1.length + 1 }, () =>
        Array.from({ length: init_seq2.length + 1 }, () => ({
          value: 0,
          cellStatus: "unvisited",
        }))
      )
    );
  }, []);

  const runAlignments = (
    input1: string,
    input2: string,
    mode: "Global" | "Local",
    matchScore: number,
    mismatchScore: number,
    gapScore: number
  ) => {
    const result = needlemanWunsch(
      input1,
      input2,
      matchScore,
      mismatchScore,
      gapScore
    );
    const result1 = SmithWaterman(
      input1,
      input2,
      matchScore,
      mismatchScore,
      gapScore
    );
    console.log("Global Matrix:", result.matrix);
    console.log("Global Alignment:", result.alignment);
    console.log("Local Matrix:", result1.scoreMatrix);
    console.log("Local Alignment:", result1.tracebacks);
    // Add a delay between state updates
    setNWDpMatrix(result.matrix);
    setOptNWPath(result.globalPath);
    setNWAlignRes(result.alignment);
    setSWDpMatrix(result1.scoreMatrix);
    setOptSWPath(result1.localPaths);
    setSWAlignRes(result1.tracebacks);

    if (mode === "Global")
      setAlignScore(result.matrix[input1.length][input2.length].value);
    else setAlignScore(result1.maxScore);
  };
  useEffect(() => {
    if (init_seq1 != seq1) {
      if (mode === "Global" && NWDpMatrix != undefined) {
        animateNW();
      }
      if (mode === "Local" && SWDpMatrix != undefined) {
        animateSW();
      }
    }
  }, [seq1, seq2]);

  const animateNWPath = async () => {
    //console.log("animateNWPath");
    for (const [pathRow, pathCol] of optNWPath) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setDisplayMatrix((prevMatrix) => {
        const newMatrix = JSON.parse(JSON.stringify(prevMatrix));
        newMatrix[pathCol][pathRow].cellStatus = "path";
        return newMatrix;
      });
    }
  };
  //console.log("In Index");
  const animateNW = () => {
    //console.log("animateNWAll");
    const updateMatrix = async () => {
      const [currentRow, currentCol] = currentPositionRef.current;
      const [previousRow, previousCol] = previousPositionRef.current;
      if (!NWDpMatrix) {
        return;
      }
      if (currentRow >= rows - 1 || currentCol >= cols - 1) {
        animateNWPath();
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
  };
  const animateSWPath = async () => {
    for (const [pathRow, pathCol, color] of optSWPath) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setDisplayMatrix((prevMatrix) => {
        const newMatrix = JSON.parse(JSON.stringify(prevMatrix));
        newMatrix[pathCol][pathRow].cellStatus = "localpath";
        newMatrix[pathCol][pathRow].bgColor = color;

        return newMatrix;
      });
    }
  };
  const animateSW = () => {
    const updateMatrix = async () => {
      const [currentRow, currentCol] = currentPositionRef.current;
      const [previousRow, previousCol] = previousPositionRef.current;

      if (!SWDpMatrix) {
        return;
      }
      if (currentRow >= rows - 1 || currentCol >= cols - 1) {
        animateSWPath();
      } else {
        setDisplayMatrix((prevMatrix) => {
          const newMatrix = JSON.parse(JSON.stringify(prevMatrix));
          newMatrix[currentCol][currentRow] = {
            value: SWDpMatrix[currentCol][currentRow],
            cellStatus: "current",
          };
          newMatrix[previousCol][previousRow].cellStatus = "visited";
          previousPositionRef.current = [currentRow, currentCol];

          if (currentCol < cols - 2) {
            currentPositionRef.current = [currentRow, currentCol + 1];
          } else {
            currentPositionRef.current = [currentRow + 1, 0];
          }
          if (
            currentPositionRef.current[0] >= rows - 1 ||
            currentPositionRef.current[1] >= cols - 1
          ) {
            newMatrix[previousPositionRef.current[1]][
              previousPositionRef.current[0]
            ].cellStatus = "visited";
          }
          return newMatrix;
        });
        setTimeout(updateMatrix, 20);
      }
    };

    updateMatrix();
  };

  return (
    <div>
      <Head>
        <title>Alignment Visualization</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/viz.png" />
      </Head>

      <main>
        <TopBar onSend={handleSend} onReset={handleReset} />
        <div className="relative h-screen flex items-center justify-center overflow-x-hidden">
          <div className="container pt-28 max-w-7xl w-full mx-auto h-full">
            <div className="h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start">
              <div className="grid grid-cols-2 gap-4 w-full pb-2">
                <div className="flex flex-col gap-3 bg-gray-200 p-2 rounded-lg">
                  <div>
                    Sequence1: <br />
                    {seq1}
                  </div>
                  <div>
                    Sequence2: <br /> {seq2}
                  </div>
                  <div>Alignment Score: {alignScore} </div>
                </div>
                <div className="col-span-1 whitespace-pre-wrap bg-gray-200 p-2 rounded-lg">
                  {mode} Alignment Result: <br />
                  {mode === "Global" && NWAlignRes != null ? (
                    <GlobalAlignedStr
                      string1={NWAlignRes[0]}
                      string2={NWAlignRes[1]}
                    ></GlobalAlignedStr>
                  ) : null}
                  {mode === "Local" && SWAlignRes != null ? (
                    <LocalAlignedStr inputstrs={SWAlignRes}></LocalAlignedStr>
                  ) : null}
                </div>
              </div>

              <TableGrid
                displayMatrix={displayMatrix}
                seq1={seq1}
                seq2={seq2}
              />
            </div>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export default Home;
