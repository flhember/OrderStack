import Button from '@/src/components/Button';
import { Colors } from '@/src/constants/Colors';
import { supabase } from '@/src/lib/supabase';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    console.log('Signing in with email:', email);
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  /* const resetValues = () => {
    setEmail('');
    setPassword('');
    setErrors('');
  };

  const validateInput = () => {
    setErrors('');
    if (!email) {
      setErrors('Email is required');
      return false;
    }
    if (!password) {
      setErrors('Password is required');
      return false;
    }
    return true;
  };

  const onSignIn = () => {
    if (!validateInput()) {
      return;
    }

    resetValues();

    console.log('Signing in with:', { email, password });
  };*/

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
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

      <Button
        text={loading ? 'Signing in...' : 'Sign In'}
        onPress={signInWithEmail}
        disabled={loading}
      />

      <Link href={'/sign-up'} style={styles.textButton}>
        Create an account
      </Link>
    </View>
  );
};

export default SignInScreen;

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
