import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Workspace } from "../types";

export const useWorkspaceContext = (): Workspace => {
  const workspace = useSelector<RootState, Workspace>(
    (state) => state.workspace
  );
  return workspace;
};
