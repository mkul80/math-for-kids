import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const SUCCESS_MESSAGES = {
  pl: [
    {
      title: 'Brawo! 🎉',
      message: 'To poprawna odpowiedź, tak trzymaj!',
    },
    {
      title: 'Świetnie! 🌟',
      message: 'Dobra robota, wszystko się zgadza.',
    },
    {
      title: 'Super! 👏',
      message: 'Znakomicie rozwiązane!',
    },
    {
      title: 'Fantastycznie! 🎊',
      message: 'Twoja odpowiedź była bardzo dobra.',
    },
    {
      title: 'Udało się! ✅',
      message: 'Zadanie wykonane poprawnie!',
    },
  ],
  en: [
    {
      title: 'Well done! 🎉',
      message: 'That’s the correct answer — great job!',
    },
    {
      title: 'Nice work! 🌟',
      message: 'You got it right, keep going!',
    },
    {
      title: 'Great! 👏',
      message: 'That was spot on!',
    },
    {
      title: 'Fantastic! 🎊',
      message: 'Excellent answer!',
    },
    {
      title: 'You did it! ✅',
      message: 'Correct answer — keep it up!',
    },
  ],
};

const FAILURE_MESSAGES = {
  pl: [
    {
      title: 'Spróbuj jeszcze raz 🤔',
      message: 'Tym razem się nie udało, ale dasz radę!',
    },
    {
      title: 'Prawie dobrze! 🔄',
      message: 'Jeszcze jedno podejście i się uda!',
    },
    {
      title: 'Nie szkodzi 🙂',
      message: 'Każdy czasem się myli. Spróbuj ponownie.',
    },
    {
      title: 'Jeszcze chwilka! ⏳',
      message: 'Zastanów się jeszcze raz i spróbuj.',
    },
    {
      title: 'To nie to 🙈',
      message: 'Ale jesteś blisko — próbuj dalej!',
    },
  ],
  en: [
    {
      title: 'Try again 🤔',
      message: "That wasn't it, but you’ve got this!",
    },
    {
      title: 'Almost right! 🔄',
      message: 'Give it one more go!',
    },
    {
      title: 'No worries 🙂',
      message: 'Everyone makes mistakes. Try once more.',
    },
    {
      title: 'Getting close! ⏳',
      message: 'Think again and have another try.',
    },
    {
      title: 'Not quite 🙈',
      message: "But you're close — keep going!",
    },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  #translateService = inject(TranslateService);
  getRandomSuccessMessage() {
    const currentLang = this.#translateService
      .currentLang as keyof typeof SUCCESS_MESSAGES;
    const messages = SUCCESS_MESSAGES[currentLang] || SUCCESS_MESSAGES['en'];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  getRandomFailureMessage() {
    const currentLang = this.#translateService
      .currentLang as keyof typeof FAILURE_MESSAGES;
    const messages = FAILURE_MESSAGES[currentLang] || FAILURE_MESSAGES['en'];
    return messages[Math.floor(Math.random() * messages.length)];
  }
}
