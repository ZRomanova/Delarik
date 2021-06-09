import React from 'react'
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import {connect} from 'react-redux'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { AppLoader } from '../components/AppLoader'
import { loadBoxes, loadTodos } from '../store/actions/todo'
import { THEME } from '../theme'

class TodolistScreen extends React.Component {
    
    state = {
        load: true, 
        selected: ''
    }

    componentDidMount() {
        this.props.fetchBoxes().then(() => {
            this.props.fetchTodos().then(() => {             
                this.setState({
                    load: false
                })       
            })
        }) 
    }

    clickBox(id) { 
        this.state.selected === id ? this.setState({selected: ''}) : this.setState({selected: id})
    }

    render() {
        if (this.state.load) return <AppLoader />

        if (!this.props.app.boxes.filter(box => box.user == this.props.app.user).length) {
            return <Text style={styles.center}>Нет разделов. Добавьте!</Text>
        }

        return(
            <FlatList
            style={{paddingHorizontal: THEME.PADDING_HORIZONTAL, paddingVertical: THEME.PADDING_VERTICAL}}
            data={this.props.app.boxes.filter(box => box.user == this.props.app.user)}
            renderItem={({item}) => (
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.clickBox(item.id)}>
                    <View style={styles.box}>
                        <View style={styles.view}>
                            <Text style={styles.title}>
                                {item.title}
                            </Text> 
                            <Icon name='md-add-sharp' color={THEME.MAIN_COLOR} size={20} 
                            style={styles.icon} 
                            onPress={() => this.props.navigation.navigate('Todocreate', {id: item.id, title: item.title})}
                            />
                        </View>
                        {item.id == this.state.selected ? (
                            <View style={styles.todo}>
                                <FlatList
                                data={this.props.app.todos.filter(todo => todo.box == item.id)}
                                renderItem={({item}) => (
                                    <Text style={{fontSize: 17}}>{item.title}</Text>
                                )}>
                                </FlatList>                                   
                            </View>
                        ) : (
                            <View></View>
                        )}
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}>
            </FlatList>
        )
    }
}

TodolistScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Список дел',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
            title='Toggle Drawer'
            iconName='ios-menu'
            onPress={() => navigation.toggleDrawer()}
            />
        </HeaderButtons>
    ),
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title='Add box'
            iconName='md-add-sharp'
            onPress={() => navigation.navigate('Createbox')}
          />
        </HeaderButtons>
      )
    
})

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#fff',
        width: '100%'
    },
    todo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    icon: {
        top: 3,
        flex: 1
    },
    view: {
        flexDirection: 'row', 
        justifyContent: "space-between"
    },
    title: {
        color: THEME.MAIN_COLOR, 
        fontSize: 20,
        flex: 7
    }
})

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {
    fetchBoxes: () => dispatch(loadBoxes()),
    fetchTodos: () => dispatch(loadTodos())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (TodolistScreen)