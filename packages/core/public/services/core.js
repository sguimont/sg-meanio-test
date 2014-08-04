'use strict';

angular.module('mean.core').factory('Core', [
    function () {
        return {
            name: 'core'
        };
    }
]);

angular.module('mean.core').config(function ($translateProvider, $translatePartialLoaderProvider) {

    $translateProvider.translations('en', {
        TITLE: 'Hello',
        FOO: 'This is a paragraph.',
        BUTTON_LANG_EN: 'english',
        BUTTON_LANG_FR: 'french',
        BUTTON_SUBMIT: 'Submit',
        TEST_FORM: {
            FIRST_NAME: 'First Name',
            LAST_NAME: 'Last Name',
            AGE: 'Age',
            EMAIL: 'Email',
            GENDER: 'Gender'
        },
        GENDER: {
            MALE: 'Male',
            FEMALE: 'Female'
        },
        ERROR: {
            required: 'This field is required!',
            email: 'This field has to be a valid email address!',
            url: 'This field has to be a valid URL!',
            number: 'This field has to be a number!',
            minlength: 'This field must have at least {{arg}} characters'
        }
    });

    $translatePartialLoaderProvider.addPart('core');

    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
    $translateProvider.useLocalStorage();
    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: '/{part}/i18n/{lang}.json'
    });
});
