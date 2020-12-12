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

// 반환 값을 지역 변수에 할당한다.	
var modules2 = MYAPP.namespace('MYAPP.modules.modules2');
console.log( modules2 === MYAPP.modules.modules2 ); // true
console.log(MYAPP);

// 첫 부분의 'MYAPP'을 생략하고도 쓸 수 있다.
MYAPP.namespace('modules.modules51');
console.log(MYAPP);

// 아주 긴 네임스페이스를 만들어보자
MYAPP.namespace('once.upon.a.time.there.was.this.long.nested.property');
console.log(MYAPP);

