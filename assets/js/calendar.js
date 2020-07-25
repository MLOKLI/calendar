var statusScript = 0;

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
let grafic = {};
function getData(data) {

let table = '';
$.ajax({
    url: 'https://script.google.com/macros/s/AKfycbz4D_xFAYYJxNF6FJeC95gRH9vdJSGh_d7cHb0TdpYGJRLjI1Us/exec'
}).then(function (result) {
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
            numberUser = result['result'][i].indexOf(localStorage.getItem('nameUser') ? localStorage.getItem('nameUser') : $( "#family" ).val());
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
            table += '<div class="row">';
            table += createCalendar(2020, 1);
            table += createCalendar(2020, 2);
            table += createCalendar(2020, 3);
            table += '</div>';
            break;
        case '2':
            table += '<div class="row">';
            table += createCalendar(2020, 4);
            table += createCalendar(2020, 5);
            table += createCalendar(2020, 6);
            table += '</div>';
            break;
        case '3':
            table += '<div class="row">';
            table += createCalendar(2020, 7);
            table += createCalendar(2020, 8);
            table += createCalendar(2020, 9);
            table += '</div>';
            break;
        case '4':
            table += '<div class="row">';
            table += createCalendar(2020, 10);
            table += createCalendar(2020, 11);
            table += createCalendar(2020, 12);
            table += '</div>';
            break;
        default:
            table = 'error';
    }
    table = '<nav class="navbar navbar-expand-md row"><span class="mb-0 h5 col-10">'+localStorage.getItem('nameUser')+' | Квартал '+localStorage.getItem('quarterUser')+'</span><div class="navbar-collapse w-100 order-3 dual-collapse2 col-2"><ul class="navbar-nav ml-auto"><li class="nav-item"><a class="nav-link" href="#" onClick="setingsUser()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M3 3.25c0-.966.784-1.75 1.75-1.75h5.5a.75.75 0 010 1.5h-5.5a.25.25 0 00-.25.25v17.5c0 .138.112.25.25.25h5.5a.75.75 0 010 1.5h-5.5A1.75 1.75 0 013 20.75V3.25zm16.006 9.5l-3.3 3.484a.75.75 0 001.088 1.032l4.5-4.75a.75.75 0 000-1.032l-4.5-4.75a.75.75 0 00-1.088 1.032l3.3 3.484H10.75a.75.75 0 000 1.5h8.256z"></path></svg></a></li></ul></div></nav>' + table;

    $('#calendar').empty();
    $('#calendar').append(table);
    if (statusScript != 1) {
        $('.bg-login').toggleClass('none-block');
        $('#calendar').toggleClass('none-block');
    }
})

}

function createCalendar(year, month) {
      let today = [new Date().getMonth(), new Date().getDate()];
      let mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
      let d = new Date(year, mon);

      let table = '<div class="col-sm"><table class="table"><caption>'+monthName[month-1]+'</caption><thead><tr><th scope="col">ПН</th><th scope="col">ВТ</th><th scope="col">СР</th><th scope="col">ЧТ</th><th scope="col">ПТ</th><th scope="col">СБ</th><th scope="col">ВС</th></tr></thead><tbody>';

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
            if (Number(today[0]+1) == month && Number(today[1]) == d.getDate()) {
                table += ' Today';
            }
            table +='">' + d.getDate() + '</td>';
        }
        else {
            table += '<td class="weekdays';
            if (typeof grafic[month] !== "undefined") {
                table += ' '+grafic[month][d.getDate()];
            }
            if (Number(today[0]+1) == month && Number(today[1]) == d.getDate()) {
                table += ' Today';
            }
            table +='">' + d.getDate() + '</td>';
        }
          
        console.log('Печатает: '+d.getDate()+'.'+month+' | Сейчас: '+Number(today[1])+'.'+Number(today[0]+1))

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
      table += '</tbody></table></div>';

      return table;
}

function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day == 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
}

$("#quarter").change(function() {
    if (localStorage.length != 2) {
        $('#info').val($( "#quarter" ).val());
    }
});
    
$('#enter').click(function() {
        getData($( "#quarter" ).val());
        localStorage.setItem('nameUser', $( "#family" ).val());
        localStorage.setItem('quarterUser', $( "#quarter" ).val());
});

if (localStorage.length == 2) {
    statusScript = 1;
    getData(localStorage.getItem('quarterUser'));
    $('.bg-login').toggleClass('none-block');
    $('#calendar').toggleClass('none-block');
    $('#calendar').empty();
    $('#calendar').append('<h1>Загрузка календаря</h1>');
} else {
    localStorage.clear();
}

function setingsUser() {
    localStorage.clear();
    $('.bg-login').toggleClass('none-block');
    $('#calendar').toggleClass('none-block');
    statusScript = 0;
}
