//querySelectorAll получает все элементы: array object
//querySelector получает первый элемент: object
const switcher = document.querySelector('#cbx'),
    more = document.querySelector('.more'),
    modal = document.querySelector('.modal'),
    videos = document.querySelectorAll('.videos__item');

    let playar;


//----------------------------------------------------------------------------------------
//(1)
    function bindSlideTogget(trigger, body, content, openClass) {

        let button = {
            'element': document.querySelector(trigger),
            'active': false
        };
        const boxBody = document.querySelector(body),
            boxContent = document.querySelector(content);

            button.element.addEventListener('click', () => { 
                if (button.active === false) {
                    button.active = true;
                    boxBody.style.height = boxContent.clientHeight + 'px';
                    boxBody.classList.add(openClass) //Активный класс для меню
                } else {
                    button.active = false;
                    boxBody.style.height = 0 + 'px';
                    boxBody.classList.remove(openClass);
                }
            });
    }

    bindSlideTogget('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active')
//------------------------------------------------------------------------------------------------
//(2)
function switchMode()
{
    //document.body.style.backgroundColor = '#000';
    if (night === false) {
         night = true;
        document.body.classList.add('night');
        document.querySelector('.header__item-descr').style.color = '#fff';
        document.querySelector('.logo > img').src = 'logo/youtube_night.svg';

        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = '#fff';
        });

        document.querySelectorAll('.videos__item-descr').forEach(item => {
            item.style.color = '#fff';
        });

        document.querySelectorAll('.videos__item-views').forEach(item => {
            item.style.color = '#fff';
        });
    } else {
        night = false;
        document.body.classList.remove('night');
        document.querySelector('.header__item-descr').style.color = '#000';
        document.querySelector('.logo > img').src = 'logo/youtube.svg';
        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = '#000';
        });

        document.querySelectorAll('.videos__item-descr').forEach(item => {
            item.style.color = '#000';
        });

        document.querySelectorAll('.videos__item-views').forEach(item => {
            item.style.color = '#000';
        });
    }

}

let night = false;

switcher.addEventListener('change', () => {
    switchMode();
})
//-------------------------------------------------------------------------------------
//(3)
//console.log(document.getElementsByTagName('div'));

const data = [
            ['thumb_3.webp', 'thumb_4.webp', 'thumb_5.webp'],
            ['#3 Оптимизация Page Speed Insight Google | Публикация на Хостинг | HandyHost | Марафон вёрстки',
            '#2 Оптимизация Page Speed Insight Google | Публикация на Хостинг | HandyHost | Марафон вёрстки',
            '#1 Оптимизация Page Speed Insight Google | Публикация на Хостинг | HandyHost | Марафон вёрстки'],
            ['2,6 тыс. просмотров', '5,6 тыс. просмотров', '10,1 тыс. просмотров'],
            ['v=g4Wee31dVjw', 'v=g4Wee31dVjw', 'v=g4Wee31dVjw']
];

more.addEventListener('click', () => {
    const videoWrapper = document.querySelector('.videos__wrapper');
    more.remove();

    for (let i = 0; i < data[0].length; i++) {
        let card = document.createElement('a');
        card.classList.add('videos__item', 'videos__item-active');
        card.setAttribute('data-url', data[3][i]);

        card.innerHTML = `
            <img src="img/${data[0][i]}" alt="thumb">
            <div class="videos__item-descr">
                ${data[1][i]}              
                </div>
            <div class="videos__item-views">
                ${data[2][i]}
            </div>
        `;

        videoWrapper.appendChild(card);
        setTimeout(() => {
            card.classList.remove('videos__item-active');
        }, 10);
        
            bindNewModal(card);
    }

    sliceTitle('.videos__item-descr', 90);
});

//--------------------------------------------------------------------------------
//(4)
//4rot25a3wmexy

function sliceTitle(selector, count) {
    // console.log(document.querySelectorAll('.videos__item-descr'));
    document.querySelectorAll(selector).forEach( item => {
        item.textContent.trim();//данный метод меняет инициальное
        if (item.textContent.lengtch < count) {
            return;
        } else {
            const str = item.textContent.slice(0, count+1) + "..."; //последний 101 не включаеться, т.е. не ключительно 
            item.textContent = str; //присваивание нового значение этому блоку.
        }
    });
}

sliceTitle('.videos__item-descr', 90);

//---------------------------------------------------------------------------------
//(5)

function openModal() {
    modal.style.display = 'block';

}

function closedModal() {
    modal.style.display = 'none';
    playar.stopVideo();
}

function bindModal(cards) {
        cards.forEach( item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });
}

bindModal(videos);

function bindNewModal(card) {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}

modal.addEventListener('click', (e) => {
    if (!e.target.classList.contains('modal__body')) {
        closedModal();
    }
});
//------------------------------------------------------------------------------------------------
//(6)

function createVideo()
{
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    setTimeout(() => {
        playar = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: 'M7lc1UVf-VE'
          });
    }, 300);
}

createVideo();

