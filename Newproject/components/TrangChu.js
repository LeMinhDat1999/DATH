import React from 'react';
import DanhSach from './DanhSach';
import Profile from './Profile';
import TuyenDung from './TuyenDung';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();


class TrangChu extends React.Component {
    render() {
        return (
            <Tab.Navigator 
              initialRouteName="DanhSach"
            >
              <Tab.Screen
                name="DanhSach"
                component={DanhSach}
                options={{
                  tabBarLabel: 'Danh Sách',
                  tabBarIcon: ({ color }) => (
                    <FontAwesome5 name="clipboard-list" color={color} size={26} />
                  ),
                }}
              />
              <Tab.Screen
                name="TuyenDung"
                component={TuyenDung}
                options={{
                  tabBarLabel: 'Tuyển Dụng',
                  tabBarIcon: ({ color }) => (
                    <FontAwesome5 name="handshake" color={color} size={26} />
                  ),
                }}
              />
              <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                  tabBarLabel: 'Profile',
                  tabBarIcon: ({ color }) => (
                    <FontAwesome5 name="id-badge" color={color} size={26} />
                  ),
                }}
              />
            </Tab.Navigator>
          );
    };
}
export default TrangChu;


