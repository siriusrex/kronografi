/*
Kronografi TimeRow component

*/
import React, { Component } from 'react';
import { AppRegistry,  View, ScrollView, Text, StyleSheet, Animated} from 'react-native';
import TimeSpan from './TimeSpan';
import TimeLineStart from './TimeLineStart';
import TimeLineEnd from './TimeLineEnd';

export default class TimeRow extends Component {
  constructor(props){
    super(props);
    this.state={
      opacity: 1,
      heightAnim: new Animated.Value(100)
    };


  }

  componentDidMount() {
    this.calculateLeftMargins();
  }

  componentDidUpdate() {
    this.calculateLeftMargins();
  }

  calculateLeftMargins() {
    this.widths=[];
    //console.log('TimeRow calculateLeftMargins: this.props.spans=',this.props.spans);

    for (let j=0; j<this.props.spans.length; j++) {

      //work out width of each timeSpan and add to array this.widths
      var thisSpan=this.props.spans[j];
      var myWidth=parseFloat(thisSpan.earliestStart-thisSpan.latestEnd)*this.props.pixelUnit;
      console.log('myWidth='+myWidth);
      this.widths.push(myWidth);
      if (!isNaN(myWidth)) {
        this.props.spans[j].pixelWidth=parseInt(myWidth);
      }
      else {
        this.props.spans[j].pixelWidth=100;
      }
    }
    console.log('this.props.spans[0].pixelWidth=',this.props.spans[0].pixelWidth);



    this.realPos=[];
    for (let i = 0; i < this.props.spans.length; i++){
      console.log('TimeRow for loop: loop '+i);
      var thisSpan=this.props.spans[i];


      //work out relative position of each timeSpan and add to array this.realPos
      var myRealPos=this.widths[i]+thisSpan.myLeftPos-this.widths.reduceRight(function(a, b, index) {
        if (index <= i) {
          return a+b;
        } else {
            return 0;
        }
      }, 0);
      this.realPos.push(myRealPos);

    }//end for loop
    console.log('this.realPos=', this.realPos);
  }


  render() {

    let { heightAnim } = this.state;

    return (

      <View ref="row1" style={{
        position:'relative',
        flexDirection: 'row',
        height: 'auto',
        marginTop:10,
        borderColor:'red',
        borderWidth:1
      }}>



      {this.props.spans.map((item, key)=>(



              <TimeSpan
                key={'timeSpan_'+key}
                ref={key}
                title={item.text}
                earliestStart={item.earliestStart}
                latestStart={item.latestStart}
                earliestEnd={item.earliestEnd}
                latestEnd={item.latestEnd}
                images={item.images}
                color={item.color}
                width={item.pixelWidth}
                startErrorBarWidth={(parseInt(item.earliestStart-item.latestStart))*this.props.pixelUnit}
                endErrorBarWidth={(parseInt(item.earliestEnd-item.latestEnd))*this.props.pixelUnit}

                left={0}/*this.realPos[key]*/
                row={item.row}

              />

      )
      )}
      </View>
    )

  }

}
