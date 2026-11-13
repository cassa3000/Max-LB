/* ===== 1. Часы реального времени ===== */
function updateClock() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    var s = String(now.getSeconds()).padStart(2, '0');
    var el = document.getElementById('clock-box');
    if (el) {
        el.innerHTML = '🕒 ' + h + ':' + m + ':' + s;
    }
}
setInterval(updateClock, 1000);
window.addEventListener('load', updateClock);

/* ===== 2. Счётчик посетителей (на основе localStorage) ===== */
function initVisitorCounter() {
    var el = document.getElementById('visitor-counter');
    if (!el) return;
    var count = localStorage.getItem('tehnomaks_visits');
    count = count ? parseInt(count, 10) + 1 : 1;
    localStorage.setItem('tehnomaks_visits', count);
    el.textContent = count;
}

/* ===== 3. Календарь на текущий месяц ===== */
function buildCalendar() {
    var el = document.getElementById('calendar-box');
    if (!el) return;

    var months = ['Январь','Февраль','Март','Апрель','Май','Июнь',
                  'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    var days = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var today = now.getDate();

    var firstDay = new Date(year, month, 1).getDay();
    if (firstDay === 0) firstDay = 7;
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    var html = '<table style="border-collapse:collapse;font-size:9.5pt;">';
    html += '<caption style="font-weight:bold;color:#1a2b4c;margin-bottom:4px;">' +
            months[month] + ' ' + year + '</caption><tr>';
    for (var d = 0; d < 7; d++) {
        html += '<th style="padding:3px 6px;color:#24406e;">' + days[d] + '</th>';
    }
    html += '</tr><tr>';

    var cell = 1;
    for (var i = 1; i < firstDay; i++) {
        html += '<td></td>';
        cell++;
    }
    for (var day = 1; day <= daysInMonth; day++) {
        if (cell > 7) { html += '</tr><tr>'; cell = 1; }
        var style = 'padding:3px 6px;text-align:center;border:1px solid #dde3ec;';
        if (day === today) {
            style += 'background:#ffcc00;font-weight:bold;color:#1a2b4c;';
        }
        html += '<td style="' + style + '">' + day + '</td>';
        cell++;
    }
    while (cell <= 7) { html += '<td></td>'; cell++; }
    html += '</tr></table>';

    el.innerHTML = html;
}

/* ===== Инициализация ===== */
window.addEventListener('load', function () {
    initVisitorCounter();
    buildCalendar();
});