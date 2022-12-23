import fs from "fs";
function loadConfig(){
  var config=fs.readFileSync(process.env["HOME"]+"/.gotwits/cred.json");
  config=config.toString();
  config=JSON.parse(config);
  return config;
}
const config=loadConfig();
export const app={ app_only_auth: true };
for(var key in config){
  app[key.toLowerCase()]=config[key];
};
