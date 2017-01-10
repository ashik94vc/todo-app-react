import React, {Component} from 'react';
import {View,TouchableHighlight, Text} from 'react-native';

export class SwipeDeleteButton extends Component {


  render() {

    return(
      <TouchableHighlight style={{height: 56,backgroundColor: "#f44336"}}>
        <Text>
          Delete
        </Text>
      </TouchableHighlight>
    )

  }

}
