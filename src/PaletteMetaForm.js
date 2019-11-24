import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from "emoji-mart";

class PaletteMetaForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            stage: "form",
            newPaletteName: ""
          };
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
            return this.props.existingPalettes.every( 
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        })
    }
    
    handleClickOpen = () => {
        // this.setState({ open: true });
    };

    handleClose = () => {
        this.props.hideForm();
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (emoji) => {
        this.props.handleNewPalette(this.state.newPaletteName, emoji.native);
        this.setState({
            newPaletteName: "",
            stage: ""
        })
    }

    showEmojiPicker = () => {
        this.setState({stage: "emoji"})
    }

    render() {
    return (
        <div>
            <Dialog 
                open={this.state.stage === "emoji"}  
                onClose={this.handleClose}
            >
                <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
                <Picker onSelect={this.handleSubmit}/>
            </Dialog>
            <Dialog
                open={this.state.stage === "form"}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={this.showEmojiPicker}>
                    <DialogContent>
                        <TextValidator 
                            label="Palette Name"
                            name="newPaletteName"
                            value={this.state.newPaletteName} 
                            onChange={this.handleChange}
                            fullWidth
                            margin="normal"
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Please enter a palette name.", "Palette name already exists."]}
                        />
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">Cancel</Button>
                            <Button 
                                variant="contained" 
                                color="primary"
                                type="submit"
                            >
                                Save Palette
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </ValidatorForm>
            </Dialog>   
        </div>
    );
    }
}

export default PaletteMetaForm;