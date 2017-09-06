import React, {Component} from 'react';
import logo from './rocket.svg';
import Map from './map/Map';
import Rockets from './rocket_list/rocket_list';
import Request from 'superagent';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pads:[],
            rockets:[],
            selectedPads:[],
            loading:false
        }
        this.showInMap =  this.showInMap.bind(this);
        this.searchRocket = this.searchRocket.bind(this);
    }
    componentWillMount(){
        this.getData();
    }
    getData(term){
        this.setState({loading:true});
        console.log("get data requests");
        const padsUrl = 'https://launchlibrary.net/1.2/pad';
        const rocketsUrl = `https://launchlibrary.net/1.2/rocket?mode=verbose${term?'&name='+term:''}`;
        Request.get(rocketsUrl).then(results=>{
            let rockets = results.body.rockets;
            let pads=[];
            for (let i in rockets){
                let rocket= rockets[i];
                if(rocket.defaultPads.length){
                    pads = [...pads,...rocket.defaultPads.split(",")]
                }
            }
            let uniquePads = pads.filter((v, i, a) => a.indexOf(v) === i);
            let rocketsPadUrl = padsUrl+"?mode=summary&id="+uniquePads.join('&id=');
            this.setState({rockets,loading:false});
            return Request.get(rocketsPadUrl);
        }).then(results=>{
            let pads = results.body.pads;
            this.setState({pads});
        });
    }
    showInMap(pads){
        let selectedPads = pads.split(",");
        this.setState({selectedPads})
    }
    searchRocket(e){
        this.setState({loading:true});
       let term = e.target.value;
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = null;
        }
        this.searchTimeout = setTimeout(() => {
            this.getData(term);
        }, 500);

    }
    render() {
        return (
            <div className="rocket_app">
                <header className="app-header">
                    <div className="app-cont">
                        <img src={logo} className="app-logo" alt="Rocket Locator Api"/>
                        <h2>Rocket Locator</h2>
                    </div>
                </header>
                <section className="app-cont locator-cont">
                    <div className="locator-toolbar">
                        <input
                            type="search"
                            placeholder="Search By Rocket Name ..."
                            onChange={this.searchRocket}
                        />
                    </div>
                    <div className="locator-results">
                        <div className="rockets-list">
                            <Rockets
                                rockets={this.state.rockets}
                                showInMap={this.showInMap}
                                loading={this.state.loading}
                            />
                        </div>
                        <div className="locator-map">
                            <Map google={this.props.google}
                                 pads={this.state.pads}
                                 selectedPads={this.state.selectedPads}
                            />
                        </div>
                    </div>
                </section>
                <footer className="app-footer">
                    <div className="app-cont">
                        <p>&copy; 2017 Soroush Behmardi</p>
                    </div>
                </footer>
            </div>
        );
    }
}

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyAMA_8C_xjC3dx2350V9GuL9nrkMMj4aG4'
// })(App)
export default App;
