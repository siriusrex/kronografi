/*
Kronografi TimeRow component

*/
import React, { Component } from 'react';
import { AppRegistry,  View, ScrollView, Text, StyleSheet, Animated} from 'react-native';
import TimeSpan from './TimeSpan';
import TimeLineStart from './TimeLineStart';
import TimeLineEnd from './TimeLineEnd';

/* required props
spans
pixelUnit
scopeWidth

*/

export default class TimeLine extends Component {
  constructor(props){
    super(props);
    this.state={
      opacity: 1,
      heightAnim: new Animated.Value(100),
    };
    this.rows={row1:[], row2:[]};
    this.realPos=[0,0,0];



  }
  componentDidMount() {
    //this.calculateLeftMargins();

  }

  componentDidUpdate() {
    this.calculateLeftMargins();
  }

  calculateLeftMargins() {
    this.widths=[];
    this.realPos=[];

    for (let j=0; j<this.props.spans.length; j++) {

      //work out width of each timeSpan and add to array this.widths
      var thisSpan=this.props.spans[j];
      var myWidth=parseFloat(thisSpan.earliestStart-thisSpan.latestEnd)*this.props.pixelUnit;
      this.widths.push(myWidth);
      if (!isNaN(myWidth)) {
        this.props.spans[j].pixelWidth=parseInt(myWidth);
      }
      else {
        this.props.spans[j].pixelWidth=100;
      }
    }

    //add all previous widths together and subtract to reverse effects of relstive positioning.
    // We want relative positioning to keep flex working so that elements below this row move down
    //when it gets higher vertically

    for (let i = 0; i < this.props.spans.length; i++){
      var thisSpan=this.props.spans[i];

      var allPreviousWidths=this.widths.reduceRight(function(a, b, index) {
        if (index <= i) {
          return a+b;
        } else {
            return 0;
        }
      }, 0);


      var myRealPos=0;
      //important: check that incoming pixelWidth and myLeftPos are not NaN, otherwise exception gets thrown on initial repositioning
      if (!isNaN(thisSpan.pixelWidth) && !isNaN(thisSpan.myLeftPos) && !isNaN(allPreviousWidths)){
        myRealPos=thisSpan.pixelWidth+thisSpan.myLeftPos-allPreviousWidths;
      }



      this.realPos.push(myRealPos);

    }//end for loop
}

  render() {

    let { heightAnim } = this.state;
    let realPos=this.realPos;


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
                left={realPos[key]}
                row={item.row}

              />

      )
      )}
      </View>
    )

  }

}
