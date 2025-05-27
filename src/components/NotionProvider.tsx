import { JSX } from "react/jsx-runtime";
import React, { createContext, useState } from "react";

interface iNotion {
  value: string;
  type: "sucess" | "error";
}

export const NotionContext = createContext<
  [iNotion, (value: string, type: "sucess" | "error") => void]
>([{ value: "", type: "error" }, () => {}]);

interface NotionProviderProps {
  children: React.ReactNode;
}

export default function NotionProvider({
  children,
}: NotionProviderProps): JSX.Element {
  const [notion, setNotion] = useState<iNotion>({ value: "", type: "error" });

  const changeValue = (value: string, type: "sucess" | "error"): void =>
    setNotion({ value, type });

  return (
    <NotionContext.Provider value={[notion, changeValue]}>
      {children}
    </NotionContext.Provider>
  );
}
