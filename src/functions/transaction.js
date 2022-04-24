import transactionData from '../data/csvjson.json';
import moment from 'moment';

const commaSplit = amount => {
  if (amount.includes(',')) {
    return parseInt(amount.replace(',', ''));
  } else {
    return parseInt(amount);
  }
};

const getNum = val => {
  if (isNaN(val)) {
    return 0;
  }
  return val;
};

const tranformedData = dataType => {
  switch (dataType) {
    case 'VIZ_01': {
      var balance = 20000;
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
      const transformed = transactionData.map(transaction => {
        var amount = transaction.Amount;
        var quarter;
        if (typeof amount === 'string') {
          amount = parseInt(amount.replace(',', ''));
          if (isNaN(amount)) {
            amount = 0;
          }
        }

        var transactionDate = transaction.Date;
        var transactionDate2 = moment(transaction.Date, 'DD.MM.YYYY').toDate();
        var month = parseInt(moment(transactionDate2).format('MM'));
        var dayf = parseInt(moment(transactionDate2).format('DD'));
        var year = parseInt(moment(transactionDate2).format('YYY'));

        const date = moment({day, month, year});
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
        if (month <= 3) {
          quarter = 'Quarter One';
        }else if (month > 3 && month <= 6) {
          quarter = 'Quarter Twu';
        }else if (month > 6 && month <= 9) {
          quarter = 'Quarter Three';
        }else if (month > 9){
          quarter = 'Quarter Four';
        }
        return {
          DayOfYear: date.dayOfYear(),
          BankBalance: balance,
          Quarter: quarter,
          Month: months[month-1],
          Day: dayf,
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
      const transformed = transactionData.map(transaction => {
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

        var transactionDate2 = moment(transaction.Date, 'DD.MM.YYYY').toDate();
        transaction.Month = parseInt(moment(transactionDate2).format('MM'));
        transaction.Category = transaction.Category;
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
          groupedData[i]['cat'] = uniques[i];
        }
      }
      return groupedData.map(data => {
        return data.map((amount, Month) => {
          return {
            x: months[Month],
            y: amount,
            z: data.cat,
          };
        });
      });
    }
    case 'VIZ_03': {
      const transformed = transactionData.map(transaction => {
        var amount = transaction.Amount;

        var Date2 = new Date(
          transaction.Date.slice(6, 10),
          transaction.Date.slice(3, 5),
          transaction.Date.slice(0, 2),
        );
        var cat = transaction.Category;
        if (typeof amount === 'string') {
          amount = parseInt(amount.replace(',', ''));
          if (isNaN(amount)) {
            amount = 0;
          }
        }

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

        return {
          x: Date2,
          cat: cat,
          y: amount,
          m: months[transactionData.month],
        };
      });
      return {data: transformed};
    }
    case 'GOALS': {
      const transformed = transactionData.map(transaction => {
        var amount = transaction.Amount;
        if (typeof amount === 'string') {
          amount = parseInt(amount.replace(',', ''));
          if (isNaN(amount)) {
            amount = 0;
          }
        }

        var transactionDate = moment(transaction.Date, 'DD.MM.YYYY').toDate();
        var formattedMonth = moment(transactionDate).format('MMMM');
        var formattedYear = moment(transactionDate).format('YYYY');

        return {
          amount: amount,
          Category: transaction.Category,
          transactionDateMonth: formattedMonth,
          transactionDateYear: formattedYear,
        };
      });
      return {data: transformed};
    }
    case 'DETAILS': {
      const transformed = transactionData.map(transaction => {
        var amount = transaction.Amount;
        if (typeof amount === 'string') {
          amount = parseInt(amount.replace(',', ''));
          if (isNaN(amount)) {
            amount = 0;
          }
        }

        var transactionDate = moment(transaction.Date, 'DD.MM.YYYY').toDate();
        var foramtFullDate = moment(transactionDate).format('YYYY-MM-DD');
        var formattedMonth = moment(transactionDate).format('MMMM');
        var formattedYear = moment(transactionDate).format('YYYY');

        return {
          amount: amount,
          transactionDateMonth: formattedMonth,
          transactionDateYear: formattedYear,
          transactionDateFull: new Date(foramtFullDate),
          transactionDateFull2: foramtFullDate,

          Text: transaction.Text,
          Status: transaction.Status,
          Category: transaction.Category,
        };
      });
      return {data: transformed};
    }
    case 'TotalAmount': {
      var balance = 20000
      const transformed = transactionData.map(transaction => {
        var amount = transaction.Amount;
        if (typeof amount === 'string') {
          amount = parseInt(amount.replace(',', ''));
          if (isNaN(amount)) {
            amount = 0;
          }
        }
        return {
          amount: amount,
        };
      });

      return {data: transformed};
    }
    default: {
      return;
    }
  }
};
export default tranformedData;
