import Twit from "twit";
import { app } from './auth.mjs';
import { readFileSync, writeFileSync } from 'fs';
import './util.mjs';
import 'pg-promise';

class Bot {
  constructor(config){
    this.twit=new Twit(config);
  }
  tweet(status,callback){
    if(typeof status !== 'string') {
      return callback(new Error('tweet must be of type String'));
    } else if(status.length > 280) {
      return callback(new Error('tweet is too long: ' + status.length));
    }
    this.twit.post('statuses/update', { status: status }, callback);
  }
  async followers(screen_name) {
    const p=new Promise((accept,reject)=>{
      this.twit.get('followers/ids', { screen_name },  function (err, data, response) {
        if(err){
          reject(err);
        } else {
          accept(data);
        };
      })
    });
    return await p;
  }
  async friends(screen_name) {
    const p=new Promise((accept,reject)=>{
      this.twit.get('friends/ids', { screen_name },  function (err, data, response) {
        if(err){
          reject(err);
        } else {
          accept(data);
        };
      })
    });
    return await p;
  }
}
const bot = new Bot(app);
//console.log(await bot.friends());
//writeFileSync('n4g.followers.json', pp(await bot.followers('nobody4governor')));
//writeFileSync('n4g.friends.json', pp(await bot.friends('nobody4governor')));
