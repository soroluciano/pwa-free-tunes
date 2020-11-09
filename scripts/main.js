
  // btnAdd.addEventListener('click', (e) =>{
  //   deferredPrompt.prompt();
  //   deferredPrompt.userChoice.then((choiceResult) => {
  //     if(choiceResult.outcome === 'accepted') {
  //       console.log('User accepted the AH')
  //     }

  //   })
  // })



// Make sure sw are supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        // .register('https://soroluciano.github.io/pwa-free-tunes/pwabuilder_sw.js')
        .register('../pwabuilder_sw.js')
        .then(reg => console.log('Service Worker: Registered (Pages)'))
        .catch(err => console.log(`Service Worker: Error: ${err}`));
    });
  }
  

  let main = document.querySelector('.main');

  var addToHome =
  '<center style="background-color: black"><div class="add-to"><button class="add-to-btn">+ ADD TO HOME SCREEN</button></div><hr id="separator"></center>';
  
  // var d1 = document.getElementById('one');
  main.insertAdjacentHTML('afterbegin', addToHome);
  
  
  let deferredPrompt;
  var div = document.querySelector('.add-to');
  var separator = document.querySelector('#separator');
    var button = document.querySelector('.add-to-btn');
    div.style.display = 'none';
  separator.style.display = 'none';
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      div.style.display = 'block';
    separator.style.display = 'block';
  
    if(button){
      button.addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
      div.style.display = 'none';
      separator.style.display = 'none';
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
      });
  }  
  });
  
  
  
  