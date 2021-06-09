import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux'
import {deleteUser} from '../store/actions/todo'

class Exit extends React.Component {

    async componentDidMount () {
        await this.props.deleteUser()
        this.props.navigation.navigate('Auth')
    }

    async componentDidUpdate () {
        await this.props.deleteUser()
        this.props.navigation.navigate('Auth')
    }

    render() {
        return (<View><Text>Перенаправление...</Text></View>);
    }
}

function mapStateToProps(state) {
    return state
}
  
function mapDispatchToProps(dispatch) {
    return {
        deleteUser: () => dispatch(deleteUser())
    }
}
  
  export default connect(mapStateToProps, mapDispatchToProps) (Exit)