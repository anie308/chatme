import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import useContacts from "../hooks/useContact";
import { useContext } from "react";
import GlobalContext from "../context/Context";
import { useState } from "react";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import ListItem from "../components/ListItem";

export default function Contacts() {
  const contacts = useContacts();
  const route = useRoute();
  const image = route.params && route.params?.image;
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="rgb(59 130 246)" style="light" />
      <Container>
        <Header>
          <ChatText>Contacts</ChatText>
          <MaterialIcons name="more-vert" size={34} color="white" />
        </Header>
        <View>
          <FlatList
            data={contacts}
            keyExtractor={(_, i) => i}
            renderItem={({ item }) => <ContactPreview contact={item} image={image}/>}
          />
        </View>
      </Container>
    </SafeAreaView>
  );
}

function ContactPreview({ contact, image }) {
  const { unfilteredRooms } = useContext(GlobalContext);
  const [user, setUser] = useState(contact);
  useEffect(()=> console.log("unfilteredRooms", unfilteredRooms), [unfilteredRooms])
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("email", "==", contact.email)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length > 0) {
        const userDoc = snapshot.docs[0].data();
        setUser((prevUser) => ({ ...prevUser, ...userDoc }));
      }
    });
    return () => unsubscribe();
  });

  return (
    <ListItem
      type="contacts"
      user={user}
      image={image}
      room={unfilteredRooms.find((room) =>
        room.participantsArray.includes(contact.email)
      )}
    />
  );
}
const Container = styled.View`
  flex-direction: column;
  height: 100%;
`;
// const Container = styled.View`
//   height: 100px;
//   width: 100%;
//   border-bottom-width: 1px;
//   border-bottom-color: #ccc;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   padding: 10px;
// `;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #4a86f7;
  height: 10%;
`;

const ChatText = styled.Text`
  font-family: "Medium";
  font-size: 25px;
  color: white;
`;
