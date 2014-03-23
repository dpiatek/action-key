/* global angular */

angular
  .module("action-key", [])
  .directive("actionKey", function() {
    "use strict";

    return {
      scope: {
        action: "&",
        key: "@"
      },
      link: function(scope, el, attr) {
        var key = scope.key.charCodeAt();
        var isInput = el[0].nodeName === "INPUT";

        el.on("keyup", function(event) {
          if (event.keyCode !== key) {
            return;
          }

          if (isInput && !attr.action) {
            el.focus();
            return;
          }

          scope.action();
        });
      }
    };
  });
