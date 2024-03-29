import chroma from "chroma-js";
import sizes from "./sizes"

export default {
    ColorBox: {
        width: "20%",
        height: props => props.showingFullPalette ? "25%": "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover button":{
            opacity: "1",
        },
        [sizes.down("lg")]: {
            width: props => props.showingFullPalette ? "25%": "33.3%",
            height: props => props.showingFullPalette ? "20%": "33.3%"
        },
        [sizes.down("md")]: {
            width: props => props.showingFullPalette ? "50%": "50%",
            height: props => props.showingFullPalette ? "10%": "20%"
        },
        [sizes.down("xs")]: {
            width: props => props.showingFullPalette ? "100%": "100%",
            height: props => props.showingFullPalette ? "5%": "10%",
        }
    },
    copyText: {
        color: props => chroma(props.background).luminance() >= .6 ? "black" : "white"
    },
    colorName: {
        color: props => chroma(props.background).luminance() >= .1 ? "black" : "white"
    },
    copyButton: {
        color: props => chroma(props.background).luminance() >= .6 ? "rgba(0,0,0,.5)" : "white",
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none", 
        background: "rgba(255,255,255,.3)", 
        fontSize: "1rem",
        lineHeight: "30px", 
        textTransform: "uppercase",
        border: "none",
        textDecoration: "none",
        opacity: 0
    },
    more: {
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        right: "0px",
        bottom: "0px",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase",
        color: props => chroma(props.background).luminance() >= .6 ? "rgba(0,0,0,.5)" : "white"
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        "@media (max-width: 500px)": {
            fontSize: "12px"
        }
    },
    copyOverlay: {
        opacity: "0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transition: "transform .6s ease-in-out",
        transform: "scale(.1)",
    },
    showOverlay: {
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
        position: "absolute",
    },
    copyMsg: {
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "4rem",
        transform: "scale(.1)",
        opacity: "0",
        color: "white",
        "& h1":{
            fontWeight: "400",
            textShadow: "1px 2px rgba(0, 0, 0, 0.486)",
            background: "rgba(255,255,255,.2)",
            width: "100%",
            textAlign: "center",
            marginBottom: "0",
            padding: "1rem",
            textTransform: "uppercase",
            [sizes.down("xs")]: {
                fontSize: "6rem"
            }
        },
        "& p":{
            fontSize: "2rem",
            fontWeight: "200",
        }
    },
    showMesssage: {
        opacity: "1",
        transform: "scale(1)",
        zIndex: "25",
        transition: "all .4s ease-in-out", 
        transitionDelay: ".05s",
    },
}