import React from 'react'
import {View, StyleSheet, Text, TextInput, Button} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import {connect} from 'react-redux'
import { addBoxAction } from '../store/actions/todo'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { THEME } from '../theme'

class CreateboxScreen extends React.Component {

    state = {
        value: ''
    }

    handleValue = (text) => {
        this.setState({ value: text })
    }

    submitBox = () => {     
        if(this.state.value.trim()) {
            this.props.addBox(this.state.value.trim(), this.props.app.user)
            this.props.navigation.navigate("Todolist")
        }    
    }

    back = () => {
        this.props.navigation.navigate("Todolist")
    }

    render() {
        return(
            <View style={styles.center}>
                <Text style={{fontSize: 20}}>Новый раздел:</Text>
                <TextInput
                style={styles.textarea}
                placeholder='Введите название раздела'
                onChangeText = {this.handleValue}
                />
                <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                    <Button title="Назад" color={THEME.MAIN_COLOR} onPress={this.back} style={{flex: 1}}/>
                    <Button title="Создать" color={THEME.MAIN_COLOR} onPress={this.submitBox} style={{flex: 1}}/>
                </View>
            </View>
        )
    }
}

CreateboxScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Добавить раздел',
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
    addBox: (title, user) => dispatch(addBoxAction(title, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateboxScreen)