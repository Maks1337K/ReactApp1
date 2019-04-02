import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css';

const PLACES = [
  { name: "Rivne", zip: "33000"},
  { name: "Washington", zip: "20001"},
  { name: "Los Angeles", zip: "90023"},
  { name: "Seattle", zip: "98101"}
]

class  WeatherService extends Component{
  constructor(){
    super();
    this.state = { WeatherData : null };
  }
  componentDidMount(){
    const zip = this.props.zip;
    const apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + zip +
    "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(apiURL)
      .then( res => res.json() )
      .then( json => {this.setState({ weatherData : json })} )
  }
  render(){
    const weatherData = this.state.weatherData;
    if(!weatherData) return <div>Loading...</div>
    const weather = weatherData.weather[0];
    const iconURL = "http://api.openweathermap.org/img/w/" + weather.icon + ".png";
    return(
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconURL} alt = {weatherData.description}></img>
        </h1>
        <p>
          Current temp: {((+weatherData.main.temp - 32) / 1.8).toFixed(1)}°
        </p>
        <p>
          Min temp: { ((+weatherData.main.temp_min) -32 / 1.8).toFixed(1)} °
        </p>
        <p>
          Max temp: { ((+weatherData.main.temp_max) -32 / 1.8).toFixed(1)} °
        </p>
        <p>
          Wind speed: { weatherData.wind.speed } m/s
        </p>
        <p>
          Pressure: { weatherData.main.pressure } mb
        </p>
        <p>
         Humidity: { weatherData.main.humidity } %
        </p>
      </div>
    );
  }
}

class App extends Component {

  constructor(){
    super();
    this.state = {
      activePlace: 0,
    }
  }

  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
            <WeatherService zip={PLACES[activePlace].zip} key={activePlace}></WeatherService>
            { PLACES.map( (place, index) => (
              <button className={index % 2 === 0 ? "button is-danger" : "button"} key={index} onClick={ () => {this.setState({ activePlace : index })}}>
                {place.name}
              </button>
             ))}
      </div>
    );
  }
}

export default App;

//(console.log(`Clciked ${index} button`))

//<div>{ JSON.stringify(weatherData) }</div>