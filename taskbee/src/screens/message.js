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
            email: "gdgyzzl@gmail.com"
        };
    }

    renderItem = ({item}) => (

        <View style={styles.section}>
            <ChatButton
                username={this.state.username}
                email={this.state.email}
                imgUri={this.state.imgUri}
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
        return(
            <View style={styles.container}>
                /*<View style={styles.fabContainer}>
                    <View style={styles.fabCol}>
                        <FabButton>
                            <FontAwesome>{Icons.userPlus}</FontAwesome>
                        </FabButton>
                    </View>
                </View>*/
                {/* <View>
                 <Text>{this.props.store.user.loggedIn}</Text>
                 <Text>{this.props.store.user.username}</Text>
                 </View> */}
                <FlatList
                    data={this.props.data}
                    renderItem={this.renderItem}
                />

                /*<ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.section}>
                        <ChatButton
                            username={this.state.username}
                            email={this.state.email}
                            imgUri={this.state.imgUri}
                            onPress={() => this.props.navigation.navigate('Chat')}
                        />
                    </View>
                </ScrollView>*/
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
