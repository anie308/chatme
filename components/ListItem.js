import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";



export default function ListItem({type, description, user, time, room,  image}) {
    const navigation = useNavigation();
  return (
    <Button
      onPress={()=> navigation.navigate('chat', {user, room, image})}>
      <TextContainer 
    //   className='h-[60px] w-[60px] rounded-full bg-red-200 flex items-center justify-center'
       >
        <TextShort className='text-[30px] uppercase'>{user.contactName.substring(0,2)}</TextShort>
      </TextContainer>
      <View>
        <TextFull className='text-[20px]'>{user.contactName || user.displayName}</TextFull>
      </View>
      {
        time && (
            <View>
                    <Text>{new Date(time.seconds * 1000)}</Text>
            </View>
        )
      }
      {
        description && (
            <View>
                    <Text>{description}</Text>
            </View>
        )
      }
    </Button>
  )
}

const Button = styled.TouchableOpacity`
padding: 20px 20px;
border-bottom-width: 1px;
border-bottom-color: #ccc;
flex-direction: row;
align-items: center;

`
const TextContainer = styled.View`
height: 50px;
width: 50px;
border-radius: 25px;
background-color: #ccc;
flex-direction: row;
align-items: center;
justify-content: center;
margin-right: 20px;
`

const TextShort = styled.Text`
font-size: 20px;
text-transform: uppercase;
font-family: 'Medium';
`

const TextFull = styled.Text`
font-size: 18px;
font-family: 'Medium';
`