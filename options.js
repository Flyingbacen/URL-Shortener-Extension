
document.getElementById('save').addEventListener('click', function() {
  var bitlyToken = document.getElementById('bitlyToken').value;
  chrome.storage.sync.set({bitlyToken: bitlyToken}, function() {
    console.log('bitlyToken is ' + bitlyToken);
  });
});

document.getElementById('saveg').addEventListener('click', function() {
  var bitlyguid = document.getElementById('bitlyguid').value;
  chrome.storage.sync.set({bitlyguid: bitlyguid}, function() {
    console.log('bitlyguid is ' + bitlyguid);
  });
});

// When the page loads, load the current settings
window.onload = function() {
    chrome.storage.sync.get('bitlyToken', function(data) {
      document.getElementById('bitlyToken').value = data.bitlyToken;
    });
    chrome.storage.sync.get('bitlyguid', function(data) {
      document.getElementById('bitlyguid').value = data.bitlyguid;
    });    
  };