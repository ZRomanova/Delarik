import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import {connect} from 'react-redux'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import AppStat from '../components/AppStat'
import { AppLoader } from '../components/AppLoader'
import { loadBoxes, loadTodos, loadChecks } from '../store/actions/todo'
import { formatDate, transformDate } from '../format'
import { THEME } from '../theme'

class OtherstatScreen extends React.Component {

    state = {
        load: true
    }

    componentDidMount() {
        this.props.fetchBoxes().then(() => {
            let boxes = this.props.app.boxes.filter(box => box.user == this.props.navigation.state.params.email).sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
            
            this.props.fetchTodos().then(() => {
                let todos = this.props.app.todos.filter(todo => boxes.find(box => box.id === todo.box)).sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
                this.props.fetchChecks().then(() => {
                    let days = this.props.app.days.filter(day => day.user === this.props.navigation.state.params.email)
                    for (let day of days) {
                        day.date = transformDate(day.date)
                    }
                    const date = formatDate(new Date())
                    const day = days.find(d => formatDate(d.date) == date)
                    let todosdp = day ? (day.todos ? day.todos : []) : []
                    let words = []
                    for (let todo of todosdp) {
                        let worddo = todos.find(t => t.id === todo).title
                        words.push(worddo)
                    }
                    this.setState({
                        load: false,
                        user: this.props.navigation.state.params.email,
                        days,
                        todos,
                        boxes,
                        datepicker: words,
                        selected: [],
                        dateInPicker: new Date(),
                        showPicker: false
                    })
                })
            })
        })
    }


    render() {
        if (this.state.load) return <AppLoader/>
        return <AppStat state={this.state}/>
            
        
    }
}

OtherstatScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: `${navigation.state.params.email}`,
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


function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {
    fetchBoxes: () => dispatch(loadBoxes()),
    fetchChecks: () => dispatch(loadChecks()),
    fetchTodos: () => dispatch(loadTodos())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherstatScreen)