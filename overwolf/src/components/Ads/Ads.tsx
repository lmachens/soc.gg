import type { OwAd } from "@overwolf/types/owads";
import { useEffect, useRef, useState } from "react";
import { Box, Text } from "@mantine/core";
import useStyles from "./Ads.styles";
import { HeartFillIcon } from "@primer/octicons-react";
import useWindowIsVisible from "../../utils/useWindowIsVisible";

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    OwAd?: typeof OwAd;
  }
}

function Ads() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [owAd, setOwAd] = useState<OwAd>();
  const isDisplayedFirstTime = useRef(true);
  const windowIsVisible = useWindowIsVisible();
  const { classes } = useStyles();

  useEffect(() => {
    function onOwAdReady() {
      if (typeof window.OwAd === "undefined" || containerRef.current === null) {
        return;
      }
      const ad = new window.OwAd(containerRef.current, {
        size: { width: 400, height: 300 },
      });
      ad.addEventListener("ow_internal_rendered", () => {
        setOwAd(ad);
      });
    }

    const script = document.createElement("script");
    script.src = "https://content.overwolf.com/libs/ads/latest/owads.min.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = onOwAdReady;

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!owAd) {
      return;
    }
    if (isDisplayedFirstTime.current) {
      isDisplayedFirstTime.current = false;
      return;
    }
    if (windowIsVisible) {
      owAd.refreshAd({});
    } else {
      owAd.removeAd();
    }
  }, [owAd, windowIsVisible]);

  return (
    <Box className={classes.container}>
      <Box ref={containerRef} className={classes.ads} />
      <Text color="dimmed" className={classes.text}>
        <HeartFillIcon /> Ads are supporting me
      </Text>
    </Box>
  );
}

export default Ads;
