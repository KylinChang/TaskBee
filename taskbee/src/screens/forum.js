'use strict'
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Button,
} from 'react-native';
import SearchBar from 'react-native-search-bar'
import Tags from 'react-native-tags';

const UselessComponent = () => <Tags
  initialText=""
  initialTags={['dog', 'cat', 'chicken']}
  onChangeTags={() => console.log('')}
  onTagPress={(index, tagLabel, event) => console.log(index, tagLabel, event)}
  inputStyle={{ backgroundColor: 'white' }}
/>;

const items = ['Apple', 'Pie', 'Juice', 'Cake', 'Nuggets']
export default class Forum extends Component <{}, {search: string}> {
   state = {
    search: '',
  }
  search_bar: SearchBar

  _onSelect(value, label) {
    this.setState({value : value});
  }
  
  render() {
    return (
      <SafeAreaView style = {styles.container}>
        <SearchBar
          placeholder='Search via key words'/>
          text={this.state.search}
          ref={ref => (this.search_bar = ref)}
          onChange={e => console.log(e.nativeEvent)}
          onChangeText={search => this.setState({ search })}
          onSearchButtonPress={() => this.search_bar.blur()}
        />

        <Button style = {{height: 30}}
          onPress={() => {}}
          title='Post'
        />
        
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          {items
            .filter(a => a.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
            .map(a => (
              <Text style={styles.listItem} key={a}>
                {a}
              </Text>
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
  listItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 18,
    backgroundColor: '#fff',
  },
});
