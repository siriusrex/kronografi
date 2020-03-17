/*
Kronografi TimeRow component

*/
import React, { Component } from 'react';
import { AppRegistry,  View, ScrollView, Text, StyleSheet, Animated} from 'react-native';
import TimeSpan from './TimeSpan';
import TimeLineStart from './TimeLineStart';
import TimeLineEnd from './TimeLineEnd';

/* required props
row
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




  }
  componentDidMount() {
  }

  render() {

    let { heightAnim } = this.state;

    return (

      <View ref="row1" style={{position:'relative', flexDirection: 'row', height: 80, marginTop:10, borderColor:'red', borderWidth:1}}>



            {this.props.row.map((item, key)=>(



                    <TimeSpan
                      key={key}
                      ref={key}
                      title={item.text}
                      earliestStart={item.earliestStart}
                      latestStart={item.latestStart}
                      earliestEnd={item.earliestEnd}
                      latestEnd={item.latestEnd}
                      images={item.images}
                      color={item.color}
                      width={(parseInt(item.earliestStart-item.latestEnd))*this.props.pixelUnit}
                      startErrorBarWidth={(parseInt(item.earliestStart-item.latestStart))*this.props.pixelUnit}
                      endErrorBarWidth={(parseInt(item.earliestEnd-item.latestEnd))*this.props.pixelUnit}

                      left={this.props.scopeWidth-(item.earliestStart*this.props.pixelUnit)}
                      row={item.row}

                    />

            )
            )}



      </View>
    )

  }

}
