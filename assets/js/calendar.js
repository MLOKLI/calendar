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
    table = '<nav class="navbar navbar-expand-md row"><span class="mb-0 h5 col-10">'+localStorage.getItem('nameUser')+' | '+localStorage.getItem('quarterUser')+'</span><div class="navbar-collapse w-100 order-3 dual-collapse2 col-2"><ul class="navbar-nav ml-auto"><li class="nav-item"><a class="nav-link" href="#" onClick="setingsUser()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M11.31 2.525a9.648 9.648 0 011.38 0c.055.004.135.05.162.16l.351 1.45c.153.628.626 1.08 1.173 1.278.205.074.405.157.6.249a1.832 1.832 0 001.733-.074l1.275-.776c.097-.06.186-.036.228 0 .348.302.674.628.976.976.036.042.06.13 0 .228l-.776 1.274a1.832 1.832 0 00-.074 1.734c.092.195.175.395.248.6.198.547.652 1.02 1.278 1.172l1.45.353c.111.026.157.106.161.161a9.653 9.653 0 010 1.38c-.004.055-.05.135-.16.162l-1.45.351a1.833 1.833 0 00-1.278 1.173 6.926 6.926 0 01-.25.6 1.832 1.832 0 00.075 1.733l.776 1.275c.06.097.036.186 0 .228a9.555 9.555 0 01-.976.976c-.042.036-.13.06-.228 0l-1.275-.776a1.832 1.832 0 00-1.733-.074 6.926 6.926 0 01-.6.248 1.833 1.833 0 00-1.172 1.278l-.353 1.45c-.026.111-.106.157-.161.161a9.653 9.653 0 01-1.38 0c-.055-.004-.135-.05-.162-.16l-.351-1.45a1.833 1.833 0 00-1.173-1.278 6.928 6.928 0 01-.6-.25 1.832 1.832 0 00-1.734.075l-1.274.776c-.097.06-.186.036-.228 0a9.56 9.56 0 01-.976-.976c-.036-.042-.06-.13 0-.228l.776-1.275a1.832 1.832 0 00.074-1.733 6.948 6.948 0 01-.249-.6 1.833 1.833 0 00-1.277-1.172l-1.45-.353c-.111-.026-.157-.106-.161-.161a9.648 9.648 0 010-1.38c.004-.055.05-.135.16-.162l1.45-.351a1.833 1.833 0 001.278-1.173 6.95 6.95 0 01.249-.6 1.832 1.832 0 00-.074-1.734l-.776-1.274c-.06-.097-.036-.186 0-.228.302-.348.628-.674.976-.976.042-.036.13-.06.228 0l1.274.776a1.832 1.832 0 001.734.074 6.95 6.95 0 01.6-.249 1.833 1.833 0 001.172-1.277l.353-1.45c.026-.111.106-.157.161-.161zM12 1c-.268 0-.534.01-.797.028-.763.055-1.345.617-1.512 1.304l-.352 1.45c-.02.078-.09.172-.225.22a8.45 8.45 0 00-.728.303c-.13.06-.246.044-.315.002l-1.274-.776c-.604-.368-1.412-.354-1.99.147-.403.348-.78.726-1.129 1.128-.5.579-.515 1.387-.147 1.99l.776 1.275c.042.069.059.185-.002.315a8.45 8.45 0 00-.302.728c-.05.135-.143.206-.221.225l-1.45.352c-.687.167-1.249.749-1.304 1.512a11.149 11.149 0 000 1.594c.055.763.617 1.345 1.304 1.512l1.45.352c.078.02.172.09.22.225.09.248.191.491.303.729.06.129.044.245.002.314l-.776 1.274c-.368.604-.354 1.412.147 1.99.348.403.726.78 1.128 1.129.579.5 1.387.515 1.99.147l1.275-.776c.069-.042.185-.059.315.002.237.112.48.213.728.302.135.05.206.143.225.221l.352 1.45c.167.687.749 1.249 1.512 1.303a11.125 11.125 0 001.594 0c.763-.054 1.345-.616 1.512-1.303l.352-1.45c.02-.078.09-.172.225-.22.248-.09.491-.191.729-.303.129-.06.245-.044.314-.002l1.274.776c.604.368 1.412.354 1.99-.147.403-.348.78-.726 1.129-1.128.5-.579.515-1.387.147-1.99l-.776-1.275c-.042-.069-.059-.185.002-.315.112-.237.213-.48.302-.728.05-.135.143-.206.221-.225l1.45-.352c.687-.167 1.249-.749 1.303-1.512a11.125 11.125 0 000-1.594c-.054-.763-.616-1.345-1.303-1.512l-1.45-.352c-.078-.02-.172-.09-.22-.225a8.469 8.469 0 00-.303-.728c-.06-.13-.044-.246-.002-.315l.776-1.274c.368-.604.354-1.412-.147-1.99-.348-.403-.726-.78-1.128-1.129-.579-.5-1.387-.515-1.99-.147l-1.275.776c-.069.042-.185.059-.315-.002a8.465 8.465 0 00-.728-.302c-.135-.05-.206-.143-.225-.221l-.352-1.45c-.167-.687-.749-1.249-1.512-1.304A11.149 11.149 0 0012 1zm2.5 11a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg></a></li></ul></div></nav>' + table;

    $('#calendar').empty();
    $('#calendar').append(table);
    if (statusScript != 1) {
        $('.bg-login').toggleClass('none-block');
        $('#calendar').toggleClass('none-block');
    }

})

}

function createCalendar(year, month) {

      let mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
      let d = new Date(year, mon);

      let table = '<div class="col-sm"><table class="table"><thead><tr><th scope="col">ПН</th><th scope="col">ВТ</th><th scope="col">СР</th><th scope="col">ЧТ</th><th scope="col">ПТ</th><th scope="col">СБ</th><th scope="col">ВС</th></tr></thead><tbody>';

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
      table += '</tbody></table></div>';

      return table;
}

function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day == 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
}

if (localStorage.length == 2) {
    statusScript = 1;
    getData(localStorage.getItem('quarterUser'));
    $('.bg-login').toggleClass('none-block');
    $('#calendar').toggleClass('none-block');
    $('#calendar').empty();
    $('#calendar').append('<h1>Загрузка календаря</h1>');
    
    console.log('1');
} else {
    localStorage.clear();
    
    $("#quarter").change(function() {
        $('#info').val($( "#quarter" ).val());
    });
    
    $('#enter').click(function() {
        getData($( "#quarter" ).val());
        localStorage.setItem('nameUser', $( "#family" ).val());
        localStorage.setItem('quarterUser', $( "#quarter" ).val());
    });
    console.log('2');
}

function setingsUser() {
    localStorage.clear();
    $('.bg-login').toggleClass('none-block');
    $('#calendar').toggleClass('none-block');
}
