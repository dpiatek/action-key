/* global angular, describe, beforeEach, afterEach, module, inject, it, spyOn, expect, $ */

describe("action-key", function() {
  "use strict";

  function triggerKeyup(el, keyCode) {
    var e = $.Event("keyup");
    e.keyCode = keyCode;
    el.trigger(e);
  }

  beforeEach(module("action-key"));

  describe("if has no action specified", function () {
    var keycode = "/".charCodeAt();
    var el, scope;

    beforeEach(function () {
      inject(function($compile, $rootScope) {
        scope = $rootScope.$new();
        el = angular.element("<input action-key key='/'></input>");
        $compile(el)(scope);
        scope.$apply();
      });
      el.appendTo(document.body);
    });

    afterEach(function () {
      el.remove();
    });

    it("should default to focusing on a element if it is an input", function() {
      triggerKeyup(el, keycode);
      expect(document.activeElement).toEqual(el[0]);
    });
  });

  describe("Single key bindings:", function () {
    var keycode = "/".charCodeAt();
    var el, scope, controller;

    beforeEach(inject(function($compile, $rootScope, $controller) {
      scope = $rootScope.$new();

      controller = $controller(function Ctrl($scope) {
        $scope.done = false;
        $scope.fakeAction = function() { $scope.done = true; };
      }, { $scope: scope });

      el = angular.element(
        "<input action-key key='/' action='fakeAction()' ng-model='someModel'>Search</input>"
      );

      $compile(el)(scope);
      scope.$apply();
    }));

    it("should call specified action when '/' is pressed", function () {
      triggerKeyup(el, keycode);
      expect(scope.done).toBe(true);
    });
  });
});
