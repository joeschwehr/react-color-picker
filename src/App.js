import React from 'react';
import {Route, Switch } from "react-router-dom"; 
import seedColors from "./seedColors";
import Palette from './Palette';
import Page from "./Page"
import {generatePalette} from "./colorHelpers"
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import {TransitionGroup, CSSTransition} from "react-transition-group"

class App extends React.Component {
  constructor(props){
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palettes: savedPalettes || seedColors
    }

    this.findPalette = this.findPalette.bind(this)
    this.addNewPalette = this.addNewPalette.bind(this)
    this.removePalette = this.removePalette.bind(this)
  }

  findPalette(id) {
    return this.state.palettes.find( (palette) => {
      return palette.id === id;
    })
  }

  addNewPalette(newPalette){
    this.setState({palettes: [...this.state.palettes, newPalette]},
        this.syncLocalStorage
      )
  }

  removePalette(paletteId) {
    const newPaletteList = this.state.palettes.filter(palette => palette.id !== paletteId) 
    this.setState({palettes: newPaletteList},
      this.syncLocalStorage
    )
  }

  syncLocalStorage(){
    //save palette to local storage
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes))
  }

  render() {
    return (
      <Route render={({location}) => {
        return (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={300}>
              <Switch location={location}>
                <Route exact path="/palette/new" 
                  render={(routeProps) => 
                    <Page>
                      <NewPaletteForm 
                        existingPalettes={this.state.palettes}
                        addNewPalette={this.addNewPalette} 
                        {...routeProps} />
                    </Page>
                  }/>
                <Route exact path="/" 
                  render={(routeProps) => 
                    <Page>
                      <PaletteList 
                        {...routeProps} 
                        palettes={this.state.palettes} 
                        removePalette={this.removePalette}
                      /> 
                    </Page>
                }/>
                <Route exact path="/palette/:id"
                  render={routeProps => 
                    <Page>
                        <Palette 
                          palette={generatePalette(this.findPalette(routeProps.match.params.id))} 
                          paletteId={routeProps.match.params.id}
                        />
                    </Page>
                }/> 
                <Route exact path="/palette/:paletteId/:colorId" render={routeProps => 
                  <Page>
                    <SingleColorPalette 
                      palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} 
                      colorId={routeProps.match.params.colorId}/>
                  </Page>
                }/>
                <Route 
                  render={(routeProps) => 
                    <Page>
                      <PaletteList 
                        {...routeProps} 
                        palettes={this.state.palettes} 
                        removePalette={this.removePalette}
                      /> 
                    </Page>
                }/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )
      }}/>

    );
  }
}

export default App;
