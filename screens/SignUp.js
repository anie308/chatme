import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useRegisterUserMutation } from "../app/feature/user/apiSlice";
import { StatusBar } from "expo-status-bar";


export default function SignUp() {
  const [registerUser, {isLoading}] = useRegisterUserMutation()
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const handlePress = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("Please Fill All Fields");
    } else {
      try{
        const user = { email, username, password}
      const response = await registerUser(user).unwrap();
      console.log(response)
        showMessage({
          message: "Sign In Success",
          description: response.message,
          type: "success",
          icon: "success",
        });
        navigation.navigate("login");
      } catch(err){
        console.log(err)
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

      <Container>
        <LogoCon></LogoCon>
        <TextCon>
          <HeadText style={{color:'white'}}>Sign Up to ChatWave Social App</HeadText>
          <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
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
          <Input placeholder="Username"
          placeholderTextColor="white"
          value={username} onChangeText={setUsername} />
          <Input placeholder="Email"
          placeholderTextColor="white"
          value={email} onChangeText={setEmail} />
          <Input
            placeholder="Password"
            placeholderTextColor="white"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <SubmitBtn onPress={handlePress}>
           {
             isLoading ? <ActivityIndicator color="#fff" /> : <BodyText style={{ color: "white", fontSize: 16 }}>
             Sign Up
           </BodyText>
           }
          </SubmitBtn>
        </FormCon>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.KeyboardAvoidingView`
  padding: 20px;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background-color: #0B141A;

`;
const LogoCon = styled.View`
  margin-top: 60px;
  height: 150px;
  width: 150px;
  background-color: #005c4b;
  border-radius: 75px;
  border: 10px solid #e9edf1;
`;

const TextCon = styled.View`
  height: 50px;
  width: 100%;
  margin-top: 50px;
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
  margin-top: 40px;
`;

const Input = styled.TextInput`
  border: 1.5px solid #005c4b;
  height: 60px;
  border-radius: 12px;
  padding: 10px;
  font-family: "Regular";
  font-size: 15px;
  margin-top: 30px;
  color: white;

`;

const SubmitBtn = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  background-color: #005c4b;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  border-radius: 12px;
`;

// <View className="h-[100%] bg-blue-500  pt-[100px] px-[20px]">
// <View>
//   <View className="flex flex-row w-full items-center justify-center">
//     <Text className=" text-center text-[30px]">Uni</Text>
//     <Text className=" text-center text-[30px] ">Chat</Text>
//   </View>
// </View>
// <View className="mt-[90px] space-y-[40px]">
//   <TextInput
//     className="border-[2px] border-blue-300 h-[60px] px-[10px] rounded-[5px]"
//
//   />
//   <TextInput
//     className="border-[2px] border-blue-300 h-[60px] px-[10px] rounded-[5px]"
//     placeholder="Password"
//
//     value={password}
//     onChangeText={setPassword}
//     placeholderTextColor="white"
//   />
//   <TouchableOpacity
//     className="h-[50px] bg-white flex items-center justify-center rounded-[5px] disabled:bg-gray-200"
//     onPress={handlePress}
//   //   disabled={!password || !email}
//   >
//     <Text>Sign In</Text>
//   </TouchableOpacity>
//   <View className='flex flex-row items-center space-x-[10px] w-full justify-center'>
//       <Text className=''>
//           Don't have an account?

//       </Text>
//       <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//               <Text>SignUp</Text>
//           </TouchableOpacity>
//   </View>
// </View>
// </View>
