import React from 'react'
import {CheckBox} from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import {View, StyleSheet, Text, ScrollView, FlatList, Button, Platform} from 'react-native'
import {VictoryChart, VictoryZoomContainer, VictoryBar, VictoryPie} from 'victory-native'
import { THEME } from '../theme'
import { formatDate, transformDate } from '../format'

export default class AppStat extends React.Component {

    constructor(props) {
        super(props)
        this.state = props.state
    }

    check(id) {
        let index = this.state.selected.indexOf(id)
        if (index !== -1) this.state.selected.splice(index, 1)
        else this.state.selected.push(id)
        this.setState({selected: this.state.selected})
    }

    changeShow = () => {
        this.setState({showPicker: true})
    }

    dataDays() {
        let arr = []
        for (let day of this.state.days) {
            if (day.todos) {
                    arr.push({
                    x: day.date,
                    y: day.todos.filter(todo => !this.state.selected.length ? todo : this.state.selected.includes(todo)).length 
                })
            }
        }
        return arr
    }

    dataMonth() {
        let arr = this.dataDays()
        if (arr.length > 1) {
            let k = 0
            let d = []
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[i].x.getMonth() === arr[i + 1].x.getMonth()) {
                    arr[k].y = arr[k].y + arr[i + 1].y
                    d.push(i + 1)
                }
                else k = i
            }
            for (let i = d.length - 1; i >= 0; i--) {
                arr.splice(d[i], 1)      
            }
        }
        return arr
    }

    inADate = (event, value) => {
        if (Date.parse(value)) {
            const date = formatDate(value)
            const day = this.state.days.find(d => formatDate(d.date) == date)
            let todos = day ? (day.todos ? day.todos : []) : []
            let words = []
            for (let todo of todos) {
                let worddo = this.state.todos.find(t => t.id === todo).title
                words.push(worddo)
            }
            this.setState({datepicker: words, showPicker: false, dateInPicker: value})
        }
    }

    render() {
        return(
            <ScrollView style={{padding: 15}}>
                <Text style={styles.header}>По дням</Text>
                <VictoryChart 
                containerComponent={
                <VictoryZoomContainer 
                zoomDimension="x" 
                allowZoom={false} 
                zoomDomain={{x: [Date.parse(new Date()) - (1000 * 60 * 60 * 24 * 5), Date.parse(new Date())]}}
                />} 
                scale={{ x: "time" }}
                standalone={true}
                domainPadding={{ x: 50 }}>
                    <VictoryBar 
                    data={this.dataDays()}
                    barRatio={0.7}
                    barWidth={20}
                    style={{data: {fill: THEME.MAIN_COLOR}}}/>
                </VictoryChart>

                <Text style={styles.header}>По месяцам</Text>
                <VictoryChart 
                containerComponent={
                <VictoryZoomContainer 
                zoomDimension="x" 
                allowZoom={false} 
                zoomDomain={{x: [Date.parse(new Date()) - (1000 * 60 * 60 * 24 * 4 * 31), Date.parse(new Date())]}}
                />} 
                domainPadding={{ x: 40 }}
                standalone={true}
                scale={{ x: "time" }}
                >
                    <VictoryBar 
                    data={this.dataMonth()}
                    barRatio={0.7}
                    barWidth={20}
                    style={{data: {fill: THEME.MAIN_COLOR}}}/>
                </VictoryChart>
                <View style={styles.content}>
                    <View style={styles.box}>
                        <Text style={styles.header}>Фильтры</Text>
                        <FlatList
                        data={this.state.boxes}
                        renderItem={({item}) => (
                            <View style={styles.todo}>                       
                                <Text style={{color: THEME.MAIN_COLOR, fontSize: 20, flex: 1}}>
                                    {item.title}
                                </Text> 
                                                    
                                <View style={styles.todo}>
                                    <FlatList
                                    data={this.state.todos.filter(todo => todo.box == item.id)}
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
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.header}>Статистика по дням</Text>
                        {Platform.OS == "android" && (
                        <Button 
                        title="Выбрать дату" 
                        color={THEME.MAIN_COLOR} 
                        onPress={this.changeShow} 
                        style={{flex: 1}}
                        />
                        )}

                        {(this.state.showPicker || Platform.OS == "ios") && (
                            <DateTimePicker
                            onChange={this.inADate}
                            value={this.state.dateInPicker}
                            mode='date'
                            style={{flex: 1, width: '100%'}}
                            display="spinner"
                            />
                        )}
                        
                        <FlatList
                        data={this.state.datepicker}
                        keyExtractor={item => item}
                        renderItem={({item}) => (
                            <View style={styles.view}>
                                <Text style={{fontSize: 17}}>{item}</Text>
                            </View>
                        )}>
                        </FlatList>

                        {this.state.datepicker && this.state.datepicker.length ? (
                            <VictoryPie
                            width={300}
                            height={300}
                            colorScale={[THEME.MAIN_COLOR, '#ddd' ]}
                            data={[
                                { x: (Math.floor(this.state.datepicker.length / this.state.todos.length * 100)) + '%', y: this.state.datepicker.length },
                                { x: " ", y: this.state.todos.length - this.state.datepicker.length }
                            ]}
                            />
                        ) : (
                            <Text style={{fontSize: 17}}>Нет данных</Text>
                        )}                                        
                    </View>
                                                      
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        color: THEME.MAIN_COLOR
    },
    box: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
        padding: 15,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#fff',
        width: '90%'
    },
    todo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center'
    }, 
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})