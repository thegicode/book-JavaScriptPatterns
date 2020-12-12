"use strict";

Sandbox.modules = {};

Sandbox.modules.dom = function (box) {
	box.getElement = function () {};
	box.getStyle = function () {};
	box.foo = "bar";
};

Sandbox.modules.event = function (box) {
	// 필요에 따라 다음과 같이 Sandbox 프로토타입에 접근할 수 있다.
	// box.constructor.protptype.m = "mmm";
	box.attachEvent = function () {};
	box.detachEvent = function () {};
};

Sandbox.modules.ajax = function (box) {
	box.makeRequest = function () {};
	box.getResponse = function () {};
};
