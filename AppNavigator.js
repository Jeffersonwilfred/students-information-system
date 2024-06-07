import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SplashScreen from './src/SplashScreen';
import HomeScreen from './src/HomeScreen';
import StaffLoginForm from './src/StaffLoginForm';
import StudentLoginForm from './src/StudentLoginForm';
import MainScreen from './src/MainScreen';
import CreateProfileScreen from './src/CreateProfileScreen';
import MarkEntryScreen from'./src/MarkEntryScreen';
import AttendanceEntryScreen from './src/AttendanceEntryScreen';
import AdminLog from './src/AdminLog';
import Admain from './src/Admain';
import StaffProfileScreen from './src/StaffProfileScreen';
import UserDetailsScreen from './src/UserDetailsScreen';

const AppNavigator = createStackNavigator(
  {
    Splash: SplashScreen,
    Home: HomeScreen,
    StaffLoginForm: StaffLoginForm,
    StudentLoginForm: StudentLoginForm,
    MainScreen: MainScreen,
    AdminLog: AdminLog,
    Admain: Admain,
    CreateProfileScreen: CreateProfileScreen,
    StaffProfileScreen: StaffProfileScreen,
    MarkEntryScreen: MarkEntryScreen,
    AttendanceEntryScreen: AttendanceEntryScreen,
    UserDetailsScreen: UserDetailsScreen,

  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  }
);

export default createAppContainer(AppNavigator);
