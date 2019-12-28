/*
Kronografi TimeLine component

*/
import React, { Component } from 'react';
import { AppRegistry,  View, ScrollView, Text, StyleSheet, Animated} from 'react-native';
import TimeSpan from './TimeSpan';
import TimeLineStart from './TimeLineStart';
import TimeLineEnd from './TimeLineEnd';

export default class TimeLine extends Component {
  constructor(props){
    super(props);
    this.state={
      opacity: 100,
      totalHeight: 150,
      heightAnim: new Animated.Value(150),
    };
    this.rows={row1:[], row2:[]};




  }





  componentDidMount() {
    //test whether timespans overlap, if so, put them on separate lines

    for (var i = 0; i < this.props.timeSpans.length; i++){


      if (i>0){
        if ((this.props.timeSpans[i].latestEnd>=this.props.timeSpans[i-1].latestEnd) && (this.props.timeSpans[i].latestEnd<=this.props.timeSpans[i-1].earliestStart)){
            this.props.timeSpans[i].row=2;
            this.rows.row2.push(this.props.timeSpans[i]);
        } else {
            this.props.timeSpans[i].row=1;
            this.rows.row1.push(this.props.timeSpans[i]);

        }
      } else {
        this.props.timeSpans[i].row=1;
        this.rows.row1.push(this.props.timeSpans[i]);
      }

    }



  }

  componentDidUpdate(prevProps){
    //console.log('timeline '+this.props.title+' updated');
    //console.log('this.props.pixelUnit='+this.props.pixelUnit);
    //console.log('this.props.scopeScrollPos='+this.props.scopeScrollPos);


  }

  resizeVertical(amount){

    console.log('resizeVertical; amount='+amount);
    //this.setState({height: amount*2});
    Animated.timing(
    this.state.heightAnim,            // The animated value to drive
      {
        toValue: amount,                   // Animate to height: 200 (opaque)
        duration: 1000,              // Make it take a while
      }
    ).start();


  }



  render() {

    let { heightAnim } = this.state;

    return (

      <Animated.View style={{marginTop: 50, height: heightAnim, justifyContent: 'flex-start', alignItems:'flex-start', flexDirection:'column', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
        <Text style={{fontFamily: 'Futura', position: 'absolute', top: 10, marginBottom:10, opacity:this.props.timeLineTitlesOpacity, left:this.props.titlesMargin, fontSize: 20, color: '#fff'}}>{this.props.title}</Text>

          <View style={{flexDirection: 'row', flex: 1, borderColor:'red', borderWidth:1}}>



          {this.rows.row1.map((item, key)=>(



                  <TimeSpan
                    key={key}
                    ref={key}
                    title={item.text}
                    earliestStart={item.earliestStart}
                    latestStart={item.latestStart}
                    earliestEnd={item.earliestEnd}
                    latestEnd={item.latestEnd}
                    color={item.color}
                    width={(parseInt(item.earliestStart-item.latestEnd))*this.props.pixelUnit}
                    left={this.props.scopeWidth-(item.earliestStart*this.props.pixelUnit)}
                    row={item.row}
                    resizeParentVertical={(amount) => this.resizeVertical(amount)}
                  />

          )
          )}
          </View>
          <View style={{flexDirection: 'row', flex: 1, borderColor:'yellow', borderWidth:1}}>



          {this.rows.row2.map((item, key)=>(



                  <TimeSpan
                    key={key}
                    ref={key}
                    title={item.text}
                    earliestStart={item.earliestStart}
                    latestStart={item.latestStart}
                    earliestEnd={item.earliestEnd}
                    latestEnd={item.latestEnd}
                    color={item.color}
                    width={(parseInt(item.earliestStart-item.latestEnd))*this.props.pixelUnit}
                    left={this.props.scopeWidth-(item.earliestStart*this.props.pixelUnit)}
                    row={item.row}
                    resizeParentVertical={(amount) => this.resizeVertical(amount)}
                  />

          )
          )}


          </View>




      </Animated.View>
      )

    }
}
