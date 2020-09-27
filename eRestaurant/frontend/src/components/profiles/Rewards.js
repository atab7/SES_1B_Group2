
import React from 'react';
import Background from './images/defaultBackground.jpg';

var backgroundImg = {
    width: "100%",
    height: "900px",
    backgroundImage: `url(${Background})`
  };

export default class Rewards extends React.Component {
    constructor(props){
      super();
    }
    render(){
        return(
            <div style={ backgroundImg }>

            </div>
        )
    }
}  