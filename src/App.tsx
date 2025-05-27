import type { JSX } from "react/jsx-runtime";
import { QRCodeSVG } from "qrcode.react";
import * as Qr from "qrcode";

import "./App.css";
import { useRef, useState } from "react";
import Notion, { useNotion } from "./components/Notion";

export default function App(): JSX.Element {
  const [text, setText] = useState<string>(
    "https://qrcodegeneration.vercel.app"
  );
  const [notion, setNotion] = useNotion();

  const inputRef = useRef<HTMLInputElement>(null);
  const aRef = useRef<HTMLAnchorElement>(null);

  const clickButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    if (!inputRef.current!.value.trim())
      return setNotion("Campo Vazio!", "error");
    setText(inputRef.current!.value.trim());
    inputRef.current!.value = "";
    setNotion("QRCode Gerado com sucesso!", "sucess");
  };

  const clickQrCode = (): void => {
    Qr.toDataURL(
      text,
      {
        width: 600,
        margin: 3,
      },
      (_, url) => {
        aRef.current!.href = url;
        aRef.current!.download = "qrcode.png";
        aRef.current!.click();
        setNotion("QRCode baixado com sucesso!", "sucess");
      }
    );
  };

  return (
    <div className="App">
      <div className="AppColumn">
        <Notion value={notion.value} type={notion.type} />
        <div className="AppMain">
          <h1>QrCodeGeneration</h1>
          <QRCodeSVG
            onClick={() => clickQrCode()}
            className="QRCode"
            value={text}
          />
          <form className="AppForm">
            <input
              ref={inputRef}
              type="text"
              placeholder="Digite o Link ou Texto aqui..."
            />
            <button onClick={(e) => clickButton(e)}>Enviar</button>
          </form>
        </div>
        <a ref={aRef} />
      </div>
    </div>
  );
}
