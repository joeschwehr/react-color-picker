import sizes from "./sizes"

export default {
    goBack: {
        margin: "0 auto",
        display: "inline-block",
        cursor: "pointer",
        marginBottom: "-3.5px",
        color: "rgba(0,0,0,.5)",
        textDecoration: "none",
        [sizes.down("xs")]: {
            marginLeft: "10px"
        }
    },
    NavBar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "6vh",
        "& span": {        
            [sizes.down("xs")]: {
                marginLeft: "10px"
            }
        }
    },
    logo: {
        marginRight: "15px",
        padding: "0 13px",
        fontSize: "22px",
        backgroundColor: "#eceff1",
        fontFamily: "'Roboto', sans-serif",
        height: "100%",
        display: "flex",
        alignItems: "center",
        "& a": {
            textDecoration: "none",
            color: "black",
        },            
        [sizes.down("md")]: {
            fontSize: "18px"
        },
        [sizes.down("xs")]: {
            display: "none",
        }
    },
    slider: {
        width: "340px",
        margin: "0 10px", 
        display: "inline-block",
        "& .rc-slider-rail": {
            height: "8px"
        },
        "& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus, .rc-slider-handle:hover": {
            backgroundColor: "green",
            outline: "none",
            border: "2px solid green",
            boxShadow: "none",
            width: "13px",
            height: "13px",
            marginLeft: "-7px",
            marginTop: "-3px",
        },
        "& .rc-slider-track": {
            backgroundColor: "transparent",
        },
        [sizes.down("sm")]: {
            width: "190px",
        },
        [sizes.down("xs")]: {
            width: "240px",
        }
    },
    select: {
        marginLeft: "auto",
        marginRight: ".7rem",
    }
}