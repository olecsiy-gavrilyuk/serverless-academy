module.exports.sortNumbersDesc = function(data) {
    const numbers = data.filter(item => !isNaN(Number(item))).map(Number);
    const sortedNumbers = numbers.sort((a, b) => b - a).map(i => i.toString());

    return sortedNumbers;
};