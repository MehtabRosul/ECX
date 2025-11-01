import * as React from "react";

export function useBackgroundImageWithFallback(primaryUrl?: string, fallbackUrl: string = "/web-app-manifest-512x512.png", timeoutMs: number = 6000) {
  const [resolvedUrl, setResolvedUrl] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (!primaryUrl) {
      setResolvedUrl(undefined);
      return;
    }

    let didCancel = false;
    const img = new Image();
    const timer = window.setTimeout(() => {
      if (didCancel) return;
      setResolvedUrl(fallbackUrl);
    }, timeoutMs);

    img.onload = () => {
      if (didCancel) return;
      window.clearTimeout(timer);
      setResolvedUrl(primaryUrl);
    };
    img.onerror = () => {
      if (didCancel) return;
      window.clearTimeout(timer);
      setResolvedUrl(fallbackUrl);
    };
    img.referrerPolicy = "no-referrer";
    img.decoding = "async";
    img.sizes = "100vw";
    img.src = primaryUrl;

    return () => {
      didCancel = true;
      window.clearTimeout(timer);
    };
  }, [primaryUrl, fallbackUrl, timeoutMs]);

  return resolvedUrl;
}


