import React, { Component } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
  Button
} from "react-native";
import { Constants } from "expo";

export default class InputModal extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: "",
    email: ""
  };
  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.modalStyle}>
            <View style={styles.inModalStyle}>
              <Text
                style={{
                  marginTop: "10%",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold"
                }}
              >
                상대방에게 보낼 메세지를 작성해주세요.
              </Text>

              <TextInput
                style={styles.input}
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
                ref={ref => {
                  this._nameInput = ref;
                }}
                placeholder="Full Name"
                autoFocus={true}
                autoCapitalize="words"
                autoCorrect={true}
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={this._next}
                blurOnSubmit={false}
              />
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => this.props.visibleHandler()}>
                  <View
                    style={{
                      marginRight: "18%",
                      width: 100,
                      height: 45,
                      borderRadius: 4,
                      borderColor: "#00ff00",
                      borderWidth: 2,
                      background: "transparent",
                      color: "white",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={{ color: "#00ff00", fontWeight: "bold" }}>
                      SEND
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.visibleHandler()}>
                  <View
                    style={{
                      width: 100,
                      height: 45,
                      borderRadius: 4,
                      borderColor: "red",
                      borderWidth: 2,
                      background: "transparent",
                      color: "white",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={{ color: "red", fontWeight: "bold" }}>
                      CANCEL
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "20%",
    height: "100%"
  },
  inModalStyle: {
    height: "100%",
    width: "80%",
    borderColor: "pink",
    borderWidth: 1.5,
    borderRadius: 20,
    borderStyle: "solid",
    backgroundColor: "rgba(52, 52, 52, 0.7)",
    alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1"
  },
  header: {
    paddingTop: 20 + Constants.statusBarHeight,
    padding: 20,
    backgroundColor: "#336699"
  },
  description: {
    fontSize: 14,
    color: "white"
  },
  input: {
    margin: 10,
    marginBottom: 10,
    height: 200,
    width: 250,
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 2,
    fontSize: 16
  },
  dislikeText: {
    borderWidth: 3,
    borderColor: "#ff0000",
    color: "#ff0000",
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    width: 120,
    padding: 6
  }
});
