export default class User {
    /**
     * A constructor for User
     * @param {String} username 
     * @param {String} password 
     * @param {String} email 
     */
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.CPmonList = [];
    }
}