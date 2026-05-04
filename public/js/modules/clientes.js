"use strict";

const ClientesModule = {
  async init() {
    this._bindEvents();
    await this.load();
  },

  async load() {
    console.log("Enviado desde JS clientes");
    const lienzo = document.getElementById("lienzo");

    const coloresFondo = [
      "rgba(142,68,173, 0.2)",
      "rgba(241,196,15, 0.2)",
      "rgba(231,76,60, 0.2)",
      "rgba(46,204,113, 0.2)",
      "rgba(52,152,219, 0.2)",
    ];

      const colorsContorno = [
      "rgba(142,68,173, 1)",
      "rgba(241,196,15, 1)",
      "rgba(231,76,60, 1)",
      "rgba(46,204,113, 1)",
      "rgba(52,152,219, 1)",
    ];

    const configuracion = {
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 100,
        },
      },
    };

    const grafico = new Chart(lienzo, {
      type: "bar",
      data: {
        labels: ["PHP", "JS", "Python", "Java"],
        datasets: [
          {
            label: "2024",
            data: [15, 20, 5, 20, 10],
            backgroundColor: coloresFondo,
            borderColor: colorsContorno,
            borderWidth: 3,
          },
          {
            label: "2025",
            data: [10, 25, 15, 10, 7],
            backgroundColor: coloresFondo,
            borderColor: colorsContorno,
            borderWidth: 3,
          },
        ],
      },
    });

  },

  _render(lista) {},

  _filter() {},

  /* ── Modal ───────────────────────────── */
  _openModal(mode, template = null) {},

  openEdit(id) {},

  confirmDel(id, name) {},

  async _save() {},

  _renderGrafico(){
    console.log(grafico)
  },

  _bindEvents() {},
};
