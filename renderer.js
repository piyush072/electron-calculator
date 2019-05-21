const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = calculator.querySelector('.calculator__display')

keys.addEventListener('click', e => {
  if(e.target.matches('button')){
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
    const previousKeyType = calculator.dataset.previousKeyType
    if(!action)
      if (displayedNum === '0' || previousKeyType === 'operator'){
        display.textContent = keyContent
        calculator.dataset.previousKeyType = 'number'
      }
      else {
        display.textContent = displayedNum + keyContent
      }
  if(action === 'decimal'){
    display.textContent = displayedNum + '.'
  }
  if(action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide' ){
        key.classList.add('is-depressed')
        calculator.dataset.previousKeyType = 'operator'

        calculator.dataset.firstValue = displayedNum
        calculator.dataset.operator = action
      }

      Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

      if(action === 'calculate'){
        const secondValue = displayedNum
        const operator = calculator.dataset.operator
        const firstValue = calculator.dataset.firstValue

        display.textContent = calculate(firstValue, operator, secondValue)
      }

    if(action === 'clear'){
      calculator.dataset.firstValue = ''
      calculator.dataset.operator = ''
      calculator.dataset.secondValue = ''
      calculator.dataset.previousKeyType = ''

      display.textContent = 0
      calculator.dataset.previousKeyType = 'clear'
    }
    }

})

const calculate= (n1, operator, n2) => {
  let result = ''
  if(operator === 'add'){
    result = parseFloat(n1) + parseFloat(n2)
  }
  else if(operator === 'subtract'){
    result = parseFloat(n1) - parseFloat(n2)
  }
  else if(operator === 'multiply'){
    result = parseFloat(n1) * parseFloat(n2)
  }
  else if(operator === 'divide'){
    result = parseFloat(n1) / parseFloat(n2)
  }
  return result
}
