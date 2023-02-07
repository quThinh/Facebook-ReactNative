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
import * as SecureStore from "expo-secure-store";
const axios = require("axios");

import styles from "./Login.style";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "Phone or Email",
      password: "Password",
      name: "Name",
      country: "Country",
      buttonLogin: "Sign Up",
      buttonForgotPassword: "Forgot Password?",
      dashOr: "OR",
      buttonRegister: "Login",

      modalVisible: false,
    };
  }

  toEnglishLanguage = () => {
    this.setState({
      email: "Phone or Email",
      password: "Password",
      buttonLogin: "Sign Up",
      buttonForgotPassword: "Forgot Password?",
      dashOr: "OR",
      buttonRegister: "Create New Facebook Account",
    });
  };

  toVietnameseLanguage = () => {
    this.setState({
      email: "Số điện thoại hoặc email",
      password: "Mật khẩu",
      buttonLogin: "Đăng ký",
      buttonForgotPassword: "Quên mật khẩu ?",
      dashOr: "Hoặc",
      buttonRegister: "Tạo tài khoản facebook mới",
    });
  };

  handleSignin = () => {
    navigation.navigate("SignIn");
  };

  handleSignup = () => {
    axios
      .post("/users/register", {
        email: this.state.inputEmail,
        password: this.state.inputPass,
        firstname: this.state.inputFirstName,
        country: this.state.inputCountry,
      })
      .then((res) => {
        navigation.navigate("SignIn");
      })
      .catch((err) => {
        alert(err);
      });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

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
              <TextInput
                style={styles.textInput}
                placeholder={this.state.name}
                underlineColorAndroid="#2D598C"
                onChangeText={(name) =>
                  this.setState({
                    inputFirstName: name,
                  })
                }
              />
              <TextInput
                style={styles.textInput}
                placeholder={this.state.country}
                underlineColorAndroid="#2D598C"
                onChangeText={(country) =>
                  this.setState({
                    inputCountry: country,
                  })
                }
              />
              <Button
                title={this.state.buttonLogin}
                color="#213970"
                onPress={this.handleSignup}
              />
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
              <Button
                color="#00A400"
                onPress={this.handleSignin}
                title={this.state.buttonRegister}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
