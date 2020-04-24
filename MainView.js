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
import { Constants } from 'expo';

export default class MainView extends Component {
  constructor(props){
    super(props);
    this.state={

      titlesOffset:0,


      panResponderEnabled: true,
      scopeWidth: 2000,
      pixelUnit:1,


      panResponderCount:0,
      markerX: 0,
      markerY: 0
    };

    this.globals={
      pinchGap:0,
      initialPinchGap:0,
      currentPinchGap:300,
      titlesMargin:20,
      initialScopeWidth: 2000,
      scopeScrollPos:0,
      lastScrolledTo:0,
      pinchStarted: false,

    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: this.handlePanResponderMove.bind(this),
      onPanResponderGrant: this.handlePanResponderGrant.bind(this),
      onPanResponderRelease: this.handlePanResponderRelease.bind(this)
    });


  }

componentDidlMount() {
    var windowDims=Dimensions.get('window');
    this.setState({scopeWidth:windowDims.width});
    this.globals.initialScopeWidth=windowDims.width;
    this.scrollScopeTo(0, 0);

  }

  handlePanResponderGrant(evt: Object, gestureState: Object){
    //console.log('handlePanResponderGrant');
    //this.scopeHScroller.scrollEnabled=false;
    this.setState({panResponderEnabled:true});

  }



  handlePanResponderMove(evt: Object, gestureState: Object){


    if (this.state.panResponderEnabled){
      console.log('evt.nativeEvent.touches.length='+evt.nativeEvent.touches.length);
      if (evt.nativeEvent.touches.length>1){
        var touch1X:Number=parseFloat(evt.nativeEvent.touches[1].pageX);
        var touch0X:Number=parseFloat(evt.nativeEvent.touches[0].pageX);
        this.globals.pinchGap=Math.abs(parseInt(touch1X-touch0X));
        console.log('multitouch, touch1X='+touch1X);
        console.log('multitouch, touch0X='+touch0X);
        //console.log('pinchGap='+this.globals.pinchGap);
        if (this.globals.pinchStarted==false){
          if (touch0X<touch1X){
            this.globals.initialLeftTouchX=touch0X;
          } else {
            this.globals.initialLeftTouchX=touch1X;
          }



          this.globals.initialPinchGap=this.globals.pinchGap;
          this.globals.pinchStarted=true;
          this.globals.initialScopeWidth=this.state.scopeWidth;
        }
        else {
          //console.log('scopeRatio='+scopeRatio);

          this.globals.currentPinchGap= this.globals.pinchGap;


          var scopeRatio=parseFloat(this.globals.pinchGap/this.globals.initialPinchGap);
          //console.log('scopeRatio='+scopeRatio);
          var windowDims=Dimensions.get('window');
          //console.log('this.state.initialScopeWidth*scopeRatio='+this.state.initialScopeWidth*scopeRatio+'; windowDims.width='+windowDims.width);
          if (this.globals.initialScopeWidth*scopeRatio>windowDims.width){
            this.newScopeWidth=this.globals.initialScopeWidth*scopeRatio;
            this.globals.pixelUnit=this.newScopeWidth/this.props.scopeSpan;
            this.setState({scopeWidth: this.newScopeWidth, pixelUnit: this.globals.pixelUnit }, () =>{

              console.log('setScopeWidthCallback');
              /*this.setState({pixelUnit: this.state.scopeWidth/this.props.scopeSpan}, () => {
                console.log('callback for mainview state.pixelUnit, this.state.pixelUnit='+this.state.pixelUnit);

              });*/
              var gestureCentre=this.globals.initialLeftTouchX+(this.globals.initialPinchGap/2);

              this.setState({markerX: gestureCentre});
              //console.log('gestureCentre='+gestureCentre);

              var adjustDistance=(gestureCentre*scopeRatio)-gestureCentre;
              //console.log('adjustDistance='+adjustDistance);
              //console.log('this.globals.scopeScrollPos*scopeRatio='+this.globals.scopeScrollPos*scopeRatio);
              var scrollTarget=(this.globals.scopeScrollPos*scopeRatio)+adjustDistance;


              //console.log('scrollTarget='+scrollTarget);

              this.globals.lastScrolledTo=scrollTarget;
              this.scrollScopeTo(scrollTarget, 0);


            });
            //console.log(this.globals);

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

        //this.scopeHScroller.scrollEnabled=true;
        this.setState({panResponderEnabled: false});
      }
      this.setState({panResponderCount: this.state.panResponderCount+1});
    }


  }



  handlePanResponderRelease (evt: Object, gestureState: Object){
    //console.log('pan responder release. this.state.yellowBarWidth='+this.state.yellowBarWidth);

    this.globals.scopeScrollPos=this.globals.lastScrolledTo;
    this.globals.pinchStarted=false;
  }

  resizeScope(){


  }

  scrollScopeTo(newX, newY){
    //console.log('scrollScopeTo, newX='+newX);
    if (this.globals.scopeScrollPos>0) {

      this.scopeHScroller.scrollTo({x:newX, y:0, animated:false});

    }
    else {
      this.scopeHScroller.scrollTo({x:0, y:0, animated:false});


    }
  }
  recordHScroll(evt:object){
    //console.log('recordingHScroll, evt.nativeEvent.contentOffset.x='+evt.nativeEvent.contentOffset.x);
    this.globals.scopeScrollPos=evt.nativeEvent.contentOffset.x;

  }

  scrollTitlesTo(scrollValue) {
    //console.log('scrollTitlesTo in MainView running, scrollValue.y='+scrollValue.y);
    this.setState({titlesOffset: scrollValue.y});
    //this.timelineTitles.scrollTo({y:scrollValue.y});
  }


  render() {


    return (
      //
      <View  {...this.panResponder.panHandlers} style={{flex: 1, backgroundColor:'#000'}}>

        <StatusBar barStyle={'light-content'} />
        <Spacer/>
        <ScrollView

            ref={(ref) => this.timelineTitles = ref}
            horizontal={false}
            scrollEnabled={false}
            contentOffset={{x:0, y: this.state.titlesOffset}}
            style={{
              position:'absolute',
              marginTop:70,


            }}

        >
          { this.props.timeLineArray.map((item, key)=>(
            <Text
              key={key}
              style={{
                fontFamily: 'Futura',
                position: 'relative',
                top: 80,
                height:250,
                width:1000,
                opacity:1,
                left:this.globals.titlesMargin,
                fontSize: 20,
                color: '#fff'}}>
              {item.title}
            </Text>

          )
        )}
        </ScrollView>
        <ScrollView
            horizontal={true}
            ref={(ref) => this.scopeHScroller = ref}
            scrollEnabled={true}
            onScrollEndDrag={this.recordHScroll.bind(this)}
            scrollEventThrottle={16}>


          <TimeScope
            scopeWidth={this.state.scopeWidth}

            scopeSpan={this.props.scopeSpan}
            pixelUnit={this.state.pixelUnit}
            timeLineArray={this.props.timeLineArray}
            titlesMargin={this.globals.titlesMargin}

            scrollTitlesTo={(scrollValue) => this.scrollTitlesTo(scrollValue)}
          />

        </ScrollView>


        <BottomNav/>
        <View style={{position:'absolute', backgroundColor: 'yellow', width: 5, height: 10, top:this.state.markerY, left: this.state.markerX}}></View>

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
