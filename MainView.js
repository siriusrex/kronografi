/*
Kronografi main visual container component

*/
import React, { Component } from 'react';
import { AppRegistry,  View, StatusBar, ScrollView, StyleSheet, Text, PanResponder, Dimensions} from 'react-native';
import TopNav from './TopNav';
import TimeScope from './TimeScope';
import BottomNav from './BottomNav';
import Spacer from './Spacer';
import TimeRuler from './TimeRuler';

export default class MainView extends Component {
  constructor(props){
    super(props);
    this.state={
      titlesMargin:10,
      pinchStarted: false,
      initialPinchGap: 0,
      currentPinchGap:300,
      panResponderEnabled: true,
      initialScopeWidth: 2000,
      scopeWidth: 2000,
      pixelUnit:1,
      initialYellowBarWidth:100,
      yellowBarWidth:100,
      scopeScrollPos:0,
    };

    this.globals={pinchGap:0, initialPinchGap:0, scopeScrollPos:0, lastScrolledTo:0}




  }

  componentWillMount() {

    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: this.handlePanResponderMove.bind(this),
      onPanResponderGrant: this.handlePanResponderGrant.bind(this),
      onPanResponderRelease: this.handlePanResponderRelease.bind(this)
    });
    //console.log('mainView mounted, this.props.scopeSpan='+this.props.scopeSpan);
  }

  handlePanResponderGrant(evt: Object, gestureState: Object){
    //console.log('handlePanResponderGrant');
    //this.refs.scopeHScroller.scrollEnabled=false;
    this.setState({panResponderEnabled: true});

  }



  handlePanResponderMove(evt: Object, gestureState: Object){


    if(this.state.panResponderEnabled){
      //console.log('evt.nativeEvent.touches.length='+evt.nativeEvent.touches.length);
      if (evt.nativeEvent.touches.length>1){
        var touch1X:Number=parseFloat(evt.nativeEvent.touches[1].pageX);
        var touch0X:Number=parseFloat(evt.nativeEvent.touches[0].pageX);
        this.globals.pinchGap=Math.abs(parseInt(touch1X-touch0X));
        //console.log('multitouch, touch1X='+touch1X);
        //console.log('multitouch, touch0X='+touch0X);
        //console.log('pinchGap='+this.globals.pinchGap);
        if (this.state.pinchStarted==false){
          this.globals.initialTouch0X=touch0X;

          this.setState({initialPinchGap: this.globals.pinchGap, initialYellowBarWidth:this.state.yellowBarWidth, initialScopeWidth: this.state.scopeWidth, pinchStarted:true});

          this.globals.initialPinchGap=this.globals.pinchGap;


        }
        else {

          this.setState({currentPinchGap: this.globals.pinchGap});


          var scopeRatio=parseFloat(this.globals.pinchGap/this.globals.initialPinchGap);
          //console.log('scopeRatio='+scopeRatio);
          var windowDims=Dimensions.get('window');
          //console.log('windowDims.width='+windowDims.width);
          if (this.state.initialScopeWidth*scopeRatio>windowDims.width){
            this.setState({scopeWidth: (this.state.initialScopeWidth*scopeRatio), yellowBarWidth: (this.state.initialYellowBarWidth*scopeRatio)}, () =>{

              //console.log('setScopeWidthCallback');
              this.setState({pixelUnit: this.state.scopeWidth/this.props.scopeSpan}, () => {/*console.log('callback for mainview state.pixelUnit, this.state.pixelUnit='+this.state.pixelUnit)*/});
              //console.log(this.globals);
              var gestureCentre=this.globals.initialTouch0X+(this.globals.initialPinchGap/2);
              //console.log('gestureCentre='+gestureCentre);

              var adjustDistance=(gestureCentre*scopeRatio)-gestureCentre;
              //console.log('adjustDistance='+adjustDistance);
              //console.log('this.globals.scopeScrollPos*scopeRatio='+this.globals.scopeScrollPos*scopeRatio);
              var scrollTo=(this.globals.scopeScrollPos*scopeRatio)+adjustDistance;


              //console.log('scrollTo='+scrollTo);

              this.globals.lastScrolledTo=scrollTo;
              this.scrollScopeTo(scrollTo, 0);
            });
          }
          else {
            this.setState({scopeWidth:windowDims.width});
            this.scrollScopeTo(0, 0);
          }


        }



      }
      else {
        //console.log('single touch, no pinch');
        //how to turn off panResponder at this point?

        //this.refs.scopeHScroller.scrollEnabled=true;
        this.setState({panResponderEnabled: false});
      }
      this.setState({panResponderCount: this.state.panResponderCount+1});
    }
  }



  handlePanResponderRelease (evt: Object, gestureState: Object){
    //console.log('pan responder release. this.state.yellowBarWidth='+this.state.yellowBarWidth);
    this.setState({initialYellowBarWidth: this.state.yellowBarWidth, yellowBarWidth: this.state.yellowBarWidth, pinchStarted:false});

    this.globals.scopeScrollPos=this.globals.lastScrolledTo;
  }

  scrollScopeTo(newX, newY){
    //console.log('scrollScopeTo, newX='+newX);
    if (this.globals.scopeScrollPos>0) {

      this.refs.scopeHScroller.scrollTo({x:newX, y:0, animated:false});
      this.setState({scopeScrollPos: this.globals.scopeScrollPos});
    }
    else {
      this.refs.scopeHScroller.scrollTo({x:0, y:0, animated:false});
      this.setState({scopeScrollPos: 0});

    }
  }
  recordHScroll(evt:object){
    //console.log('recordingHScroll, evt.nativeEvent.contentOffset.x='+evt.nativeEvent.contentOffset.x);
    this.globals.scopeScrollPos=evt.nativeEvent.contentOffset.x;
    this.setState({scopeScrollPos: this.globals.scopeScrollPos});
  }


  render() {


    return (
      //
      <View  {...this.panResponder.panHandlers} style={{flex: 1, backgroundColor:'#000'}}>

        <StatusBar barStyle={'light-content'} />
        <Spacer/>

        <ScrollView horizontal={true} ref="scopeHScroller"  scrollEnabled={true} onScrollEndDrag={this.recordHScroll.bind(this)} scrollEventThrottle={16}>


          <TimeScope scopeWidth={this.state.scopeWidth} scopeScrollPos={this.state.scopeScrollPos} scopeSpan={this.props.scopeSpan} pixelUnit={this.state.pixelUnit} timeLineArray={this.props.timeLineArray} titlesMargin={this.state.titlesMargin} timeLineTitlesOpacity={this.state.timeLineTitlesOpacity}  />

        </ScrollView>

        <BottomNav/>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  timeLineTitleBox: {


    fontFamily: 'Futura',
    margin: 10,
    fontSize: 20,
    color: '#fff'
  }
});
