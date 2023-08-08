import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { PressableStateCallbackType } from 'react-native/Libraries/Components/Pressable/Pressable';
import { GestureResponderEvent } from 'react-native/Libraries/Types/CoreEventTypes';

import { backgroundColor } from '../../constants';

type TButtonProperties = {
  label: string,
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined,
}

export const Button = ({ label, onPress }: TButtonProperties) => {

  return (<Pressable
    style={({ pressed }: PressableStateCallbackType) => [
      { backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white' },
      styles.button,
    ]}
    onPress={onPress || null}
  >
    <Text>{label}</Text>
  </Pressable>);
};

const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 50,

    marginVertical: 20,

    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',

    borderColor: backgroundColor,
    borderWidth: 1,
    borderRadius: 25,
  },
});
