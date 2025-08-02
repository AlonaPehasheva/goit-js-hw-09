// Виконуй це завдання у файлах 2-form.html і 2-form.js. Розбий його на декілька підзавдань:

// Оголоси поза будь-якими функціями об’єкт formData з полями email та message, які спочатку мають порожні рядки як значення: { email: "", message: "" }.
// Використовуй метод делегування для відстеження змін у формі через подію input. Зберігай актуальні дані з полів email та message у formData та записуй цей об’єкт у локальне сховище. Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.
// При завантаженні сторінки перевір, чи є дані у локальному сховищі. Якщо так, використовуй їх для заповнення форми та об'єкта formData. Якщо ні, залиш поля форми порожніми.

let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';
const saveData = localStorage.getItem('feedback-form-state');

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

form.addEventListener('input', e => {
  const email = e.currentTarget.elements.email.value.trim();
  const message = e.currentTarget.elements.message.value.trim();
  formData.email = email;
  formData.message = message;
  saveToLS(localStorageKey, formData);
});

if (saveData) {
  try {
    const formDataSave = JSON.parse(saveData);
    form.elements.email.value = formDataSave.email;
    form.elements.message.value = formDataSave.message;
    formData.email = formDataSave.email;
    formData.message = formDataSave.message;
  } catch (error) {
    console.log(error.name);
  }
} else {
  formData = { email: '', message: '' };
}

// Перед відправленням форми переконайся, що обидва поля форми заповнені. Якщо будь-яке з полів (властивостей об’єкта formData) порожнє, показуй сповіщення з текстом «Fill please all fields». Якщо всі поля заповнені, виведи у консоль об’єкт formData з актуальними значеннями, очисти локальне сховище, об’єкт formData і поля форми.

form.addEventListener('submit', evt => {
  evt.preventDefault();
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }
  console.log({ ...formData });
  localStorage.removeItem('feedback-form-state');
  form.reset();
  formData = {
    email: '',
    message: '',
  };
});
