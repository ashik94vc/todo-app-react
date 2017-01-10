import React, { Component } from 'react';
import {SwipeListView,SwipeRow} from 'react-native-swipe-list-view';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  StatusBar,
  TextInput,
  ListView,
  TouchableOpacity
} from 'react-native';
COLORS = require('./res/values/colors.js')

export default class TodoApp extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {displayText:"" , bufferText: "", dataSource: ds.cloneWithRows([]), db: []}
  }

  submitText() {
    var data = []
    data = this.state.db.slice();
    data = data.concat(this.state.bufferText)
    this.setState({dataSource: this.state.dataSource.cloneWithRows(data), db: data})
  }

  deleteRow(rowID) {
    var data = this.state.db.slice();
    console.log(rowID)
    data.splice(rowID,1);
    console.log(data)
    this.setState({dataSource: this.state.dataSource.cloneWithRows(data), db: data})
  }


  changeText(text) {
    this.setState({bufferText: text});
  }

  renderTodoItem(rowData: string, sectionID: number, rowID: number) {
    var swipeoutButtons = [{
      text: "Delete",
      backgroundColor: "#f44336",
      height: 56,
      onPress: this.deleteRow.bind({rowID})
    }]
    return (
      <View backgroundColor='#fafafa' style={{flex:1, height: 56, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: "#4caf50"}}>
          {rowData}
        </Text>
      </View>
    )
  }

  render() {
    var submit = ""
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={COLORS.FOREST_GREEN} />
        <ToolbarAndroid style={styles.toolbar} titleColor={COLORS.WHITE} title="Todo App"/>
        <TextInput
          style={{height: 56}}
          placeholder="Enter some text"
          onChangeText={this.changeText.bind(this)}
          onSubmitEditing={this.submitText.bind(this)}/>
        <SwipeListView
          enableEmptySections={true}
          dataSource= {this.state.dataSource}
          renderRow={this.renderTodoItem.bind(this)}
          renderHiddenRow={ (data, secId, rowId, rowMap) => (
							<View style={styles.rowBack}>
								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={this.deleteRow.bind(this,rowId)}>
									<Text style={styles.backTextWhite}>Delete</Text>
								</TouchableOpacity>
							</View>
						)}
						rightOpenValue={-75}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: COLORS.FOREST_GREEN,
    height: 56,
    elevation: 3
  },
  rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
  backTextWhite: {
    color: COLORS.WHITE
  },
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
});

AppRegistry.registerComponent('TodoApp', () => TodoApp);
