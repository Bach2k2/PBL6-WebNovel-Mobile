
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WriteDashboard from '../writenovel/WriteDashboard';
import NovelStore from '../genres/NovelStore';
import Account from '../account/Account'
import HotNovels from './Home';
import { useRoute } from '@react-navigation/native';
import WriteStorage from '../writenovel/WriteStorage';
import Reading from '../reading/Reading';
import { BlurView } from '@react-native-community/blur';
import { StyleSheet } from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';

const Tab = createBottomTabNavigator();
function HomeTabs() {
  // const hideTabBar = route.name === 'Login';
  return (
    <Tab.Navigator
      initialRouteName="HotNovels"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        // tabBarHideOnKeyboard: false,
        // headerShown: false,
        // tabBarStyle: styles.tabBarStyle,
        // tabBarBackground: () => (
        //   <BlurView
        //     overlayColor=""
        //     blurAmount={15}
        //     style={styles.BlurViewStyles}
        //   />
        // ),
      }}
    >
      <Tab.Screen
        name="HotNovels"
        component={HotNovels}
        options={{
          tabBarLabel: 'Home',
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
          tabBarLabel: 'Library',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          ),
          // tabBarBadge: 3,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="WriteDashboard"
        component={WriteStorage}
        options={{
          tabBarLabel: 'Write',
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
          tabBarLabel: 'Explore',
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
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false, // hide the header
        }}
      />
    </Tab.Navigator>

  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 70,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyles: {
    // position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default HomeTabs