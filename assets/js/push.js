var $status = document.getElementById('status');

if ('Notification' in window) {
  if (Notification.permission == 'denied') {
    $status.innerText = 'заблокированы';
  } else if (Notification.permission == 'granted') {
    $status.innerText = 'разрешены';
  } else {
    $status.innerText = 'не доступны';
  }
}

function requestPermission() {
  if (!('Notification' in window)) {
    console.error('Браузер не поддерживает локальные push-уведомления.')
    return;
  }
  
  Notification.requestPermission(function (result) {
    if (result == 'denied') {
      $status.innerText = 'заблокированы';
    } else if (result == 'granted') {
      $status.innerText = 'разрешены';
    } else {
      $status.innerText = 'не известны';
    }
  });
}

function persistentNotification() {
  if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
    console.error('Браузер не поддерживает локальные push-уведомления.');
    return;
  }
  
  try {
    navigator.serviceWorker.getRegistration()
      .then((reg) => reg.showNotification("Не забудь!", {
          body: 'Завтра у тебя рабочий день.',
          icon: 'assets/icons/apple-icon-180x180.png',
          lang: 'ru-RU',
          renotify: true,
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
        }))
      .catch((err) => console.error('Service Worker ошибка регистрации: ' + err));
  } catch (err) {
    console.error('Ошибка локальных push-уведомлений: ' + err);
  }
}
