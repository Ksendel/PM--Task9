class User {
    static #CALL_ME = 0

    constructor(name) {
        this.name = name
    }

    callMe() {
        User.#CALL_ME++
    }

    callCount() {
        return User.#CALL_ME
    }
}

const user = new User('Vasya')
user.callMe()
console.log(user.callCount())

class Person {
    static GENDER = {
        NOT_DEFINED: 0,
        MAN: 1,
        WOMAN: 2
    }

    #name = 'NoName'
    #gender = Person.GENDER.NOT_DEFINED
    logs = []

    #logFunction = (propertyName, oldValue, newValue) => {
        this.logs.push(`${propertyName}: ${oldValue} ${newValue}`)
    }


    constructor(name, gender) {
        if(name) this.#name = name
        if(gender) this.#gender = gender
    }

    get name() {
        return this.#name
    }

    set name(name) {
        this.#logFunction('name', this.name, name)
        this.#name = name
    }

    get gender() {
        return this.#gender
    }

    set gender(gender) {
        if (Object.values(Person.GENDER).includes(gender)) {
            this.#logFunction('gender', this.gender, gender)
            this.#gender = gender
        } else throw new PersonGenderError
    }

    toString() {
        return `Name: ${this.name} Gender: ${this.gender} `
    }
}

class PersonGenderError extends Error {
    constructor(message) {
        super(message);
        this.name = 'GenderError'
    }
}

const p = new Person('Vasyl', 1)
p.name = 'Petro'
p.gender = 7
// console.log(p.toString())
console.log(p.logs)


