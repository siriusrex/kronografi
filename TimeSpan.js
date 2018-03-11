/*
Kronografi TimeSpan component

*/
import React, { Component } from 'react';
import { AppRegistry,  View, ScrollView, Text} from 'react-native';

export default class TimeSpan extends Component {
  constructor(props){
    super(props);
    this.state={externalTitle: false};

  }

  componentDidMount(){

    if ((this.props.title.length*5)>this.props.width){
      console.log('title "'+this.props.title+'" length > span width');
      this.setState({externalTitle:true});
    }
  }

  render() {
    return (
      <View>

        <View style={{width: this.props.width, height: 40, position: 'absolute', left: this.props.left+(this.state.externalTitle ? 0:-10), backgroundColor: this.props.color}}>

        </View>
        <Text style={{position: 'absolute', left: this.props.left, fontFamily: 'Futura', marginTop: this.state.externalTitle ? 40:5, fontSize: 15, color: '#fff'}}>{this.props.title}</Text>
        <Text style={{position: 'absolute', left: this.props.left, fontFamily: 'Futura', marginTop: this.state.externalTitle ? 55:20, fontSize: 13, color: '#fff'}}>{this.props.earliestStart+'-'+this.props.latestEnd+' mya'}</Text>

      </View>
    )
  }
}
