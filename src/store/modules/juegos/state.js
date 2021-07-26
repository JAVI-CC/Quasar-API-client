import { Cookies } from 'quasar'
let token
let login
if(Cookies.get('token')) {
  token = Cookies.get('token')
  login = true
} else {
  token = ''
  login = false
}

export default {
  juegos: [],
  juego: [],
  generos: [],
  error: false,
  login: login,
  token: token, 
  genero: '',
  desarrolladora: '',
  errorMessage: '',
  errorLogin: false,
  errorAdd: false,
  errorEdit: false,
  errorDelete: false,
  add: false,
  edit: false,
  delete: false,
  editSlug: '',
  search: '',
  order: '',
  type: '',
  paginate: 2,
  paginateactive: true,
  showcomponent: false,
}