import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import jwt_decode from "jwt-decode";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import FloatingMesageIcon from "../components/FloatingMessages";
import { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../app/feature/user/apiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

export default function Chats() {
  const [drop, setDrop] = useState(true);
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      const decodedId = jwt_decode(token).id;
      setToken(decodedId);
    };
    getToken();
  }, []);
  const { data, error, isLoading, refetch } = useGetAllUsersQuery(token);
  useEffect(() => {
    refetch(token);
  }, []);
  const recentChats = data?.data;

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token")
   navigation.navigate("login");
  };

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#202C33" />
      <Container>
        <Header>
          <ChatText>Chats</ChatText>
          <IconCon>
            <TouchableOpacity onPress={handleLogout}>
              <AntDesign name="logout" size={24} color="white" />
            </TouchableOpacity>
          </IconCon>
        </Header>
        <View style={{ backgroundColor: "#111B21", height: "100%" }}>
          {isLoading ? (
            <View>
              <ActivityIndicator size="large" color="blue" />
              <Text>Loading..</Text>
            </View>
          ) : (
            <>
              {error ? (
                <View>
                  <Text>Something went wrong</Text>
                </View>
              ) : (
                <View>
                  {recentChats?.length > 0 ? (
                    <View>
                      {recentChats?.map(({ _id, username, avatar }) => (
                        <UserCon
                          key={_id}
                          onPress={() =>
                            navigation.navigate("chat", { userId: _id })
                          }
                        >
                          <AvatarCon></AvatarCon>
                          <MessageCon>
                            <Text
                              style={{
                                fontFamily: "Medium",
                                fontSize: 18,
                                color: "white",
                              }}
                            >
                              {username}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "Medium",
                                fontSize: 12,
                                color: "white",
                              }}
                            >
                              last message
                            </Text>
                          </MessageCon>
                          <Date>
                            <Text
                              style={{
                                fontFamily: "Medium",
                                fontSize: 12,
                                color: "#00A884",
                              }}
                            >
                              5/30/23
                            </Text>
                            <Text
                              style={{
                                fontFamily: "Medium",
                                fontSize: 10,
                                color: "#00A884",
                              }}
                            >
                              1
                            </Text>
                          </Date>
                        </UserCon>
                      ))}
                    </View>
                  ) : (
                    <View>
                      <Text>No users</Text>
                    </View>
                  )}
                </View>
              )}
            </>
          )}
        </View>
        {/* <FloatingMesageIcon /> */}
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex-direction: column;
  height: 100%;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #202c33;
  height: 10%;
`;

const ChatText = styled.Text`
  font-family: "Medium";
  font-size: 25px;
  color: white;
`;

const UserCon = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
`;

const AvatarCon = styled.View`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: #4a86f7;
  border-width: 1px;
  border-color: blue;
`;

const MessageCon = styled.View`
  flex: 1;
  margin: 0 10px;
`;

const Date = styled.View`
  flex-direction: column;
  align-items: flex-end;
`;

const IconCon = styled.View`
  postion: relative;
`;

const DropCon = styled.View`
  position: absolute;
  top: 35px;
  padding: 10px;
  width: 100px;
  background-color: white;
  right: 10px;
  z-index: 5;
`;
