"use strict";

var validator = {
	// 사용할 수 있는 모든 검사 방법들
	types: {
		// 값을 가지는지 확인한다.
		isNonEmpty: {
			validate: function (value) {
				return value !== "";
			},
			instructions: "이 값은 필수입니다"
		},
		// 숫자 값인지 확인힌다.
		isNumber: {
			validate: function (value) {
				return !isNaN(value);
			},
			instructions: "숫자만 사용할 수 있습니다. 예: 1, 3, 14 or 2010"
		},
		// 값이 문자와 숫자로만 이루어졌는지 확인한다.
		isAlphaNum: {
			validate: function (value) {
				return !/[^a-z0-9]/i.test(value);
			},
			instructions: "특수문자를 제외한 글자와 숫자만 사용할 수 있습니다."
		}
	},

	// 현재 유효성 검사 세션의 여러 메시지들
	messages: [],

	// 현재 유효성 검사 설정
	// '데이터 필드명: 사용할 검사 방법'의 형식
	config: {
		first_name: 'isNonEmpty',
		age: 'isNumber',
		username: 'isAlphaNum'
	},

	// 인터페이스 메서드
	// 'data'는 이름 => 값 쌍이다.
	validate: function (data) {

		var i, msg, type, checker, result_ok;

		// 모든 메시지를 초기화한다.
		this.message = [];

		for(i in data) {
			if (data.hasOwnProperty(i)) {

				type = this.config[i];
				checker = this.types[type];

				if (!type) {
					continue; // 설정된 검사 방법이 없을 경우 검증할 필요가 없으므로 건너뛴다.
				}
				if (!checker) { // 설정이 존재하나 해당하는 검사 방법을 찾을 수 없을 경우 오류 발생
					throw {
					 	name: "ValidatorError",
					 	message: type + '값을 처리할 유효성 검사기가 존재하지 않습니다.'
					};
				}
				result_ok = checker.validate(data[i]);
				if (!result_ok) {
					msg = "\'" + i + "\' 값이 유효하지 않습니다. " + checker.instructions;
					this.messages.push(msg); // [my] 이 코드가 빠진 것 같다.
				}
			}
		}
		return this.hasErros();
	},

	// 도우미 메서드
	hasErros: function () {
		return this.messages.length !== 0;
	}

};

var data  = {
	first_name: "Super",
	last_name: "Man",
	age: "unknown",
	username: "o_0"
};

validator.validate(data);
if (validator.hasErros()) {
	console.log(validator.messages.join("\n"));
}




