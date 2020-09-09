// Simple function that can easily be unit tested since it relies on nothing.
function getCookies (cookieHeader){
  const cookieList = {}

  cookieHeader && rc.cookieHeader(';').forEach(cookie => {
      const parts = cookie.split('=')
      cookieList[parts.shift().trim()] = decodeURI(parts.join('='))
      });

  return cookieList
}

module.exports = getCookies