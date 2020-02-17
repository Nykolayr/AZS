"use strict";
function vueLoader(name) {
    httpVueLoader('./pages/' + name + '.vue')().then((vue) => { Vue.component(name, vue); });
}
vueLoader('begin');
vueLoader('home');
vueLoader('azs');
vueLoader('auto');
let azsVal = ''; let autoVal='';
const test = true; //тестовая версия или нет
let autoAzs = []; // вспомогательный массив
//let azsPuth = 'https://redmobi.ru/azs/';  
let azsPuth = 'http://autogie1.bget.ru/azs/';  // путь к базе данных на сервере
//Объект автомобили
var auto = {
    cars: [],  //массив автомобилей
    currentId: 0,  //текущий ID 
    autoEdit: { id: 0, marka: '', number: '', fuel: 0, azs: [] }, //редактируемый авто
    edit: false,  //редактирование или добавление нового авто
    //очищаем для нового авто
    clearEdit() {
        this.autoEdit = { id: 0, marka: '', number: '', fuel: 0, azs: []  }
    },
    //найти index по id авто
    findIndexAuto(id) {
        return this.cars.findIndex(x => x.id === id);
    },
    //добавляем топливо и АЗС по id авто
    addFuel(id, idAzs, fuel) {
        let index = this.findIndexAuto(id);
        this.cars[index].azs.push(idAzs);
        this.cars[index].azs
        this.cars[index].fuel = Number(this.cars[index].fuel) + Number(fuel);
        this.saveLocal();
    },
    // установить текущий id
    setId(id) {
        this.currentId = id;
        this.PushEditAuto();
    },
    //получить текущий id
    getId(id) {
        return this.currentId;
    },
    //получить максимальный id
    maxId() {
        if (this.cars.length === 0) { return 0 } else {
            return this.cars.reduce((prev, current) => (prev.id > current.id) ? prev : current).id+1;    
        }
        
    },
    //Передаем в редактируемый авто, авто выбранное  по id
    PushEditAuto() {
           for (var key in this.cars[this.currentId]) {
            this.autoEdit[key] = this.cars[this.currentId][key];
        }
    }, 
    //Передаем  редактируемый авто в выбранный  по id
    PopEditAuto() {
        for (var key in this.autoEdit) {
            this.cars[this.currentId][key] = this.autoEdit[key]  ;
        }
     this.saveLocal();
    }, 
    //Добавить новое авто из редактируемого
    addAuto() {
        this.cars.push({ id: this.maxId(), marka: this.autoEdit.marka, number: this.autoEdit.number, fuel: this.autoEdit.fuel, azs: this.autoEdit.azs });
        this.saveLocal();
    },
    deleteAuto(id) {
        this.cars.splice(id, 1);
        this.saveLocal();
    },
    //сохранить все авто на локалке
    saveLocal() {
        localforage.setItem('cars', this.cars).then(function (value) { });
        saveAll();
      },
    //загрузить все авто из локалки
    loadLocal() {
        localforage.getItem('cars').then(function (value) {
            if (value !== null) { auto.cars = value }  
          });
        },
    //oчищаем всё
    clearAuto() {
        this.cars.length = 0;
        this.saveLocal();
    }
}
//Объект заправки
var azs = {
    station: [],  //массив автомобилей
    currentId: 0,  //текущий ID 
    azsEdit: { id: 0, name: '', point: '', fuel: 0, auto: [] }, //редактируемая АЗС
    edit: false,  //редактирование или добавление нового Азс
    //найти index по id авто
    findIndexAzs(id) {
        return this.station.findIndex(x => x.id === id);
    },
    //добавляем топливо и АЗС по id авто
    addFuel(idAuto, id, fuel) {
        let index = this.findIndexAzs(id);
        this.station[index].auto.push(idAuto);
        this.station[index].fuel = Number(this.station[index].fuel) + Number(fuel);
        this.saveLocal();
    },
        //очищаем для нового азс
    clearEdit() {
        this.azsEdit = { id: 0, name: '', point: '', fuel: 0, auto: []  }
    },
    // установить текущий id
    setId(id) {
        this.currentId = id;
        this.PushEditAzs();
    },
    //получить текущий id
    getId(id) {
        return this.currentId;
    },
    //получить максимальный id
    maxId() {
        if (this.station.length === 0) { return 0 } else {
            return this.station.reduce((prev, current) => (prev.id > current.id) ? prev : current).id + 1;
        }

    },
    //Передаем в редактируемый азс, азс выбранное  по id
    PushEditAzs() {
        for (var key in this.station[this.currentId]) {
            this.azsEdit[key] = this.station[this.currentId][key];
        }
    },
    //Передаем  редактируемый азс в выбранный  по id
    PopEditAzs() {
        for (var key in this.azsEdit) {
            this.station[this.currentId][key] = this.azsEdit[key];
        }
        this.saveLocal();
    },
    //Добавить новое азс из редактируемого
    addAzs() {
        this.station.push({ id: this.maxId(), name: this.azsEdit.name, point: this.azsEdit.point, fuel: this.azsEdit.fuel, auto: this.azsEdit.auto });
        this.saveLocal();
    },
    deleteAzs(id) {
        this.station.splice(id, 1);
        this.saveLocal();
    },
    //сохранить все авто на локалке
    saveLocal() {
        localforage.setItem('azs', this.station).then(function (value) { });
        saveAll();
    },
    //загрузить все авто из локалки
    loadLocal() {
        localforage.getItem('azs').then(function (value) {
            if (value !== null) { azs.station = value }
        });
    },
    //oчищаем всё
    clearAuto() {
        this.cars.length = 0;
        this.saveLocal();
    }
}
//объект топливо, учет всех запровок автомобилями на АЗС
var fuel = {
    fill: [],  //массив заправок 
    currentId: 0,  //текущий ID 
    fillEdit: { id: 0, azsId: 0, azsData: '', autoId: 0, autoData: '', fuel: '0' }, //редактируемая заправка
    //Отдает заправки для авто или для азс по  id, возращает массив
    getData(id, status) {
        if (status === 'auto') return this.fill.filter(x => x.autoId === id);
        if (status === 'azs') return this.fill.filter(x => x.azsId === id);
    },
    //очищаем для новой заправки
    clearEdit() {  
        this.fillEdit = { id: 0, azsId: 0, azsData: '', autoId: 0, autoData: '',  fuel: '0' }
    },
        //Добавить новую заправку из редактируемого
    addFill() {
        this.fill.push({ id: this.fill.length, azsId: this.fillEdit.azsId, azsData: this.fillEdit.azsData, autoId: this.fillEdit.autoId, autoData: this.fillEdit.autoData, fuel: this.fillEdit.fuel });
        auto.addFuel(this.fillEdit.autoId, this.fillEdit.azsId, this.fillEdit.fuel);
        azs.addFuel(this.fillEdit.autoId, this.fillEdit.azsId, this.fillEdit.fuel);
        this.saveLocal();
    },
        //сохранить все заправки на локалке
    saveLocal() {
        localforage.setItem('fill', this.fill).then(function (value) { });
        saveAll();
    },
    //загрузить все заправки из локалки
    loadLocal() {
        localforage.getItem('fill').then(function (value) {
            if (value !== null) { fuel.fill = value }
        });
    },
    //oчищаем всё
    clearFuel() {
        this.fill.length = 0;
        this.saveLocal();
    }
}

// выводит ошибки в консоль и на страницу логов
window.onerror = function (errorMsg, url, lineNumber) {
    //alert(("error" + errorMsg + " + url= " + url + " line= " + lineNumber));
    console.log(errorMsg);
};

//Framework7.request.promise.postJSON(loadAmosov + 'load.php')
//    .then(function (res) {
//        exerces = res.data
//    }).catch(function (err) { console.log(err); });

