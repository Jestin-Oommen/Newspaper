"use client";
import { useEffect } from "react";

const GoogleAd = ({
  adSlot,
  style = { display: "block", width: "100%", height: "100px" },
}: {
  adSlot: string;
  style?: React.CSSProperties;
}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdsbyGoogle error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-1481167001425305" // 👈 Replace with your AdSense ID
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default GoogleAd;
