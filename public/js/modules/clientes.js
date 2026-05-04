'use strict';

const ClientesModule = {

  async init() {
    this._bindEvents();
    await this.load();
  },

  async load() {  },

  _render(lista) { },

  _filter() {  },

  /* ── Modal ───────────────────────────── */
  _openModal(mode, template = null) {  },

  openEdit(id) {  },

  confirmDel(id, name) { },

  async _save() { },

  _bindEvents() { }
};