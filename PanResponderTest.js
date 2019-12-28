import React, { Component } from 'react';
import { PanResponder, View} from 'react-native';

export default class PanResponderExample extends Component {
  constructor(props){
    super(props);
    this.state={pinchStarted: false, background: 'yellow', initialPinchGap: 0, currentPinchGap:300};
  }


  componentWillMount() {

    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: this.handlePanResponderMove.bind(this),
      onPanResponderGrant: this.handlePanResponderGrant.bind(this)
    });
  }

  handlePanResponderGrant(evt: Object, gestureState: Object){


  }

  handlePanResponderMove(evt: Object, gestureState: Object){
    if (evt.nativeEvent.touches.length>1){
      var touch1X:Number=parseFloat(evt.nativeEvent.touches[1].locationX);
      var touch0X:Number=parseFloat(evt.nativeEvent.touches[0].locationX);
      if (this.state.pinchStarted==false){

        this.setState({initialPinchGap: Math.abs(parseFloat(touch1X-touch0X)), pinchStarted:true});

      }
      else {
        this.setState({currentPinchGap: Math.abs(parseFloat(touch1X-touch0X))});
      }
    }


    //console.log('this.state.initialPinchGap='+this.state.initialPinchGap);
    //console.log('this.state.currentPinchGap='+this.state.currentPinchGap);

  }

  render() {

    return (
        <View {...this.panResponder.panHandlers} style={{width: this.state.currentPinchGap, backgroundColor: this.state.background, height: 100}}/>
    );
  }
}
