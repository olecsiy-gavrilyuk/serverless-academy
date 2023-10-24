const readline = require('readline');
const { sortNumbers } = require('./customModules/sortNumbersAscending');
const { sortNumbersDesc } = require('./customModules/sortNumbersDescending');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getInput = () => {
    return new Promise((resolve) => {
        rl.question('Please enter a few words or numbers separated by a space: ', (answer) => {
            resolve(answer.split(' '));
        });
    });
};

const getSortingMethod = () => {
    return new Promise((resolve) => {
        rl.question('How would you like to sort the words?\n1. Sort words alphabetically\n2. Show numbers from lesser to greater\n3. Show numbers from bigger to smaller\n4. Display words in ascending order by number of letters in the word\n5. Show only unique words\n6. Display only unique values from the set of words and numbers entered\nPlease enter the corresponding number: ', (answer) => {
            if(!isNaN(answer)) {
                resolve(parseInt(answer));
            } else {
                resolve(answer);
            }
        });
    });
};

const exit = () => {
    console.log('Exiting...');
    rl.close();
};

const performSorting = (data, method) => {
    switch (method) {
        case 1:
            return data.sort((a, b) => a.localeCompare(b));
        case 2:
            return sortNumbers(data);
        case 3:
            return sortNumbersDesc(data);
        case 4:
            return data.sort((a, b) => a.length - b.length);
        case 5:
            return [...new Set(data)];
        case 6:
            return data.filter((item, index) => data.indexOf(item) === index);
        case 'exit':
                exit();
            return true;
        default:
            return data;
    }
};



const start = async () => {
    while (true) {
        try {
            const data = await getInput();
            const method = await getSortingMethod();
            const sortedData = performSorting(data, method);
            if (sortedData === true) {
                break;
            }
            console.log('Sorted Data:', sortedData);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
            console.error('An error occurred:', error);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
};

start();