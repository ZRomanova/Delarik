import React from 'react'
import {CheckBox} from 'react-native-elements'
import {View, StyleSheet, Text, FlatList} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { AppLoader } from '../components/AppLoader'
import {connect} from 'react-redux'
import { loadBoxes, loadTodos, loadToday } from '../store/actions/todo'
import { checkTodo } from '../data'
import { THEME } from '../theme'

class TodocheckScreen extends React.Component {

    state = {
        load: true
    }

    componentDidMount() {
        this.props.fetchBoxes().then(() => {
            this.props.fetchTodos().then(() => {
                this.props.fetchToday(this.props.app.user).then(() => {
                    this.setState({
                        load: false,
                        selected: this.props.app.today ? (this.props.app.today.todos ? this.props.app.today.todos : []) : []
                    })
                })
            })
        }) 
    }

    check(id) {
        let index = this.state.selected.indexOf(id)
        if (index !== -1) this.state.selected.splice(index, 1)
        else this.state.selected.push(id)
        checkTodo(this.props.app.user, this.state.selected)
        this.setState({selected: this.state.selected})
    }

    render() {
        if (this.state.load) return <AppLoader />

        if (!this.props.app.boxes.filter(box => box.user == this.props.app.user).length) {
            return <Text style={styles.center}>Нет разделов. Добавьте на странице "Список дел"!</Text>
        }

        return(
            
            <FlatList
            style={{paddingHorizontal: THEME.PADDING_HORIZONTAL, paddingVertical: THEME.PADDING_VERTICAL}}
            data={this.props.app.boxes.filter(box => box.user == this.props.app.user)}
            renderItem={({item}) => (
                <View style={styles.box}>                       
                    <Text style={{color: THEME.MAIN_COLOR, fontSize: 20, flex: 1}}>
                        {item.title}
                    </Text> 
                                            
                    <View style={styles.todo}>
                        <FlatList
                        data={this.props.app.todos.filter(todo => todo.box == item.id)}
                        renderItem={({item}) => (
                            <View style={styles.view}>
                                <CheckBox
                                checkedColor={THEME.MAIN_COLOR}
                                checked={this.state.selected.includes(item.id)}
                                onIconPress={() => this.check(item.id)}
                                />
                                <Text style={{fontSize: 17}}>{item.title}</Text>
                            </View>
                        )}>
                        </FlatList>                                   
                    </View>
                    
                </View>
            )}
            keyExtractor={item => item.id.toString()}>
            </FlatList>
        )
    }
}

TodocheckScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Отметить дело',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
            title='Toggle Drawer'
            iconName='ios-menu'
            onPress={() => navigation.toggleDrawer()}
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
    view: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {
    fetchBoxes: () => dispatch(loadBoxes()),
    fetchToday: user => dispatch(loadToday(user)),
    fetchTodos: () => dispatch(loadTodos())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodocheckScreen)