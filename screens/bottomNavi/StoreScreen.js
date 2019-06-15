import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Platform,
  Button,
  Dimensions,
  Animated,
  PanResponder
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo";
import { Icon } from "react-native-elements";

import TopBarRightIcons from "../../components/bottomNavi/topBarRightIcons";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const Teams = [
  {
    id: 1,
    count: 3,
    age: 22,
    sex: 1,
    comment: "nada sip seggiya",
    teamname: "otaesik",
    locationId: 1,
    userId: 1,
    location: {
      district: "hongdae",
      store: "greenright"
    },
    teamimages: [
      {
        imgUrl: {
          uri:
            "https://i.pinimg.com/564x/25/5a/ec/255aecbaaa04fab4fc27d5461ec49fd9.jpg"
        }
      },
      {
        imgUrl: require("../../assets/team1-1.jpg")
      },
      {
        imgUrl: require("../../assets/team1-2.jpg")
      },
      {
        imgUrl: require("../../assets/team1-3.jpg")
      }
    ]
  },
  {
    id: 2,
    count: 2,
    age: 24,
    sex: 1,
    comment: "sex is a game",
    teamname: "JYPENT",
    locationId: 1,
    userId: 1,
    location: {
      district: "hongdae",
      store: "greenright"
    },
    teamimages: [
      {
        imgUrl: require("../../assets/team2-1.jpg")
      },
      {
        imgUrl: require("../../assets/team2-2.jpg")
      },
      {
        imgUrl: require("../../assets/team2-3.jpg")
      }
    ]
  },
  {
    id: 3,
    count: 2,
    age: 20,
    sex: 1,
    comment: "i love meat",
    teamname: "sukgamoni",
    locationId: 2,
    userId: 1,
    location: {
      district: "hongdae",
      store: "sampo"
    },
    teamimages: [
      {
        imgUrl: require("../../assets/team3-1.jpg")
      },
      {
        imgUrl: require("../../assets/team3-2.jpg")
      },
      {
        imgUrl: require("../../assets/team3-3.jpg")
      }
    ]
  },
  {
    id: 4,
    count: 2,
    age: 20,
    sex: 1,
    comment: "my job is F.B crop. CEO",
    teamname: "simyoung",
    locationId: 2,
    userId: 1,
    location: {
      district: "hongdae",
      store: "sampo"
    },
    teamimages: [
      {
        imgUrl: require("../../assets/team4-1.jpg")
      },
      {
        imgUrl: require("../../assets/team4-2.jpg")
      },
      {
        imgUrl: require("../../assets/team4-3.jpg")
      }
    ]
  },
  {
    id: 5,
    count: 2,
    age: 20,
    sex: 1,
    comment: "i miss minsoo",
    teamname: "Yuna Han",
    locationId: 2,
    userId: 1,
    location: {
      district: "hongdae",
      store: "sampo"
    },
    teamimages: [
      {
        imgUrl: require("../../assets/team5-1.jpg")
      },
      {
        imgUrl: require("../../assets/team5-2.jpg")
      },
      {
        imgUrl: require("../../assets/team5-3.jpg")
      }
    ]
  }
];

export default class StoreScreen extends Component {
  constructor() {
    super();
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
      pictrueIndex: 0
    };

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-10deg", "0deg", "10deg"],
      extrapolate: "clamp"
    });

    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate
        },
        ...this.position.getTranslateTransform()
      ]
    };

    this.titleOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 1, 1],
      extrapolate: "clamp"
    });

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 4],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });

    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 4],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    });

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: "clamp"
    });

    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.6, 1],
      extrapolate: "clamp"
    });
  }
  //상단탭관리(우측상단아이콘관리)_윤민수
  static navigationOptions = ({ navigation }) => {
    return {
      title: "스토어",
      headerRight: <TopBarRightIcons navigation={navigation} />
    };
  };

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        // 오른쪽으로 스와이프 할 때
        // gestureState.dx 값이 120보다 크면 함수실행.
        if (gestureState.dx > 120) {
          // 스와이프한 사진이 화면밖으로 나가게 해서 사라지도록 보이게하는 부분
          // start가 실행되면 사라짐
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            //사라진 다음 다음 사진을 0,0 좌표에 set 하는 부분
            this.setState(
              { currentIndex: this.state.currentIndex + 1, pictrueIndex: 0 },
              () => {
                this.position.setValue({ x: 0, y: 0 });
              }
            );
          });
        }
        // 왼쪽으로 스와이프 할 때
        // gestureState.dx 값이 -120보다 작으면 함수실행.
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState(
              { currentIndex: this.state.currentIndex + 1, pictrueIndex: 0 },
              () => {
                this.position.setValue({ x: 0, y: 0 });
              }
            );
          });
        }
        // 둘다 아니면 실행
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start();
        }
      }
    });
  }

  _onChangeIndex = e => {
    if (
      e === "rightArrow" &&
      this.state.pictrueIndex <
        Teams[this.state.currentIndex].teamimages.length - 1
    ) {
      this.setState({
        pictrueIndex: this.state.pictrueIndex + 1
      });
    }

    if (e === "leftArrow" && this.state.pictrueIndex > 0) {
      this.setState({
        pictrueIndex: this.state.pictrueIndex - 1
      });
    }
  };

  _onPressNope = () => {
    Animated.spring(this.position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: -20 }
    }).start(() => {
      this.setState(
        { currentIndex: this.state.currentIndex + 1, pictrueIndex: 0 },
        () => {
          this.position.setValue({ x: 0, y: 0 });
        }
      );
    });
  };

  _onPressLike = () => {
    Animated.spring(this.position, {
      toValue: { x: SCREEN_WIDTH + 100, y: -20 }
    }).start(() => {
      this.setState(
        { currentIndex: this.state.currentIndex + 1, pictrueIndex: 0 },
        () => {
          this.position.setValue({ x: 0, y: 0 });
        }
      );
    });
  };

  _onPresRefresh = () => {
    this.setState({
      currentIndex: 0,
      pictrueIndex: 0
    });
  };

  renderUsers = () => {
    return Teams.map((item, i) => {
      // 스와이프가 인식되면 this.state.currentIndex 1씩 증가
      if (i < this.state.currentIndex) {
        return null;
      } else if (i === this.state.currentIndex) {
        return (
          // 0보다 작 무조건

          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id}
            style={[
              this.rotateAndTranslate,
              {
                height: (SCREEN_HEIGHT * 3) / 4,
                width: SCREEN_WIDTH,
                padding: 10,
                paddingBottom: 20,
                position: "absolute"
              }
            ]}
          >
            <Animated.View
              style={{ opacity: this.likeOpacity, ...styles.likeBorder }}
            >
              <Text style={styles.likeText}>LIKE</Text>
            </Animated.View>

            <Animated.View
              style={{ opacity: this.dislikeOpacity, ...styles.dislikeBorder }}
            >
              <Text style={styles.dislikeText}>NOPE</Text>
            </Animated.View>

            <Image
              style={{
                flex: 1,
                height: "100%",
                width: "100%",
                resizeMode: "cover",
                borderRadius: 20
              }}
              source={item.teamimages[this.state.pictrueIndex].imgUrl}
            />
            <Animated.View
              style={{
                opacity: this.titleOpacity,
                zIndex: 1000,
                position: "absolute",
                marginTop: "96%",
                height: 200,
                marginLeft: "5%"
              }}
            >
              <Text
                style={{
                  color: "floralwhite",
                  fontWeight: "bold",
                  fontSize: 20
                }}
              >
                트벤져스
              </Text>
              <Text
                style={{
                  color: "floralwhite",
                  fontWeight: "bold",
                  fontSize: 15
                }}
              >
                한짝가능요
              </Text>
            </Animated.View>
          </Animated.View>
        );
      } else {
        return (
          <Animated.View
            key={item.id}
            style={[
              {
                opacity: this.nextCardOpacity,
                transform: [{ scale: this.nextCardScale }],
                height: (SCREEN_HEIGHT * 3) / 4,
                width: SCREEN_WIDTH,
                padding: 10,
                paddingBottom: 20,
                position: "absolute"
              }
            ]}
          >
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20
              }}
              source={item.teamimages[0].imgUrl}
            />
          </Animated.View>
        );
      }
    }).reverse();
  };

  render() {
    return (
      <View style={{ ...styles.backGround }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            alignContent: "center"
          }}
        >
          <View style={{ flex: 0.9, height: "100%", flexDirection: "column" }}>
            {this.renderUsers()}
          </View>
          <View style={styles.arrow}>
            <AntDesign
              id="leftArrow"
              name="leftcircleo"
              style={styles.leftArrow}
              onPress={() => this._onChangeIndex("leftArrow")}
            />
            <View>
              <Ionicons
                name="md-refresh"
                style={styles.refreshButton}
                onPress={() => this._onPresRefresh()}
              />
            </View>
            <AntDesign
              id="rightArrow"
              name="rightcircleo"
              style={styles.rigthArrow}
              onPress={() => this._onChangeIndex("rightArrow")}
            />
          </View>
          {/* <View style={{ ...styles.likeButton }}>
            <Text onPress={() => this._onPressLike()} style={styles.likeText}>
              LIKE
            </Text>
          </View>
          <View>
            <Ionicons name="md-refresh" style={styles.refreshButton} onPress={() => this._onPresRefresh()} />
          </View>
          <View style={{ ...styles.disLikeButton }}>
            <Text onPress={() => this._onPressNope()} style={styles.dislikeText}>
              NOPE
            </Text>
          </View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    color: "#F9F9F8"
  },
  headerRightIcon: {
    marginRight: 15
  },
  disLikeButton: {
    position: "absolute",
    top: 480,
    left: 10,
    zIndex: 1000
  },
  likeButton: {
    position: "absolute",
    top: 480,
    right: 10,
    zIndex: 1000
  },
  likeBorder: {
    transform: [{ rotate: "-30deg" }],
    position: "absolute",
    top: 50,
    left: 40,
    zIndex: 1000
  },
  dislikeBorder: {
    transform: [{ rotate: "30deg" }],
    position: "absolute",
    top: 50,
    right: 40,
    zIndex: 1000
  },
  likeText: {
    borderWidth: 3,
    borderColor: "#00ff00",
    color: "#00ff00",
    fontSize: 32,
    fontWeight: "800",
    width: 120,
    textAlign: "center",
    padding: 6
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
  },
  arrow: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    alignItems: "center",
    paddingRight: "10%",
    paddingLeft: "10%"
  },
  rigthArrow: {
    height: "100%",
    fontSize: 23
  },
  leftArrow: {
    height: "100%",
    fontSize: 23
  },
  refreshButton: {
    height: "100%",
    color: "mediumturquoise",
    fontSize: 28
  },
  headerRightIcon: {
    marginRight: 15
  }
});
