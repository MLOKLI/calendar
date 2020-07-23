var ARV = 'asd';

let monthName = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь'
];

let quarterUrl = [
    'https://script.googleusercontent.com/macros/echo?user_content_key=i_2VUMYbjl4OUtOnO7AtfChaAGjLyJ6-dITdH6EkWpson5pLNsLM657_YfdLuPsUxi5AN3MiH4ITZZ2y25cc_ldyNjNuDlnDm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCrv_KV7UpNK4rVtjuoSB02DF8-_66_3hjhf05DiuBtsezbVcjYjYZO-W6cbX9Cnrtq78LdIpLcN&lib=MYomth_JGG2zXDAo99EcRWSUkAqFQf1OD',
    'https://script.googleusercontent.com/macros/echo?user_content_key=i_2VUMYbjl4OUtOnO7AtfChaAGjLyJ6-dITdH6EkWpson5pLNsLM657_YfdLuPsUxi5AN3MiH4ITZZ2y25cc_ldyNjNuDlnDm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCrv_KV7UpNK4rVtjuoSB02DF8-_66_3hjhf05DiuBtsezbVcjYjYZO-W6cbX9Cnrtq78LdIpLcN&lib=MYomth_JGG2zXDAo99EcRWSUkAqFQf1OD',
    'https://script.googleusercontent.com/macros/echo?user_content_key=i_2VUMYbjl4OUtOnO7AtfChaAGjLyJ6-dITdH6EkWpson5pLNsLM657_YfdLuPsUxi5AN3MiH4ITZZ2y25cc_ldyNjNuDlnDm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCrv_KV7UpNK4rVtjuoSB02DF8-_66_3hjhf05DiuBtsezbVcjYjYZO-W6cbX9Cnrtq78LdIpLcN&lib=MYomth_JGG2zXDAo99EcRWSUkAqFQf1OD',
    'https://script.googleusercontent.com/macros/echo?user_content_key=i_2VUMYbjl4OUtOnO7AtfChaAGjLyJ6-dITdH6EkWpson5pLNsLM657_YfdLuPsUxi5AN3MiH4ITZZ2y25cc_ldyNjNuDlnDm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCrv_KV7UpNK4rVtjuoSB02DF8-_66_3hjhf05DiuBtsezbVcjYjYZO-W6cbX9Cnrtq78LdIpLcN&lib=MYomth_JGG2zXDAo99EcRWSUkAqFQf1OD',
];

// rab - рабочий
// praz - праздничный-рабочий
// dop-1 - доп-утро
// dop-2 - доп-вечер
let schedule = {
    4: {
        1: '',
        2: '',
        3: 'rab',
        4: 'rab',
        5: 'rab',
        6: '',
        7: '',
        8: 'rab',
        9: 'rab',
        10: '',
        11: '',
        12: '',
        13: 'rab',
        14: 'rab',
        15: '',
        16: '',
        17: 'rab',
        18: 'rab',
        19: 'rab',
        20: '0',
        21: '0',
        22: 'rab',
        23: 'rab',
        24: '',
        25: '',
        26: '',
        27: 'rab',
        28: 'praz',
        29: '',
        30: '',
    }
};

let grafic = {};
function getData(data) {

let table = '';
$.ajax({
    url: 'https://script.google.com/macros/s/AKfycbz4D_xFAYYJxNF6FJeC95gRH9vdJSGh_d7cHb0TdpYGJRLjI1Us/exec'
}).then(function (result) {
    ARV = result;
    //console.log(result['result'][1][0])
    //console.log(result['result'][1][22])
    //console.log(result['result'][2][0])
    //console.log(result['result'][i].indexOf($( "#family" ).val()));
    //console.log(result['result'][i].search($( "#family" ).val()));
    let numberUser = null;
    let month = 0;
    let statusJob = '';
    for (let i=1; i<result['result'].length-14; i++) {
        if (monthName.indexOf(result['result'][i][0]) != -1) {
            month = monthName.indexOf(result['result'][i][0])+1;
            numberUser = result['result'][i].indexOf($( "#family" ).val());
            grafic[month] = {};
            //console.log(result['result'][i][0]+' | '+result['result'][i][22]);
        }
        else if (result['result'][i][0].search('2020-0'+month+'.+') == 0) {
            //console.log(result['result'][i][0]);
            if (result['result'][i][numberUser] != '') {
                let time = result['result'][i][numberUser].split('-');
                if (Number(time[1].split(':')[0])-Number(time[0].split(':')[0]) == 12) {
                    statusJob = 'rab';
                }
                else if (Number(time[1].split(':')[0]) < 12) { statusJob = 'dop-1'; }
                else { statusJob = 'dop-2'; }
            }
            else { statusJob = ''; }
            grafic[month][Number(result['result'][i][0].match('\(2020-0'+month+'-)[0-9]+')[0].substr(8, 2))] = statusJob;
        }
        else {
            console.log(result['result'][i][0]+' | '+result['result'][i][numberUser]);
        }
    }
    console.log(grafic);
    
    switch (data) {
        case '1':
            table += createCalendar(2020, 1);
            table += createCalendar(2020, 2);
            table += createCalendar(2020, 3);
            break;
        case '2':
            table += createCalendar(2020, 4);
            table += createCalendar(2020, 5);
            table += createCalendar(2020, 6);
            break;
        case '3':
            table += createCalendar(2020, 7);
            table += createCalendar(2020, 8);
            table += createCalendar(2020, 9);
            break;
        case '4':
            table += createCalendar(2020, 10);
            table += createCalendar(2020, 11);
            table += createCalendar(2020, 12);
            break;
        default:
            table = 'error';
    }

    $('#calendar').empty();
    $('#calendar').append(table);

})

}

function createCalendar(year, month) {

      let mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
      let d = new Date(year, mon);

      let table = '<table><caption>'+monthName[mon]+'</caption><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

      // пробелы для первого ряда
      // с понедельника до первого дня месяца
      // * * * 1  2  3  4
      for (let i = 0; i < getDay(d); i++) {
        table += '<td></td>';
      }

      // <td> ячейки календаря с датами
      while (d.getMonth() == mon) {
        
        if (getDay(d) % 7 == 6 || getDay(d) % 7 == 5) {
            table += '<td class="output';
            if (typeof grafic[month] !== "undefined") {
                table += ' '+grafic[month][d.getDate()];
            }
            table +='">' + d.getDate() + '</td>';
        }
        else {
            table += '<td class="weekdays';
            if (typeof grafic[month] !== "undefined") {
                table += ' '+grafic[month][d.getDate()];
            }
            table +='">' + d.getDate() + '</td>';
        }

        if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
          table += '</tr><tr>';
        }

        d.setDate(d.getDate() + 1);
      }

      // добить таблицу пустыми ячейками, если нужно
      // 29 30 31 * * * *
      if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
          table += '<td></td>';
        }
      }

      // закрыть таблицу
      table += '</tr></table>';

      return table;
}

function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day == 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
}

$("#quarter").change(function() {
    $('#info').val($( "#quarter" ).val());
    
    //console.log(table);
});

$('#enter').click(function() {
    getData($( "#quarter" ).val());
});
