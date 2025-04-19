import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const SUCCESS_MESSAGES = {
  pl: [
    {
      title: 'Brawo! Świetna robota! 🎉',
      message: 'Twoja odpowiedź jest poprawna!',
    },
    {
      title: 'Dobra robota! Tak trzymaj! 🌟',
      message: 'Świetnie sobie poradziłeś!',
    },
    { title: 'Super! Jesteś mistrzem! 🏆', message: 'Kontynuuj w tym tempie!' },
    { title: 'Fantastycznie! 🎊', message: 'Twoja odpowiedź była idealna!' },
    {
      title: 'Wow! Jesteś niesamowity! 🚀',
      message: 'Gratulacje, to była świetna odpowiedź!',
    },
  ],
  en: [
    {
      title: 'Great job! Well done! 🎉',
      message: 'Your answer is correct!',
    },
    {
      title: 'Good job! Keep it up! 🌟',
      message: 'You did great!',
    },
    { title: "Amazing! You're a master! 🏆", message: 'Keep up this pace!' },
    { title: 'Fantastic! 🎊', message: 'Your answer was perfect!' },
    {
      title: "Wow! You're incredible! 🚀",
      message: 'Congratulations, that was an excellent answer!',
    },
  ],
};

export const getRandomSuccessMessage = () => {
  const translateService = inject(TranslateService);
  const currentLang =
    translateService.currentLang as keyof typeof SUCCESS_MESSAGES;
  const messages = SUCCESS_MESSAGES[currentLang] || SUCCESS_MESSAGES['en'];
  return messages[Math.floor(Math.random() * messages.length)];
};

const FAILURE_MESSAGES = {
  pl: [
    {
      title: 'Ups! Spróbuj jeszcze raz! 🤔',
      message: 'Nie martw się, każdy się uczy na błędach!',
    },
    {
      title: 'Nie poddawaj się! Dasz radę! 💪',
      message: 'Spróbuj ponownie, na pewno się uda!',
    },
    {
      title: 'Błąd to krok do sukcesu! 🌱',
      message: 'Zastanów się jeszcze raz i spróbuj ponownie!',
    },
    {
      title: 'Nie przejmuj się! 🌈',
      message: 'Każdy popełnia błędy, spróbuj jeszcze raz!',
    },
    {
      title: 'Prawie się udało! 🌟',
      message: 'Jeszcze chwila i będzie dobrze, próbuj dalej!',
    },
  ],
  en: [
    {
      title: 'Oops! Try again! 🤔',
      message: "Don't worry, everyone learns from mistakes!",
    },
    {
      title: "Don't give up! You can do it! 💪",
      message: "Try again, you'll succeed!",
    },
    {
      title: 'Mistakes lead to success! 🌱',
      message: 'Think it through and try once more!',
    },
    {
      title: "Don't worry! 🌈",
      message: 'Everyone makes mistakes, try again!',
    },
    {
      title: 'Almost there! 🌟',
      message: "Just a bit more and you'll get it, keep trying!",
    },
  ],
};

export const getRandomFailureMessage = () => {
  const translateService = inject(TranslateService);
  const currentLang =
    translateService.currentLang as keyof typeof SUCCESS_MESSAGES;
  const messages = FAILURE_MESSAGES[currentLang] || FAILURE_MESSAGES['en'];
  return messages[Math.floor(Math.random() * messages.length)];
};

export const SUCCESS_IMAGES = [
  'assets/images/success/happy-ladybug1.png',
  'assets/images/success/happy-ladybug3.png',
  'assets/images/success/happy-unicorn1.jpeg',
  'assets/images/success/happy-unicorn1.png',
  'assets/images/success/happy-unicorn2.jpeg',
  'assets/images/success/happy-unicorn2.png',
  'assets/images/success/happy-unicorn3.jpeg',
  'assets/images/success/happy-unicorn3.png',
  'assets/images/success/happy-unicorn4.jpeg',
  'assets/images/success/happy-unicorn4.png',
  'assets/images/success/hapy-ladybug6.png',
];

export const FAILURE_IMAGES = [
  'assets/images/failure/sad-kitten1.jpeg',
  'assets/images/failure/sad-kitten2.jpeg',
  'assets/images/failure/sad-kitten3.jpeg',
  'assets/images/failure/sad-kitten4.jpeg',
  'assets/images/failure/sad-kitten4.png',
  'assets/images/failure/sad-seal3.png',
  'assets/images/failure/sad-unicorn1.jpeg',
  'assets/images/failure/sad-unicorn2.jpeg',
];
