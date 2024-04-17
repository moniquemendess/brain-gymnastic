//----------------------------------(Importaciones)------------------------------------------------------------------------

const cron = require("node-cron");
const Enigma = require("../models/Enigma.model");

//----------------------------------(Get Random Enigma(aleatorio))------------------------------------------------------------------------

let dailyEnigma = null;

const getRandomEnigma = async () => {
  try {
    const count = await Enigma.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomEnigma = await Enigma.findOne().skip(randomIndex);
    return randomEnigma;
  } catch (error) {
    throw new Error("Erro ao obter enigma aleatório");
  }
};

//----------------------------------(Update del Enigma )------------------------------------------------------------------------

const updateDailyEnigma = async () => {
  try {
    dailyEnigma = await getRandomEnigma();
  } catch (error) {
    console.error("Erro ao atualizar enigma do dia:", error);
  }
};
//----------------------------------(Configuracion del horario del enigma )------------------------------------------------------------------------

// Agendando la atualizacion del enigma diariamente a las 8h de la mañana
cron.schedule("0 8 * * *", async () => {
  await updateDailyEnigma();
});

const getDailyEnigma = () => {
  return dailyEnigma;
};

//----------------------------------(Exportaciones)------------------------------------------------------------------------

module.exports = { getDailyEnigma };
