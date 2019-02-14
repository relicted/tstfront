import Vue from 'vue';
import * as VueWebsocket from "vue-websocket";
Vue.use(VueWebsocket, 'ws://localhost:8000/ws')
