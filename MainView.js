/*
Kronografi main visual container component

*/
import React, { Component } from 'react';
import { AppRegistry,  View, StatusBar, ScrollView, StyleSheet, Text, PanResponder} from 'react-native';
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
      dummyScrollPos:0,
      dummyTitlesOpacity:0,
      timeLineTitlesOpacity:100,


    };




  }




  moveTitles(event){
    this.setState({titlesMargin:event.nativeEvent.contentOffset.x+10})

    this.hideDummyTitles();
  }

  showDummyTitles(){
    this.setState({timeLineTitlesOpacity: 0});

    this.setState({dummyTitlesOpacity: 100});
  }

  hideDummyTitles(){
    this.setState({timeLineTitlesOpacity: 100});
    this.setState({dummyTitlesOpacity: 0});

  }

  showTimeLineTitles(){
    this.setState({timeLineTitlesOpacity: 100});
  }

  hideTimeLineTitles(){

    this.setState({timeLineTitlesOpacity: 0});
    this.showDummyTitles();
  }

  updateDummyTitleScroll(event){

    this.setState({dummyScrollPos: event.nativeEvent.contentOffset.y})
  }

  render() {


    return (
      <View style={{flex: 1, backgroundColor:'#000'}}>
        <StatusBar barStyle={'light-content'} />
        <Spacer/>

        <ScrollView horizontal={true} onScroll={this.hideTimeLineTitles.bind(this)} onScrollEndDrag={() => console.log('onScrollEndDrag')}  onMomentumScrollEnd={this.moveTitles.bind(this)} scrollEventThrottle={16}>


          <TimeScope  scopeWidth={this.props.scopeWidth} scopeSpan={this.props.scopeSpan} timeLineArray={this.props.timeLineArray} titlesMargin={this.state.titlesMargin} timeLineTitlesOpacity={this.state.timeLineTitlesOpacity} updateDummyTitleScroll={this.updateDummyTitleScroll.bind(this)} />

        </ScrollView>
        <ScrollView horizontal={false} pointerEvents={'none'} contentOffset={{x:0, y:this.state.dummyScrollPos}} style={{flex: 1, position:'absolute', opacity: this.state.dummyTitlesOpacity, flexDirection:'column', marginTop: 85, backgroundColor:'transparent'}}>

        { this.props.timeLineArray.map((item, key)=>(
            <View key={key} style={{marginTop: 50, height: 200, justifyContent: 'flex-start', alignItems:'flex-start', flexDirection:'column'}}>
            <Text style={styles.timeLineTitleBox}>{item.title}</Text>
            </View>
          )
         )
        }


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
