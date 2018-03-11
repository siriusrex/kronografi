/*
Kronografi main application component

*/

import React, { Component } from 'react';
import { AppRegistry, ScrollView, PanResponder, View} from 'react-native';
import MainView from './MainView';
import timeLineArrayData from './Data.json';

//scopeSpan is the length in time that the TimeScope is covering
//scopeWidth is the width in pixels of the TimeScope as it is displayed

export default class Kronografi extends Component {
  constructor(props){
    super(props);
    this.state={timeLineArray: timeLineArrayData['timeLineArray'], scopeWidth:2000};

    this.scopeSpan=0;
  }



  render() {
    timeLineArrayData["timeLineArray"].map(item=>{

      //loop over start times of timeLines in timeLineArray to get earliest start time, this becomes scopeSpan
      if (parseInt(item.start)>parseInt(this.scopeSpan)) {

        this.scopeSpan=parseInt(item.start);
      }
      console.log('Kronografi.render: after running, this.scopeSpan='+this.scopeSpan);

    });

    return (
    

      <MainView timeLineArray={this.state.timeLineArray} scopeWidth={2000} scopeSpan={this.scopeSpan+10}/>

    );

  }
}
