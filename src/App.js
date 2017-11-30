import React, { Component } from 'react';
import {
  PageHeader,
  Table
} from 'react-bootstrap';

class App extends Component {
  constructor(props){
    super(props)
    let today = new Date()
    this.state = {
      apiKey: "jWgEqjs0ql2ddkCyOybksitDDwO6PgiEoHH27PcZ",
      startDate: `${today.getFullYear()}-${today.getMonth() +1}-${today.getDate()}`,
      apiUrl: "https://api.nasa.gov/neo/rest/v1/feed",
      asteroids: []
    }
  }
  componentWillMount(){
    fetch(`${this.state.apiUrl}?start_date=${this.state.startDate}&api_key=${this.state.apiKey}`)
    .then((rawResponse)=>{
      return rawResponse.json()
    }).then((parsedResponse) => {
      let neoData = parsedResponse.near_earth_objects
      let newAsteroids = []
      Object.keys(neoData).forEach((date)=>{
        neoData[date].forEach((asteroid) =>{
          newAsteroids.push({
            id: asteroid.neo_reference_id,
            name: asteroid.name,
            date: asteroid.close_approach_data[0].close_approach_date,
            diameterMin: asteroid.estimated_diameter.feet.estimated_diameter_min.toFixed(0),
            diameterMax: asteroid.estimated_diameter.feet.estimated_diameter_max.toFixed(0),
            closestApproach: asteroid.close_approach_data[0].miss_distance.miles,
            velocity:
            parseFloat(asteroid.close_approach_data[0].relative_velocity.miles_per_hour).toFixed(0),
            distance: asteroid.close_approach_data[0].miss_distance.miles
            })
          })
        })
        this.setState({asteroids: newAsteroids})
      })
    }

  render() {
    return (
      <div>
        <PageHeader className='header'>
          Welcome stargazers!
        </PageHeader>
        <div className="image-content"></div>
        <div className="table-content">
          <h2>List of closest Meteors to Earth:</h2>
          <Table>
            <thead className="border_styles">
              <tr>
                <th>Name</th>
                <th>Estimated Diameter (feet)</th>
                <th>Date of Closest Approach</th>
                <th>Distance (miles)</th>
                <th>Velocity (miles/hour)</th>
              </tr>
            </thead>
            <tbody className="border_styles">
              {this.state.asteroids.map((asteroid)=>{
                return(
                  <tr key={asteroid.id}>
                    <td>{asteroid.name}</td>
                    <td>{asteroid.diameterMin} - {asteroid.diameterMax}</td>
                    <td>{asteroid.date}</td>
                    <td>{asteroid.distance}</td>
                    <td>{asteroid.velocity}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;
