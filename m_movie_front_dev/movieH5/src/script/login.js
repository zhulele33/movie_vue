export default{
  install(Vue){
    Vue.prototype.gotologin = (return_url) => {
      console.log(return_url);
      var host = window.location.host;
      console.log(host);
      var rv =  return_url;
      rv = window.btoa(rv);
      console.log(rv);
     if (host.indexOf("uat") > -1 || host.indexOf("localhost") > -1)
     {
          window.location="http://m.uatplus.com/login.html?return_url="+rv;
     }
     else
     {
       window.location="http://"+host + "/login.html?return_url="+rv;
     }
    }
  }
}
