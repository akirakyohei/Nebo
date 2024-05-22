import { Editor } from "grapesjs";
import React, { useState } from "react";

export type EditorContextType = {
  editor: Editor | null;
  setEditor: (editor: Editor) => void;
};

export const EditorContext = React.createContext<EditorContextType | null>(
  null
);

export const EditorContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  return (
    <EditorContext.Provider value={{ editor, setEditor }}>
      {children}
    </EditorContext.Provider>
  );
};
