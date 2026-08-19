
// ===============================
// PANEL DE CLASE
// ===============================


// ===============================
// LISTA DE TRABAJOS
// ===============================

export async function obtenerTrabajos() {

  return [

    {
      id: 1,
      Titulo: "Trabajo Práctico Nº1",
      FechaHora: "15/08/2026",
    },

    {
      id: 2,
      Titulo: "Trabajo Práctico Nº2",
      FechaHora: "25/08/2026",
    },

  ];

}

// ===============================
// TRABAJO
// ===============================

export async function obtenerTrabajo() {

  return {

    Titulo: "Trabajo Práctico Nº1",

    Contenido:
      "Realizar un informe sobre procesos e hilos.",

    Archivos: [

      {

        id: 1,

        Nombre: "Consigna.pdf",

      },

    ],

  };

}

export async function obtenerEntrega() {

  return {

    Archivos: [

      {

        id: 1,

        Nombre: "Informe.pdf",

      },

      {

        id: 2,

        Nombre: "Diagrama.png",

      },

    ],

  };

}

export async function obtenerChat() {

  return [

    {

      id: 1,

      autor: "Mariana López",

      mensaje:
        "Recuerden revisar la consigna antes de entregar.",

    },

    {

      id: 2,

      autor: "Juan Pérez",

      mensaje:
        "Profesora, ¿el informe puede ser en PDF?",

    },

    {

      id: 3,

      autor: "Mariana López",

      mensaje:
        "Sí, PDF está perfecto.",

    },

  ];

}

// ===============================
// ALUMNOS
// ===============================

export async function obtenerAlumnos() {

  return [

    {

      id: 1,

      Nombre: "Juan Pérez",

    },

    {

      id: 2,

      Nombre: "Ana Gómez",

    },

    {

      id: 3,

      Nombre: "Lucas Fernández",

    },

  ];

}