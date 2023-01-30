import React, { Component } from "react";
import {
  Alert,
  Modal,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { navigation } from "../../../rootNavigation";

const axios = require("axios");

import styles from "./Login.style";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "Phone or Email",
      password: "Password",
      buttonLogin: "Log In",
      buttonForgotPassword: "Forgot Password?",
      dashOr: "OR",
      buttonRegister: "Create New Facebook Account",

      inputEmail: "",
      inputPass: "",

      modalVisible: false,
    };
  }

  toEnglishLanguage = () => {
    this.setState({
      email: "Phone or Email",
      password: "Password",
      buttonLogin: "Log In",
      buttonForgotPassword: "Forgot Password?",
      dashOr: "OR",
      buttonRegister: "Create New Facebook Account",
    });
  };

  toVietnameseLanguage = () => {
    this.setState({
      email: "Số điện thoại hoặc email",
      password: "Mật khẩu",
      buttonLogin: "Đăng nhập",
      buttonForgotPassword: "Quên mật khẩu ?",
      dashOr: "Hoặc",
      buttonRegister: "Tạo tài khoản facebook mới",
    });
  };

  handleLogin = () => {
    axios
      .post("http://192.168.224.110:8080/users/login", {
        email: this.state.inputEmail,
        password: this.state.inputPass,
      })
      .then((res) => {
        const data = res.data.user;
        if (data == null) {
          alert("Thiếu thông tin");
          console.log(res);
        } else {
          console.log("success");
          navigation.navigate("MainTab");
        }
      })
      .catch((err) => {
        console.log("auth create", err);
        console.log(this.state.inputEmail);
        alert("Sai tên đăng nhập hoặc mật khẩu");
      });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  // goToHome = (screenName) => {
  //   Navigation.push(this.props.componentId,{
  //     component:{
  //       name:screenName
  //     }
  //   });
  // }

  render() {
    return (
      <ScrollView>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#30477c"
          translucent={true}
        />
        <View style={styles.container}>
          <Modal
            style={{ height: "90%", width: "90%" }}
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
          ></Modal>

          <Image
            style={styles.banner}
            source={require("../../../assets/img/logo/login-banner.jpg")}
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity>
              <Text
                style={styles.textLanguage}
                onPress={this.toEnglishLanguage}
              >
                English{" "}
              </Text>
            </TouchableOpacity>
            <Text style={styles.textLanguage}>&bull;</Text>
            <TouchableOpacity>
              <Text
                style={styles.textLanguage}
                onPress={this.toVietnameseLanguage}
              >
                Vietnamese
              </Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
            ></Modal>
          </View>
          <View style={styles.form}>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.textInput}
                placeholder={this.state.email}
                underlineColorAndroid="#2D598C"
                onChangeText={(email) =>
                  this.setState({
                    inputEmail: email,
                  })
                }
              />
              <TextInput
                style={styles.textInput}
                placeholder={this.state.password}
                textContentType="password"
                secureTextEntry={true}
                underlineColorAndroid="#2D598C"
                onChangeText={(pass) =>
                  this.setState({
                    inputPass: pass,
                  })
                }
              />
              <Button
                title={this.state.buttonLogin}
                color="#213970"
                onPress={this.handleLogin}
              />
            </View>
            <View style={styles.wrapperButtonForgot}>
              <Text style={styles.buttonForgot}>
                {this.state.buttonForgotPassword}
              </Text>
            </View>
            <View style={styles.wrapperHr}>
              <Text style={styles.hr}></Text>
              <Text
                style={{ justifyContent: "center", alignContent: "center" }}
              >
                {this.state.dashOr}
              </Text>
              <Text style={styles.hr}></Text>
            </View>

            <View style={styles.wrapperButtonSignUp}>
              <Button color="#00A400" title={this.state.buttonRegister} />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
