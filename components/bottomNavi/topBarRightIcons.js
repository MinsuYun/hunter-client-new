import React from "react";
import { Icon } from "react-native-elements";
import { View, StyleSheet, AsyncStorage } from "react-native";

export default class TopBarRightIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  movetoChatList = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log(userToken);
    const userTokenArr = userToken.split("-");

    //유저의 아이디
    const userId = userTokenArr[userTokenArr.length - 1];
    //team아디
    const id = userTokenArr[userTokenArr.length - 7];

    this.props.navigation.navigate("ChatList", { userId, id });
  };

  render() {
    return (
      <View style={{ flexDirection: "row", marginRight: 10 }}>
        <Icon
          type="font-awesome"
          iconStyle={styles.headerRightIcon}
          name="envelope"
          onPress={() => this.openNewsModal()}
        />
        <Icon
          type="font-awesome"
          iconStyle={styles.headerRightIcon}
          name="comment"
          onPress={() => this.movetoChatList()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerRightIcon: {
    marginRight: 20,
    color: "red"
  }
});
