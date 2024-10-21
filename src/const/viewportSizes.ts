import { DimensionsType } from "../types/global";

export const DESKTOP_VIEWPORT_SIZES: Record<string, DimensionsType> = {
  FullHD: { width: 1920, height: 1080 },
  LaptopHD: { width: 1366, height: 768 },
  WQHD: { width: 2560, height: 1440 },
  "4KUltraHD": { width: 3840, height: 2160 },
  // MacBookRes: { width: 1440, height: 900 },
  // MidLaptop: { width: 1536, height: 864 },
  // OldStandard: { width: 1280, height: 1024 },
  // WideHD: { width: 1600, height: 900 },
  // ProMonitor: { width: 1680, height: 1050 },
  // WideScreenPro: { width: 1920, height: 1200 },
};

export const TABLET_VIEWPORT_SIZES: Record<string, DimensionsType> = {
  "iPad (7th - 9th gen)": { width: 768, height: 1024 },
  "iPad Pro 12.9 inch": { width: 1024, height: 1366 },
  "Samsung Galaxy Tab S7+": { width: 1600, height: 2560 },
  // "iPad Air (4th, 5th gen)": { width: 834, height: 1112 },
  // "Microsoft Surface Go": { width: 810, height: 1080 },
  // "Samsung Galaxy Tab S6": { width: 820, height: 1180 },
  // "iPad Pro 10.5 inch": { width: 834, height: 1194 },
  // "Samsung Galaxy Tab A 10.1": { width: 1280, height: 800 },
  // "iPad Mini (5th, 6th generation)": { width: 1536, height: 2048 },
  // "Amazon Fire HD 10": { width: 1200, height: 1920 },
};

export const MOBILE_VIEWPORT_SIZES: Record<string, DimensionsType> = {
  "iPhone 12/13/14 (non-Pro models)": { width: 390, height: 844 },
  "iPhone 11 Pro Max, iPhone XS Max": { width: 414, height: 896 },
  "Samsung Galaxy S20, Galaxy S21": { width: 360, height: 640 },
  // "iPhone 6/7/8": { width: 375, height: 667 },
  // "iPhone X, iPhone 11 Pro": { width: 375, height: 812 },
  // "iPhone 6/7/8 Plus": { width: 414, height: 736 },
  // "Google Pixel 5": { width: 360, height: 780 },
  // "Google Pixel 4a": { width: 412, height: 915 },
  // "Samsung Galaxy A51, A71": { width: 360, height: 760 },
  // "iPhone SE (1st generation)": { width: 320, height: 568 },
};
