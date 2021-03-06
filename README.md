# 유어튜터 서버

<!-- PROJECT LOGO -->
<br />
<p align="center">
    <img src="images/main.png" alt="Main page" width=100>
    <img src="images/select1.png" alt="Select page 1" width=100>
    <img src="images/select2.png" alt="Select page 2" width=100>
    <img src="images/recommend.png" alt="Recommendation page" width=100>
    <img src="images/question.png" alt="Qnestion image" width=100>
    <img src="images/select3.png" alt="Select page 3" width=100>
    <h4 align="center">유어튜터 애플리케이션 스크린샷</h3>
<p>

유어튜터는 대입 수험생들에게 인공지능을 통해 스스로의 성적을 진단하고 효과적인 학습 경로를 알려주는 서비스를 제공하는 애플리케이션입니다. 이 프로젝트는 소프트웨어 마에스트로 11기 스터디셀퍼 팀의 프로젝트로 진행되었으며 현재 운영이 중단되었습니다.

이 저장소는 유어튜터 애플리케이션의 API 서버 코드를 가지고 있습니다. 코드는 MVC 구조로 구성되어 있으며 각각 `controllers`, `models` 폴더의 코드를 통해 확인할 수 있습니다. `routers` 폴더의 코드를 통해 API 호출 구조를 확인할 수 있습니다. `flask_server` 폴더의 내용은 구동시에 별도의 서버로 분리하여 구동하였으며 진단, 추천 모델을 Flask 프레임워크를 통해 서빙합니다.
<br /><br />
# 설치 및 구동
백엔드 서버
1. `nodejs`, `express`, `MySQL` 를 설치합니다.
2. 코드를 클론합니다.
```sh
   git clone https://github.com/junhyeokk/studyselfer-yourtutor-server.git
```
3. NPM 패키지를 설치합니다
```sh
   npm install
```
4. .env 파일을 생성하고 필요한 키를 포함시킵니다.
5. Python Flask 서버를 다른 인스턴스에 구성하고 연결합니다. (같은 인스턴스에서 구동할 경우 포트를 조정합니다.)
<br /><br />
# 전체 프로젝트
유어튜터 프로젝트는 프론트엔드, 백엔드, 인공지능으로 나누어 개발되었으며 이 저장소는 그 중 백엔드와 관련된 코드를 가지고 있습니다. 다른 부분은 아래의 저장소를 통해 확인할 수 있습니다.<br/><br/>
<a href="https://github.com/jintak0401/StudySelfer">프론트엔드 코드 저장소</a><br/><br/>
<a href="https://github.com/112224/studyselfer">인공지능 코드 저장소</a>