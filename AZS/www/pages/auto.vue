<template >
    <f7-page class="" name="auto">
        <f7-navbar class="navMain">
            <!--<f7-nav-left back><f7-link back><f7-icon f7="arrow_left"></f7-icon></f7-link></f7-nav-left>-->
            <f7-nav-title>Автомобили</f7-nav-title>
        </f7-navbar>
        <f7-list class="no-margin-top">
            <f7-list-item v-for="(item, index) in auto.cars">
                <div slot="title" class="font0_9">Марка: <span class="textAuto">{{item.marka}}</span></div>
                <div slot="footer" class="font0_9">Номер: <span class="textNumber">{{item.number}} </span></div>
                <div slot="after">
                    <f7-link class="margin-right" v-on:click="infoAuto(item.id)"><f7-icon f7="info_circle"></f7-link>
                    <f7-link class="margin-right" v-on:click="editAuto(index)"><f7-icon f7="pencil_circle"></f7-link>
                    <f7-link class="" v-on:click="deleteAuto(index)"><f7-icon f7="trash_circle"></f7-link>
                </div>
            </f7-list-item>
        </f7-list>
        <f7-fab position="center-bottom" slot="fixed" color="green" v-on:click="editAuto(-1)">
            <f7-link> <f7-icon f7="plus_square_on_square" size="30px" color="white">
        </f7-fab>
        <!-- popup для отображении информации об автомобиле -->
        <f7-popup class="infoAuto-popup" push>
            <f7-page>
                <f7-navbar class="navMain">
                    <f7-nav-left><f7-link v-on:click="exitInfo()"><f7-icon f7="arrow_left"></f7-icon></f7-link></f7-nav-left>
                    <f7-nav-title>Информация по автомобилю</f7-nav-title>
                    </f7-navbar>
                <f7-list>
                    <f7-list-item>Марка: <span class="textAuto">{{auto.autoEdit.marka}}</span></f7-list-item>
                    <f7-list-item>Номер: <span class="textAuto">{{auto.autoEdit.number}}</span></f7-list-item>
                    <f7-list-item>Общее количество топлива: <span class="textAuto">{{auto.autoEdit.fuel}} л.</span></f7-list-item>
                    <f7-block strong inset>
                        <f7-block-title>AЗС, на которых заправлялся:</f7-block-title>
                        <f7-list class="no-margin-top" title="">
                            <f7-list-item v-for="(item, index) in autoAzs">
                                <div slot="title" class="textNumber">{{item.azsData}}</div>
                                <div slot="after"><span class="textAuto">{{item.fuel}} л.</span></div>
                        </f7-list>
                    </f7-block>
                </f7-list>
            </f7-page>
        </f7-popup>
        <!-- popup для редактирования автомобиля -->
        <f7-popup class="auto-popup" push>
            <f7-page>
                <f7-navbar class="navMain">
                    <f7-nav-left><f7-link v-on:click="exitEditAuto()"><f7-icon f7="arrow_left"></f7-icon></f7-link></f7-nav-left>
                    <f7-nav-title v-if="auto.edit">Редактирование автомобиля</f7-nav-title>
                    <f7-nav-title v-if="!auto.edit">Добавление автомобиля</f7-nav-title>
                </f7-navbar>
                <f7-list class="no-margin margin-bottom no-hairlines no-hairlines-between padding">
                    <f7-list-input label="Название марки автомобиля" class="elevation-2" id="nameField"
                                   type="text"
                                   placeholder="Введите название марки автомобиля"
                                   :value="auto.autoEdit.marka"
                                   @input="auto.autoEdit.marka = $event.target.value"
                                   clear-button>
                    </f7-list-input>
                    <f7-list-input label="Номер автомобиля" class="elevation-2" id="nameField"
                                   type="text"
                                   placeholder="Введите номер автомобиля"
                                   :value="auto.autoEdit.number"
                                   @input="auto.autoEdit.number = $event.target.value"
                                   clear-button>
                    </f7-list-input>
                </f7-list>
                <div class="colorRed font0_9"><span v-if="auto.autoEdit.marka ==='' ">Заполните поле "Название марки автомобиля" </span>&nbsp;</div>
                <div class="colorRed font0_9"><span v-if="auto.autoEdit.number ==='' ">Заполните поле "Номер автомобиля" </span>&nbsp;</div>
                <f7-button v-on:click="saveAuto()" v-bind:class="{ noActive: auto.autoEdit.marka ==='' ||  auto.autoEdit.number ==='' }" raised fill round class="greenBtn orang">Сохранить</f7-button>
            </f7-page>
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
            infoAuto(id) {
                auto.setId(id);
                autoAzs = fuel.getData(id, 'auto');
                this.$f7.popup.get(".infoAuto-popup").open();
            },
            editAuto(id) {
                if (id === -1) {
                    auto.edit = false;
                    auto.clearEdit();
                } else {
                    auto.edit = true;
                    auto.setId(id);
                }
             this.$f7.popup.get(".auto-popup").open();
            },
            deleteAuto(id) {
                my.$f7.dialog.confirm('Вы точно хотите удалить авто?', 'Внимание!', ()=> { auto.deleteAuto(id);}).open();
                            },
            saveAuto() {
                if (auto.autoEdit.marka === '' || auto.autoEdit.number === '') { return };
                if (auto.edit) { auto.PopEditAuto() } else {
                    auto.addAuto();
                }
                this.$f7.popup.get(".auto-popup").close();
              },
            exitEditAuto() {
                this.$f7.popup.get(".auto-popup").close();
            },
            exitInfo() {
                this.$f7.popup.get('.infoAuto-popup').close();
            }
        },
        mounted() {
        
        },
    }
</script>
<style>
</style>