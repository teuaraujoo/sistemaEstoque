const daysAgo = function (today) {

    const todayYear = today.getFullYear();
    const todayDate = today.getDate() - 30;
    const todayMonth = today.getMonth();
    
    const date = new Date(todayYear, todayMonth, todayDate);
    return date;
};

module.exports = daysAgo;