<template >
    <f7-page name="home" class="">
        <f7-navbar class="navMain no-shadow">
            <f7-nav-left><img class="logo" src="img/logo.svg" /></f7-nav-left>
            <f7-nav-title>Заправка топливом авто на АЗС</f7-nav-title>
        </f7-navbar>
        <f7-list class="no-margin-top">
            <f7-list-item v-for="(item, index) in fuel.fill">
                <div slot="title" class="font0_9">АЗС: <span class="textNumber font0_9">{{item.azsData}}</span> </div>
                <div slot="footer" class="font0_9">Автомобиль: <span class="textNumber font0_9">{{item.autoData}} </span></div>
                <div slot="after"><span class="textAuto">{{item.fuel}}л.</span></div>
            </f7-list-item>
        </f7-list>
        <f7-fab position="center-bottom" slot="fixed" color="green" v-on:click="addFuel()">
            <f7-link> <f7-icon f7="plus_square_on_square" size="30px" color="white">
        </f7-fab>
        <!-- popup для добавления заправки -->
        <f7-popup class="fuel-popup" push>
            <f7-view>
                <f7-page>
                    <f7-navbar class="navMain">
                        <f7-nav-left><f7-link v-on:click="exitEditFill()"><f7-icon f7="arrow_left"></f7-icon></f7-link></f7-nav-left>
                        <f7-nav-title>Добавление заправки авто на АЗС</f7-nav-title>
                    </f7-navbar>
                    <f7-list class="no-margin margin-bottom no-hairlines no-hairlines-between padding">
                        <f7-list-item smart-select
                                      :smart-select-params="{ closeOnSelect: true, routableModals: true, pageTitle: 'Выберите автомобиль'  }">
                            <div slot="title" class="titleSmart">Автомобиль:</div>
                            <select id="smartAuto" @change="  my.autoVal = $$('#smartAuto').val()">
                                <option v-for="(item, index) in auto.cars" :value="item.id">
                                    {{item.marka}} (№{{item.number}})
                                </option>
                            </select>
                        </f7-list-item>
                        <f7-list-item smart-select
                                      :smart-select-params="{ closeOnSelect: true, routableModals: true, pageTitle: 'Выберите АЗС'}">
                            <div slot="title" class="titleSmart">АЗС:</div>
                            <select id="smartAzs" @change="onSSOpen2()">
                                <option v-for="(item, index) in azs.station" :value="item.id">
                                    {{item.name}} ( №{{item.point}} )
                                </option>
                            </select>
                        </f7-list-item>
                        <f7-list-input label="Введите количество топлива" class=""
                                       :input="false">
                            <f7-stepper slot="input" class="weightStep  margin-top-half no-hairline color-black stepper-init stepper-raised"
                                        :value="fuel.fillEdit.fuel"
                                        @input="fuel.fillEdit.fuel = $event.target.value"
                                        :min="0" :max="200" :step="20" :autorepeat="true" :autorepeat-dynamic="true"></f7-stepper>
                        </f7-list-input>
                    </f7-list>
                    <div class="colorRed font0_9"><span v-if="my.autoVal === ''">Добавьте автомобиль" </span>&nbsp;</div>
                    <div class="colorRed font0_9"><span v-if="my.azsVal === ''">Добавьте АЗС" </span>&nbsp;</div>
                    <div class="colorRed font0_9"><span v-if="fuel.fillEdit.fuel === '0'">Добавьте количество топлива" </span>&nbsp;</div>
                    <f7-button v-on:click="saveFill()" v-bind:class="{ noActive: fuel.fillEdit.fuel === '0' || my.autoVal === '' || my.azsVal === ''}" raised fill round class="greenBtn orang">Сохранить</f7-button>
                </f7-page>
            </f7-view>
        </f7-popup>
    </f7-page>

</template>
<script>
    module.exports = {
        
        data() {
             
            return { 

            };
        }, 
        methods: {
            onSSOpen() {
                my.autoVal = $$("#smartAuto").val();
                              },
            onSSOpen2() {
                my.azsVal = $$("#smartAzs").val();
                            },
            addFuel() {
                fuel.clearEdit();
                azsVal = ''; azsVal = '';
                $$("#smartAzs").val('-1');
                $$("#smartAuto").val('-1')
                this.$f7.popup.get(".fuel-popup").open();

            },
            saveFill() {
                if (fuel.fillEdit.fuel === '0' || my.autoVal === '' || my.azsVal === '') { return }
                fuel.fillEdit.azsId = Number($$('#smartAzs').val());
                fuel.fillEdit.autoId = Number($$('#smartAuto').val());
                fuel.fillEdit.autoData = auto.cars[auto.findIndexAuto(fuel.fillEdit.autoId)].marka + ' (№' + auto.cars[auto.findIndexAuto(fuel.fillEdit.autoId)].number + ')';
                fuel.fillEdit.azsData = azs.station[azs.findIndexAzs(fuel.fillEdit.azsId)].name + ' (' + azs.station[azs.findIndexAzs(fuel.fillEdit.azsId)].point + ')';
                fuel.addFill();
                this.$f7.popup.get(".fuel-popup").close();
            },
            exitEditFill() {
                this.$f7.popup.get(".fuel-popup").close();
            }
        },
        mounted() {
            
        },
    }
</script>
<style>
    .weightStep {
        text-align: center;
    }
</style>