import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { useRoute } from "@react-navigation/native";
export default function ChatHeader() {
  const route = useRoute();
  return (
    <Container>
      <TextContainer>
        <TextShort>
          {route?.params?.user?.contactName.substring(0, 2)}
        </TextShort>
      </TextContainer>
      <TextFull>
        {route?.params?.user?.contactName || route?.params?.user?.displayName}
        </TextFull>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  height: 60px;
`;

const TextContainer = styled.View`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: #ccc;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TextShort = styled.Text`
  font-size: 20px;
  text-transform: uppercase;
  font-family: 'Bold';
  color: #4a86f7;

`;
const TextFull = styled.Text`
  font-size: 18px;
  text-transform: capitalize;
    margin-left: 20px;
    color: #4a86f7;
    font-family: 'Bold';
`;
