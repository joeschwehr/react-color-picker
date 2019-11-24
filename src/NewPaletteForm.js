import React, { Component } from "react";
import DraggableColorList from "./DraggableColorList";
import PaletteFormNav from "./PaletteFormNav"
import ColorPickerForm from "./ColorPickerForm";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import {arrayMove} from "react-sortable-hoc";
import styles from "./styles/NewPaletteFormStyles"
import seedColors from "./seedColors"

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props){
        super(props);

        this.state = {
          open: true,
          colors: seedColors[0].colors.slice(3, 13), 
        };
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    addNewColor = (newColor, newColorName) => {
        const color = {color: newColor, name: newColorName}
        this.setState({
            colors: [...this.state.colors, color],
            newColorName: ""
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleNewPalette = (newPaletteName, emoji) => {
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
            emoji: emoji,
            colors: this.state.colors,
          }
        this.props.addNewPalette(newPalette);
        this.props.history.push("/")
    }

    deleteColor = (colorName) => {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        });
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({colors}) => ({
          colors: arrayMove(colors, oldIndex, newIndex),
        }));
      };

    clearPalette = () => {
        this.setState({
            colors: []
        })
    }

    randomColor = () => {
        let allColors = [];
        this.props.existingPalettes.forEach(palette => {
            allColors = [...allColors, ...palette.colors]
        })

       allColors.concat()
       let randNum = Math.floor(Math.random() * allColors.length);
        while(this.state.colors.includes(allColors[randNum])){
            console.log("DUP", allColors[randNum])
            randNum = Math.floor(Math.random() * allColors.length);
        }
        this.setState({colors: [...this.state.colors, allColors[randNum]]});
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        const isPaletteFull = this.state.colors.length >= this.props.maxColors 
    
        return (
            <div className={classes.root}>
                
                <PaletteFormNav 
                    open={this.state.open}
                    handleNewPalette={this.handleNewPalette}
                    existingPalettes={this.props.existingPalettes} 
                    handleDrawerOpen={this.handleDrawerOpen}
                />

                <Drawer
                    className={classes.drawer}
                    variant='persistent'
                    anchor='left'
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />

                    <div className={classes.container}>
                        <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
                        <div className={classes.buttons}>
                            <Button 
                                variant='contained' 
                                color='secondary'
                                onClick={this.clearPalette}
                                className={classes.button}
                            >
                                Clear Palette
                            </Button>
                            <Button 
                                variant='contained' color='primary' 
                                onClick={this.randomColor}                             
                                disabled={isPaletteFull}
                                className={classes.button}
                            >
                                {isPaletteFull ? "Palette Full" : "Random Color"}
                            </Button>
                        </div>
                        
                        <ColorPickerForm 
                            colors={this.state.colors} 
                            addNewColor={this.addNewColor}
                            isPaletteFull={isPaletteFull}
                        />
                    </div>

                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList 
                        deleteColor={this.deleteColor} 
                        colors={this.state.colors} 
                        axis="xy"
                        onSortEnd={this.onSortEnd}
                    />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);

