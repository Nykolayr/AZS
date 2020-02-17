"use strict";
var $$ = Dom7;
Framework7.use(Framework7Vue);

//функци для подгрузки vue компонентов
 

// Init App
let my = new Vue({
    el: '#app',
     data() {
        return {
            //Переменные vue
            auto, azs, fuel, autoAzs, azsVal, autoVal,
            f7params: {
                // App Name
                name: 'azs',
                version: '0.0.1',
                id: 'id.azs.app',
                view: {
                    unloadTabContent: false,
                    stackPages: true,
                    //allowDuplicateUrls: false,
                },
                // Array with app routes
                routes: [
                    {
                        path: '/begin/', component: 'begin', //переход на начало
                        tabs: [
                             { path: '/', component: 'home', id: 'homeTab' }, //переход на начало
                            { path: '/azs/', component: 'azs', id: 'azsTab' }, //переход на азс
                            { path: '/auto/', component: 'auto', id: 'autoTab' }, //переход на авто
                                                        
                        ]
                    }, 
                    
                ]
            }
        };
    },
     mounted() {
               setTimeout(function () {
                   $$('#splash').hide();
                  
         }, 1000);
               
            },
    // App root methods
     methods: {

                  //собщение об ошибке
         mesError: (text1, text2) => {
             console.log(my.$f7);
             let dial = my.$f7.dialog.create({
                     content:
                     '<div class="titleAlert">Ошибка! </div><div class="text-aling-center margin-top text1"><b>' +
                     text1 +
                     '<b></div><div class="margin-top text2">' +
                     text2 +
                     "</div>",
                     animate: true,
                     buttons: [
                         {
                             cssClass: "absbat",
                             text: '<span class="alertOk text-aling-center">Далее...</span>'
                         }
                     ]
                 })
                 .open();
         },
         //собщение всплывающее
         toastMess: (text1, text2) => {
             var toastCenter = my.$f7.toast.create({
                 cssClass: 'toastMess',
                 text: '<b>' + text1 + ' </b>'+text2,
                 position: 'center',
                 closeTimeout: 2000,
             }).open();
         },
       
     }
    })




