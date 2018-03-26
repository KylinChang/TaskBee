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
        socket.on('push_message', function(res){
            console.log('message page:: received');
            console.log(res);
            if(!buddiesList.includes(res.send_user))
            {
                this.state.buddiesList.push(res.send_user);
            }
        });
    }

    renderItem = ({item}) => (

        <View style={styles.section}>
            <ChatButton
                username={item.buddy_name}
                email={item.email}
                imgUri={item.avatar}
                onPress={() => this.props.navigation.navigate('Chat')}
            />
        </View>

        //<MyListItem
        //    id={item.id}
        //    onPressItem={this._onPressItem}
        //    selected={!!this.state.selected.get(item.id)}
        //    title={item.title}
        ///>
    );


    render(){
        const {buddies} = this.props;
        for(var key in buddies)
        {
            this.state.buddiesList.push(buddies[key]);
        }
       this.state.buddiesList.sort(function (a, b) {
            return a.date < b.date;
        });
        console.log(this.state.buddiesList);
        //var buddiesList = Object.keys(buddies).sort(function (a, b) {
        //    return buddies[a].date < buddies[b].date;
        //});
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
    })
)(Message);
