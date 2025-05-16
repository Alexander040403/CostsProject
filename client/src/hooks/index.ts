import { useState, useEffect } from "react";
export const useTheme = () => {
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme') as string) || 'dark')
    const darkTheme = 'https://cdn.jsdelivr.net/npm/@forevolve/bootstrap-dark@1.0.0/dist/css/bootstrap-dark.min.css';
    const lightTheme = 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css';

    const SetCurrentMode = (theme: string) => {
        const link = document.getElementById('theme-link') as HTMLLinkElement;
        link.href = theme ==='dark' ? darkTheme : lightTheme;
    }

    const switchTheme = () => {
        const inversMode = theme === 'dark' ?  'light' : 'dark';
        localStorage.setItem('thme', JSON.stringify(inversMode));

        SetCurrentMode(theme)

        setTheme(inversMode);
    }

    useEffect(() => {
        SetCurrentMode(theme)
    }, [theme]);

    return { switchTheme, theme}
}