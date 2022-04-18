# 트위터 클론코딩
> Firebase와 React를 이용해서 만들어보는 Twitter 클론코딩

한 두 문단으로 프로젝트 소개 글을 작성합니다.

![image](https://user-images.githubusercontent.com/54172578/163839095-a4b4fa42-39a1-417c-8cb5-51d05d6bf5ce.png)


## 개발 환경
+ React
+ Firebase 9.6.10
+ Chrome Browser

## 설치 방법

1. Firebase에 앱을 등록하고 API Key를 받는다.
2. git clone으로 레포지토리를 복사한다
```
git clone https://github.com/tagjune12/nwitter.git
```
3. firebseConfig.js에 내 API Key를 넣는다
```
const firebaseConfig = {
    apiKey: 내 api key,
    authDomain: 내 authDomain,
    projectId: 내 projectId,
    storageBucket: 내 storageBucket,
    messagingSenderId: 내 messagingSenderId,
    appId: 내 appId,
};
```

## 개발 환경 설정

```
npm update
```

## 사용 예제

### 로컬 환경에서 실행
```
npm start
```

### 계정 생성

![image](https://user-images.githubusercontent.com/54172578/163839696-3532eaf1-0b55-428b-b413-b0e39c55b331.png)

Email형식의 ID와 PW를 입력하고 Create New Account 버튼을 클릭하여 새로운 계정을 생성할 수 있다

계정을 생성한 후 Sign in 버튼을 눌러 로그인 페이지로 이동한다

### 로그인
![image](https://user-images.githubusercontent.com/54172578/163839862-3aff9869-5ec1-476f-9432-2f402de11d7a.png)

생성했던 계정으로 로그인을 하거나 Google계정 혹은 Github계정으로 로그인이 가능하다


### 트윗 작성
![image](https://user-images.githubusercontent.com/54172578/163837976-79bfbc68-8513-41a3-a0a9-2d0dbbe19933.png)

빈칸에 트윗 내용을 입력하고 우측 화살표 버튼을 클릭하면 새로운 트윗을 등록한다

![image](https://user-images.githubusercontent.com/54172578/163838323-1ab701a9-2437-4605-bfdb-25b27fb5c40a.png)
Add photos를 클릭하여 트윗과 이미지를 함께 등록이 가능하다


### 프로필 수정

**[변경전]**

![image](https://user-images.githubusercontent.com/54172578/163838724-b5f8da48-c5c3-438f-9d95-bd37692b0f39.png)

프로필 아이콘을 눌러 프로필 페이지로 이동후 닉네임을 변경하거나 로그아웃할 수 있다

**[변경후]**

![image](https://user-images.githubusercontent.com/54172578/163838854-63dd8031-efa1-4a3c-aef8-16db685e2926.png)

### 트윗 수정
![image](https://user-images.githubusercontent.com/54172578/163839389-310e848c-7d33-49a5-b23b-3c2e8119fd40.png)

트윗의 수정 버튼을 눌러 트윗 내용을 수정할 수 있다

**[트윗 내용 변경중]**

![image](https://user-images.githubusercontent.com/54172578/163839500-f01b1e8e-8411-48bf-bb34-22bc393bb6ac.png)


**[변경 완료]**

![image](https://user-images.githubusercontent.com/54172578/163839541-97936b40-729c-4a6d-96d9-01a351f00295.png)

## 업데이트 내역

* 0.0.1
    * 최초 배포 완료

## 정보

이택준 – tagjune12@gmail.com

배포 링크 - https://tagjune12.github.io/nwitter/
