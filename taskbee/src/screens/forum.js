import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SearchBar from 'react-native-search-bar';
import MultipleTags from 'react-native-multiple-tags';
import {connect} from 'react-redux';
import {SubmitButton,} from '../components/button';
import config from '../config/config';
import {chat, takeTask} from '../reducers/user';
import {OrderItem, } from '../components/list';

class Forum extends Component{
  constructor(props){
    super(props);
    this.pressChat = this.pressChat.bind(this);
    this.pressAppointment = this.pressAppointment.bind(this);
    this.state = {
      tags: config.tags,
      forumList: [
        {
          poster_info: {
            username: "haolin",
            email: "haolin@gmail.com",
            img_url: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
          },
          task_info: {
            price: 30,
            description: "lalaland",
          },
          tags: ['undergraduate', 'graduate'],
        },
      ]
    }

  }

  componentWillMount(){
    var xhr = new XMLHttpRequest();
    var thisSave = this;
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log("get forum data!");
        var forumList = JSON.parse(xhr.responseText).forumList; // array
        console.log(JSON.parse(xhr.responseText));
        thisSave.setState({forumList});
      }
    };
    xhr.open('POST', 'http://172.27.58.137:3000/get_task_list');
    xhr.send("");
  }

  pressChat(buddy, email, avatar)
  {
    this.props.chat(buddy, email, avatar);
    this.props.navigation.navigate('Chat');
  }

  pressAppointment(taskID, taskInfo){
    const {username} = this.props;
    let msg = {
      taker_id: username,
      task_id: taskID,
    };
    socket.emit("take_task", msg);
    socket.on("take_task_res", function(data){
      if(data.state){
        this.props.takeTask(taskInfo);
      }
    });
  }

  renderItem = ({item}) => (
      <OrderItem
          taskImgs={[item.task_info.img_url0, item.task_info.img_url1, item.task_info.img_url2]}
          userImg={item.poster_info.img_url}
          price={item.task_info.price}
          description={item.task_info.description}
          onPressChat = {() => this.pressChat(item.poster_info.username, item.poster_info.email, item.poster_info.img_url)}
          onPressAppointment = {() => this.pressAppointment(item.task_info.task_id, item.task_info)}
          username={item.poster_info.username}
      />
  );

  render(){
    const {tags} = this.state;
    let forumList_ = [];
    for(let i=0; i<this.state.forumList.length; i++){
      let it = this.state.forumList[i];
      for(let j=0; j<it.tags.length; j++){
        if(tags.includes(it.tags[j])){
          forumList_.push(it);
          break;
        }
      }
    }

    return(
    <View>
      <MultipleTags
        tags={config.tags}
        preselectedTags={config.tags}
        search={false}
        onChangeItem={(tags) => {this.setState({tags})}}
        title="Topic"
      />
      <FlatList
          data={forumList_}
          renderItem={this.renderItem}
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

export default connect(
    state => ({
      username: state.user.username,
      email: state.user.email,
    }),
    {
      chat,
      takeTask,
    })(Forum);
