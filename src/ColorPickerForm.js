import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/ColorPickerFormStyles"

class ColorPickerForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentColor: "teal",
            newColorName: "",
        }
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
            this.props.colors.every( 
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        )

        ValidatorForm.addValidationRule('isColorUnique', value => {
            return this.props.colors.every( 
                ({ color }) => color !== this.state.currentColor
            )
        })
    }

    colorPickerChange = (newColor) => {
        const r = newColor.rgb.r;
        const g = newColor.rgb.g;
        const b = newColor.rgb.b;
        const a = newColor.rgb.a;
        const rgbaColor = `rgba(${r},${g},${b},${a})`;

        this.setState({ currentColor: rgbaColor });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        this.props.addNewColor(this.state.currentColor, this.state.newColorName)
        this.setState({
            newColorName: ""
        })
    }

    render(){
        const {isPaletteFull, classes } = this.props;

        return (
            <div>
                <ChromePicker
                    color={this.state.currentColor}
                    onChangeComplete={this.colorPickerChange}
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
                    <TextValidator 
                        className={classes.colorNameInput}
                        value={this.state.newColorName} 
                        name="newColorName"
                        margin="normal"
                        placeholder="Color Name"
                        variant="filled"
                        onChange={this.handleChange}
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={["Please enter a color name.", "Name already exists.", "Color already exists."]}
                    />
                    <Button
                        className={classes.addColor}
                        variant='contained'
                        color='primary'
                        type="submit"
                        style={isPaletteFull ? {backgroundColor: "grey" } : {backgroundColor: this.state.currentColor }}
                        disabled={isPaletteFull}
                        >
                        {isPaletteFull ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);