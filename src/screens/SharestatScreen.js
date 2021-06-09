import React from 'react'
import {View, StyleSheet, Text, ScrollView, TextInput, Button, FlatList, Alert} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import {connect} from 'react-redux'
import { AppLoader } from '../components/AppLoader'
import { loadShares, addShareAction, deleteShare } from '../store/actions/todo'
import { THEME } from '../theme'

class SharestatScreen extends React.Component {

    state = {load: true, value: ''}

    async componentDidMount() {
        await this.props.fetchShares()
        this.setState({load: false})
    }

    handleValue = (text) => {
        this.setState({ value: text })
    }

    delShare = (id, email) => {
        Alert.alert(
            'Удаление подписчика',
            `Вы уверены, что хотите удалить "${email}"? Он(а) больше не сможет смотреть вашу статистику.`,
            [
              {
                text: 'Отмена',
                style: 'cancel'
              },
              {
                text: 'Удалить',
                style: 'destructive',
                onPress: async () => {
                    await this.props.removeShare(id)
                }
              }
            ],
            { cancelable: false }
          )  
    }

    submitBox = () => {  
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/  
        if (this.state.value.trim() && reg.test(this.state.value.trim())) {
            this.props.addShare(this.props.app.user, this.state.value.trim().toLocaleLowerCase()).then(() => {
                this.setState({ value: '' })
                this.props.fetchShares()
            })            
        }
        else {
            Alert.alert(
                !this.state.value.trim() ? 'Введите email' : 'Вы ввели некорректный email',
                '',
                [{text: 'OK', style: 'cancel'}],
                { cancelable: false }
            )          
        } 
    }

    render() {
        if (this.state.load) return <AppLoader/>
        return(
            <ScrollView style={styles.scroll}>
                <View style={styles.input}>
                    <Text style={{fontSize: 17}}>Введите email, с кем хотите поделиться статистикой:</Text>
                    <TextInput
                    style={styles.textarea}
                    placeholder='email'
                    onChangeText = {this.handleValue}
                    value={this.state.value}
                    autoCapitalize = 'none'
                    />
                    <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                        <Button title="Поделиться" color={THEME.MAIN_COLOR} onPress={this.submitBox} style={{flex: 1}}/>
                    </View>
                </View>

                {this.props.app.shares.filter(share => share.who === this.props.app.user).length ? (
                <View>
                    <Text style={{fontSize: 17, marginTop: 20, marginBottom: 10}}>С кем вы делитесь:</Text>
                    <FlatList
                    data={this.props.app.shares.filter(share => share.who === this.props.app.user)}
                    renderItem={({item}) => (                  
                        <View style={styles.box}>
                            <View style={styles.view}>
                                <Text style={styles.title}>
                                    {item.with_whom}
                                </Text> 
                                <Icon name='trash-outline' color={THEME.DANGER_COLOR} size={20} 
                                style={styles.icon} 
                                onPress={() => this.delShare(item.id, item.with_whom)}
                                />
                            </View>                       
                        </View>
                    )}
                    keyExtractor={item => item.id.toString()}>
                    </FlatList>
                </View>
                ) : (
                    <Text style={{fontSize: 17, marginTop: 20}}>Вы ни с кем не делетесь статистикой</Text>
                )}
            </ScrollView>
        )
    }
}

SharestatScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Поделиться статистикой',
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
    input: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    scroll: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: THEME.PADDING_VERTICAL
    },
    textarea: {
        padding: 10
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
    fetchShares: () => dispatch(loadShares()),
    removeShare: id => dispatch(deleteShare(id)),
    addShare: (who, with_whom) => dispatch(addShareAction(who, with_whom))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharestatScreen)