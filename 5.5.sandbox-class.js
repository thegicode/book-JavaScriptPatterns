"use strict";

function Sandbox() {
        // arguments를 배열로 바꾼다.
    var args = Array.prototype.slice.call(argements),
        // 마지막 인자는 콜백 함수다.
        callback = args.pop(),
        // 모듈은 배열로 전달될 수도 있고 개별 인자로 전달될 수도 있다.
        modules = (args[0] && typeof args[0] === "string") ? args : args[0],
        i;

    // 함수가 생성자로 호출되도록 보장한다
    if (!(this.instanceof Sandbox)) {
        return new Sandbox(modules, callback);
    }

    // this에 필요한 프로퍼티들을 추가한다
    this.a = 1;
    this.b = 2;

    // 코어 'this' 객체에 모듈을 추가한다
    // 모듈이 없거나 "*"이면 사용 가능한 모든 모듈을 사용한다는 희미다
    if (!modules || modules === '*' || modules[0] === '*') {
        modules = [];
        for( i in Sandbox.modules) {
            if (Sandbox.modules.hasOwnProperty(i)) {
                modules.push(i);
            }
        }
    }

    // 필요한 모듈드를 초기화한다
    for ( i = 0 ; i < modules.length ; i += 1) {
        Sandbox.modules[modules[i]](this);
    }

    // 콜백 함수를 호출한다
    callback(this);
}

// 필요한 프로토타입 프로퍼티들을 추가한다
Sandbox.prototype = {
    name: "My Application",
    version: "1.0",
    getName: function () {
        return this.name;
    }
}



