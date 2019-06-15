import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import ChatListBox from "../../components/chatlist/ChatListBox";
import fakeListBox from "../../components/chatlist/ChatListFake";
// import { url } from "../../url";

export default class ChatList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chatList: fakeListBox
    };
  }
  _moveToChatroom = (chatBoxIdx, teamName) => {
    this.props.navigation.navigate("Chat", {
      chatBoxIdx,
      teamName
    });
  };

  componentDidMount() {
    // const idxBox = this.props.navigation.state.params;
    //idxBox =  {id : '', userId: ''}
    // const idxData = {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     info: JSON.stringify(idxBox)
    //   }
    // };
    // fetch(url, idxData)
    //   .then(res => res.json())
    //   .then(data => console.log(json));
  }

  render() {
    return (
      <ScrollView style={styles.chatListContainer}>
        {this.state.chatList.map(chatBox => (
          <ChatListBox
            teamName={chatBox.teamName}
            chatBoxIdx={chatBox.idx}
            avatarURL={chatBox.avatarURL}
            conversation={chatBox.conversation[chatBox.conversation.length - 1].text}
            key={chatBox.idx}
            moveToChatroom={this._moveToChatroom}
          />
        ))}
        <Button
          title="Submit"
          color="white"
          onPress={() => {
            this.props.navigation.navigate("Home", {});
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  chatListContainer: {
    flex: 1
  }
});
