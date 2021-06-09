import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('user.db')

export class DB {
    static init() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS user (email TEXT NOT NULL)',
                [],
                resolve,
                (_, error) => reject(error)
            )
          })
        })
      }

    static addUser(email) {
        //console.log('addUser')
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO user (email) VALUES (?)`,
                    [email],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static deleteUser() {
        //console.log('deleteUser')
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM user`,
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getUser() {
        //console.log('getUser')
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM user`,
                    [],
                    (_, result) => resolve(result.rows._array[result.rows._array.length - 1]),
                    (_, error) => reject(error)
                )
            })
        })
    }
}