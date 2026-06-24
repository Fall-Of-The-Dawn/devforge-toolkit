import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Generator from "./components/Generator";
import CssConverter from "./components/CssConverter";
import TextDiff from "./components/TextDiff";
import JsonFormatter from "./components/JsonFormatter";
import RegexTester from "./components/RegexTester";
import Base64Tool from "./components/Base64Tool";
import UrlEncoder from "./components/UrlEncoder";
import JwtDecoder from "./components/JwtDecoder";
import FlexboxGridPlayground from "./components/FlexboxGridPlayground";
import GradientGenerator from "./components/GradientGenerator";
import BoxShadowGenerator from "./components/BoxShadowGenerator";
import QrCodeGenerator from "./components/QrCodeGenerator";
import LoremIpsumGenerator from "./components/LoremIpsumGenerator";
import HtmlPreviewEditor from "./components/HtmlPreviewEditor";
import AdBanner from "./components/AdBanner";
import { ExportModal, PrivacyModal } from "./components/Modals";
import { DATA_TYPE_PRESETS, AD_CONFIG, THEME_VARS } from "./utils/constants";

export default function App() {
  const [activeTool, setActiveTool] = useState("home");
  const [theme, setTheme] = useState(() => localStorage.getItem("devforge-theme") || "dark");
  const isLight = theme === "light";
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [fields, setFields] = useState(DATA_TYPE_PRESETS.users);
  const [count, setCount] = useState(10);
  const [activeTab, setActiveTab] = useState("json");
  const [dataType, setDataType] = useState("users");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSetTheme = (t) => {
    setTheme(t);
    localStorage.setItem("devforge-theme", t);
  };

  const t = THEME_VARS[isLight ? "light" : "dark"];
  const mutedText = t.mutedText;
  const mutedText2 = t.mutedText2;
  const activeBtn = t.activeBtn;
  const inactiveBtn = t.inactiveBtn;
  const hoverBorder = t.hoverBorder;
  const cardBg = t.cardBg;
  const codeBg = t.codeBg;

  return (
    <div className={`h-screen flex flex-col font-sans transition-colors duration-200 ${isLight ? "bg-white text-gray-900" : "bg-[#0a0a0a] text-[#e0e0e0]"}`}>
      <Header
        activeTool={activeTool} setActiveTool={setActiveTool}
        isLight={isLight} setTheme={handleSetTheme}
        setIsPrivacyOpen={setIsPrivacyOpen}
        mutedText={mutedText} mutedText2={mutedText2} activeBtn={activeBtn}
      />

      {activeTool === "home" && <Home setActiveTool={setActiveTool} isLight={isLight} />}

      {activeTool === "generator" && (
        <div className="flex-1 flex min-h-0">
          <Generator
            fields={fields} setFields={setFields}
            count={count} setCount={setCount}
            activeTab={activeTab} setActiveTab={setActiveTab}
            dataType={dataType} setDataType={setDataType}
            copied={copied} setCopied={setCopied}
            isLight={isLight} mutedText={mutedText}
            activeBtn={activeBtn} inactiveBtn={inactiveBtn}
            hoverBorder={hoverBorder} cardBg={cardBg} codeBg={codeBg}
            DATA_TYPE_PRESETS={DATA_TYPE_PRESETS}
            setIsExportModalOpen={setIsExportModalOpen}
          />
        </div>
      )}

      {activeTool === "css-converter" && (
        <div className="flex-1 flex min-h-0">
          <CssConverter
            isLight={isLight} mutedText={mutedText}
            activeBtn={activeBtn} inactiveBtn={inactiveBtn}
            hoverBorder={hoverBorder} cardBg={cardBg} codeBg={codeBg}
          />
        </div>
      )}

      {activeTool === "diff" && (
        <div className="flex-1 flex min-h-0">
          <TextDiff
            isLight={isLight} mutedText={mutedText}
            activeBtn={activeBtn} inactiveBtn={inactiveBtn}
          />
        </div>
      )}

      {activeTool === "json-formatter" && (
        <div className="flex-1 flex min-h-0">
          <JsonFormatter isLight={isLight} mutedText={mutedText} />
        </div>
      )}

      {activeTool === "regex-tester" && (
        <div className="flex-1 flex min-h-0">
          <RegexTester isLight={isLight} mutedText={mutedText} />
        </div>
      )}

      {activeTool === "base64" && (
        <div className="flex-1 flex min-h-0">
          <Base64Tool isLight={isLight} mutedText={mutedText} />
        </div>
      )}

      {activeTool === "url-encoder" && (
        <div className="flex-1 flex min-h-0">
          <UrlEncoder isLight={isLight} mutedText={mutedText} />
        </div>
      )}

      {activeTool === "jwt-decoder" && (
        <div className="flex-1 flex min-h-0">
          <JwtDecoder isLight={isLight} mutedText={mutedText} />
        </div>
      )}

      {activeTool === "layout" && (
        <div className="flex-1 flex min-h-0">
          <FlexboxGridPlayground isLight={isLight} mutedText={mutedText} />
        </div>
      )}

      {activeTool === "gradient" && (
        <div className="flex-1 flex min-h-0">
          <GradientGenerator isLight={isLight} mutedText={mutedText} />
        </div>
      )}

      {activeTool === "box-shadow" && (
        <div className="flex-1 flex min-h-0">
          <BoxShadowGenerator isLight={isLight} mutedText={mutedText} />
        </div>
      )}

      {activeTool === "qr-code" && (
        <div className="flex-1 flex min-h-0">
          <QrCodeGenerator isLight={isLight} mutedText={mutedText} />
        </div>
      )}

      {activeTool === "lorem" && (
        <div className="flex-1 flex min-h-0">
          <LoremIpsumGenerator isLight={isLight} mutedText={mutedText} />
        </div>
      )}

      {activeTool === "html-preview" && (
        <div className="flex-1 flex min-h-0">
          <HtmlPreviewEditor isLight={isLight} mutedText={mutedText} />
        </div>
      )}

      <div className={`p-3 border-t ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"} shrink-0 transition-colors duration-200`}>
        <AdBanner config={AD_CONFIG} theme={theme} />
      </div>

      <PrivacyModal isOpen={isPrivacyOpen} setIsPrivacyOpen={setIsPrivacyOpen} isLight={isLight} />
      <ExportModal isOpen={isExportModalOpen} setIsExportModalOpen={setIsExportModalOpen} isLight={isLight} mutedText={mutedText} data={fields} />
    </div>
  );
}
