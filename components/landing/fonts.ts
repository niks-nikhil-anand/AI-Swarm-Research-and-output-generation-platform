import { DM_Sans, JetBrains_Mono, Libre_Baskerville } from "next/font/google";

export const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const libreBaskerville = Libre_Baskerville({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const landingFontVariables = [dmSans, libreBaskerville, jetbrainsMono]
  .map((f) => f.variable)
  .join(" ");
