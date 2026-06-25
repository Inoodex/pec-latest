"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeProvider = ({ children }) => {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="blue"
            enableSystem={false}
            themes={["blue", "green", "orange", "purple"]}
        >
            {children}
        </NextThemesProvider>
    );
};

export default ThemeProvider;
