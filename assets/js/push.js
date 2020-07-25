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
    alert('Notification API not supported!');
    return;
  }
  
  Notification.requestPermission(function (result) {
    if (result == 'denied') {
      $status.innerText = 'заблокированы';
    } else if (result == 'granted') {
      $status.innerText = 'разрешены';
    } else {
      $status.innerText = 'не доступны';
    }
  });
}

function nonPersistentNotification() {
  if (!('Notification' in window)) {
    alert('Notification API not supported!');
    return;
  }
  
  try {
    var notification = new Notification("Hi there - non-persistent!");
  } catch (err) {
    alert('Notification API error: ' + err);
  }
}

function persistentNotification() {
  if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
    alert('Persistent Notification API not supported!');
    return;
  }
  
  try {
    navigator.serviceWorker.getRegistration()
      .then((reg) => reg.showNotification("Hi there - persistent!"))
      .catch((err) => alert('Service Worker registration error: ' + err));
  } catch (err) {
    alert('Notification API error: ' + err);
  }
}
