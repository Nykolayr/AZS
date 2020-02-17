"use strict";
(function () {
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // TODO: Платформа Cordova загружена. Выполните здесь инициализацию, которая требуется Cordova.
    }

    function onPause() {
        // TODO: Это приложение приостановлено. Сохраните здесь состояние приложения.
    }

    function onResume() {
        // TODO: Это приложение активировано повторно. Восстановите здесь состояние приложения.
    }
    //azs.loadLocal();
    //auto.loadLocal();
    //fuel.loadLocal();
    //fuel.clearFuel();
    setTimeout(() => {
        my.$f7.request.promise.postJSON(azsPuth + "loadAll")
            .then((data) => {
                console.log(data);
                let st = (data.data.base)[0];
                auto.cars = JSON.parse(st.auto);
                azs.station = JSON.parse(st.station);
                fuel.fill = JSON.parse(st.fill);
                }).catch((error) => {
                console.log(error);
            })
         
        
    }, 500)
    })();

//Сохраняем все на сервер
function saveAll() {
    my.$f7.request.promise.post(azsPuth + "save", { id: 1, auto: JSON.stringify(auto.cars), station: JSON.stringify(azs.station), fill: JSON.stringify(fuel.fill) })
        .then((data) => { console.log(data); } )
        .catch((error) => {
            console.log(error);
        })
}

//нажатие на физическую кнопку назад
document.addEventListener('backbutton', function () {
    if (my.$f7.popup.get(".profile-popup")) {
        profileOut();
            }
    if (my.$f7.view.main.router.currentRoute.path === '/home/') {
        window.navigator.app.exitApp();
    }
    my.$f7.view.main.router.back();
});



