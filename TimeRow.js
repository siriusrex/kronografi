/*
Kronografi TimeRow component

*/
import React, { Component } from 'react';
import { AppRegistry,  View, ScrollView, Text, StyleSheet, Animated} from 'react-native';
import TimeSpan from './TimeSpan';


/* required props
spans
pixelUnit
scopeWidth

*/

export default class TimeLine extends Component {
  constructor(props){
    //console.log('TimeRow -> constructor running');
    super(props);

    this.rows={row1:[], row2:[]};
    this.realPos=[0,0,0];



  }
  componentDidMount() {

  }

  componentDidUpdate() {

  }

  calculateLeftMargins() {
    //console.log('TimeRow -> calculateLeftMargins running');
    this.widths=[];
    this.realPos=[];
    var allPreviousWidths=0;
    for (let j=0; j<this.props.spans.length; j++) {
      //console.log('TimeRow -> make widths array loop')
      //work out width of each timeSpan and add to array this.widths
      var thisSpan=this.props.spans[j];
      var myWidth=parseFloat((thisSpan.earliestStart-thisSpan.latestEnd)*this.props.pixelUnit);
      this.widths.push(myWidth);
      if (!isNaN(myWidth) && !isNaN(thisSpan.myLeftPos) && !isNaN(allPreviousWidths)){
        this.props.spans[j].pixelWidth=myWidth;
        this.props.spans[j].leftMargin=parseFloat(thisSpan.myLeftPos-allPreviousWidths);
        allPreviousWidths+=myWidth;
      }
      else {
        this.props.spans[j].pixelWidth=100;
      }
    }

    //add all previous widths together and subtract to reverse effects of relstive positioning.
    // We want relative positioning to keep flex working so that elements below this row move down
    //when it gets higher vertically


}

  render() {

    this.calculateLeftMargins();


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
                pixelUnit={this.props.pixelUnit}
                left={item.leftMargin}
                row={item.row}

              />

      )
      )}
      </View>
    )

  }

}
