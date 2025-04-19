export const additionTasks: MathTask[] = [];
export const subtractionTasks: { pl: MathTask[]; en: MathTask[] } = {
  pl: [
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Marta miała ${firstNumber} złotych 💰, kupiła zeszyt za ${secondNumber} złotych 📓 i długopis za ${thirdNumber} złotych ✒️. Ile pieniędzy jej zostało?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Kuba miał ${firstNumber} jabłek 🍎, zjadł ${secondNumber} i dał ${thirdNumber} koleżance. Ile jabłek mu zostało?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Zosia miała ${firstNumber} pluszaków 🧸, oddała ${secondNumber} koleżance i zgubiła ${thirdNumber}. Ile ma teraz pluszaków?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Antek miał ${firstNumber} cukierków 🍬, zjadł ${secondNumber}, a potem oddał ${thirdNumber}. Ile ma teraz cukierków?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Lena miała ${firstNumber} klocków 🧱, oddała ${secondNumber} koleżance i zgubiła ${thirdNumber}. Ile ma teraz klocków?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Filip miał ${firstNumber} naklejek 🏷️, odkleił ${secondNumber}, a koleżanka zabrała mu ${thirdNumber}. Ile ma teraz naklejek?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Ola miała ${firstNumber} złotych monet 🪙, wydała ${secondNumber} na lody 🍦 i ${thirdNumber} na zabawki 🎯. Ile ma teraz monet?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Bartek miał ${firstNumber} kredek 🖍️, oddał ${secondNumber} koleżance i zgubił ${thirdNumber}. Ile ma teraz kredek?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Basia miała ${firstNumber} książek 📚, pożyczyła ${secondNumber} koleżance i zgubiła ${thirdNumber}. Ile ma teraz książek?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Mateusz miał ${firstNumber} samochodzików 🚗, oddał ${secondNumber} bratu i zgubił ${thirdNumber}. Ile ma teraz samochodzików?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Julia miała ${firstNumber} balonów 🎈, ${secondNumber} pękło, a ${thirdNumber} oddała koleżance. Ile ma teraz balonów?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Tomek miał ${firstNumber} batoników 🍫, zjadł ${secondNumber}, a potem oddał ${thirdNumber}. Ile ma teraz batoników?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Natalia miała ${firstNumber} szklanych kulek 🔮, zgubiła ${secondNumber}, a potem oddała ${thirdNumber}. Ile ma teraz?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Igor miał ${firstNumber} dinozaurów 🦖, oddał ${secondNumber} kuzynowi i zgubił ${thirdNumber}. Ile ma teraz zabawek?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Maja miała ${firstNumber} gumek do mazania ✏️, zgubiła ${secondNumber}, a kolega zabrał jej ${thirdNumber}. Ile ma teraz gumek?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Olek miał ${firstNumber} lizaków 🍭, zjadł ${secondNumber}, a mama zabrała mu ${thirdNumber}. Ile ma teraz lizaków?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Karolina miała ${firstNumber} spinaczy 📎, zgubiła ${secondNumber}, a koleżanka zabrała jej ${thirdNumber}. Ile ma teraz?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Kacper miał ${firstNumber} piłeczek ⚽, oddał ${secondNumber} koleżance i zgubił ${thirdNumber}. Ile ma teraz piłeczek?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Ela miała ${firstNumber} kart do gry 🃏, zgubiła ${secondNumber}, a potem oddała ${thirdNumber}. Ile ma teraz kart?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Nikodem miał ${firstNumber} długopisów ✒️, zgubił ${secondNumber}, a babcia zabrała mu ${thirdNumber}. Ile ma teraz?`,
  ],
  en: [
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Marta had ${firstNumber} złotych 💰, bought a notebook for ${secondNumber} złotych 📓 and a pen for ${thirdNumber} złotych ✒️. How much money does she have left?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Kuba had ${firstNumber} apples 🍎, ate ${secondNumber} and gave ${thirdNumber} to a friend. How many apples does he have left?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Zosia had ${firstNumber} stuffed animals 🧸, gave ${secondNumber} to a friend and lost ${thirdNumber}. How many stuffed animals does she have now?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Antek had ${firstNumber} candies 🍬, ate ${secondNumber}, and then gave ${thirdNumber} away. How many candies does he have now?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Lena had ${firstNumber} blocks 🧱, gave ${secondNumber} to a friend and lost ${thirdNumber}. How many blocks does she have now?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Filip had ${firstNumber} stickers 🏷️, peeled off ${secondNumber}, and a friend took away ${thirdNumber}. How many stickers does he have now?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Ola had ${firstNumber} złotych coins 🪙, spent ${secondNumber} on ice cream 🍦 and ${thirdNumber} on toys 🎯. How many coins does she have now?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Bartek had ${firstNumber} crayons 🖍️, gave ${secondNumber} to a friend and lost ${thirdNumber}. How many crayons does he have now?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Basia had ${firstNumber} books 📚, lent ${secondNumber} to a friend and lost ${thirdNumber}. How many books does she have now?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Mateusz had ${firstNumber} toy cars 🚗, gave ${secondNumber} to his brother and lost ${thirdNumber}. How many toy cars does he have now?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Julia had ${firstNumber} balloons 🎈, ${secondNumber} popped, and ${thirdNumber} gave to a friend. How many balloons does she have now?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Tomek had ${firstNumber} chocolate bars 🍫, ate ${secondNumber}, and then gave ${thirdNumber} away. How many chocolate bars does he have now?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Natalia had ${firstNumber} glass marbles 🔮, lost ${secondNumber}, and then gave ${thirdNumber} away. How many does she have now?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Igor had ${firstNumber} dinosaurs 🦖, gave ${secondNumber} to his cousin and lost ${thirdNumber}. How many toys does he have now?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Maja had ${firstNumber} erasers ✏️, lost ${secondNumber}, and a friend took away ${thirdNumber}. How many erasers does she have now?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Olek had ${firstNumber} lollipops 🍭, ate ${secondNumber}, and his mom took away ${thirdNumber}. How many lollipops does he have now?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Karolina had ${firstNumber} paper clips 📎, lost ${secondNumber}, and a friend took away ${thirdNumber}. How many does she have now?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Kacper had ${firstNumber} balls ⚽, gave ${secondNumber} to a friend and lost ${thirdNumber}. How many balls does he have now?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Ela had ${firstNumber} playing cards 🃏, lost ${secondNumber}, and then gave ${thirdNumber} away. How many cards does she have now?`,
    (firstNumber: number, secondNumber: number, thirdNumber: number) =>
      `Nikodem had ${firstNumber} pens ✒️, lost ${secondNumber}, and his grandma took away ${thirdNumber}. How many does he have now?`,
  ],
};

interface MathTask {
  (firstNumber: number, secondNumber: number, thirdNumber: number): string;
}
