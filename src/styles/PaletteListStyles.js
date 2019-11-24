import sizes from "./sizes";
import bg from "./bg.svg";

export default {
    "@global": {
        ".fade-exit": {
            opacity: 1
        }, 
        ".fade-exit-active": {
            opacity: 0,
            transition: "opacity 500ms ease-out",
        }

    },
    root: {
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflow: "scroll",
        // background by SVGbackgrounds.com
        backgroundColor: "#584fff",
        backgroundImage: `url(${bg})`,
    },
    container: {
        paddingBottom: "25px",
        width: "60%",
        display: "flex", 
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down("lg")]: {
            width: "70%",
        },
        [sizes.down("md")]: {
            width: "90%",
        },
        [sizes.down("sm")]: {
            width: "75%",
        },
        [sizes.down("xs")]: {
            width: "70%",
        },
    },
    nav: {
        display: "flex", 
        width: "100%",
        justifyContent: "space-between",
        color: "white", 
        alignItems: "center",
        "& a": {
            paddingTop: "5px",
            color: "white"
        }
    },
    palettes: {
        boxSizing : "border-box", 
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "2.2rem",
        [sizes.down("md")]: {
            gridGap: "1.7rem",
        },
        [sizes.down("sm")]: {
            gridTemplateColumns: "repeat(2, 50%)",
            gridGap: "1.5rem",
        },
        [sizes.down("xs")]: {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: "1rem",
        },
    },
    heading: {
        fontSize: "2rem",
    },
}