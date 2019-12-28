import React, { Component } from 'react';

export default class DataFetcher {
  constructor(props){
    this.state={timeLineArray:null};


  }
  getTimeLineArrayAsync() {
    return fetch('./Data.js')
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log('responseJson.timeLineArray='+responseJson.timeLineArray)
        this.setState({timeLineArray:responseJson.timeLineArray})

      })
      .catch((error) => {
        console.error(error);
      });

  }


}
