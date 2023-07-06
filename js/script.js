const dashboardDate = document.querySelector('.dashboard__date'),
    overlay = document.querySelector('.js-overlay-modal');


if (dashboardDate) {
    dashboardDate.addEventListener('click', (e) => {
        overlay.classList.add('active');
        overlay.addEventListener('click', function () {
            this.classList.remove('active');
        });
    });
    setTimeout(() => {
        const cancelBtn = document.querySelector('.cancelBtn');
        const applyBtn = document.querySelector('.applyBtn');
        cancelBtn.addEventListener('click', (e) => {
            overlay.classList.remove('active');
        });
        applyBtn.addEventListener('click', (e) => {
            overlay.classList.remove('active');
        });
    }, 1000);

}


//Select options styling
var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");

for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];

    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 0; j < selElmnt.length; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
            /*when an item is clicked, update the original select box,
            and the selected item:*/
            var y, i, k, s, h;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (i = 0; i < s.length; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    for (k = 0; k < y.length; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);



//Modal window
!function (e) { "function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || function (e) { for (var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0; o[n] && o[n] !== t;)++n; return Boolean(o[n]) }), "function" != typeof e.closest && (e.closest = function (e) { for (var t = this; t && 1 === t.nodeType;) { if (t.matches(e)) return t; t = t.parentNode } return null }) }(window.Element.prototype);


const modalOpenBodyFix = () => {
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
}
const modalCloseBodyFix = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

document.addEventListener('DOMContentLoaded', function () {

    /* Записываем в переменные массив элементов-кнопок и подложку.
       Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
    var modalButtons = document.querySelectorAll('.js-open-modal'),
        overlay = document.querySelector('.js-overlay-modal'),
        closeButtons = document.querySelectorAll('.js-modal-close');
    modalClose = document.querySelectorAll('.__modal_btn');


    /* Перебираем массив кнопок */
    modalButtons.forEach(function (item) {

        /* Назначаем каждой кнопке обработчик клика */
        item.addEventListener('click', function (e) {

            /* Предотвращаем стандартное действие элемента. Так как кнопку разные
               люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
               Нужно подстраховаться. */
            e.preventDefault();

            /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
               и будем искать модальное окно с таким же атрибутом. */
            var modalId = this.getAttribute('data-modal'),
                modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');


            /* После того как нашли нужное модальное окно, добавим классы
               подложке и окну чтобы показать их. */
            modalElem.classList.add('active');
            overlay.classList.add('active');
            modalOpenBodyFix();
        }); // end click

    }); // end foreach


    closeButtons.forEach(function (item) {

        item.addEventListener('click', function (e) {
            var parentModal = this.closest('.modal');

            parentModal.classList.remove('active');
            overlay.classList.remove('active');
            modalCloseBodyFix();
        });

    }); // end foreach
    modalClose.forEach(function (item) {

        item.addEventListener('click', function (e) {
            var parentModal = this.closest('.modal');

            parentModal.classList.remove('active');
            overlay.classList.remove('active');
            modalCloseBodyFix();
        });

    }); // end foreach


    document.body.addEventListener('keyup', function (e) {
        var key = e.keyCode;

        if (key == 27) {
            if (document.querySelector('.modal.active')) {
                document.querySelector('.modal.active').classList.remove('active');
                modalCloseBodyFix();
            }
            document.querySelector('.overlay').classList.remove('active');
        };
    }, false);


    overlay.addEventListener('click', function () {
        if (document.querySelector('.modal.active')) {
            document.querySelector('.modal.active').classList.remove('active');
            modalCloseBodyFix();
        }
        this.classList.remove('active');
    });




}); // end ready

//Datepicker

$('input[name="daterange"]').daterangepicker({
    "minYear": 2000,
    "maxYear": 2050,
    ranges: {
        'Последние 7 дней': [moment().subtract(6, 'days'), moment()],
        'Последние 30 дней': [moment().subtract(29, 'days'), moment()],
        'Последние 12 месяцев': [moment().subtract(11, 'month'), moment()],
        'Текущая неделя': [moment().startOf('week'), moment().endOf('week')],
        'Прошлая неделя': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
        'Текущий месяц': [moment().startOf('month'), moment().endOf('month')],
        'Прошлый месяц': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        'Текущий год': [moment().startOf('year'), moment().endOf('year')],
    },
    "locale": {
        "format": "DD.MM.YYYY",
        "separator": " - ",
        "applyLabel": "Выбрать",
        "cancelLabel": "Отменить",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Произвольный период",
        "weekLabel": "W",
        "daysOfWeek": [
            "Пн",
            "Вт",
            "Ср",
            "Чт",
            "Пт",
            "Сб",
            "Вс"
        ],
        "monthNames": [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
        ],
        "firstDay": 7
    },
    "startDate": "28/06/2023",
    "endDate": "04/07/2023"
}, function (start, end, label) {
    console.log('New date range selected: ' + start.format('DD-MM-YYYY') + ' to ' + end.format('DD-MM-YYYY') + ' (predefined range: ' + label + ')');
    overlay.classList.remove('active');
});


//Show more table data

const showMoreBtn = document.querySelector('.dashboard__btn');

if (showMoreBtn) {
    const tableParent = showMoreBtn.closest('.dashboard__data');
    let tableLines = tableParent.querySelectorAll('.table__line_hidden');
    showMoreBtn.addEventListener('click', () => {
        for (let item of tableLines) {
            item.classList.toggle('visible');
        }
    })
}

//Creating charts

const ctx = document.getElementById('myChart');

Chart.defaults.borderColor = 'transparent';
Chart.defaults.color = '#000';
// ctx.height = 420;

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['15.05 - 22.05', '22.05 - 29.05', '29.05 - 04.06', '04.06 - 11.06', '18.06 - 25.06'],
        datasets: [
            {
                label: 'Выручка',
                data: [200000, 300000, 410000, 400000, 350000],
                backgroundColor: '#01A9AC',
            },
            {
                label: 'Маржа',
                data: [150000, 200000, 150000, 220000, 220000],
                backgroundColor: '#0AC282',
            },
        ]
    },
    options: {
        scales: {
            x: {
                stacked: true,
                display: false,
            },
            y: {
                stacked: true,
                display: false
            }
        },
        plugins: {
            customCanvasBackgroundColor: {
                color: 'white',
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: false,
            subtitle: {
                display: true,
                text: 'Маржа и выручка',
                color: '#000',
                position: 'top',
                align: 'start',
                font: {
                    family: 'Inter',
                    size: 14,
                    weight: 'bold',
                }

            }
        },
        // maintainAspectRatio: false,
    },
    
});

const secondCtx = document.getElementById('myChart-2');

Chart.defaults.borderColor = 'transparent';
Chart.defaults.color = '#000';
// secondCtx.height = 420;

new Chart(secondCtx, {

    type: 'bar',
    data: {
        labels: ['15.05 - 22.05', '22.05 - 29.05', '29.05 - 04.06', '04.06 - 11.06', '18.06 - 25.06'],
        datasets: [
            {
                label: 'Выручка',
                data: [100000, 200000, 300000, 200000, 300000],
                backgroundColor: '#FE5D70',
            },
            {
                label: 'Закупки',
                data: [200000, 300000, 300000, 400000, 200000],
                backgroundColor: '#0AC282',
            },
        ]

    },
    options: {
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            },
        },
        plugins: {
            customCanvasBackgroundColor: {
                color: 'white',
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: false,
            subtitle: {
                display: true,
                text: 'Выручка, закупки и остатки',
                color: '#000',
                position: 'top',
                align: 'start',
                font: {
                    family: 'Inter',
                    size: 14,
                    weight: 'bold',
                }

            }
        },
        // maintainAspectRatio: false,
    }
});