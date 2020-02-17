<template >
    <f7-page class="" name="azs">
        <f7-navbar class="navMain">
            <!--<f7-nav-left><f7-link back><f7-icon f7="arrow_left"></f7-icon></f7-link></f7-nav-left>-->
            <f7-nav-title>АЗС</f7-nav-title>
        </f7-navbar>
        <f7-list class="no-margin-top">
            <f7-list-item v-for="(item, index) in azs.station">
                <div slot="title" class="font0_9">Название: <span class="textAuto">{{item.name}}</span> </div>
                <div slot="footer" class="font0_9">Адрес: <span class="textNumber">{{item.point}} </span></div>
                <div slot="after">
                    <f7-link class="margin-right" v-on:click="infoAzs(item.id)"><f7-icon f7="info_circle"></f7-link>
                    <f7-link class="margin-right" v-on:click="editAzs(index)"><f7-icon f7="pencil_circle"></f7-link>
                    <f7-link class="" v-on:click="deleteAzs(index)"><f7-icon f7="trash_circle"></f7-link>
                </div>
            </f7-list-item>
        </f7-list>
        <f7-fab position="center-bottom" slot="fixed" color="green" v-on:click="editAzs(-1)">
            <f7-link> <f7-icon f7="plus_square_on_square" size="30px" color="white">
        </f7-fab>
        <!-- popup для отображении информации об АЗС -->
        <f7-popup class="infoAzs-popup" push>
            <f7-page>
                <f7-navbar class="navMain">
                    <f7-nav-left><f7-link v-on:click="exitInfo()"><f7-icon f7="arrow_left"></f7-icon></f7-link></f7-nav-left>
                    <f7-nav-title>Информация по автомобилю</f7-nav-title>
                </f7-navbar>
                <f7-list>
                    <f7-list-item>Наименование: <span class="textAuto">{{azs.azsEdit.name}}</span></f7-list-item>
                    <f7-list-item>Адрес: <span class="textAuto">{{azs.azsEdit.point}}</span></f7-list-item>
                    <f7-list-item>Общее количество топлива: <span class="textAuto">{{auto.autoEdit.fuel}} л.</span></f7-list-item>
                    <f7-block strong inset>
                        <f7-block-title>Автомобили которые заправлялись:</f7-block-title>
                        <f7-list class="no-margin-top" >
                            <f7-list-item v-for="(item, index) in autoAzs">
                                <div slot="title" class="textNumber">{{item.autoData}}</div>
                                <div slot="after"><span class="textAuto">{{item.fuel}} л.</span></div>
                        </f7-list>
                    </f7-block>
                </f7-list>
            </f7-page>
        </f7-popup>
        <!-- popup для отображении редактировании автомобиля -->
        <f7-popup class="azs-popup" push>
            <f7-page>
                <f7-navbar class="navMain">
                    <f7-nav-left><f7-link v-on:click="exitEditAzs()"><f7-icon f7="arrow_left"></f7-icon></f7-link></f7-nav-left>
                    <f7-nav-title v-if="auto.edit">Редактирование АЗС</f7-nav-title>
                    <f7-nav-title v-if="!auto.edit">Добавление АЗС</f7-nav-title>
                </f7-navbar>
                <f7-list class="no-margin margin-bottom no-hairlines no-hairlines-between padding">
                    <f7-list-input label="Название АЗС" class="elevation-2" id="nameField"
                                   type="text"
                                   placeholder="Введите название АЗС"
                                   :value="azs.azsEdit.name"
                                   @input="azs.azsEdit.name = $event.target.value"
                                   clear-button>
                    </f7-list-input>
                    <f7-list-input label="Адрес АЗС" class="elevation-2" id="nameField"
                                   type="text"
                                   placeholder="Введите адрес АЗС"
                                   :value="azs.azsEdit.point"
                                   @input="azs.azsEdit.point = $event.target.value"
                                   clear-button>
                    </f7-list-input>
                </f7-list>
                <div class="colorRed font0_9"><span v-if="azs.azsEdit.name ==='' ">Заполните поле "Название АЗС" </span>&nbsp;</div>
                <div class="colorRed font0_9"><span v-if="azs.azsEdit.point ==='' ">Заполните поле "Адрес АЗС" </span>&nbsp;</div>
                <f7-button v-on:click="saveAzs()" v-bind:class="{ noActive: azs.azsEdit.name ==='' ||  azs.azsEdit.point ==='' }" raised fill round class="greenBtn orang">Сохранить</f7-button>
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
              infoAzs(id) {
                  azs.setId(id);
                  autoAzs = fuel.getData(id, 'azs');
                  console.log(autoAzs);
                  this.$f7.popup.get(".infoAzs-popup").open();
              },
            editAzs(id) {
                
                if (id === -1) {
                    azs.edit = false;
                    azs.clearEdit();
                } else {
                    azs.edit = true;
                    azs.setId(id);
                }
                this.$f7.popup.get(".azs-popup").open();
            },
            deleteAzs(id) {
                my.$f7.dialog.confirm('Вы точно хотите удалить АЗС?', 'Внимание!', () => { azs.deleteAzs(id); }).open();
            },
            saveAzs() {
                 if (azs.azsEdit.name === '' || azs.azsEdit.point === '') { return };
                if (azs.edit) { azs.PopEditAzs() } else {
                    azs.addAzs();
                }
                this.$f7.popup.get(".azs-popup").close();
            },
            exitEditAzs() {
                this.$f7.popup.get(".azs-popup").close();
            },
            exitInfo() {
                this.$f7.popup.get('.infoAzs-popup').close();
            }
        },
        mounted() {

        },
    }
</script>
<style>
</style>