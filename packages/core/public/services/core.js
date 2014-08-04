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
            FIELD_REQUIRED: 'This field is required!',
            INVALID_EMAIL: 'This field has to be a valid email address!',
            INVALID_URL: 'This field has to be a valid URL!',
            INVALID_NUMBER: 'This field has to be a number!',
            MIN_LENGTH: 'This field must have at least x characters'
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
