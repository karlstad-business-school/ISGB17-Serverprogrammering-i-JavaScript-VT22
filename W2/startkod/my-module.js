

//Exportera för import i annan fil.
module.exports = {  

    getTimeStamp : function() {
        let a = new Date();
        return a.getFullYear() + '-' + ('0' + a.getDate()).slice(-2) + '-' + ('0' + (a.getMonth() + 1)).slice(-2);
    },

    parseCookies : function(rc) {

        let list = {};
        //*************************************************************************************** */
        //Funktion för att parsa cookie-sträng  
        rc && rc.split(';').forEach(function (cookie) {
            var parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });
        //Hämtad ifrån: https://stackoverflow.com/questions/45473574/node-js-cookies-not-working
        //*************************************************************************************** */
        return list;
    }
  


}