function shortenUrl() {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const longUrl = tabs[0].url;
    chrome.storage.sync.get(['bitlyToken', 'bitlyguid'], result => {
      const token = result.bitlyToken;
      const group_guid = result.bitlyguid;

      fetch('https://api-ssl.bitly.com/v4/shorten', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ long_url: longUrl, domain: 'bit.ly', group_guid: group_guid })
      })
      .then(response => response.json())
      .then(data => {
        const shortenedUrl = data.link;
        if (shortenedUrl) {
        document.getElementById('long-url').innerHTML = `<a href="${longUrl}" target="_blank">${longUrl}</a>`;
        document.getElementById('short-url').innerHTML = `<a href="${shortenedUrl}" target="_blank">${shortenedUrl}</a>`;
        copyToClipboard(shortenedUrl);
        } else {
          document.getElementById('error').innerHTML = 'Error: Unable to shorten URL.' + data.message || '';
        }
      })
      .catch(error => {
        console.error(error);
      });
    });
  });
}

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

window.onload = function() {
  var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = color.padEnd(7, '0');
}

document.addEventListener('DOMContentLoaded', shortenUrl);
