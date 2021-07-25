import {
  configure,
  extend,
  localize,
  ValidationObserver,
  ValidationProvider, 
} from 'vee-validate'
import {
  email,
  required,
  length,
  min,
  max,
  mimes,
  size
} from 'vee-validate/dist/rules'

import es from 'vee-validate/dist/locale/es.json'

export default async ({ Vue }) => {
  // Register it globally
  Vue.component('ValidationProvider', ValidationProvider)
  Vue.component('ValidationObserver', ValidationObserver)
}

//Change language
localize("es", es)

// Add build-in rules
extend('required', required)
extend('email', email)
extend('length', length)
extend('min', min)
extend('max', max)
extend('mimes', mimes)
extend('size', size)

// Add custom rule
extend('minMaxValue', {
  validate: (value, {
    min,
    max
  }) => {
    return value >= Number(min) && value <= Number(max)
  },
  message: (fieldName, {
    min,
    max
  }) => {
    return `${fieldName} must be between ${min} and ${max}`
  },
  params: ['min', 'max']
})