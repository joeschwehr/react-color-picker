import React, {Component} from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import { Link } from "react-router-dom";
import {withStyles} from "@material-ui/styles";
import styles from "./styles/NavBarStyles";

class NavBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            format: "hex",
            open: false,
        }
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar =this.closeSnackbar.bind(this);
    }

    handleFormatChange(e){
        this.setState({
            format: e.target.value,
            open: true
        })
        this.props.handleChange(e);
    }

    closeSnackbar(){
        this.setState({open: false})
    }

    render() {
        const {classes} = this.props;

        return (
            <nav className={classes.NavBar}>
                <div className={classes.logo}>
                    <Link to="/">reactcolorpicker</Link>
                </div>
                {this.props.showingAllColors ? 
                    <div>
                        <span>Level: {this.props.level}</span>
                        <div className={classes.slider}>
                            <Slider defaultValue={this.props.level} min={100} max={900} step={100} onAfterChange={this.props.changeLevel}/>
                        </div>
                    </div>
                :
                    <div>
                        <Link to={this.props.goBack} className={classes.goBack}>
                            <span>GO BACK</span>
                        </Link>
                    </div>
                }
                <div className={classes.select}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.format}
                        onChange={this.handleFormatChange}
                        >
                        <MenuItem value="hex">HEX: #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB: rgb(255, 255, 255)</MenuItem>
                        <MenuItem value="rgba">RGBA: rgba(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar   
                    anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                    open={this.state.open}
                    autoHideDuration={2000}
                    message={<span id="message-id">Format Updated to {this.state.format.toUpperCase()} </span>}
                    onClose={this.closeSnackbar}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    action={[
                        <IconButton onClick={this.closeSnackbar} 
                                    color="inherit" 
                                    key="close" 
                                    aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </nav>
        )
    }
}

export default withStyles(styles)(NavBar);