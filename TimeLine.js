/*
Kronografi TimeLine component

*/
import React, { Component } from 'react';
import { AppRegistry,  View, ScrollView, Text, StyleSheet} from 'react-native';
import TimeSpan from './TimeSpan';
import TimeLineStart from './TimeLineStart';
import TimeLineEnd from './TimeLineEnd';

export default class TimeLine extends Component {
  constructor(props){
    super(props);
    this.pixelUnit=this.props.scopeWidth/this.props.scopeSpan;
    this.topTimeSpanRow=[];
    this.bottomTimeSpanRow=[];
    this.state={opacity: 100};

    for (var i = 0; i < this.props.timeSpans.length; i++){


      if (i>0){
        if ((this.props.timeSpans[i].latestEnd>=this.props.timeSpans[i-1].latestEnd) && (this.props.timeSpans[i].latestEnd<=this.props.timeSpans[i-1].earliestStart)){
            this.bottomTimeSpanRow.push(this.props.timeSpans[i]);

        } else {
            this.topTimeSpanRow.push(this.props.timeSpans[i]);
        }
      } else {
        this.topTimeSpanRow.push(this.props.timeSpans[i]);
      }

    }



  }





  componentDidMount() {
    //Define some variable in your component

  }


  render() {


    return (

      <View style={{marginTop: 50, height: 200, justifyContent: 'flex-start', alignItems:'flex-start', flexDirection:'column', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
        <Text style={{fontFamily: 'Futura', marginTop: 10, marginBottom:10, opacity:this.props.timeLineTitlesOpacity, marginLeft:this.props.titlesMargin, fontSize: 20, color: '#fff'}}>{this.props.title}</Text>

          <View style={{flexDirection: 'row', flex: 1}}>



          {this.topTimeSpanRow.map((item, key)=>(
                  <TimeSpan key={key} title={item.text} earliestStart={item.earliestStart} latestStart={item.latestStart} earliestEnd={item.earliestEnd} latestEnd={item.latestEnd} color={item.color} width={(parseInt(item.earliestStart-item.latestEnd))*this.pixelUnit} left={this.props.scopeWidth-(item.earliestStart*this.pixelUnit)}/>
            )

          )}


          </View>

          <View style={{flexDirection:'row', flex: 1}}>



          {this.bottomTimeSpanRow.map((item, key)=>(
                  <TimeSpan key={key} title={item.text} earliestStart={item.earliestStart} latestStart={item.latestStart} earliestEnd={item.earliestEnd} latestEnd={item.latestEnd} color={item.color} width={(parseInt(item.earliestStart-item.latestEnd))*this.pixelUnit} left={this.props.scopeWidth-(item.earliestStart*this.pixelUnit)}/>
            )

          )}


          </View>


      </View>
      )

    }
}
