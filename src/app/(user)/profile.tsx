import { supabase } from '@/src/lib/supabase';
import React from 'react';
import { Button, View } from 'react-native';

const ProfielScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Sign out"
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  );
};

export default ProfielScreen;
