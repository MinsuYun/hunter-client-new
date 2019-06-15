import React, { Fragment, Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo";

class Title extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>{this.props.name}</Text>
      </View>
    );
  }
}

class Loading extends Component {
  render() {
    return (
      <Fragment>
        <View>
          <Text style={styles.title}>{this.props.name}</Text>
        </View>
      </Fragment>
    );
  }
}

export default class Main extends Component {
  constructor() {
    super();
    // this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  // 처음 접속시, userToken이 있으면 database에서 나의 해당정보를 가져오고 그 정보를 가지고 DistrictScreen에 접속한다.
  // 데이터 베이스에서 해당정보를 가지고 와야 홍대의 사람들을 보여줄지, 이태원의 사람들을 보여줄지 그리고 또 홍대의 그린라이트를 보여줄지, 한신포차를 보여줄지 알 수 있다.
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    const userTokenArr = userToken.split("-");

    //유저의 아이디
    const userId = userTokenArr[userTokenArr.length - 1];
    const locationId = userTokenArr[userTokenArr.length - 2];
    const teamname = userTokenArr[userTokenArr.length - 3];
    const comment = userTokenArr[userTokenArr.length - 4];
    const age = userTokenArr[userTokenArr.length - 5];
    const count = userTokenArr[userTokenArr.length - 5];
    const sex = userTokenArr[userTokenArr.length - 6];

    //team아디
    const id = userTokenArr[userTokenArr.length - 7];

    userId && locationId && teamname && comment && age && count && sex && id
      ? this.props.navigation.navigate("Home", { userId, locationId, teamname, comment, age, count, sex, id })
      : this.props.navigation.navigate("SignIn");
  };

  goSignUp = () => {
    goSignUpCallBack = () => {
      this._bootstrapAsync();
    };
    setTimeout(goSignUpCallBack, 2000);
  };
  componentDidMount = () => {
    this.goSignUp();
  };
  render() {
    return (
      <LinearGradient colors={["coral", "#f44283", "#f441bb", "#8341f4"]} style={styles.backGround}>
        <View style={styles.titleHouse}>
          <Title name="  저기 어때 " />
          <AntDesign id="leftArrow" name="rocket1" size={25} style={{}} />
        </View>

        <Button title="Loading" type="clear" titleStyle={{ color: "white" }} buttonStyle={{}} />
        <Button
          loading
          type="clear"
          loadingProps={{ size: "small", color: "white" }}
          onPress={() => {
            this.props.navigation.navigate("SignIn");
          }}
          underlayColor="transparent"
        />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    left: 0,
    right: 0,
    top: 0
  },
  titleHouse: {
    flex: 0.7,
    marginTop: "40%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    color: "white"
  },
  title: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold"
  },
  rocket: {}
});
