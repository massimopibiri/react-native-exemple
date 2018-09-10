import React from 'react';
import {
	StyleSheet,
	FlatList, // -> GREAT TUTORIAL : https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
	View,
	Text,
	TouchableOpacity,
	ScrollView
} from 'react-native';
import styles from './styles';
const down = require('../../img/down-arrow.png');

class ListInfos extends React.Component {
  constructor() {
    super();
    this.renderContent = this.renderContent.bind(this);
    this.content = this.content.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.getItemLayout = this.getItemLayout.bind(this);
    this.state ={
      refreshState: false
    };
  }
  componentDidMount() {
  	// in previous page the Action must have parameters like -> Action.infos({argToDisplay: 'playing', idToDisplay: 32})
    if (this.props.argToDisplay && this.props.idToDisplay) {
      // select the correct argument
      this.props.select(this.props.argToDisplay, true);
      // get index of the answer to display
      const mainIndex = this.props.list.map((section) => {return section.arg}).indexOf(this.props.argToDisplay);
      const subIndex = this.props.list[mainIndex].content.map((single) => {return single.id}).indexOf(this.props.idToDisplay);
      // inform flatList to refresh and go to the right position
      this.handleRefresh(mainIndex, subIndex);
    }
  }
  // change the state everytime the list is updated just to force the component to re-render
  handleRefresh(index, subIndex = null) {
    this.setState({refreshState: !this.state.refreshState});
    // got to the index pointed with the header on the top of the screen
  	this.mainList.scrollToIndex({viewPosition: 0, index: index});
  	// -> NOT WORKING -> it is supposed to align the list on the requested answer
    if (subIndex) {
  	  this.subList.scrollToIndex({viewPosition: 0, index: subIndex});
    }
  }
  renderContent(data) {
    return (
      <View style={styles.itemContent} key={data.index}>
        { data.item.title ?
          <Text style={styles.titleContent}>{data.item.title}</Text>
          :
          null
        }
        { data.item.txt ?
          <Text style={styles.txtContent}>{data.item.txt}</Text>
          :
          null
        }
      </View>
    );
  }
  content(item) {
  	if (item.arg === this.props.selected) {
  	  return (
        <ScrollView>
          <View style={styles.content}>
            <FlatList 
              data={item.content}
              renderItem={this.renderContent}
              keyExtractor={item => item.id}
              // add a ref to scroll to the element
              ref={(list) => this.subList = list}
              // this allows scrollToIndex() to know how much to scroll (put just to avoid bug)
              getItemLayout={this.getItemLayout}
            />
          </View>
        </ScrollView>
  	  );
  	}
  }
  getItemLayout = (data, index) => (
    { length: 70, offset: 70 * index, index }
  );
  renderItem(data) {
    return (
      <View style={styles.item} key={data.index}>
        <TouchableOpacity
          style={styles.board}
          onPress={() => {
          	this.props.select(data.item.arg, false);
          	this.handleRefresh(data.index, null);
          }}
        >
          { data.item.arg === this.props.selected ?
            <View style={styles.btnBlur}/>
            :
            null
          }
          <Text style={styles.title}>{data.item.title}</Text>
        </TouchableOpacity>
        { this.props.show === true ?
        	this.content(data.item)
        	:
        	null
        }
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.props.list}
          renderItem={this.renderItem}
          // asign a key to every element of the list
          keyExtractor={item => item.id}
          // that informs the component that the state changes
          extraData={this.state}
          // add a ref to scroll to the element
          ref={(list) => this.mainList = list}
          // this allows scrollToIndex() to know how much to scroll (put just to avoid bug)
          getItemLayout={this.getItemLayout}
        />
      </View>
    );
  }
}

export default ListInfos;
