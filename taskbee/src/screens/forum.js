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
import {SubmitButton,} from '../components/button';
import MultipleTags from 'react-native-multiple-tags';


// mock data
const items = [{title: 'title_A', context: 'git clone git@github.com:KylinChang/TaskBee.git'},
  {title: 'title_P', context: 'git checkout app'}, {title: 'title_J', context: 'rnpm install react-native-material-kit'},
  {title: 'title_C', context: 'react-native run-ios --simulator="iPhone 6"'}, {title: 'title_N', context: 'react-native link'}]
const tags = ['Type_A', 'Type_B', 'Type_C', 'Type_D', 'Type_E']

function urlQuery() {}

export default class Forum extends Component <{}, {search: string}> {
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'default',
      content: [],
    };
  }

  search_bar: SearchBar

  _onSelect(value, label) {
    this.setState({value : value});
  }

  _onPressForum() {
    Alert.alert('Forum Item Action Request');
  }

  _onPressButton() {
    Alert.alert('Post Forum Request');
  }

  _onSearch() {
    Alert.alert('Serach Request');
    this.search_bar.blur();
  }

  _onPressTest = (value) => {
    Alert.alert('Test');
  }

  render() {
    return (
      <SafeAreaView style = {styles.container}>
        <SearchBar
          placeholder         = 'Search via key words'/>
          text                = {this.state.search}
          ref                 = {ref => (this.search_bar = ref)}
          onChange            = {e => console.log(e.nativeEvent)}
          onChangeText        = {search => this.setState({ search })}
          onSearchButtonPress = {() => this._onSearch}
        />

        <View style = {styles.button_style}>
          <SubmitButton
            backgroundColor = {config.colorPrimary}
            text            = {"Post Forum"}
            onPress         = {this._onPressButton}
          />
        </View>

        <View>
          <MultipleTags
            tags         = {tags}
            search
            onChangeItem = {(content) => { this.setState({ content }); }}
            title        = "Topic Type"
          />
          {
            (() => this.state.content.map(item => <Text key={item}> {item} </Text>) )()
          }
        </View>

        <ScrollView contentContainerStyle = {{ flex: 1 }}>
          {items.map(a => (
            <TouchableOpacity style={{flex: 1}} onPress = {this._onPressForum} underlayColor='#dddddd'>
              <View style = {styles.container_forums}>
                <Text style = {styles.listTitle}>
                  {a.title}
                </Text>
                <Text numberOfLines = {3} style = {styles.listItem}>
                  {a.context}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </SafeAreaView>
    )
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
