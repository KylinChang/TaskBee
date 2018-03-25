import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat';

import config from '../config/config';
import {
  FabButton,
} from '../components/button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //backgroundColor: config.colorBackground,
  },
  fabContainer: {
    flex: 1,
    flexDirection: "row",
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
  fabCol:{
    marginLeft: 10, marginRight: 10,
  },
});

// class Message extends Component{
//   constructor(props){
//     super(props);
//   }
//
//   render(){
//     return(
//       <View style={styles.container}>
//         <View style={styles.fabContainer}>
//           <View style={styles.fabCol}>
//             <FabButton>
//               <FontAwesome>{Icons.userPlus}</FontAwesome>
//             </FabButton>
//           </View>
//         </View>
//         {/* <View>
//           <Text>{this.props.store.user.loggedIn}</Text>
//           <Text>{this.props.store.user.username}</Text>
//         </View> */}
//       </View>
//     );
//   }
// }

class Message extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
  renderBubble (props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
            backgroundColor: 'white'
        }
        // right: {
        //   backgroundColor: '#2c3e50'
        // }
      }}
    />
  )
}


  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        renderBubble={this.renderBubble}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

export default Message;
