import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobFeedScreen from '../screens/JobFeedScreen';
import MyJobsScreen from '../screens/MyJobsScreen';
import JobDetailScreen from '../screens/JobDetailScreen';

export type RootStackParamList = {
  Tabs: undefined;
  JobDetail: { jobId: string };
};

export type TabParamList = {
  JobFeed: undefined;
  MyJobs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="JobFeed" component={JobFeedScreen} options={{ title: 'Available Jobs' }} />
      <Tab.Screen name="MyJobs" component={MyJobsScreen} options={{ title: 'My Jobs' }} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="JobDetail" component={JobDetailScreen} options={{ title: 'Job Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}