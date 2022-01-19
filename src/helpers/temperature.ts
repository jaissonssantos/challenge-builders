import Intl from 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import Decimal from 'decimal.js'

const toCelsius = (amount: number, fixed: number): string => 
  new Decimal(amount).toFixed(fixed)

const toPercentage = (amount: number): string => {
    const option = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  
    const { format } = new Intl.NumberFormat('pt-BR', option)
  
    return format(amount)
}

export { 
    toCelsius,
    toPercentage
}
