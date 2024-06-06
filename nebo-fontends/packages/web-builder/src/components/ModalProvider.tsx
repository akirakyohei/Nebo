import React, { createElement, memo, useEffect, useState } from "react";
import { useEditorMaybe } from "@grapesjs/react";
import { WrapDom } from "../utils/react";
import { noop } from "../utils";

export interface ModalState {
  /**
   * Modal title
   */
  title: string | React.ReactNode;

  /**
   * Modal content
   */
  content: string | React.ReactNode;

  /**
   * Modal attributes
   */
  attributes: Record<string, any>;

  /**
   * Callback for closing the modal
   */
  close: () => void;
}

export interface ModalResultProps extends ModalState {
  /**
   * Indicates if the modal is open.
   */
  open: boolean;
}

export interface ModalProviderProps {
  children: (props: ModalResultProps) => React.JSX.Element;
}

export interface ModalEventProps {
  open: boolean;
  title: any;
  content: any;
  attributes: Record<string, any>;
  close: () => void;
}

const ModalProvider = memo(function ({ children }: ModalProviderProps) {
  const editor = useEditorMaybe();
  const [isOpen, setOpen] = useState(false);
  const [modalState, setModalState] = useState<ModalState>({
    title: <></>,
    content: <></>,
    attributes: {},
    close: noop,
  });

  useEffect(() => {
    if (!editor) return;
    const event = "modal";

    const toListen = ({
      open,
      title,
      content,
      close,
      attributes,
    }: ModalEventProps) => {
      open &&
        setModalState({
          title: title.data,
          content: content.data,
          attributes,
          close,
        });
      setOpen(open);
    };

    editor.on(event, toListen);

    return () => {
      editor.off(event, toListen);
    };
  }, [editor]);

  return editor
    ? typeof children === "function"
      ? children({ open: isOpen, ...modalState })
      : null
    : null;
});

export default ModalProvider;
