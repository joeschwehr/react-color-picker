import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {withStyles} from "@material-ui/styles";
import styles from "./styles/PaletteListStyles";
import {Link} from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

class PaletteList extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
            clickedPaletteId: ""
        };
        this.goToPalette = this.goToPalette.bind(this);
    }
    
    goToPalette(id){
        this.props.history.push(`/palette/` + id)
    }

    handleClickOpen = (paletteId) => {
        this.setState({
            open: true,
            clickedPaletteId: paletteId
        });
    };

    onClose = value => {
        if(value === "Delete"){
            this.props.removePalette(this.state.clickedPaletteId)
        }
        this.setState({ 
            open: false,
            clickedPaletteId: "",
        });
    };

    handleListItemClick = value => {
        this.onClose(value);
    };


    render() {
        const {classes, palettes} = this.props;

        const allPalettes = palettes.map((palette) => {
            return (
                <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                    <MiniPalette 
                        {...palette} 
                        goToPalette={this.goToPalette} 
                        key={palette.id}
                        paletteId={palette.id}
                        confirmDelete={this.handleClickOpen}
                    />
                </CSSTransition>
            )
        })
        return (
            <div className={classes.root}>

                <Dialog open={this.state.open} onClose={this.onClose} aria-labelledby="delete-dialog-title">
                    <DialogTitle id="simple-dialog-title">Confirm Delete Palette</DialogTitle>
                    <div>
                        <List>
                            <ListItem button onClick={() => this.handleListItemClick("Delete")} key={"Delete"}>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar} style={{backgroundColor: blue[100], color: blue[600]}}>
                                        <CheckIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={"Delete"} />
                            </ListItem>
                            <ListItem button onClick={() => this.handleListItemClick("Cancel")} key={"Cancel"}>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar} style={{backgroundColor: red[100], color: red[600]}}>
                                        <CloseIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={"Cancel"} />
                            </ListItem>
                            
                        </List>
                    </div>
                </Dialog>               


                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {allPalettes}
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);