const contIds = ['setBox', 'getBox', 'listBox', 'remBox'];

function switchBox(nb){
  for (let i = 0; i < contIds.length; i++) {
    document.getElementById(contIds[i]).classList.add('hide');
  };
  document.getElementById(nb).classList.remove('hide');
};

document.getElementById("setBoxBtn").addEventListener("click", function (){
  switchBox('setBox');
});
document.getElementById("getBoxBtn").addEventListener("click", function (){
  switchBox('getBox');
});
document.getElementById("listBoxBtn").addEventListener("click", function (){
  switchBox('listBox');
});
document.getElementById("remBoxBtn").addEventListener("click", function (){
  switchBox('remBox');
});


// Wait until Telegram WebApp SDK is ready
window.Telegram.WebApp.ready();

// Store the Telegram WebApp object
const tg = window.Telegram.WebApp;
tg.expand();
console.log('id: '+ tg.initDataUnsafe?.user?.id);
console.log('fn: '+ tg.initDataUnsafe?.user?.first_name);

// Set the main button color, text, and visibility
tg.MainButton.text = "Press Me!";
tg.MainButton.color = "#FF5722";
tg.MainButton.show();

// Setup close button click action to close the WebApp
document.getElementById("closeBtn").addEventListener("click", function (){
  tg.close();
});


async function sett(k, v) {
  return new Promise((resolve, reject) => {
    tg.CloudStorage.setItem(k, v, function(error, resp) {
      if (error) {
        console.log(error);
        reject('Error');
      } else {
        console.log(resp);
        if (resp === true) {
          resolve('Saved');
        } else {
          resolve(resp.toString());
        }
      }
    });
  });
}

async function gett(k) {
  return new Promise((resolve, reject) => {
    tg.CloudStorage.getItem(k, function(error, resp) {
      if (error) {
        reject(error);
      } else {
        console.log(resp);
        resolve(resp.length > 0 ? resp.toString() : 'No keys found');
      }
    });
  });
}

async function list() {
  return new Promise((resolve, reject) => {
    tg.CloudStorage.getKeys(function(error, resp) {
      if (error) {
        reject(error);
      } else {
        console.log(resp);
        resolve(resp.length > 0 ? resp.toString() : 'No keys found');
      }
    });
  });
}

async function remm(k) {
  return new Promise((resolve, reject) => {
    tg.CloudStorage.removeItem(k, function(error, resp) {
      if (error) {
        reject(error);
      } else {
        console.log(resp);
        if (resp === true) {
          resolve('Removed');
        } else {
          resolve(resp.toString());
        }
      }
    });
  });
}

// Event listeners
document.getElementById("setDataBtn").addEventListener("click", async function() {
  let key = document.getElementById('setKeyInput').value;
  let val = document.getElementById('setValInput').value;
  sett(key, val).then(res => {
    document.getElementById('resSetBox').innerHTML = res;
  }).catch(error => {
    document.getElementById('resSetBox').innerHTML = error;
  });
});

document.getElementById("getDataBtn").addEventListener("click", async function() {
  let key = document.getElementById('getKeyInput').value;
  gett(key).then(res => {
    document.getElementById('resGetBox').innerHTML = res;
  }).catch(error => {
    document.getElementById('resGetBox').innerHTML = error;
  });
});

document.getElementById("listDataBtn").addEventListener("click", async function() {
  list().then(res => {
    document.getElementById('resListBox').innerHTML = res;
  }).catch(error => {
    document.getElementById('resListBox').innerHTML = error;
  });
});

document.getElementById("remDataBtn").addEventListener("click", async function() {
  let key = document.getElementById('remKeyInput').value;
  remm(key).then(res => {
    document.getElementById('resRemBox').innerHTML = res;
  }).catch(error => {
    document.getElementById('resRemBox').innerHTML = error;
  });
});


// Handle the main button being pressed
tg.MainButton.onClick(function (){
  alert('Main button was clicked!');
  // Send data back to the Telegram bot
  tg.sendData('Main button was clicked!');
  
  // You can hide the main button after the first click, if needed
  tg.MainButton.hide();
});

// Make the WebApp theme match the Telegram client theme
//document.body.style.backgroundColor = tg.themeParams.bg_color || "#ffffff";
//document.body.style.color = tg.themeParams.text_color || "#000000";


switchBox('setBox');
