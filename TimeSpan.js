/*
Kronografi TimeSpan component

*/
import React, { Component } from 'react';
import { AppRegistry,  View, Image, ScrollView, Text, TouchableWithoutFeedback, Animated} from 'react-native';

export default class TimeSpan extends Component {
  constructor(props){
    super(props);
    this.externalTitle=false;
    this.rowHeight=40;
    this.myTextColor;
    this.state={heightAnim: new Animated.Value(this.rowHeight), open: false, imageOpacity:new Animated.Value(0)};

    //console.log('TimeSpan constructor for '+this.props.title+', this.props.width='+this.props.width+', this.props.endErrorBarWidth='+this.props.endErrorBarWidth);
  }

  componentDidMount(){

    if (this.props.color=='yellow'){
      this.myTextColor='black';
    }
    else {
      this.myTextColor='white';
    }



  }
  componentDidUpdate(){
    if (this.props.title.length*12>this.props.width){
      this.externalTitle=true;
      this.rowHeight=80;
    }
    else {
      this.externalTitle=false;
      this.rowHeight=40;
    }
    //console.log('timeSpan '+this.props.title+' componentDidUpdate.');
    //console.log('this.externalTitle='+this.externalTitle);
    //console.log('this.props.title.length='+this.props.title.length);
    //console.log('this.props.title.length*8='+this.props.title.length*8);

    //console.log('this.props.width='+this.props.width);

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
      this.props.resizeParentVertical(150);

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
      this.props.resizeParentVertical(400);

    }

  }


  render() {

    let { heightAnim } = this.state;
    let { imageOpacity } = this.state;
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>

          <Animated.View style={{width: this.props.width, height: heightAnim, position: 'absolute', left: this.props.left+(this.externalTitle ? 0:-10), top: 0, backgroundColor: this.props.color}}>

              <Animated.Image
                style={{opacity: imageOpacity, resizeMode: 'cover', marginLeft: 20, marginTop: 50, width: 80, height: 80}}
                source={require('./img/tyrannosaur.png')}
                />

            <Animated.View style={{width: this.props.startErrorBarWidth, height: heightAnim, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.2)'}}/>
            <Animated.View style={{width: this.props.endErrorBarWidth, height: heightAnim, position: 'absolute', left: this.props.width-this.props.endErrorBarWidth, backgroundColor: 'rgba(0,0,0,0.2)'}}/>

              {this.props.children}

            </Animated.View>
        </TouchableWithoutFeedback>


        <Text style={{position: 'absolute', left: this.props.left, fontFamily: 'Futura', marginTop: this.externalTitle ? 40:5, top: 0, fontSize: 15, color: this.myTextColor}}>{this.props.title}</Text>
        <Text style={{position: 'absolute', left: this.props.left, fontFamily: 'Futura', marginTop: this.externalTitle ? 55:20, top: 0, fontSize: 13, color: this.myTextColor}}>{this.props.earliestStart+'-'+this.props.latestEnd+' mya'}</Text>

      </View>
    )
  }
}
