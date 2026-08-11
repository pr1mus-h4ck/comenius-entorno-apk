// ===============================
// PORTADA
// ===============================

export async function obtenerPortada() {

  return [

    {
      Objetivo:
        "Comprender los conceptos fundamentales de los Sistemas Operativos.",

      EvaluacionCursada:
        "Parcial, trabajos prácticos y examen final.",
    },

  ];

}

// ===============================
// PANEL DE CLASE
// ===============================

export async function obtenerPublicaciones() {

  return [

    {
      id: 1,

      NombreCompleto: "Mariana López",

      FechaHora: "15/07/2026 18:30",

      Titulo: "Bienvenidos",

      Contenido:
        "Recuerden leer el reglamento antes de la próxima clase.",

      comentarios: [

        {
          id: 1,

          NombreCompleto: "Juan Pérez",

          FechaHora: "15/07/2026 19:10",

          Contenido: "Muchas gracias profesora.",
        },

        {
          id: 2,

          NombreCompleto: "Ana Gómez",

          FechaHora: "15/07/2026 20:02",

          Contenido: "Ya descargué el material.",
        },

      ],

    },

  ];

}

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