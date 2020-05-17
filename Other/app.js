const person = {
    name: 'Kendall',
    age: 19,
    hobbies: ['beekeeping', 'coding'],
    greet() {
        console.log('Hi, my name is ' + this.name + 
        ' and I am ' + this.age + ' years old. My hobbies are ' +
        this.hobbies[0] + ' and ' + this.hobbies[1] + '.');
    }
};
person.greet();