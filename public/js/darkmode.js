document.addEventListener("DOMContentLoaded", function () {

    const themeSwitch = document.getElementById('theme-switch');
    const htmlTag = document.documentElement;

    if (!themeSwitch) {
        console.error("Botão de alternância não encontrado!");
        return;
    }

    let theme = localStorage.getItem('theme') || 'auto';

    const applyTheme = (mode) => {
        if (mode === "dark") {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            console.log("Modo escuro");
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            console.log("Modo claro");
        }
    };

    if (theme === "dark") {
        applyTheme("dark");
    } else {
        applyTheme("light");
    }

    themeSwitch.addEventListener("click", () => {
        let theme = localStorage.getItem('theme');
        applyTheme(theme === "dark" ? "light" : "dark");
    });
});