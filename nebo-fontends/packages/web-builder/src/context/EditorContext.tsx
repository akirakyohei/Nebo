import { Editor } from "grapesjs";
import React, { useState, useCallback, useEffect } from "react";

export type EditorContextType = {
  editor: Editor | null;
};

export const EditorContext = React.createContext<EditorContextType>({
  editor: null,
});
