import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WriteDashboard from '../writenovel/WriteDashboard';
import NovelStore from '../genres/NovelStore';
import Account from '../account/Account'
import HotNovels from './Home';
import { useRoute } from '@react-navigation/native';
import WriteStorage from '../writenovel/WriteStorage';
import Reading from '../reading/Reading';

const Tab = createBottomTabNavigator();
function HomeTabs() {
  // const hideTabBar = route.name === 'Login';
  return (
      <Tab.Navigator
        initialRouteName="HotNovels"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name="HotNovels"
          component={HotNovels}
          options={{
            tabBarLabel: 'Nổi bật',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Reading"
          component={Reading}
          options={{
            tabBarLabel: 'Giá sách',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="book" color={color} size={size} />
            ),
            tabBarBadge: 3,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="WriteDashboard"
          component={WriteStorage}
          options={{
            tabBarLabel: 'Viết',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="pencil" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="NovelStore"
          component={NovelStore}
          options={{
            tabBarLabel: 'Kho sách',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: 'Tài khoản',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
            headerShown: false, // hide the header
          }}
        />
      </Tab.Navigator>

  );
}
export default HomeTabs