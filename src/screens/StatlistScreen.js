import React from 'react'
import {View, StyleSheet, Text, ScrollView, FlatList, Alert} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import {connect} from 'react-redux'
import { AppLoader } from '../components/AppLoader'
import Icon from "react-native-vector-icons/Ionicons"
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { loadShares, deleteShare } from '../store/actions/todo'
import { THEME } from '../theme'

class StatlistScreen extends React.Component {

    state = {load: true}

    async componentDidMount() {
        await this.props.fetchShares()
        this.setState({load: false})
    } 

    delShare = (id, email) => {
        Alert.alert(
            'Удаление подписки',
            `Вы уверены, что хотите удалить "${email}" из своих подписок? Вы больше не сможете смотреть его/её статистику.`,
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

    render() {
        if (this.state.load) return <AppLoader/>
        return(
            <ScrollView style={styles.scroll}>

                {this.props.app.shares.filter(share => share.with_whom === this.props.app.user).length ? (
                
                <FlatList
                data={this.props.app.shares.filter(share => share.with_whom === this.props.app.user)}
                renderItem={({item}) => (                  
                    <View style={styles.box}>
                        <View style={styles.view}>
                            <Text style={styles.title}>
                                {item.who}
                            </Text> 
                            <Icon name='trash-outline' color={THEME.DANGER_COLOR} size={20} 
                            style={styles.icon} 
                            onPress={() => this.delShare(item.id, item.who)}
                            />
                            <Icon name='eye-outline' color={THEME.MAIN_COLOR} size={22} 
                            style={styles.icon} 
                            onPress={() => this.props.navigation.navigate("Otherstat", {email: item.who})}
                            />
                        </View>                       
                    </View>
                )}
                keyExtractor={item => item.id.toString()}>
                </FlatList>
                
                ) : (
                    <Text style={{fontSize: 17}}>С вами никто не делится</Text>
                )}
            </ScrollView>
        )
    }
}

StatlistScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'С вами делятся',
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
    scroll: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: THEME.PADDING_VERTICAL
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
    removeShare: id => dispatch(deleteShare(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatlistScreen)