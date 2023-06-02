import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import styled from "styled-components/native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { io } from "socket.io-client";
import {
  useGetSingleUserQuery,
  useAddMessageMutation,
  useGetMessagesQuery,
} from "../app/feature/user/apiSlice";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

export default function Chat() {
  const [message, setMessages] = useState([]);
  const scrollRef = useRef();
  const host = "https://chatwave.onrender.com/api/v1";
  const socket = useRef();
  const [addMessage, { isSuccess: success }] = useAddMessageMutation();
  const navigation = useNavigation();
  const [msg, setMsg] = useState("");
  const [token, setToken] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const route = useRoute();
  const { userId } = route.params;

  useEffect(() => {
    const getParams = async () => {
      const token = await AsyncStorage.getItem("token");
      const decodedId = jwt_decode(token).id;
      setToken(decodedId);
    };
    getParams();
  }, []);

  useEffect(() => {
    if (token) {
      socket.current = io(host);
      socket.current.emit("add-user", token);
    }
  }, [token]);

  const { data, isSuccess, refetch } = useGetSingleUserQuery(userId);
  const user = data?.data;

  const {
    data: messages,
    isSuccess: successMessages,
    refetch: get,
  } = useGetMessagesQuery({
    from: token,
    to: userId,
  });

  useEffect(() => {
    if (messages) {
      setMessages(messages);
    }
  }, [messages]);


  useEffect(() => {
    refetch();
    get();
  }, []);

  const handleSend = async () => {
    const data = {
      from: token,
      message: msg,
      to: user._id,
    };

    await addMessage(data).unwrap();
    setMsg("");

    socket.current.emit("send-msg",{
      from: token,
      message: msg,
      to: user._id,
    })

    const msgs = [...message];
    msgs.push({fromSelf: true, message: msg});
    setMessages(msgs);
  };

  useEffect(() => {
    if(socket.current){
      socket.current.on("msg-recieve", (msg)=> {
        console.log({msg})
        setArrivalMessage({fromSelf:false, message: msg })
      })
    }
  })

  useEffect(() => {
    arrivalMessage  && setMessages.push((prev)=> [...prev, arrivalMessage])
  }, [arrivalMessage])


  useEffect(()=> {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [message])

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#202C33" />
      <Container>
        <HeaderCon>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="ios-arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <AvatarCon></AvatarCon>
          <View style={{ flex: 1 }}>
            {isSuccess && (
              <Text
                style={{
                  color: "white",
                  fontFamily: "Medium",
                  fontSize: 18,
                  marginLeft: 14,
                }}
              >
                {user.username}
              </Text>
            )}
          </View>
          <ActionCon>
            <TouchableOpacity style={{ marginHorizontal: 10 }}>
              <Ionicons name="ios-call" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginHorizontal: 10 }}>
              <Ionicons name="ios-videocam" size={25} color="white" />
            </TouchableOpacity>
          </ActionCon>
        </HeaderCon>
        <View style={{ height: "100%", backgroundColor: "#111B21", flex: 1}}>
        <ScrollView style={{ height: "100%" }}>
          <MessageCon>
            <MessageView>
              {successMessages &&
                message?.map((msg, index) => (
                  <MessageText fromSelf={msg?.fromSelf} key={index}>
                    {msg?.message}
                  </MessageText>
                ))}
            </MessageView>
          </MessageCon>
        </ScrollView>
        </View>
        <InputCon>
          <Input
            placeholder="Type Message..."
            value={msg}
            onChangeText={setMsg}
            multiline={true}
          />
          <IconCon onPress={handleSend}>
            <MaterialCommunityIcons
              name="send-outline"
              size={24}
              color="white"
            />
          </IconCon>
        </InputCon>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: #111B21;
`;

const HeaderCon = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  background-color: #202c33;
  height: 80px;
`;

const AvatarCon = styled.View`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: #fff;
  margin-left: 15px;
`;

const MessageCon = styled.View`
  height: 100%;
  width: 100%;
  background-color: #111b21;
  padding: 15px;
`;

const ActionCon = styled.View`
  flex-direction: row;
  align-items: center;
`;

const InputCon = styled.View`
  
  width: 99%;
  height: 55px;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: #202c33;
  margin-bottom: 12px;
`;

const Input = styled.TextInput`
  background-color: #2a3942;
  height: 100%;
  width: 88%;
  border-radius: 30px;
  padding: 0 10px;
  color: white;
  font-family: "Medium";
  
`;

const IconCon = styled.TouchableOpacity`
  width: 12%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #2a3942;
  margin-left: 3px;
`;

const MessageView = styled.View`
  margin: 10px 0;
`;

const MessageText = styled.Text`
  padding: 10px;
  background-color: #005c4b;
  color: white;
  font-family: "Medium";
  font-size: 15px;
  margin-bottom: 10px;
  align-self: ${(props) => (props.fromSelf ? "flex-end" : "flex-start")};
  max-width: 80%;
  overflow: hidden;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-left-radius: ${(props) => (props.fromSelf ? "10px" : "0px")};
  border-top-right-radius: ${(props) => (props.fromSelf ? "0px" : "10px")};
`;


//position: absolute;
//bottom: 10px;