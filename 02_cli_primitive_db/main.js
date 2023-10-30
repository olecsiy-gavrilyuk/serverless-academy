const inquirer = require('inquirer');
const fs = require('fs');

let database = [];

if (fs.existsSync('database.txt')) {
    const fileContents = fs.readFileSync('database.txt', 'utf8');
    database = JSON.parse(fileContents);
}

const createUser = () =>  {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter a name:'
            },
            {
                type: 'list',
                name: 'gender',
                message: 'Choose a gender:',
                choices: ['Male', 'Female', 'Other']
            },
            {
                type: 'input',
                name: 'age',
                message: 'Enter an age:'
            }
        ])
        .then(answers => {
            database.push(answers);

            fs.writeFileSync('database.txt', JSON.stringify(database));

            addAnotherUser();
        });
}

const addAnotherUser = () => {
    inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'addUser',
                message: 'Do you want to add another user?'
            }
        ])
        .then(answers => {
            if (answers.addUser) {
                createUser();
            } else {
                searchUser();
            }
        });
}

const searchUser = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'searchName',
                message: 'Enter a name to search for:'
            }
        ])
        .then(answers => {

            const user = database.find(user => user.name.toLowerCase() === answers.searchName.toLowerCase());

            if (user) {
                console.log(`User found: ${JSON.stringify(user)}`);
            } else {
                console.log('No user found with that name.');
            }
        });
}

addAnotherUser();