import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useRegisterUserMutation } from "../app/feature/user/apiSlice";
import { StatusBar } from "expo-status-bar";
import { useHeaderHeight } from "@react-navigation/elements";

export default function SignUp() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const headerHeight = useHeaderHeight();

  const handlePress = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("Please Fill All Fields");
    } else {
      try {
        const user = { email, username, password };
        const response = await registerUser(user).unwrap();
        console.log(response);
        showMessage({
          message: "Sign In Success",
          description: response.message,
          type: "success",
          icon: "success",
        });
        navigation.navigate("login");
      } catch (err) {
        showMessage({
          message: err.message || err.data.message,
          type: "danger",
          icon: "danger",
        });
      }
    }
  };
  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#0B141A" />

      <KeyboardAvoidingView
        style={{ height: "100%", backgroundColor: "#0b141a" }}
        contentContainerStyle={{ backgroundColor: "#0b141a" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={headerHeight}
      >
        <Container>
          <LogoCon></LogoCon>
          <TextCon>
            <HeadText style={{ color: "white" }}>
              Sign Up to ChatWave Social App
            </HeadText>
            <View
              style={{ display: "flex", flexDirection: "row", marginTop: 5 }}
            >
              <BodyText style={{ color: "white" }}>Returning User?</BodyText>
              <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <BodyText
                  style={{ color: "#005c4b", marginLeft: 5, fontWeight: 600 }}
                >
                  Sign In
                </BodyText>
              </TouchableOpacity>
            </View>
          </TextCon>
          <FormCon>
            <Input
              placeholder="Username"
              placeholderTextColor="white"
              value={username}
              onChangeText={setUsername}
            />
            <Input
              placeholder="Email"
              placeholderTextColor="white"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              placeholder="Password"
              placeholderTextColor="white"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <SubmitBtn onPress={handlePress}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <BodyText style={{ color: "white", fontSize: 16 }}>
                  Sign Up
                </BodyText>
              )}
            </SubmitBtn>
          </FormCon>
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const Container = styled.KeyboardAvoidingView`
  padding: 20px;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background-color: #0b141a;
`;
const LogoCon = styled.View`
  margin-top: 40px;
  height: 150px;
  width: 150px;
  background-color: #005c4b;
  border-radius: 75px;
  border: 10px solid #e9edf1;
`;

const TextCon = styled.View`
  height: 50px;
  width: 100%;
  margin-top: 25px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const HeadText = styled.Text`
  font-family: "Medium";
  font-size: 16px;
`;
const BodyText = styled.Text`
  font-family: "Medium";
  font-size: 14px;
`;
const FormCon = styled.View`
  width: 100%;
  margin-top: 5px;
`;

const Input = styled.TextInput`
  border: 1.5px solid #005c4b;
  height: 60px;
  border-radius: 12px;
  padding: 10px;
  font-family: "Regular";
  font-size: 15px;
  margin-top: 15px;
  color: white;
`;

const SubmitBtn = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  background-color: #005c4b;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  border-radius: 12px;
`;
