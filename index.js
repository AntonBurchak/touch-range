
const slider = document.querySelector('.slider');

// const input = document.createElement('input');

// input.setAttribute('type', 'range')
// input.setAttribute('min', '1000')
// input.setAttribute('max', '8000')
// input.setAttribute('step', '1000')
// input.setAttribute('value', '1980')

// slider.appendChild(input);

// // const per = +input.getAttribute('value') === +input.getAttribute('min') ? '1%' : ((+input.getAttribute('value') - 1000) * 100 ) / +input.getAttribute('max');

// // input.style.background = `-webkit-linear-gradient(left, #C42F9E 1%, #C42F9E ${per}%, #fff ${per}%, #fff 100%)` 

// console.log(Math.floor((+input.getAttribute('value') / 1000)) * 1000)

// var value = (round(+input.getAttribute('value'), +input.getAttribute('step')) - +input.getAttribute('min'))/(+input.getAttribute('max') - +input.getAttribute('min'))*100
// input.style.background = 'linear-gradient(to right, #C42F9E 0%, #C42F9E ' + value + '%, #fff ' + value + '%, white 100%)'





// input.addEventListener('input', (e) => {
//     console.log(e.target.value, ((e.target.value) * 100) / 8000);

//     const value = (e.target.value-e.target.min)/(e.target.max-e.target.min)*100
//     e.target.style.background = 'linear-gradient(to right, #C42F9E 0%, #C42F9E ' + value + '%, #fff ' + value + '%, white 100%)';

//     perChange(e.target.value)
// })


function round(value, step) {
    const separator = step / 2;
    const part = `${value}`.slice(1, `${value}`.length);

    if (part < separator) {
        return Math.floor(value / 1000) * 1000;
    } else {
        return Math.ceil(value / 1000) * 1000;
    }
}

// console.log(round(3400, 1000))

const dem = document.querySelector('.demonstration');

function perChange(value) {
    dem.innerHTML = 'Change! : ' + value;
}

class DraggableRange {
    constructor(options) {
        this.options = options;
        this.input = document.createElement('input');

        this.initialize()
    }

    /**
     * 1. инициализировать с параметрами (параметры: 
     * мин. знач, 
     * макс. знач, 
     * знач. по дефолту, 
     * обработчики событий, 
     * атрибуты ХТМЛ
     * )
     * 2. сеттеры для нового value
     * 3. получить инпут (ноду)
     * 4. вставить инпут куда-то (appendChild)
     */

    initialize() {
        this.initializeTags();
        this.initializeValues();
        this.initializeStyles();
        this.initializeEvents();
    }

    initializeTags() {
        const { tags } = this.options;

        this.input.setAttribute('type', 'range');

        for (const tag in tags) {
            if (Object.hasOwnProperty.call(tags, tag)) {
                const tagValue = tags[tag];
                
                if (typeof tagValue === 'object') {

                    for (const dataTag in tagValue) {
                        if (Object.hasOwnProperty.call(tagValue, dataTag)) {
                            const dataTagValue = tagValue[dataTag];
                            this.input.setAttribute(`data-${dataTag}`, dataTagValue);
                        }
                    }

                } else {
                    this.input.setAttribute(tag, tagValue);
                }
            }
        }
    }

    initializeValues() {
        const { values } = this.options;

        this.input.setAttribute('value', values.defaultValue);
        this.input.setAttribute('min', values.minValue);
        this.input.setAttribute('max', values.maxValue);
        this.input.setAttribute('step', values.step);
    }

    initializeStyles() {
        this.calculateBackground();
    }

    initializeEvents() {
        const { events } = this.options;
        const eventsList = Object.entries(events).filter(([event]) => event !== 'input');

        eventsList.forEach(([event, handler]) => {
            this.input.addEventListener(event, (e) => handler(e.target.value))
        })

        this.input.addEventListener('input', (e) => {
            this.calculateBackground(e)
        
            if (events.input) {
                events.input(e.target.value);
            }
        })
    }

    setValue(value) {
        if (value) {
            this.input.setAttribute('value', value);
        }

        this.calculateBackground();
    }

    getInput() {
        return this.input;
    }

    calculateBackground(inputValue) {
        const { values } = this.options; 
        const { lineActive, bgLine } = this.options.styles;

        const value =   (round(this.input.value, values.step) - values.minValue) / 
                        (values.maxValue - values.minValue) * 100;

        this.input.style.background = 'linear-gradient(to right, ' + lineActive + ' 0%, ' + lineActive + ' ' + value + '%, ' + bgLine + ' ' + value + '%, ' + bgLine + ' 100%)';
    }
}

const range = new DraggableRange({
    events: {
        click: (value) => console.log('click!: ' + value),
        input: perChange,
    },
    values: {
        defaultValue: 1400,
        minValue: 1000,
        maxValue: 8000,
        step: 1000
    },
    tags: {
        class: 'myRange',
        data: {
            type: 'range-input'
        }
    },
    styles: {
        lineActive: '#9fc42f',
        bgLine: '#fff'
    }
}, slider)

console.log(range)

slider.appendChild(range.getInput());

// range.setValue(7000)