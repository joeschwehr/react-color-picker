import React from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import {Link} from "react-router-dom";
import styles from "./styles/PaletteStyles"
import {withStyles} from "@material-ui/styles";

class SingleColorPalette extends React.Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId)
        
        
        
        
        this.state = {format: "hex"}; //this should come in from the parent




        this.changeFormat = this.changeFormat.bind(this)
    }

    gatherShades(palette, colorId){
        let shades = [];
        for(let index in palette.colors){
            for(let key in palette.colors[index]){
                const color = palette.colors[index][key]
                if(color.id === colorId){
                    shades.push(color)
                }
            }
        }
        return shades.slice(1)
    }

    changeFormat(e){
        this.setState({ format: e.target.value})
    }

    render(){
        const {classes} = this.props;
        const colorBoxes = this._shades.map(color => (
            <ColorBox 
                key={color.name} 
                name={color.name} 
                background={color[this.state.format]} 
                showingFullPalette={false}
            />
        ))
        return (
            <div className={classes.Palette}>
                <NavBar handleChange={this.changeFormat} showingAllColors={false} goBack={`/palette/${this.props.palette.id}`}/>
                <div className={classes.PaletteColors}>
                    {colorBoxes}
                    <div className={classes.goBack}> 
                        <Link to={`/palette/${this.props.palette.id}`}>
                            Go Back
                        </Link>
                    </div>
                </div>
                <PaletteFooter paletteName={this.props.palette.id} emoji={this.props.palette.emoji}/>
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);