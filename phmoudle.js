const phantom = require('phantom');

module.exports = async function (url, maxpg) {
  return new Promise(async (resolve, reject) => {
    var lastdata = "0"
    var result = []
    const instance = await phantom.create();
    const page = await instance.createPage();
    page.setting("loadImages", "no")
    await page.on('onResourceRequested', function (requestData) {
      if (requestData.url.match(/\/api\/v2\/search\_items/)) {
        console.info('Requesting', requestData.url);
        data = requestData.headers.find(v => { return v.name == "if-none-match-" ? v.value : "" }).value;
        console.log(data);
        result.push({
          url: requestData.url,
          match: data
        })
      }
    });
    const status = await page.open('https://xiapi.xiapibuy.com/search?keyword=' + encodeURI(url));
    //const content = await page.property('content');
    var tc = setInterval(() => {
      page.evaluate(function () {
        return $(".shopee-page-controller button.shopee-button-solid--primary").html()
      }).then(v => {
        if (lastdata != v && v < maxpg) {
          console.log("solid--primary：" + v);
          lastdata = v
          page.evaluateAsync(function () {
            $('.shopee-icon-button.shopee-icon-button--right').click()
          }, 100)
        } else {
          console.log("all done: " + result.length + "条");
          clearInterval(tc)
          exitph()
          resolve(result)
        }
      })

    }, 2000);


    async function exitph() {
      console.log("exit");
      await instance.exit();
    }

  })
}