import { JSX } from "react/jsx-runtime";

import styles from "./Notion.module.css";
import { useContext, useEffect, useState } from "react";
import { NotionContext } from "./NotionProvider";

interface NotionProps {
  value: string;
  type: "sucess" | "error";
}

export default function Notion({ value, type }: NotionProps): JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => setVisible(value !== ""), [value]);

  return (
    <>
      {visible && (
        <div className={`${styles.background} ${styles[type]}`}>
          <p className={`${styles.text}`}>{value}</p>
        </div>
      )}
    </>
  );
}

export function useNotion(): [
  NotionProps,
  (value: string, type: "sucess" | "error") => void
] {
  const [notion, setNotion] =
    useContext<
      [NotionProps, (value: string, type: "sucess" | "error") => void]
    >(NotionContext);
  const changeNotion = (value: string, type: "sucess" | "error"): Function => {
    setNotion(value, type);
    const timer: NodeJS.Timeout = setTimeout(
      () => setNotion("", "error"),
      3000
    );
    return (): void => clearTimeout(timer);
  };
  return [notion, changeNotion];
}
