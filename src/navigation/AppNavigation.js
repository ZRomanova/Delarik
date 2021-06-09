import React from 'react'
import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import TodolistScreen from '../screens/TodolistScreen'
import StatScreen from '../screens/StatScreen'
import OtherstatScreen from '../screens/OtherstatScreen'
import SharestatScreen from '../screens/SharestatScreen'
import StatlistScreen from '../screens/StatlistScreen'
import TodocheckScreen from '../screens/TodocheckScreen'
import CreateboxScreen from '../screens/CreateboxScreen'
import TodocreateScreen from '../screens/TodocreateScreen'
import LoginScreen from '../screens/LoginScreen'
import AuthLoadingScreen from '../screens/AuthLoading'
import Exit from '../screens/Exit'
import { THEME } from '../theme'

const navigatorOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
  }
}

const TodolistNavigator = createStackNavigator(
  {
    Todolist: TodolistScreen,
    Createbox: CreateboxScreen,
    Todocreate: TodocreateScreen
  },
  navigatorOptions
)

const TodocheckNavigator = createStackNavigator(
  {
    Todocheck: TodocheckScreen
  },
  navigatorOptions
)

const bottomTodoConfig = {
  Todocheck: {
    screen: TodocheckNavigator,
    navigationOptions: {
      tabBarLabel: 'Отметить',
      tabBarIcon: info => (
        <Ionicons name="checkbox-outline" size={24} color={info.tintColor} />
      )
    }
  },
  Todolist: {
    screen: TodolistNavigator,
    navigationOptions: {
      tabBarLabel: 'Список дел',
      tabBarIcon: info => (
        <Ionicons name="md-list" size={24} color={info.tintColor} />
      )
    }
  }
}

const BottomTodoNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(bottomTodoConfig, {
        activeTintColor: '#fff',
        shifting: true,
        barStyle: {
          backgroundColor: THEME.MAIN_COLOR
        }
      })
    : createBottomTabNavigator(bottomTodoConfig, {
        tabBarOptions: {
          activeTintColor: THEME.MAIN_COLOR
        }
      })

const StatlistNavigator = createStackNavigator(
  {
    Statlist: StatlistScreen,
    Otherstat: OtherstatScreen
  },
  navigatorOptions
) 

const SharestatNavigator = createStackNavigator(
  {
    Sharestat: SharestatScreen
  },
  navigatorOptions
) 

const MystatNavigator = createStackNavigator(
  {
    Mystat: StatScreen
  },
  navigatorOptions
) 

const bottomStatConfig = {
  Mystat: {
    screen: MystatNavigator,
    navigationOptions: {
      tabBarLabel: 'Моя статистика',
      tabBarIcon: info => (
        <Ionicons name="person-outline" size={24} color={info.tintColor} />
      )
    }
  },
  Sharestat: {
    screen: SharestatNavigator,
    navigationOptions: {
      tabBarLabel: 'Поделиться',
      tabBarIcon: info => (
        <Ionicons name="share-social-outline" size={24} color={info.tintColor} />
      )
    }
  },
  Statlist: {
    screen: StatlistNavigator,
    navigationOptions: {
      tabBarLabel: 'С вами делятся',
      tabBarIcon: info => (
        <Ionicons name="people-outline" size={24} color={info.tintColor} />
      )
    }
  }
}

const BottomStatNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(bottomStatConfig, {
        activeTintColor: '#fff',
        shifting: true,
        barStyle: {
          backgroundColor: THEME.MAIN_COLOR
        }
      })
    : createBottomTabNavigator(bottomStatConfig, {
        tabBarOptions: {
          activeTintColor: THEME.MAIN_COLOR
        }
      })

const AppNavigator = createDrawerNavigator(
  {
    Todo: {
      screen: BottomTodoNavigator,
      navigationOptions: {
        drawerLabel: 'Дела',
        drawerIcon: <Ionicons name='ios-document-outline' />
      }
    },
    Stat: {
      screen: BottomStatNavigator,
      navigationOptions: {
        drawerLabel: 'Статистика',
        drawerIcon: <Ionicons name='ios-analytics' />
      }
    },
    Exit: {
      screen: Exit,
      navigationOptions: {
        drawerLabel: 'Выход',
        drawerIcon: <Ionicons name='md-exit' />,
        drawerLockMode: 'locked-closed'
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: THEME.MAIN_COLOR,
      labelStyle: {
        fontFamily: 'open-bold'
      }
    }
  }
)

const MainNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppNavigator,
    Auth: LoginScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

export const AppNavigation = createAppContainer(MainNavigator)
