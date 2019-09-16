import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';

const StartGameScreen = props => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if(isNaN(chosenNumber) || chosenNumber <= 0) {
      Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
      Keyboard.dismiss();
      return;
    }
    setConfirmed(true);
    setEnteredValue('');
    setSelectedNumber(chosenNumber);
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
    <Card style={styles.confirmedOutputContainer}>
      <Text style={styles.confirmedText}>You Selected</Text>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <Button title="START GAME" onPress={()=> props.onStartGame(selectedNumber)}/>
      
    </Card>)
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      }}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            fontSize={30}
            blurOnSubmit
            autoCorrect={false}
            keyboardType='number-pad'
            maxLength={2}
            style={styles.input}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
            color={Colors.primary} title="Reset" onPress={resetInputHandler} />
            </View>
            <View style={styles.primary}>
              <Button color={Colors.accent} title="Confirm" onPress={confirmInputHandler}/>
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  input: {
    width: 50,
    textAlign: 'center'
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  confirmedOutputContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  confirmedText: {
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  button: {
    width: 100,
  }
});

export default StartGameScreen;