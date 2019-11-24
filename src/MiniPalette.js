import React, {PureComponent} from "react";
import styles from "./styles/MiniPaletteStyles"
import {withStyles} from "@material-ui/styles";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class MiniPalette extends PureComponent {
    handleConfirmDelete = () => {
        this.props.confirmDelete(this.props.paletteId);
    }

    render() {
        const {classes, paletteName, emoji, colors, paletteId} = this.props;

        const miniColorBoxes = colors.map(color => {
            return <div className={classes.miniColor} style={{backgroundColor: color.color}} key={color.name}></div>
        });
    
        return (
            <div className={classes.root} >
                <DeleteForeverIcon  className={classes.deleteIcon} onClick={this.handleConfirmDelete} />
    
                <div onClick={() => this.props.goToPalette(paletteId)}>
                    <div className={classes.colors}>
                        {miniColorBoxes}
                    </div>
                    <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(MiniPalette);