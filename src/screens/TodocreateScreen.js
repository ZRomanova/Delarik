import React from 'react'
import {View, StyleSheet, Text, TextInput, Button} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import {connect} from 'react-redux'
import { addTodoAction } from '../store/actions/todo'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { THEME } from '../theme'

class TodocreateScreen extends React.Component {

    state = {
        value: ''
    }

    handleValue = (text) => {
        this.setState({ value: text })
    }

    back = () => {
        this.props.navigation.navigate("Todolist")
    }

    submitTodo = () => {
        if (this.state.value.trim()) {
            this.props.addTodo(this.state.value.trim(), this.props.navigation.state.params.id)
            this.props.navigation.navigate("Todolist")
        }
    }

    render() {
        return(
            <View style={styles.center}>
                <Text style={{fontSize: 20}}>Новое дело в разделе {this.props.navigation.state.params.title}:</Text>
                <TextInput
                style={styles.textarea}
                placeholder='Введите название дела'
                onChangeText = {this.handleValue}
                />
                <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                    <Button title="Назад" color={THEME.MAIN_COLOR} onPress={this.back} style={{flex: 1}}/>
                    <Button title="Создать" color={THEME.MAIN_COLOR} onPress={this.submitTodo} style={{flex: 1}}/>
                </View>
            </View>
        )
    }
}

TodocreateScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Добавить дело',
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
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: THEME.PADDING_VERTICAL
    },
    textarea: {
        padding: 10,
        marginBottom: 10
    }
})

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {
    addTodo: (title, box) => dispatch(addTodoAction(title, box))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodocreateScreen)