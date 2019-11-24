import {DRAWER_WIDTH} from "../constants";
import sizes from "./sizes";
const drawerWidth = DRAWER_WIDTH;

export default theme => ({
    root: {
        display: "flex"
    },  
    hide: {
        display: "none"
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        height: "64px",
        alignItems: "center",
        "& h6": {
            [sizes.down("sm")]: {
                fontSize: "14px"
            }
        }
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    },
    navBtns: {
        marginRight: "1rem",
        "& a": {
            textDecoration: "none",
        },
        [sizes.down("sm")]: {
            marginRight: ".2rem"
        },
        [sizes.down("xs")]: {
            marginRight: "0"
        }
    },
    button: {
        margin: "0 .5rem",
        [sizes.down("sm")]: {
            fontSize: "12px",
            padding: ".3rem",
            margin: "0 .1rem"
        },
        [sizes.down("xs")]: {
            fontSize: "10px",
        },
    }
})