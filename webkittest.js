var browserjet = require('browserjet'),
    browser = browserjet.createBrowser();
    
browser
  .chain
  .get("http://nodejs.org/")
  .run(function() {
    document.body.style.backgroundColor = '#000066';
  })
  .save('nodejs.png')
  .end(function(err) {
    if(err) { throw err; }
  });