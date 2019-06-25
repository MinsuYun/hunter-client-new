import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  AsyncStorage
} from "react-native";

import InputModal from "./InputModal";
import {
  SimpleLineIcons,
  FontAwesome,
  Foundation,
  MaterialIcons
} from "@expo/vector-icons";

import TopBarRightIcons from "../../components/bottomNavi/topBarRightIcons";
import { url } from "../../url";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
var loginUser = {};
var defaultUrl =
  "https://hunter-bucker.s3.ap-northeast-2.amazonaws.com/assets/no_img.jpg";
var noTeamUrl =
  "https://hunter-bucker.s3.ap-northeast-2.amazonaws.com/assets/no_teams.jpg";

export default class StoreScreen extends Component {
  constructor() {
    super();
    this.position = new Animated.ValueXY();
    this.state = {
      teams: [],
      currentIndex: 0,
      pictureIndex: 0,
      modalVisible: false
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

  componentDidMount() {
    this._getTeamsOnStore();
  }

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
              {
                currentIndex: this.state.currentIndex + 1,
                pictureIndex: 0
              },
              () => {
                this.position.setValue({ x: 0, y: 0 });
              }
              // this._sendToLike()
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
              {
                currentIndex: this.state.currentIndex + 1,
                pictureIndex: 0
              },
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

  _visibleHandler = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };

  _getTeamsOnStore = async () => {
    let userToken = await AsyncStorage.getItem("userToken");
    userToken = userToken.split("-");

    console.log("-----------------TeamGetOnStore-----------------");

    // 전역에서 loginUser 사용해야하기 때문에 변수타입 선언 안했음
    loginUser = {
      sex: Number(userToken[1]),
      count: Number(userToken[2]),
      age: Number(userToken[3]),
      comment: userToken[4],
      teamname: userToken[5],
      districtId: Number(userToken[6]),
      storeId: Number(userToken[7]),
      userId: Number(userToken[8]),
      teamId: Number(userToken[9])
    };

    fetch(`${url}/teams/store/${loginUser.storeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(result => result.json())
      .then(teamList => {
        let filterTeam = teamList.filter(list => {
          return (
            loginUser.sex !== list.sex && loginUser.storeId === list.storeId
          );
        });
        // 접속한 유저와 다른 성별의 팀을 필터하여 setState
        this.setState({
          teams: filterTeam,
          teamName: loginUser.teamname,
          teamComment: loginUser.comment
        });
      });
  };

  _sendToLike = async () => {
    let getTeamId = await this._getTeamId(
      this.state.teams[this.state.currentIndex].userId
    );

    let whoLikeId = loginUser.teamId;
    let toLikeId = getTeamId;

    console.log(whoLikeId, toLikeId, "whoLiked toLiked");

    fetch(`${url}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        whoLikeId: whoLikeId,
        toLikeId: toLikeId,
        introText: "우리 15번자리인데 합석하쉴?"
      })
    });
  };

  _getTeamId = async userId => {
    let teamId;
    await fetch(`${url}/teams/getUserIdTeam/` + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(result => result.json())
      .then(data => (teamId = data.getUserId.teams[0].id));
    return teamId;
  };

  _popModal = () => {
    this.setState({
      modalVisible: true
    });
  };

  _onChangeIndex = e => {
    if (this.state.currentIndex === this.state.teams.length) {
      return null;
    } else if (
      e === "rightArrow" &&
      this.state.pictureIndex <
        this.state.teams[this.state.currentIndex].teamimages.length - 1
    ) {
      this.setState({
        pictureIndex: this.state.pictureIndex + 1
      });
    } else if (e === "leftArrow" && this.state.pictureIndex > 0) {
      this.setState({
        pictureIndex: this.state.pictureIndex - 1
      });
    }
  };

  // _onPressNope = () => {
  //   Animated.spring(this.position, {
  //     toValue: { x: -SCREEN_WIDTH - 100, y: -20 }
  //   }).start(() => {
  //     this.setState(
  //       { currentIndex: this.state.currentIndex + 1, pictureIndex: 0 },
  //       () => {
  //         this.position.setValue({ x: 0, y: 0 });
  //       }
  //     );
  //   });
  // };

  // _onPressLike = () => {
  //   Animated.spring(this.position, {
  //     toValue: { x: SCREEN_WIDTH + 100, y: -20 }
  //   }).start(() => {
  //     this.setState(
  //       { currentIndex: this.state.currentIndex + 1, pictureIndex: 0 },
  //       () => {
  //         this.position.setValue({ x: 0, y: 0 });
  //       }
  //     );
  //   });
  // };

  _onPresRefresh = () => {
    this.setState({
      currentIndex: 0,
      pictureIndex: 0
    });
    this._getTeamsOnStore();
  };

  renderUsers = () => {
    return this.state.teams.length &&
      this.state.currentIndex < this.state.teams.length ? (
      this.state.teams
        .map((item, i) => {
          // 스와이프가 인식되면 this.state.currentIndex 1씩 증가
          if (i < this.state.currentIndex) {
            return null;
          } else if (i === this.state.currentIndex) {
            return (
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
                  style={{
                    opacity: this.dislikeOpacity,
                    ...styles.dislikeBorder
                  }}
                >
                  <Text style={styles.dislikeText}>NOPE</Text>
                </Animated.View>

                {item.teamimages.length ? (
                  <Image
                    style={{ ...styles.cardImage }}
                    source={{
                      uri: `${item.teamimages[this.state.pictureIndex].imgUrl +
                        "?" +
                        new Date()}`
                    }}
                  />
                ) : (
                  <Image
                    style={{ ...styles.cardImage }}
                    source={{ uri: `${defaultUrl}` }}
                  />
                )}

                <Animated.View
                  style={{
                    flex: 1,
                    opacity: this.titleOpacity,
                    zIndex: 1200,
                    position: "absolute",
                    paddingTop: "13%",
                    height: "100%",
                    marginLeft: "6%"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ ...styles.teamName }}>
                      {this.state.teams[this.state.currentIndex].teamname}
                    </Text>
                    <Text style={{ ...styles.age }}>
                      {this.state.teams[this.state.currentIndex].age}
                    </Text>
                  </View>
                  <Text style={{ ...styles.comment }}>
                    {this.state.teams[this.state.currentIndex].comment}
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
                {item.teamimages.length ? (
                  <Image
                    style={{ ...styles.cardImage }}
                    source={{
                      uri: `${item.teamimages[0].imgUrl}` + "?" + new Date()
                    }}
                  />
                ) : (
                  <Image
                    style={{ ...styles.cardImage }}
                    source={{ uri: `${defaultUrl}` }}
                  />
                )}
              </Animated.View>
            );
          }
        })
        .reverse()
    ) : (
      <View
        style={{
          height: (SCREEN_HEIGHT * 3) / 4,
          width: SCREEN_WIDTH,
          justifyContent: "center",
          paddingTop: "5%",
          height: "115%"
        }}
      >
        <Image
          style={{
            ...styles.cardImage,
            position: "absolute"
          }}
          source={{ uri: `${noTeamUrl}` }}
        />
        <Text
          style={{
            ...styles.teamName,
            textAlign: "center",
            padding: "15%"
          }}
        >
          더 이상 팀이 없거나, 등록된 팀이 없습니다. {"\n"} 좌측 하단의 버튼으로
          팀을 갱신해 보세요.
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={{ ...styles.backGround }}>
        <View
          style={{
            flex: 0.9,
            height: "100%",
            flexDirection: "column"
          }}
        >
          {this.renderUsers()}
        </View>
        <View style={{ ...styles.featrueIcon }}>
          <Foundation
            // 새로고침
            name="refresh"
            style={styles.refreshButton}
            onPress={() => this._onPresRefresh()}
          />
          <FontAwesome
            // 쪽지 보내기
            name="send"
            style={styles.sendLetter}
            onPress={() => this._popModal()}
          />
        </View>

        <View style={{ ...styles.arrow }}>
          <SimpleLineIcons
            id="leftArrow"
            name="arrow-left"
            style={styles.leftArrow}
            onPress={() => this._onChangeIndex("leftArrow")}
          />

          <SimpleLineIcons
            id="rightArrow"
            name="arrow-right"
            style={styles.rigthArrow}
            onPress={() => this._onChangeIndex("rightArrow")}
          />
        </View>

        <View>
          {this.state.modalVisible && (
            <InputModal visibleHandler={this._visibleHandler} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    backgroundColor: "#222222",
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
  featrueIcon: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "5%",
    marginRight: "7%",
    paddingBottom: "5%",
    alignContent: "center"
  },
  arrow: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    marginBottom: "1%"
  },
  rigthArrow: {
    height: "100%",
    color: "#dd00ff",
    fontSize: 40
  },
  leftArrow: {
    height: "100%",
    color: "#dd00ff",
    fontSize: 40
  },
  refreshButton: {
    height: "100%",
    color: "mediumturquoise",
    fontSize: 38
  },
  sendLetter: {
    height: "100%",
    color: "mediumturquoise",
    fontSize: 33
  },
  headerRightIcon: {
    marginRight: 15
  },
  cardImage: {
    flex: 1,
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 20
  },
  teamName: {
    color: "floralwhite",
    fontWeight: "bold",
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  age: {
    color: "floralwhite",
    fontWeight: "bold",
    fontSize: 18,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  comment: {
    color: "floralwhite",
    fontWeight: "bold",
    fontSize: 15,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
});
