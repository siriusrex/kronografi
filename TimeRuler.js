/*
Kronografi main visual container component

*/
import React, { Component } from 'react';
import { AppRegistry,  View, ScrollView, Text} from 'react-native';
import TimeRulerSegment from './TimeRulerSegment';



export default class TimeRuler extends Component {
  constructor(props){
    super(props);

    //this.state={segmentSpan:50, test:false};
    this.segmentCount;
    this.segmentWidth=50;
    this.segmentSpan=50;
    this.determineSegmentWidths();


  }


  componentDidUpdate(){
    //this.segmentCount=parseInt(this.props.scopeWidth/this.segmentWidth);
    //this.segmentSpan=parseInt(this.props.scopeSpan/this.segmentCount);
    this.determineSegmentWidths();
  }

  determineSegmentWidths(){

    //console.log('at determineSegmentWidths(), this.props.scopeSpan:', this.props.scopeSpan);
    //console.log('at determineSegmentWidths(), this.props.scopeWidth:', this.props.scopeWidth);

    //console.log('at determineSegmentWidths(), this.segmentSpan:', this.segmentSpan);

    this.segmentCount=parseInt(this.props.scopeSpan/this.segmentSpan);
    //console.log('at determineSegmentWidths(), this.segmentCount:', this.segmentCount);


    this.segmentWidth=parseInt(this.props.scopeWidth/this.segmentCount);
    //console.log('at determineSegmentWidths(), this.segmentWidth:', this.segmentWidth);


    if (this.segmentWidth > 100 && this.segmentSpan > 1){
      this.segmentSpan -= 5;
      if (this.segmentSpan < 5){
        this.segmentSpan = 5;
      }
    }
    else if (this.segmentWidth < 50 && this.segmentSpan >1){
        this.segmentSpan += 5;
    }





  }


  render() {



    return (
      <View style={{width: this.props.scopeWidth, flexDirection: 'row', height:60, backgroundColor: 'black'}}>
      {Array.apply(null, Array(this.segmentCount+1)).map((item, i)=>(


          <TimeRulerSegment key={i} width={this.segmentWidth} left={this.props.scopeWidth-(i*this.segmentWidth)} id={parseInt(i*this.segmentSpan)}/>
        ))}



      </View>
    )
  }
}
