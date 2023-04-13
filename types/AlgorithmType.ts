export type DirectionType = "diagonal" | "up" | "left" | "gap";

export interface DpCellType {
  value: number;
  direction: DirectionType;
}

export interface DisplayMatrixProps {
  value: number;
  cellStatus: "current" | "visited" | "unvisited" | "path";
  bgColor?: string;
}
