import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    FlatList,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {connect} from 'react-redux';
import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat';

import {chat} from '../reducers/user';

import config from '../config/config';
import {
    FabButton,
    ChatButton,
} from '../components/button';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'white',
        backgroundColor: config.colorBackground,
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

class Message extends Component{
    constructor(props){
        super(props);
        this.state = {
            imgUri: "https://facebook.github.io/react-native/docs/assets/favicon.png",
            username: "Stephen",
            email: "gdgyzzl@gmail.com",
            buddiesList: [],
        };
        //const {buddiesList} = this.state;
        //let thisSave = this;
        //socket.on('push_message', function(res){
        //    console.log('message page:: received');
        //    console.log(res);
        //    if(!buddiesList.includes(res.send_user))
        //    {
        //        let tmp = buddiesList.slice();
        //        tmp.push(res.send_user);
        //        thisSave.setState({buddiesList: tmp});
        //        //this.state.buddiesList.push(res.send_user);
        //    }
        //});
        this.makeBuddiesList = this.makeBuddiesList.bind(this);
    }

    pressBuddy(username, email, avatar){
        chat({username: username, email: email, avatar: avatar});
        this.props.navigation.navigate('Chat');
    }

    componentDidMount(){
        this.makeBuddiesList();
    }

    componentWillReceiveProps(nextProps){
        this.makeBuddiesList();
    }

    renderItem = ({item}) => (

        <View style={styles.section}>
            <ChatButton
                username={item.username}
                email={item.email}
                imgUri={item.avatar}
                onPress={() => this.pressBuddy(item.username, item.email, item.avatar)}
            />
        </View>

        //<MyListItem
        //    id={item.id}
        //    onPressItem={this._onPressItem}
        //    selected={!!this.state.selected.get(item.id)}
        //    title={item.title}
        ///>
    );

    makeBuddiesList = () => {
        const {buddies} = this.props;
        let newList = [];
        for(var key in buddies)
        {
            newList.push(buddies[key]);
        }
        newList.sort(function (a, b) {
            return a.date < b.date;
        });
        this.setState({buddiesList: newList});
        //console.log(this.state.buddiesList);
    };

    render(){
        return(
            <View style={styles.container}>
                {this.state.buddiesList.length > 0 &&
                    <FlatList
                    data={this.state.buddiesList}
                    renderItem={this.renderItem}
                    />
                }
            </View>
        );
    }
}

export default connect(
    state => ({
        username: state.user.username,
        messages: state.user.messsages,
        buddies: state.user.buddies,
    }),
    {
        chat,
    }
)(Message);