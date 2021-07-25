import Vue from 'vue'
import { api } from 'boot/axios'
import { Cookies } from 'quasar'

export async function fetchJuegos({ commit }) {
    this._vm.$q.loading.show({ spinnerSize: 140, message: 'Cargando...', backgroundColor: 'dark' })

    return api.get(`/api/juegos/paginate?page=1&items=8`)
        .then(response => {
            commit('juegos/setJuegos', response.data, { root: true })
            this._vm.$q.loading.hide();
        })
        .catch((e) => {
            commit('juegos/JuegosError', e.message, { root: true })
        })
        .finally(() => {
            console.log('La petición para obtener los juegos ha finalizado')
        })
}

export async function fetchJuegosPage({ commit }, paginate) {
    return api.get(`/api/juegos/paginate?page=${paginate}&items=8`)
        .then(response => {
            commit('juegos/setJuegosPage', response.data, { root: true })
        })
        .catch((e) => {
            commit('juegos/JuegosError', e.message, { root: true })
        })
        .finally(() => {
            console.log('La petición para obtener los juegos ha finalizado')
        })
}

export async function fetchJuegosGenero({ commit }, genero) {
    this._vm.$q.loading.show({ spinnerSize: 140, message: 'Cargando...', backgroundColor: 'dark' })

    return api.get(`/api/juegos/generos/${genero}`)
        .then(response => {
            response = response.data
            commit('juegos/setJuegosGenero', { juegos: response, genero }, { root: true })
            this._vm.$q.loading.hide();
        })
        .catch((e) => {
            commit('juegos/JuegosError', e.message, { root: true })
        })
        .finally(() => {
            console.log('La petición para obtener los juegos del genero ' + genero + ' ha finalizado')
        })
}

export async function fetchJuegosDesarrolladora({ commit }, desarrolladora) {
    this._vm.$q.loading.show({ spinnerSize: 140, message: 'Cargando...', backgroundColor: 'dark' })

    return api.get(`/api/juegos/desarrolladoras/${desarrolladora}`)
        .then(response => {
            response = response.data
            commit('juegos/setJuegosDesarrolladora', { juegos: response, desarrolladora }, { root: true })
            this._vm.$q.loading.hide();
        })
        .catch((e) => {
            commit('juegos/JuegosError', e.message, { root: true })
        })
        .finally(() => {
            console.log('La petición para obtener los juegos de la desarrolladora ' + desarrolladora + ' ha finalizado')
        })
}

export async function searchJuegos({ commit }, search) {
    this._vm.$q.loading.show({ spinnerSize: 140, message: 'Cargando...', backgroundColor: 'dark' })
    let filter = '';
    let order = '';
    if (search.type == 1) {
        filter = 'nombre';
        order = 'ASC';
    } else if (search.type == 2) {
        filter = 'nombre';
        order = 'DESC';
    } else if (search.type == 3) {
        filter = 'fecha';
        order = 'ASC';
    } else if (search.type == 4) {
        filter = 'fecha';
        order = 'DESC';
    }

    search = search.search;
    return api.post(`/api/juegos/filter/search`, { search, filter, order })
        .then(response => {
            response = response.data
            commit('juegos/setJuegosSearch', { juegos: response, search, filter, order }, { root: true })
            this._vm.$q.loading.hide();
        })
        .catch((e) => {
            commit('juegos/JuegosError', e.message, { root: true })
        })
        .finally(() => {
            console.log('La petición para buscar el juego: ' + search + ' ha finalizado')
        })
}

export async function getJuego({ commit }, slug) {
    this._vm.$q.loading.show({ spinnerSize: 140, message: 'Cargando...', backgroundColor: 'dark' })

    return api.get(`/api/juegos/${slug}`)
        .then(response => {
            commit('juegos/setJuego', response.data, { root: true })
            this._vm.$q.loading.hide();
        })
        .catch((e) => {
            commit('juegos/JuegosError', e.message, { root: true })
        })
        .finally(() => {
            console.log('La petición para obtener el juego ha finalizado')
        })
}

export async function login({ commit }, credentials) {
    this._vm.$q.loading.show({ spinnerSize: 140, message: 'Cargando...', backgroundColor: 'dark' })
    let email = credentials.email
    let password = credentials.password
    return await api.post(`/api/auth/login`, { email, password })
        .then(response => {
            commit('juegos/setLogin', response.data, { root: true })
            this._vm.$q.loading.hide();
        })
        .catch((e) => {
            commit('juegos/JuegosError', e.message, { root: true })
        })
        .finally(() => {
            console.log('La petición para hacer login ha finalizado')
        })
}

export async function logout({ commit }) {
    this._vm.$q.loading.show({ spinnerSize: 140, message: 'Cargando...', backgroundColor: 'dark' })
    return await api.post(`/api/auth/logout`, {}, { headers: { 'Authorization': Cookies.get('token') } })
        .then(response => {
            commit('juegos/setLogout', response.data, { root: true })
            this._vm.$q.loading.hide();
        })
        .catch((e) => {
            commit('juegos/JuegosError', e.message, { root: true })
            this._vm.$q.loading.hide();
        })
        .finally(() => {
            console.log('La petición para hacer logout ha finalizado')
        })
}

export async function fetchGeneros({ commit }) {

    return api.get(`/api/juegos/generos/show/all`)
        .then(response => {
            commit('juegos/setGeneros', response.data, { root: true })
            this._vm.$q.loading.hide();
        })
        .catch((e) => {
            commit('juegos/JuegosError', e.message, { root: true })
        })
        .finally(() => {
            console.log('La petición para obtener los juegos ha finalizado')
        })
}

export async function addJuego({ commit }, juego) {
    this._vm.$q.loading.show({ spinnerSize: 140, message: 'Insertando juego...', backgroundColor: 'dark' })

    return api.post(`/api/juegos`, juego, { headers: { 'Authorization': Cookies.get('token'), 'content-type': 'multipart/form-data' } })
        .then(response => {
            commit('juegos/setAddJuego', { juego: response.data }, { root: true })
            this._vm.$q.loading.hide();
        })
        .catch((e) => {
            commit('juegos/JuegosError', e.message, { root: true })
            this._vm.$q.loading.hide();
        })
        .finally(() => {
            console.log('La petición para crear el juego: ' + juego.nombre + ' ha finalizado')
        })
}

export async function updateJuegoWithImage({ commit }, juego) {
    this._vm.$q.loading.show({ spinnerSize: 140, message: 'Actualizando juego...', backgroundColor: 'dark' })

    return api.post(`/api/juegos/edit`, juego, { headers: { 'Authorization': Cookies.get('token'), 'content-type': 'multipart/form-data' } })
        .then(response => {
            commit('juegos/setEditJuego', { juego: response.data }, { root: true })
            this._vm.$q.loading.hide();
        })
        .catch((e) => {
            commit('juegos/JuegosError', e.message, { root: true })
            this._vm.$q.loading.hide();
        })
        .finally(() => {
            console.log('La petición para actualizar el juego: ' + juego.nombre + ' ha finalizado')
        })
}

export async function updateJuegoWithoutImage({ commit }, juego) {
    this._vm.$q.loading.show({ spinnerSize: 140, message: 'Actualizando juego...', backgroundColor: 'dark' })

    return api.put(`/api/juegos/edit`, juego, { headers: { 'Authorization': Cookies.get('token') } })
        .then(response => {
            commit('juegos/setEditJuego', { juego: response.data }, { root: true })
            this._vm.$q.loading.hide();
        })
        .catch((e) => {
            commit('juegos/JuegosError', e.message, { root: true })
            this._vm.$q.loading.hide();
        })
        .finally(() => {
            console.log('La petición para actualizar el juego: ' + juego.nombre + ' ha finalizado')
        })
}

export async function deleteJuego({ commit }, slug) {
    this._vm.$q.loading.show({ spinnerSize: 140, message: 'Eliminando...', backgroundColor: 'dark' })
    return await api.delete(`/api/juegos/delete/${slug}`, { headers: { 'Authorization': Cookies.get('token') } })
        .then(response => {
            commit('juegos/setDeleteJuego', response.data, { root: true })
            this._vm.$q.loading.hide();
        })
        .catch((e) => {
            commit('juegos/JuegosError', e.message, { root: true })
            this._vm.$q.loading.hide();
        })
        .finally(() => {
            console.log('La petición para eliminar el juego ha finalizado')
        })
}