export const difficultyLevelDescriptions = {
  addition: [
    'Łatwe dodawanie: liczby jednocyfrowe, suma mniejsza niż 10',
    'Średnie dodawanie: pierwsza liczba 10-19, druga jednocyfrowa',
    'Trudne dodawanie: obie liczby 0-20, suma mniejsza niż 20',
  ],
  subtraction: [
    'Łatwe odejmowanie: obie liczby jednocyfrowe',
    'Średnie odejmowanie: pierwsza liczba 10-19, druga jednocyfrowa',
    'Trudne odejmowanie: pierwsza liczba 10-19, druga większa niż cyfra jedności',
  ],
} as const;
