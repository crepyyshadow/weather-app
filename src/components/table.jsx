import React from 'react';



const Table = ({data}) => {
    const {dt_txt:date, main:{temp_min:minTemp, temp_max:maxTemp,pressure,humidity }} = data
    return (
      <table border="2px solid red" style={{borderCollapse:"collapse"}} > 
        <tbody>
          <tr>
            <td colSpan="2" style={{backgroundColor: "orange"}}>{date}</td>
          </tr>
          <tr>
            <th colSpan="2" style={{backgroundColor: "gray"}}>Temprature</th>
          </tr>
          <tr >
            <td>Min</td>
            <td>Max</td>
          </tr>
          <tr >
            <td>{minTemp} &deg;C</td>
            <td>{maxTemp} &deg;C</td>
          </tr>
          <tr>
            <td>Pressure</td>
            <td>{pressure} &#13169;</td>
          </tr>
          <tr>
            <td>Huidity</td>
            <td>{humidity} %</td>
          </tr>
        </tbody>
      </table>
    );
  
}

export default Table;
