import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderListNavigator() {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: 'white' }}>
      <TopTabs>
        <TopTabs.Screen name="index" options={{ title: 'Active' }} />
        <TopTabs.Screen name="archive" options={{ title: 'Archive' }} />
      </TopTabs>
    </SafeAreaView>
  );
}
