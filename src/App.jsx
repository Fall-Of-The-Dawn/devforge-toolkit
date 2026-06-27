import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Generator from "./components/Generator";
import CssConverter from "./components/CssConverter";
import Sidebar from "./components/Sidebar";
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
import ColorContrastChecker from "./components/ColorContrastChecker";
import TimestampConverter from "./components/TimestampConverter";
import UuidGenerator from "./components/UuidGenerator";
import MarkdownPreview from "./components/MarkdownPreview";
import PasswordGenerator from "./components/PasswordGenerator";
import CssMinifier from "./components/CssMinifier";
import Tokenizer from "./components/Tokenizer";
import Footer from "./components/Footer";
import { ExportModal, PrivacyModal } from "./components/Modals";
import SEOHead from "./components/SEOHead";
import { DATA_TYPE_PRESETS, AD_CONFIG, THEME_VARS } from "./utils/constants";

export default function App() {
  const [activeTool, setActiveTool] = useState("home");
  const [theme, setTheme] = useState(() => localStorage.getItem("omnistack-theme") || "dark");
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
    localStorage.setItem("omnistack-theme", t);
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
    <div className={`h-screen flex flex-col font-sans transition-colors duration-300 ${isLight ? "bg-[#fafafa] text-[#1a1a1a]" : "bg-[#050505] text-[#e8e8e8]"}`}>
      <SEOHead toolId={activeTool} />
      <Header
        activeTool={activeTool} setActiveTool={setActiveTool}
        isLight={isLight} setTheme={handleSetTheme}
        setIsPrivacyOpen={setIsPrivacyOpen}
        mutedText={mutedText} mutedText2={mutedText2} activeBtn={activeBtn}
      />

      <div className="flex-1 min-h-0 overflow-hidden">
        {activeTool === "home" && (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden h-full">
            <Home setActiveTool={setActiveTool} isLight={isLight} />
          </div>
        )}

        {activeTool !== "home" && (
          <>
            <div className="flex-1 flex flex-row min-h-0 overflow-hidden h-full">
              <div className="flex-1 overflow-auto flex flex-col min-h-0">

              {activeTool === "generator" && (
                <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-auto md:overflow-hidden">
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
                <div className="flex-1 flex flex-col min-h-0">
                  <CssConverter
                    isLight={isLight} mutedText={mutedText}
                    activeBtn={activeBtn} inactiveBtn={inactiveBtn}
                    hoverBorder={hoverBorder} cardBg={cardBg} codeBg={codeBg}
                  />
                </div>
              )}

              {activeTool === "text-diff" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <TextDiff
                    isLight={isLight} mutedText={mutedText}
                    activeBtn={activeBtn} inactiveBtn={inactiveBtn}
                  />
                </div>
              )}

              {activeTool === "json-formatter" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <JsonFormatter isLight={isLight} mutedText={mutedText} />
                </div>
              )}

              {activeTool === "regex-tester" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <RegexTester isLight={isLight} mutedText={mutedText} />
                </div>
              )}

              {activeTool === "base64" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <Base64Tool isLight={isLight} mutedText={mutedText} />
                </div>
              )}

              {activeTool === "url-encoder" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <UrlEncoder isLight={isLight} mutedText={mutedText} />
                </div>
              )}

              {activeTool === "jwt-decoder" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <JwtDecoder isLight={isLight} mutedText={mutedText} />
                </div>
              )}

              {activeTool === "layout" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <FlexboxGridPlayground isLight={isLight} mutedText={mutedText} />
                </div>
              )}

              {activeTool === "gradient" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <GradientGenerator isLight={isLight} mutedText={mutedText} />
                </div>
              )}

              {activeTool === "box-shadow" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <BoxShadowGenerator isLight={isLight} mutedText={mutedText} />
                </div>
              )}

              {activeTool === "qr-code" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <QrCodeGenerator isLight={isLight} mutedText={mutedText} />
                </div>
              )}

              {activeTool === "lorem" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <LoremIpsumGenerator isLight={isLight} mutedText={mutedText} />
                </div>
              )}

              {activeTool === "html-preview" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <HtmlPreviewEditor isLight={isLight} mutedText={mutedText} />
                </div>
              )}

              {activeTool === "color-contrast" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <ColorContrastChecker isLight={isLight} mutedText={mutedText} />
                </div>
              )}

              {activeTool === "timestamp" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <TimestampConverter isLight={isLight} mutedText={mutedText} />
                </div>
              )}

              {activeTool === "uuid" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <UuidGenerator isLight={isLight} mutedText={mutedText} />
                </div>
              )}

              {activeTool === "markdown" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <MarkdownPreview isLight={isLight} mutedText={mutedText} />
                </div>
              )}

              {activeTool === "password" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <PasswordGenerator isLight={isLight} mutedText={mutedText} />
                </div>
              )}

              {activeTool === "css-minifier" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <CssMinifier isLight={isLight} mutedText={mutedText} />
                </div>
              )}

              {activeTool === "tokenizer" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <Tokenizer isLight={isLight} mutedText={mutedText} activeBtn={activeBtn} inactiveBtn={inactiveBtn} />
                </div>
              )}

            </div>

            <Sidebar isLight={isLight} mutedText={mutedText} adConfig={AD_CONFIG} theme={theme} setActiveTool={setActiveTool} />
          </div>

          <Footer isLight={isLight} setActiveTool={setActiveTool} />
        </>
      )}
      </div>

      <PrivacyModal isOpen={isPrivacyOpen} setIsPrivacyOpen={setIsPrivacyOpen} isLight={isLight} />
      <ExportModal isOpen={isExportModalOpen} setIsExportModalOpen={setIsExportModalOpen} isLight={isLight} mutedText={mutedText} data={fields} />
    </div>
  );
}
