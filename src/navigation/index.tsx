import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobFeedScreen from '../screens/JobFeedScreen';
import MyJobsScreen from '../screens/MyJobsScreen';
import JobDetailScreen from '../screens/JobDetailScreen';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontFamily } from '../theme';


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
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: colors.accent,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarLabelStyle: { fontFamily: fontFamily.semibold, fontSize: 11 },
            tabBarStyle: { height: 60 },
            headerTitleStyle: { fontFamily: fontFamily.semibold },
        }}
        >
      <Tab.Screen
        name="JobFeed"
        component={JobFeedScreen}
        options={{
          title: 'Available Jobs',
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="MyJobs"
        component={MyJobsScreen}
        options={{
          title: 'My Jobs',
          tabBarIcon: ({ color, size }) => <Ionicons name="briefcase-outline" size={size} color={color} />,
        }}
      />
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