import React from "react";
import styles from "./styles/PaletteFooterStyles"
import {withStyles} from "@material-ui/styles";

function PaletteFooter(props){
    const {classes} = props;
    return (
        <footer className={classes.footer}>
            {props.paletteName}
            <span className={classes.emoji}>
                {props.emoji}
            </span>
        </footer>
    )
}

export default withStyles(styles)(PaletteFooter);