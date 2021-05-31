
const slider = document.querySelector('.slider');

const input = document.createElement('input');

input.setAttribute('type', 'range')
input.setAttribute('min', '1000')
input.setAttribute('max', '8000')
input.setAttribute('step', '1000')
input.setAttribute('value', '1980')

slider.appendChild(input);

// const per = +input.getAttribute('value') === +input.getAttribute('min') ? '1%' : ((+input.getAttribute('value') - 1000) * 100 ) / +input.getAttribute('max');

// input.style.background = `-webkit-linear-gradient(left, #C42F9E 1%, #C42F9E ${per}%, #fff ${per}%, #fff 100%)` 

console.log(Math.floor((+input.getAttribute('value') / 1000)) * 1000)

var value = (round(+input.getAttribute('value'), +input.getAttribute('step')) - +input.getAttribute('min'))/(+input.getAttribute('max') - +input.getAttribute('min'))*100
input.style.background = 'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + value + '%, #fff ' + value + '%, white 100%)'





input.addEventListener('input', (e) => {
    console.log(e.target.value, ((e.target.value) * 100) / 8000);

    const value = (e.target.value-e.target.min)/(e.target.max-e.target.min)*100
    e.target.style.background = 'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + value + '%, #fff ' + value + '%, white 100%)'
})


function round(value, step) {
    const separator = step / 2;
    const part = `${value}`.slice(1, `${value}`.length);

    if (part < separator) {
        return Math.floor(value / 1000) * 1000;
    } else {
        return Math.ceil(value / 1000) * 1000;
    }
}

console.log(round(3400, 1000))

// class DraggebleRange {
//     constructor(options) {
//         this.options = options;
//     }
// }
