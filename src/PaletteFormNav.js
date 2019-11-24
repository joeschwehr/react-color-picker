import React, { Component } from "react";
import classNames from "classnames";
import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PaletteMetaForm from "./PaletteMetaForm";
import styles from "./styles/PaletteFormNavStyles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

class PaletteFormNav extends Component{
    constructor(props){
        super(props);
        this.state = {
            newPaletteName: "",
            formShowing: false,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showForm = () => {
        this.setState({formShowing: true})
    }

    hideForm = () => {
        this.setState({formShowing: false})
    }

    render(){
        const {classes, open} = this.props;

        return (
            <div className={classes.root}>
                <AppBar
                    color="default"
                    position='fixed'
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >

                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={this.props.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <ChevronRightIcon/>
                        </IconButton>
                        <Typography variant='h6' color='inherit' noWrap>
                            Create a Palette
                        </Typography>
                    </Toolbar>

                    <div className={classes.navBtns}>
                        
                        <Link to="/">
                            <Button 
                                className={classes.button}
                                variant="contained" 
                                color="secondary"
                                type="submit"
                            >
                                Go Back
                            </Button>
                        </Link>
                        <Button 
                            className={classes.button}
                            variant="contained" 
                            color="primary" 
                            onClick={this.showForm}
                        >
                            Save  
                        </Button>

                        {this.state.formShowing && <PaletteMetaForm 
                            existingPalettes={this.props.existingPalettes} 
                            handleNewPalette={this.props.handleNewPalette}
                            hideForm={this.hideForm}
                            />
                        }

                    </div>

                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
