import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SearchBar from 'react-native-search-bar';
import MultipleTags from 'react-native-multiple-tags';

import {SubmitButton,} from '../components/button';
import config from '../config/config';

class Forum extends Component{
  constructor(props){
    super(props);

    this.state = {
      tags: config.tags,
    }
  }

  render(){
    return(
    <View>
      <MultipleTags
        tags={config.tags}
        preselectedTags={config.tags}
        search={false}
        onChangeItem={(tags) => {this.setState({tags})}}
        title="Topic"
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },

  container_forums: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    },
  },

  button_style: {
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5
  },

  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#48BBEC',
  },

  listItem: {
    fontSize: 18,
    color: '#656565',
  },

  tag_style: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Forum;
