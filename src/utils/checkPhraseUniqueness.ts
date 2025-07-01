// Проверка уникальности фразы путём загрузки Google Search в iframe
// и анализа, загружается ли страница (эвристика на основе CORS)

export async function checkPhraseUniqueness(phrase: string): Promise<boolean> {
  return new Promise(resolve => {
    // Создаём iframe, чтобы попытаться загрузить страницу Google
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none'; // скрываем
    iframe.style.width = '0';
    iframe.style.height = '0';

    // Формируем поисковый запрос — фраза в кавычках (точное совпадение)
    const searchQuery = encodeURIComponent(`"${phrase}"`);
    const searchUrl = `https://www.google.com/search?q=${searchQuery}`;

    // Страховочный таймаут: если ничего не произойдёт за 5 секунд — считаем уникальной
    const timeoutId = setTimeout(() => {
      cleanup();
      resolve(true); // Фраза считается уникальной (по таймауту)
    }, 5000);

    // Очистка: удаляем iframe и таймер
    const cleanup = () => {
      if (timeoutId) clearTimeout(timeoutId); // убираем таймер
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe); // удаляем iframe из DOM
      }
    };

    // Обработчик успешной загрузки страницы в iframe
    iframe.onload = () => {
      // Ждём 2 секунды, чтобы контент успел прогрузиться
      setTimeout(() => {
        try {
          // Пытаемся получить доступ к содержимому iframe
          const doc = iframe.contentDocument;

          if (!doc) {
            // Если не можем получить доступ (страница не загрузилась) — неуникально
            cleanup();
            resolve(false);
            return;
          }

          // Если тело страницы достаточно большое — считаем, что фраза найдена
          const body = doc.body;
          if (body && body.innerHTML.length > 1000) {
            cleanup();
            resolve(false); // Неуникально
          } else {
            cleanup();
            resolve(true); // Уникально
          }
        } catch (error) {
          // Если попытка доступа вызывает ошибку (CORS) — значит страница загрузилась
          console.log(error);
          cleanup();
          resolve(false); // Неуникально
        }
      }, 2000);
    };

    // Обработчик ошибок iframe (например, страница не загрузилась)
    iframe.onerror = () => {
      cleanup();
      resolve(true); // Ошибка = считаем уникальной
    };

    // Устанавливаем ссылку и вставляем iframe в DOM для загрузки
    iframe.src = searchUrl;
    document.body.appendChild(iframe);
  });
}
