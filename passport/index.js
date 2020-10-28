const kakao = require("./kakaoStrategy");
const jwt = require("./jwtStrategy");

module.exports = (passport) => {
    kakao(passport);
    jwt(passport);
}