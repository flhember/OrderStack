import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';
import * as Linking from 'expo-linking';
import { Alert } from 'react-native';
import { supabase } from './supabase';

const fetchPaymentSheetParams = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke('payment-sheet', {
    body: { amount },
  });

  if (data) {
    return data;
  }

  Alert.alert('Error', error?.message || 'An error occurred');
  return {};
};

export const initialisePaymentSheet = async (amount: number) => {
  console.log('Initialising payment sheet, for ', amount);

  const returnURL = Linking.createURL('payment-return');

  const { paymentIntent, publishableKey } =
    await fetchPaymentSheetParams(amount);

  if (!paymentIntent || !publishableKey) {
    console.warn('Missing payment intent or publishable key');
    return;
  }

  await initPaymentSheet({
    merchantDisplayName: 'OrderStack',
    paymentIntentClientSecret: paymentIntent,
    defaultBillingDetails: {
      name: 'Test User',
    },
    returnURL,
  });
};

export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert(error.message);
    return false;
  } else {
    return true;
  }
};
