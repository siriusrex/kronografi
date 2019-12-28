/*
Kronografi main visual container component

*/
import React, { Component } from 'react';
import { AppRegistry,  View, ScrollView, Text} from 'react-native';
import TimeRulerSegment from './TimeRulerSegment';



export default class TimeRuler extends Component {
  constructor(props){
    super(props);




    //this.segmentSpan*this.props.pixelUnit;

  }


  componentDidUpdate(){
    //this.segmentCount=parseInt(this.props.scopeWidth/this.segmentWidth);
    //this.segmentSpan=parseInt(this.props.scopeSpan/this.segmentCount);

  }


  render() {



    //console.log('at TimeRuler render, this.segmentCount='+this.segmentCount);
    //console.log('this.props.scopeSpan='+this.props.scopeSpan);
    //console.log('this.segmentSpan='+this.segmentSpan);
    //console.log('this.segmentWidth='+this.segmentWidth);
    this.segmentSpan=50;

    this.segmentCount=parseInt(this.props.scopeSpan/this.segmentSpan);
    this.segmentWidth=parseInt(this.props.scopeWidth/this.segmentCount);

    return (
      <View style={{width: this.props.scopeWidth, flexDirection: 'row', height:60, backgroundColor: 'black'}}>
      {Array.apply(null, Array(this.segmentCount+1)).map((item, i)=>(


          <TimeRulerSegment key={i} width={this.segmentWidth} left={this.props.scopeWidth-(i*this.segmentWidth)} id={parseInt(i*this.segmentSpan)}/>
        ))}



      </View>
    )
  }
}
