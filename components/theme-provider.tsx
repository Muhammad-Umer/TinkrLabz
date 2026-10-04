"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider 
      {...props}
      enableSystem={props.enableSystem ?? true}
      defaultTheme={props.defaultTheme ?? "dark"}
    >
      <ThemeHydrationBypass>{children}</ThemeHydrationBypass>
    </NextThemesProvider>
  );
}

// Intercepts and isolates the runtime hydration layer from React 19 script scanning
function ThemeHydrationBypass({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return <>{children}</>;
}
