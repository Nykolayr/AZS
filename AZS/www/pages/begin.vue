<template>
    <f7-page class="" :page-content="false">
        <f7-toolbar tabbar bottom color="green" class="MainTabs" labels>
            <f7-link tab-link route-tab-id="homeTab" href="./"><f7-icon f7="house_fill"></f7-icon>Общая</f7-link>
            <f7-link tab-link route-tab-id="azsTab" href="./azs/"><f7-icon f7="square_favorites"></f7-icon>АЗС</f7-link>
            <f7-link tab-link route-tab-id="autoTab" href="./auto/"><f7-icon f7="rectangle_stack"></f7-icon>Авто</f7-link>
        </f7-toolbar>
        
        <f7-tabs routeble>
            <f7-tab class="page-content" id="homeTab"></f7-tab>
            <f7-tab class="page-content" id="azsTab"></f7-tab>
            <f7-tab class="page-content" id="autoTab"></f7-tab>
        </f7-tabs>
    </f7-page>
    </template>
<script>
    module.exports = {
        data() {
            return {
              
            };
        },
        methods: {
            // нажатие на кнопку сохранить
            saveBnt: () => {
                if (my.userProfile.name === '') {
                    $$('.error').addClass('backRed');
                    setTimeout(() => {
                        document.getElementById("nameField").focus();
                        $$('.error').removeClass('backRed');
                    }, 1000)
                } else {
                    CurrName = JSON.parse(JSON.stringify(my.userProfile));
                    localforage.setItem(keyUser, my.userProfile).then(function () {
                        my.$f7.popup.get(".profile-popup").close();
                        my.toastMess('Внимание!', 'Изменения сохранены')
                    });
                }
            },
        },
        mounted() {
            
        },
    }
</script>
<style>
    .MainTabs {
        font-size: 0.7rem;
    }
</style>
