var DISQUS_SECRET = "oTjEqmGR2d8JV8IFusqnwivR4x6CHKlw6lE0jm63HJZ5iXNqM1uHgAbxMnN7EL4K";
var DISQUS_PUBLIC = "2jV4kkaizbc8U4auShxMeRCzFUA0hO8mX3pKfmkCPPj81xi58G1FVyEDwPTnJi1j";

function disqusSignon(user) {
    var disqusData = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    var disqusStr = JSON.stringify(disqusData);
    var timestamp = Math.round(+new Date() / 1000);

    /*
     * Note that `Buffer` is part of node.js
     * For pure Javascript or client-side methods of
     * converting to base64, refer to this link:
     * http://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
     */
    var message = new Buffer(disqusStr).toString('base64');

    /* 
     * CryptoJS is required for hashing (included in dir)
     * https://code.google.com/p/crypto-js/
     */
    var result = CryptoJS.HmacSHA1(message + " " + timestamp, DISQUS_SECRET);
    var hexsig = CryptoJS.enc.Hex.stringify(result);

    return {
      pubKey: DISQUS_PUBLIC,
      auth: message + " " + hexsig + " " + timestamp
    };
}