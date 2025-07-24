import Button from '@/src/components/Button';
import { Colors } from '@/src/constants/Colors';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const SignUpScreen = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const resetValues = () => {
    setMail('');
    setPassword('');
    setErrors('');
  };

  const validateInput = () => {
    setErrors('');
    if (!mail) {
      setErrors('Email is required');
      return false;
    }
    if (!password) {
      setErrors('Password is required');
      return false;
    }
    return true;
  };

  const onSignUp = () => {
    if (!validateInput()) {
      return;
    }

    resetValues();

    console.log('Signing up with:', { mail, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={mail}
        onChangeText={setMail}
        placeholder="Email"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      <Text style={{ color: 'red' }}>{errors}</Text>

      <Button text="Sign Up" onPress={onSignUp} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  label: {
    color: 'gray',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
});
