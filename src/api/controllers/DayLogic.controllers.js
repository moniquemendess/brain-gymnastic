// //----------------------------------------(Importaciones)----------------------------------------------------------------------
// const fs = require("fs");
// const path = require("path");
// const data = require("../../data/enigmas.json");

// //----------------------------------------(Create DayLogic)----------------------------------------------------------------------

// // Função para criar um enigma aleatório
// const createDayLogic = async () => {
//   try {
//     // Escolher um enigma aleatório do arquivo data/enigmas.json
//     const randomRiddle = data[Math.floor(Math.random() * data.length)];

//     // Aqui você iria salvar o enigma no banco de dados MongoDB
//     console.log("Enigma criado:", randomRiddle);

//     // Retornar o enigma criado
//     return randomRiddle;
//   } catch (error) {
//     console.error("Erro ao criar o enigma:", error);
//     throw new Error("Erro ao criar o enigma");
//   }
// };

// // Função para programar a criação do próximo enigma após um dia
// const nextLogic = async () => {
//   try {
//     // Tempo de espera de 1 dia em milissegundos
//     const day = 24 * 60 * 60 * 1000;

//     // Criar um temporizador para aguardar um dia
//     setTimeout(async () => {
//       try {
//         const newLogic = await createDayLogic();
//         // Chamando a próxima lógica após o tempo especificado
//         await nextLogic();
//       } catch (error) {
//         console.error("Erro ao criar próximo enigma:", error);
//       }
//     }, day);
//   } catch (error) {
//     console.error("Erro ao programar próximo enigma:", error);
//     throw new Error("Erro ao programar próximo enigma");
//   }
// };

// // Iniciar o processo de criação de enigmas
// createDayLogic()
//   .then(() => {
//     // Programar a criação do próximo enigma após um dia
//     nextLogic();
//   })
//   .catch((error) => {
//     console.error("Erro ao iniciar a criação de enigmas:", error);
//   });

// const createAndScheduleEnigmaCreation = async () => {
//   try {
//     // Criar um enigma
//     const newEnigma = await createDayLogic();
//     console.log("Enigma criado:", newEnigma);

//     // Programar a criação do próximo enigma após um dia
//     await nextLogic();

//     console.log("Próximo enigma programado com sucesso.");
//   } catch (error) {
//     console.error("Erro ao criar ou programar enigma:", error);
//     throw new Error("Erro ao criar ou programar enigma");
//   }
// };

// // Chamar a função para criar um enigma e programar a próxima criação
// createAndScheduleEnigmaCreation()
//   .then(() => {
//     console.log(
//       "Processo de criação de enigmas e programação do próximo enigma iniciado com sucesso!"
//     );
//   })
//   .catch((error) => {
//     console.error(
//       "Erro ao iniciar o processo de criação e programação de enigmas:",
//       error
//     );
//   });

// //----------------------------------------(Exportaciones)----------------------------------------------------------------------

// module.exports = { createAndScheduleEnigmaCreation };
