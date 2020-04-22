/*
Kronografi TimeSpan component

*/
import React, { Component } from 'react';
import { AppRegistry,  View, Image, ScrollView, Text, TouchableWithoutFeedback, Animated} from 'react-native';
import CustomImage from './CustomImage';

export default class TimeSpan extends Component {
  constructor(props){
    super(props);
    this.externalTitle=false;
    this.rowHeight=40;
    this.myTextColor;

    this.state= {
      heightAnim: new Animated.Value(this.rowHeight),
      open: false,
      imageOpacity:new Animated.Value(0)
    };



  }

  componentDidMount(){

    if (this.props.color=='yellow'){
      this.myTextColor='white';
    }
    else {
      this.myTextColor='white';
    }



  }
  componentDidUpdate(){
    if (this.props.title.length*12>this.props.width-this.props.startErrorBarWidth-this.props.endErrorBarWidth){
      this.externalTitle=true;
      this.rowHeight=80;
    }
    else {
      this.externalTitle=false;
      this.rowHeight=40;
    }

  }
  onPress(evt:Object){
    console.log('pressed '+this.props.title);
    if (this.state.open){
      Animated.sequence([
        Animated.timing(
          this.state.imageOpacity,            // The animated value to drive
            {
              toValue: 0,                   // Animate to height: 40 (opaque)
              duration: 1000,              // Make it take a while
            }
          ),
          Animated.timing(
          this.state.heightAnim,            // The animated value to drive
            {
              toValue: 40,                   // Animate to height: 40 (opaque)
              duration: 1000,              // Make it take a while
            }
          )]
        ).start();


      this.setState({open:false});


    }
    else {

      Animated.sequence([

          Animated.timing(
          this.state.heightAnim,            // The animated value to drive
            {
              toValue: 150,                   // Animate to value
              duration: 1000,              // Make it take a while
            }
          ),
          Animated.timing(
            this.state.imageOpacity,            // The animated value to drive
              {
                toValue: 1,                   // Animate to value
                duration: 1000,              // Make it take a while
              }
          )

        ]
      ).start();
      this.setState({open:true});


    }



  }


  render() {

    let { heightAnim } = this.state;
    let { imageOpacity } = this.state;

    return (
      <View
      name={'timeSpanContainer'}
      style={{
        marginTop:40,
        position:'relative',
        borderColor:'yellow',
        borderWidth:0,
        left: this.props.left,
      }}
      >
      <TouchableWithoutFeedback
        name={'touchWrapper'}
        onPress={this.onPress.bind(this)}>

        <Animated.View
          name={'colourBar'}
          style={{
            width: this.props.width,
            height: heightAnim,
            position: 'relative',

            top: 0,
            backgroundColor: this.props.color
          }}
        >
        <Animated.View
          style={{
            width: this.props.startErrorBarWidth,
            height: heightAnim,
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.2)'
          }}
        />

        <Animated.View
          style={{
            width: this.props.endErrorBarWidth,
            height: heightAnim,
            position: 'absolute',
            left: isNaN(this.props.width)?0:this.props.width-this.props.endErrorBarWidth,
            backgroundColor: 'rgba(0,0,0,0.2)'
          }}
        />





          <View
            style={{
              flexDirection:'row',
              marginLeft: this.props.startErrorBarWidth,
              flex: 1
            }}
          >
            {this.props.images &&
              this.props.images.map((item, key) =>(
                  <Animated.Image
                    key={key}
                    ref={key}
                    source={{uri: item}}
                    style={{opacity: imageOpacity,
                            marginLeft: 10,
                            marginTop: 50,
                            width: 90,
                            height: 90,
                            borderRadius: 10}}
                  />

                )
              )
            }
        </View>


            {this.props.children}

          </Animated.View>
      </TouchableWithoutFeedback>


      <Text style={{
        position: 'relative',
        width: this.props.title.length*12,
        left: 0/*+this.props.startErrorBarWidth*/,
        fontFamily: 'Futura',
        marginTop: 5,/*this.externalTitle ? 40:5*/
        top: 0,
        fontSize: 15,
        color: this.myTextColor,
        borderColor:'blue',
        borderWidth:1
      }}>
        {this.props.title}
      </Text>
      <Text style={{
        position: 'relative',
        width: this.props.title.length*12,
        left: 0/*+this.props.startErrorBarWidth*/,
        fontFamily: 'Futura',
        marginTop: 2, /*this.externalTitle ? 55:20*/
        top: 0,
        fontSize: 13,
        color: this.myTextColor
      }}>
        {this.props.earliestStart+'-'+this.props.latestEnd+' mya; timeWidth: '+parseInt(this.props.earliestStart-this.props.latestEnd)+', pixelWidth:'+this.props.width+', left:'+parseInt(this.props.left)}
      </Text>


    </View>
    )
  }
}
