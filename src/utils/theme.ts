import { Theme } from "@mui/material/styles";

export const getSelectTheme = (theme: Theme) => {
    const isDark = theme.palette.mode === "dark";

    return {
        danger: "red",
        dangerLight: theme.palette.grey[200],
        neutral0: theme.palette.background.default,
        neutral5: "orange",
        neutral10: "pink",
        neutral20: theme.palette.grey["A200"],
        neutral30: theme.palette.text.primary,
        neutral40: theme.palette.text.primary,
        neutral50: theme.palette.grey["A200"],
        neutral60: isDark ? "white" : theme.palette.text.primary,
        neutral70: isDark ? "white" : theme.palette.text.primary,
        neutral80: theme.palette.text.primary,
        neutral90: "pink",
        primary: theme.palette.primary.main,
        primary25: theme.palette.background.paper,
        primary50: theme.palette.background.paper,
        primary75: theme.palette.background.paper
    };
};
