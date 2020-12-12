"use strict";

var MYAPP = MYAPP || {};
MYAPP.namespace = function (ns_string) {
	var parts = ns_string.split('.'),
		parent = MYAPP,
		i;

	// 처음에 중복되는 전역 객체명은 제거한다.
	if (parts[0] === "MYAPP" ) {
		parts = parts.slice(1);
	}

	for ( i = 0; i < parts.length ; i += 1 ){
		// 프로퍼티가 존재하지 않으면 생성한다.
		if ( typeof parent[parts[i]] === "undefined" ) {
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
};




MYAPP.namespace('MYAPP.utilities.array');

MYAPP.utilities.array = (function () {

		// 비공개 프로퍼티
	var array_string = "[object Array]",
		ops = Object.prototype.toString,

		// 비공개 메서드
		inArray = function (haystack, needle) {
			for (var i = 0, max = haystack.length ; i < max ; i += 1 ) {
				if (haystack[i] === needle) {
					return i;
				}
			}
			return -1;
		},
		isArray = function (a) {
			return ops.call(a) === array_string;
		};
		// var 선언믈 마친다

	// 공개 API 노출
	return {
		isArray : isArray,
		indexOf : inArray
	};

}());

// Test
console.log( MYAPP.utilities.array.isArray([1, 2]) );	// true
console.log( MYAPP.utilities.array.isArray({0: 1}) );	// false
console.log( MYAPP.utilities.array.indexOf(["a", "b", "z"], "z") );	// 2


