import transactionData from '../data/csvjson.json';
const tranformedData = dataType => {
  switch (dataType) {
    case 'VIZ_01': {
      var balance = 20000;
      const transformed = transactionData.map(transaction => {
        var amount = transaction.Amount;
        // var amount = Object.entries(transactionData[index])[4][1]
        if (typeof amount === 'string') {
          amount = parseInt(amount.replace(',', ''));
          if (isNaN(amount)) {
            amount = 0;
          }
        }

        var transactionDate = transaction.Date;
        transactionDate = transactionDate.replace(/./g, ':').split(':');
        transactionDate = new Date(
          transactionDate[2],
          transactionDate[1],
          transactionDate[0],
        );
        balance += amount;
        //Calculate day of year from 1-366
        var now = transactionDate;
        var start = new Date(transactionDate.getFullYear(), 0, 0);
        var diff = now - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        if (day < 274) {
          day += 366;
        }
        return {
          DayOfYear: day,
          BankBalance: balance,
        };
      });
      return {data: transformed};
    }
    case 'VIZ_02': {
      var groupedData = [[], [], [], [], [], [], [], [], []];
      var months = [
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'jun',
        'jul',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec',
      ];
      var totals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let uniques = [...new Set(transactionData.map(item => item.Category))];

      for (let i = 0; i < groupedData.length; i++) {
        for (let j = 0; j < months.length; j++) {
          var month = j;
          groupedData[i][month] = 0;
        }
      }
      transactionData.map(transaction => {
        var amount = transaction.Amount;
        if (typeof amount === 'string') {
          amount = parseInt(amount.replace(',', ''));
          if (isNaN(amount)) {
            amount = 0;
          }
        }
        if (amount < 0) {
          amount = amount * -1;
        }
        var transactionDate = transaction.Date;
        transactionDate = transactionDate.replace(/./g, ':').split(':');
        console.log(transactionDate);

        transactionDate = new Date(
          transactionDate[2],
          transactionDate[1],
          transactionDate[0],
        );
        transaction.Month = transactionDate.getMonth();
        for (let i = 0; i < groupedData.length; i++) {
          if (transaction.Category === uniques[i]) {
            for (let j = 0; j < months.length; j++) {
              if (transaction.Month === j + 1) {
                groupedData[i][j] += amount;
                totals[j] += amount;
              }
            }
          }
        }
      });
      for (let i = 0; i < groupedData.length; i++) {
        for (let j = 0; j < months.length; j++) {
          var currentValue = (groupedData[i][j] / totals[j]) * 100;
          if (isNaN(currentValue)) {
            groupedData[i][j] = 0;
          } else {
            groupedData[i][j] = currentValue;
          }
        }
      }

      return groupedData.map(data => {
        return data.map((amount, Month) => {
          return {x: months[Month], y: amount};
        });
      });
    }
    case 'VIZ_03': {
      return;
    }
    default: {
      return;
    }
  }
};
export default tranformedData;
