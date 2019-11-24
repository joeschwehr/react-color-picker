import React from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles"
import {withStyles} from "@material-ui/styles";

class Palette extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            level: 500,
            format: "hex",
        }
        this.changeLevel = this.changeLevel.bind(this);
        this.changeColorFormat = this.changeColorFormat.bind(this);
    }

    changeLevel(newLevel) {
        this.setState({level: newLevel})
    }

    changeColorFormat(e) {
        this.setState({format: e.target.value});
    }

    render(){
        const {classes} = this.props;

        const colorBoxes = this.props.palette.colors[this.state.level].map(color => (
            <ColorBox 
                background={color[this.state.format]} 
                name={color.name} 
                id={color.id} 
                key={color.id} 
                paletteId={this.props.paletteId}
                showingFullPalette={true}
            />
        ))

        return (
            <div className={classes.Palette}>
                <NavBar 
                    level={this.state.level} 
                    changeLevel={this.changeLevel} 
                    handleChange={this.changeColorFormat} 
                    showingAllColors={true}
                />
                <div className={classes.PaletteColors}>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={this.props.paletteId} emoji={this.props.palette.emoji}/>
            </div>
        )
    }
}
export default withStyles(styles)(Palette);