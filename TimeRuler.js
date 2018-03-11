/*
Kronografi main visual container component

*/
import React, { Component } from 'react';
import { AppRegistry,  View, ScrollView, Text} from 'react-native';
import TimeRulerSegment from './TimeRulerSegment';



export default class TimeRuler extends Component {
  constructor(props){
    super(props);
    this.segmentCount=parseInt(this.props.scopeSpan/100);
    this.segmentWidth=this.props.scopeWidth/this.segmentCount;

    this.state={

    };
  }





  render() {



    /*console.log('segmentCount='+segmentCount);
    console.log('segmentWidth='+segmentWidth);*/
    return (
      <View style={{width: this.props.scopeWidth, flexDirection: 'row', height:60, backgroundColor: 'black'}}>
      {Array.apply(null, Array(6)).map((item, i)=>(


          <TimeRulerSegment key={i} width={this.segmentWidth} id={parseInt(this.props.scopeSpan-(i*100))}/>
        ))}



      </View>
    )
  }
}
