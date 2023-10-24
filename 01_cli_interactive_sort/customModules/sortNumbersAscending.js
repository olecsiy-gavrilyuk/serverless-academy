module.exports.sortNumbers = function(data) {
    const numbers = data.filter(item => !isNaN(Number(item))).map(Number);
    const sortedNumbers = numbers.sort((a, b) => a - b).map(i => i.toString());

    return sortedNumbers;
};