import { Operation } from '../models/operation';

export class mathTasks {
  static getByOperation(operation: Operation) {
    if (operation === Operation.Addition) {
      return this.additionTasks;
    } else if (operation === Operation.Subtraction) {
      return this.subtractionTasks;
    }
    return [];
  }
  static additionTasks = [];
  static subtractionTasks = [
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
  ];
}
