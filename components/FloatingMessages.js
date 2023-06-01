import { TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

export default function FloatingMesageIcon() {
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.navigate("contacts")}>
      <MaterialCommunityIcons
        name="android-messages"
        size={40}
        color="white"
        style={{ transform: [{ scaleX: -1 }] }}
      />
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  background-color: #00A884;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  position: absolute;
  bottom: 100px;
  right: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
