import React, { Fragment, Component } from "react";
import { StyleSheet, Text, View, Modal, KeyboardAvoidingView } from "react-native";
import { Input, Button } from "react-native-elements";

import { LinearGradient, Constants } from "expo";
import { url } from "../../url";

class SignUpTitle extends Component {
  render() {
    return (
      <Fragment>
        <Text style={styles.title}>SignUp</Text>
      </Fragment>
    );
  }
}

class InputBars extends Component {
  render() {
    const { changeErr, errorMsg } = this.props;

    return (
      <View style={styles.inputContainer}>
        <Input
          placeholder="  Write ID"
          textAlign={"center"}
          leftIcon={{ type: "font-awesome", name: "user" }}
          containerStyle={{ marginBottom: 20, width: "90%" }}
          clearButtonMode="always"
          onChangeText={text => changeErr("nickname", "errorNickname", text)}
        />
        {errorMsg("errorNickname")}
        <Input
          placeholder="  Write PASSWORD"
          textAlign={"center"}
          leftIcon={{ type: "font-awesome", name: "lock" }}
          containerStyle={{ marginBottom: 20, width: "90%" }}
          onChangeText={text => changeErr("password", "errorPassword", text)}
          clearButtonMode="always"
        />
        {errorMsg("errorPassword")}
        <Input
          placeholder="  Write PASSWORD again"
          textAlign={"center"}
          leftIcon={{ type: "font-awesome", name: "lock" }}
          containerStyle={{ marginBottom: 20, width: "90%" }}
          onChangeText={text => changeErr("password_CHECK", "errorCheck", text)}
          clearButtonMode="always"
        />
        {errorMsg("errorCheck")}
      </View>
    );
  }
}

export default class SignUp extends Component {
  flag = false;

  state = {
    nickname: "",
    password: "",
    password_CHECK: "",
    errorNickname: "",
    errorPassword: "",
    errorCheck: "",
    modalVisible: false,
    userId: null
  };

  //id, password설정 및 에러 메세지 설정해주기 (아이디, 패스워드에 따라 재활용가능한 함수)
  _changeErr = (key, errName, text) => {
    this.setState({
      [key]: text,
      [errName]: ""
    });
  };

  //에러 메세지 띄우기
  _errorMsg = check => {
    const state = this.state;
    if (state[check]) {
      return <Text style={{ color: "white" }}>{state[check]}</Text>;
    }
  };

  //SignIn페이지로 보내기
  _signInAsync = () => {
    this.props.navigation.navigate("SignIn");
  };

  _setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _submit = async () => {
    await this._errorMessages();

    if (
      this.state.nickname.length &&
      this.state.password.length &&
      this.state.errorNickname.length === 0 &&
      this.state.errorPassword.length === 0 &&
      this.state.password === this.state.password_CHECK
    ) {
      fetch(`${url}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nickname: this.state.nickname,
          password: this.state.password
        })
      }).then(async res => {
        if (res.ok) {
          console.log("--------sign up success---------", res.ok);
          flag = true;

          this._signInAsync();
        } else {
          console.log("--------sign up fail---------", res.ok);
          flag = false;
          this._setModalVisible(true);
        }
      });
    }
  };

  //id, password 에러 잡아내는 함수 에러 없다면 this._submit함수 실행시켜서 회원가입시도
  _errorMessages = () => {
    //닉네임은 한글 영문 숫자 포함 4~8글자
    var regTypeID = /^[a-zA-Z0-9+]{4,8}$/gi;
    //비밀번호는 영문 대소문자 및 숫자 또는 특수문자 포함 6-20글자
    var regTypePW = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
    if (this.state.nickname === "") {
      this.setState(() => ({ errorNickname: "아이디를 작성해주세요" }));
      flag = false;
    } else if (!regTypeID.test(this.state.nickname)) {
      this.setState(() => ({ errorNickname: "아이디는 영문, 숫자 포함 4-8글자입니다" }));
      flag = false;
    } else {
      this.setState(() => ({ errorNickname: "" }));
      flag = true;
    }
    if (this.state.password === "") {
      this.setState(() => ({ errorPassword: "비밀번호를 작성해주세요" }));
      flag = false;
    } else if (!regTypePW.test(this.state.password)) {
      this.setState(() => ({ errorPassword: "비밀번호는 영문 및 숫자 혹은 특수문자 포함 6-20글자입니다" }));
      flag = false;
    } else {
      this.setState(() => ({ errorPassword: "" }));
      flag = true;
    }
    if (this.state.password !== this.state.password_CHECK) {
      this.setState(() => ({ errorCheck: "비밀번호가 일치하지 않습니다" }));
      flag = false;
    } else {
      this.setState(() => ({ errorCheck: "" }));
      flag = true;
    }
    if (this.state.nickname === "" || this.state.password === "" || this.state.password_CHECK === "") {
      flag = false;
    }
    return flag;
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={["coral", "#f44283", "#f441bb", "#8341f4"]} style={styles.backGround}>
          <SignUpTitle />
          <KeyboardAvoidingView style={styles.KeyboardAvoidingViewStyle} behavior="padding" enabled>
            <InputBars changeErr={this._changeErr} errorMsg={this._errorMsg} />
          </KeyboardAvoidingView>
          <View style={styles.buttonHouse}>
            <Button
              title="Submit"
              color="white"
              buttonStyle={{width:"100%"}}
              onPress={this._submit}
              icon={{ type: "font-awesome", name: "check-circle", color: "pink" }}
            />
            <Button
              icon={{ type: "font-awesome", name: "check-circle", color: "pink" }}
              title=" SignIn "
              color="white"
              buttonStyle={{width:"100%"}}
              onPress={() => {
                this.props.navigation.navigate("SignIn");
              }}
            />
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.modalStyle}>
              <View style={styles.inModalStyle}>
                <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", padding: 15 }}>
                  {" "}
                  아이디가 이미 존재합니다{" "}
                </Text>
                <Button
                  title=" close "
                  color="black"
                  onPress={() => {
                    this._setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text> OK </Text>
                </Button>
              </View>
            </View>
          </Modal>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },

  backGround: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    left: 0,
    right: 0,
    top: 0
  },
  title: {
    paddingTop: "15%",
    flex: 0.2,
    flexDirection: "column",
    color: "white",
    fontSize: 30
  },
  KeyboardAvoidingViewStyle: { flex: 0.5, width: "100%", paddingTop: Constants.statusBarHeight },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: "white",
    width: "100%",
    fontSize: 20
  },
  buttonHouse: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginBottom: "10%"
  },
  modalStyle: {
    flex: 1,
    // flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center"
  },
  inModalStyle: {
    height: "25%",
    width: "80%",
    borderColor: "pink",
    borderRadius: 20,
    borderWidth: 1.5,
    borderStyle: "solid",
    backgroundColor: "rgba(52, 52, 52, 0.7)",
    alignItems: "center",
    justifyContent: "center"
  }
});
