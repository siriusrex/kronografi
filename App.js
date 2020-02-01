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
    this.state={timeLineArray: timeLineArrayData['timeLineArray']};

    this.scopeSpan=1;
    this.timeTester();
  }

  timeTester(){


    var oneBillionYears=3.1556952e16;
    var oneMillionYears=3.1556952e13;
    var oneMillenium=3.1556952e10;
    var oneCentury=3.1556952e9;
    var oneDecade=3.1556952e8;
    var oneYear=3.1556952e7;
    var oneMonth=2.629746e6;
    var oneWeek=6.048e5;
    var oneHour=3.6e4;
    var oneMinute=60;
    var oneSecond=1;
    var oneMillisecond=1e-3;
    var oneMicrosecond=1e-6;
    var oneNanosecond=1e-9;
    var onePicosecond=1e-10;

    console.log('oneBillionYears:', oneBillionYears);

    console.log('oneMillionYears:', oneMillionYears);
    console.log('oneMillenium:', oneMillenium);
    console.log('oneCentury:', oneCentury);
    console.log('oneDecade:', oneDecade);
    console.log('oneYear:', oneYear);
    console.log('oneMonth:', oneMonth);
    console.log('oneWeek:', oneWeek);
    console.log('oneHour:', oneHour);
    console.log('oneMinute:', oneMinute);
    console.log('oneSecond:', oneSecond);
    console.log('oneMillisecond:', oneMillisecond);
    console.log('oneMicrosecond:', oneMicrosecond);
    console.log('oneNanosecond:', oneNanosecond);
    console.log('onePicosecond:', onePicosecond);
  }


  render() {
    timeLineArrayData["timeLineArray"].map(item=>{

      //loop over start times of timeLines in timeLineArray to get earliest start time, this becomes scopeSpan
      if (parseInt(item.start)>parseInt(this.scopeSpan)) {

        this.scopeSpan=parseInt(item.start);
      }

    });
    //console.log('Kronografi.render: after running, this.scopeSpan='+this.scopeSpan);

    return (


      <MainView timeLineArray={this.state.timeLineArray} scopeSpan={this.scopeSpan+10}/>

    );

  }
}
