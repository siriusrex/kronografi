/*
Kronografi TimeLine component

*/
import React, { Component } from 'react';
import { AppRegistry,  View, ScrollView, Text, StyleSheet, Animated} from 'react-native';
import TimeSpan from './TimeSpan';
import TimeLineStart from './TimeLineStart';
import TimeLineEnd from './TimeLineEnd';
import TimeRow from './TimeRow';

export default class TimeLine extends Component {
  constructor(props){
    super(props);
    this.state={
      opacity: 100,
      totalHeight: 200,
      heightAnim: new Animated.Value(200),
    };
    this.rows={row1:[], row2:[]};
    this.foo='bar';

    for (var i = 0; i < this.props.timeSpans.length; i++){

      var thisSpan=this.props.timeSpans[i];
      var prevSpan=this.props.timeSpans[i-1];

      if (i>0){
        if (thisSpan.earliestStart>=prevSpan.latestEnd){
            //console.log('timespan bar '+thisSpan.text+' overlaps timespan bar '+prevSpan.text);
            if (prevSpan.row!=2){
              this.props.timeSpans[i].row=2;
              this.rows.row2.push(this.props.timeSpans[i]);
            }
            else {
                this.props.timeSpans[i].row=1;
                this.rows.row1.push(this.props.timeSpans[i]);

            }


        } else {
            this.props.timeSpans[i].row=1;
            this.rows.row1.push(this.props.timeSpans[i]);

        }



      } else {
        this.props.timeSpans[i].row=1;
        this.rows.row1.push(this.props.timeSpans[i]);



      }//end if (i>0)

      //console.log('timespan '+this.props.timeSpans[i].text+' row: '+this.props.timeSpans[i].row);



    }// end for loop

    for (var j=0; j<this.rows.row1.length; j++) {
      //check label length, increase vertical gap between timespan block and label
      //work out item left position, store in item.myLeftPos
      this.rows.row1[j].myLeftPos=parseInt(this.props.scopeWidth-(this.rows.row1[j].earliestStart*this.props.pixelUnit));

      //console.log('timeSpan '+this.rows.row1[j].text+', myLeftPos='+this.rows.row1[j].myLeftPos);
      if (this.rows.row1[j+1]){
        var nextLeftPos=this.props.scopeWidth-(this.rows.row1[j+1].earliestStart*this.props.pixelUnit);
        //endMarker is the xpos of this timeSpan plus the estimated pixel width of the label
        var myTotalEndMarker=this.rows.row1[j].myLeftPos+this.rows.row1[j].text.length*12
        if (myTotalEndMarker>nextLeftPos) {
          console.log('timeSpan text '+this.rows.row1[j+1].text+' overlaps timeSpan text '+this.rows.row1[j].text);
        }
      }
    }

    for (var k=0; k<this.rows.row2.length; k++) {
      //check label length, increase vertical gap between timespan block and label
      //work out item left position, store in item.myLeftPos
      this.rows.row2[k].myLeftPos=parseInt(this.props.scopeWidth-(this.rows.row2[k].earliestStart*this.props.pixelUnit));

      //console.log('timeSpan '+this.rows.row2[k].text+', myLeftPos='+this.rows.row2[k].myLeftPos);
      if (this.rows.row2[k+1]){
        var nextLeftPos=this.props.scopeWidth-(this.rows.row2[k+1].earliestStart*this.props.pixelUnit);
        //endMarker is the xpos of this timeSpan plus the estimated pixel width of the label
        var myTotalEndMarker=this.rows.row2[k].myLeftPos+this.rows.row2[k].text.length*12
        if (myTotalEndMarker>nextLeftPos) {
          console.log('timeSpan text '+this.rows.row2[k+1].text+' overlaps timeSpan text '+this.rows.row2[k].text);
        }
      }
    }

  }





  componentDidMount() {
    //test whether timespan graphics will overlap, if so, put them on separate lines


    //console.log('TimeLine component, componentDidMount function: this.rows.row1=',this.rows.row1);
  }//end componentDidMount

  componentDidUpdate(prevProps){
    //console.log('timeline '+this.props.title+' updated');
    //console.log('this.props.pixelUnit='+this.props.pixelUnit);
    //console.log('this.props.scopeScrollPos='+this.props.scopeScrollPos);


  }





  render() {

    let { heightAnim } = this.state;
    //console.log('TimeLine component, render function, this.foo=', this.foo);
    return (

      <Animated.View style={{
        position:'relative',
        marginTop: 50,
        marginBottom:20,
        height: 'auto',
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        flexDirection:'column',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }}>




          <TimeRow
            spans={this.rows.row1}
            scopeWidth={this.props.scopeWidth}
            pixelUnit={this.props.pixelUnit}
          />
          <TimeRow
            spans={this.rows.row2}
            scopeWidth={this.props.scopeWidth}
            pixelUnit={this.props.pixelUnit}
          />





      </Animated.View>
      )

    }
}
