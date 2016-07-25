/**
 * Created by hamid on 7/25/16.
 */

const readline = require('readline');
const configure = require("./models");
const AdminUserRepo = require("./repo/AdminUserRepo");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var userName;
var password;
rl.question("enter userName:", function(answer){
    userName = answer;
    rl.question("enter password:", function(answer){
        password = answer;
        AdminUserRepo.newAdmin(userName, password).then(function(data){
            console.log("created " + data);
            rl.close();
            process.exit();
        }).catch(function(error){
            console.log("error " + error);
            rl.close();
            process.exit();
        });
    });

});


