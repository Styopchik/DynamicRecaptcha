define([
    'jquery'
], function ($) {
    "use strict";


    return function (reCaptcha) {

        return reCaptcha.extend({
            initialize: function () {
                this._super();
                let self = this;
                $('form').find('input, textarea, select').each((index, el) => {
                    $(el).on('focus', function () {
                        self._loadApi();
                    });
                });
            },
            _loadApi: function () {
                if (!$('form').find('input:focus, textarea:focus, select:focus').length) {
                    return;
                }
                var element, scriptTag;

                if (this._isApiRegistered !== undefined) {
                    if (this._isApiRegistered === true) {
                        $(window).trigger('recaptchaapiready');
                    }

                    return;
                }
                this._isApiRegistered = false;

                // global function
                window.globalOnRecaptchaOnLoadCallback = function () {
                    this._isApiRegistered = true;
                    $(window).trigger('recaptchaapiready');
                }.bind(this);

                element   = document.createElement('script');
                scriptTag = document.getElementsByTagName('script')[0];

                element.async = true;
                element.src = 'https://www.google.com/recaptcha/api.js'
                    + '?onload=globalOnRecaptchaOnLoadCallback&render=explicit'
                    + (this.settings.lang ? '&hl=' + this.settings.lang : '');

                scriptTag.parentNode.insertBefore(element, scriptTag);
            }
        });
    }
});
