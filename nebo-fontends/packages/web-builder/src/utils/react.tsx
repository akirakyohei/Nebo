import { useRef, useEffect } from "react";

export const WrapDom = (el: HTMLElement | string) => {
  return function WrapElement() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const { current } = ref;

      if (current) {
        if (typeof el !== "string") {
          current.appendChild(el);
        }
      }
    }, [ref.current]);

    if (typeof el === "string")
      return (
        <div
          className="gjs-modal-content"
          ref={ref}
          dangerouslySetInnerHTML={{ __html: el }}
        />
      );
    return <div className="gjs-modal-content" ref={ref} />;
  };
};
