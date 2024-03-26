function shortenUrl(longUrl) {
  chrome.storage.sync.get(['bitlyToken, bitlyguid'], result => {
    const token = result.bitlyToken;
    const bitlyguid = result.bitlyguid;
    fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "long_url": longUrl, "domain": "bit.ly", "group_guid": bitlyguid })
    })
    .then(response => response.json())
    .then(data => {
      if (data.link) {
        return data.link;
      } else {
        throw new Error("Sorry, there was an error processing your request.");
      }
    })
    .catch(error => console.error(error));
  });
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'shorten') {
    shortenUrl(request.longUrl)
      .then(shortUrl => sendResponse(shortUrl))
      .catch(error => sendResponse({ error: error.message }));
    return true;
  }
});
