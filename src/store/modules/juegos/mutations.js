import { Cookies } from 'quasar'

export function setJuegos(state, juegos) {
    state.juegos = juegos;
    state.genero = '';
    state.search = '';
    state.order = '';
    state.desarrolladora = '';
    state.paginate = 2;
    state.errorMessage = '';
    state.paginateactive = true;
    state.showcomponent = true;
    state.errorLogin = false;
    state.errorAdd = false;
    state.add = false;
    state.errorEdit = false;
    state.edit = false;
    state.errorDelete = false;
    state.delete = false;
}

export function setJuego(state, juego) {
    state.juego = juego;
    state.genero = '';
    state.search = '';
    state.desarrolladora = '';
    state.showcomponent = true;
    state.errorLogin = false;
}

export function setJuegosPage(state, juegos) {
    state.juegos = state.juegos.concat(juegos);
    state.genero = '';
    state.search = '';
    state.desarrolladora = '';
    if (juegos.length > 0) {
        state.paginateactive = true;
    } else {
        state.paginateactive = false;
    }
    state.paginate = state.paginate + 1;
    state.showcomponent = true;
}

export function setJuegosPageOrder(state, {juegos, order, pagination}) {
  if(pagination > 1){
    state.juegos = state.juegos.concat(juegos);
    state.paginate = state.paginate + 1;
  } else {
    state.juegos = juegos;
    state.paginate = 2;
  }
  state.order = order;
  state.genero = '';
  state.search = '';
  state.desarrolladora = '';
  if (juegos.length > 0) {
      state.paginateactive = true;
  } else {
      state.paginateactive = false;
  }
  state.showcomponent = true;
}

export function setJuegosSearch(state, { juegos, search, type }) {
    state.juegos = juegos;
    state.search = search;
    state.type = type;
    state.genero = '';
    state.desarrolladora = '';
    state.paginateactive = false;
    state.showcomponent = true;
    state.errorLogin = false;
}

export function setJuegosGenero(state, { juegos, genero }) {
    state.genero = genero;
    state.juegos = juegos;
    state.desarrolladora = '';
    state.search = '';
    state.paginateactive = false;
    state.showcomponent = true;
}

export function setJuegosDesarrolladora(state, { juegos, desarrolladora }) {
    state.desarrolladora = desarrolladora;
    state.juegos = juegos;
    state.genero = '';
    state.search = '';
    state.paginateactive = false;
    state.showcomponent = true;
}

export function JuegosError(state, payload) {
    state.error = true
    state.errorMessage = payload
    state.login = false
    Cookies.remove('token')
    this.$router.push({ path: "/error/forbidden" })
}

export function setGeneros(state, generos) {
    state.generos = generos
}

export function setDesarrolladoras(state, desarrolladoras) {
  state.desarrolladoras = desarrolladoras
}

export function setLogin(state, login) {
    
    if(login.token != null) {
      state.login = true
      state.errorLogin = false
      state.token = login.token
      Cookies.set('token', login.token, {
        expires: '1d'
      })
    } else {
      state.errorLogin = true
    }
    
}

export function setLogout(state, logout) {
    state.login = false
    state.token = ''
    Cookies.remove('token')
    Cookies.destroy('token')
}

export function setAddJuego(state, juego) {
    if(juego.juego.slug != null) {
      state.errorAdd = false
      state.add = true
    } else {
      state.errorAdd = true
      state.add = false
    }
    
}

export function setEditJuego(state, juego) {
  if(juego.juego.slug != null) {
    state.errorEdit = false
    state.edit = true
  } else {
    state.errorEdit = true
    state.edit = false
  }
  
}

export function setDeleteJuego(state, juego) {
    if(juego.success != null) {
      state.errorDelete = false
      state.delete = true
    } else {
      state.errorDelete = true
      state.delete = false
    }
    
}