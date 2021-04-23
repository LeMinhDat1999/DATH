import * as React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DangKi from './components/DangKi'; //Màn hình trong menu chuyển hướng đăng ký tài khoản
import DangNhap from './components/DangNhap';
import TrangChu from './components/TrangChu';
import DanhSach from './components/DanhSach';
import Profile from './components/Profile';
import TuyenDung from './components/TuyenDung';
import DSDangTuyen from './components/DSDangTuyen';
import DSUngTuyen from './components/DSUngTuyen';
import DSApply from './components/DSApply';
import ViewProfile from './components/ViewProfile';
import Update from './components/Update';


const Stack = createStackNavigator();

class Root extends React.Component {
  render() {
      return (
          <NavigationContainer>
              <StatusBar backgroundColor="rgb(30,30,30)" barStyle="light-content" />
              <Stack.Navigator
                  initialRouteName="DangNhap"
              >
                  <Stack.Screen name="TrangChu" component={TrangChu} options={{ headerShown: false }} />
                  <Stack.Screen name="DangNhap" component={DangNhap} options={{ headerShown: false }} />
                  <Stack.Screen name="DangKi" component={DangKi} options={{ headerShown: false }} />
                  <Stack.Screen name="DanhSach" component={DanhSach} options={{ headerShown: false }} />
                  <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                  <Stack.Screen name="TuyenDung" component={TuyenDung} options={{ headerShown: false }} />
                  <Stack.Screen name="DSDangTuyen" component={DSDangTuyen} options={{ headerShown: false }} />
                  <Stack.Screen name="DSUngTuyen" component={DSUngTuyen} options={{ headerShown: false }} />
                  <Stack.Screen name="DSApply" component={DSApply} options={{ headerShown: false }} />
                  <Stack.Screen name="ViewProfile" component={ViewProfile} options={{ headerShown: false }} />
                  <Stack.Screen name="Update" component={Update} options={{ headerShown: false }} />
              </Stack.Navigator>
          </NavigationContainer >
      );
  }
}


export default Root;
