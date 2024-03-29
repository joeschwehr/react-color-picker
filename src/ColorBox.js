import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Link} from "react-router-dom";
import styles from "./styles/ColorBoxStyles"
import {withStyles} from "@material-ui/styles";

class ColorBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {copied: false};
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    
    changeCopyState(){
        this.setState({copied: true}, () =>{
            setTimeout(() => this.setState({copied: false}), 1000)
        })
    }
    
    render(){
        const {name, background, id, paletteId, showingFullPalette, classes} = this.props;

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className={classes.ColorBox} style={{background: background}}>
                    <div className={`${classes.copyOverlay} ${this.state.copied && classes.showOverlay}`} style={{background: background}} />
                    <div className={`${classes.copyMsg} ${this.state.copied && classes.showMesssage}`}>
                        <h1 >copied!</h1>
                        <p className={classes.copyText}>{this.props.background}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showingFullPalette && (
                        <Link to={`${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                            <span className={classes.more}>More</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);