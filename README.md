# Board with Cursor

게시판 프로젝트입니다. Spring Boot와 React를 사용하여 구현되었습니다.

## 기술 스택

### Backend
- Spring Boot 3.2.3
- Kotlin
- Spring Security
- Spring Data JPA
- H2 Database

### Frontend
- React 18
- TypeScript
- Material-UI
- React Router
- Axios

## 프로젝트 구조

```
board-with-cursor/
├── backend/                 # Spring Boot 백엔드
│   ├── src/
│   │   ├── main/
│   │   │   ├── kotlin/     # Kotlin 소스 코드
│   │   │   └── resources/  # 설정 파일
│   │   │   └── build.gradle.kts     # Gradle 설정
│   └── frontend/               # React 프론트엔드
    │   ├── src/
    │   │   ├── components/     # 재사용 가능한 컴포넌트
    │   │   ├── pages/         # 페이지 컴포넌트
    │   │   └── App.tsx        # 메인 앱 컴포넌트
    │   └── package.json       # npm 설정
```

## 실행 방법

### Backend 실행
```bash
cd backend
./gradlew bootRun
```
백엔드 서버는 http://localhost:8080 에서 실행됩니다.

### Frontend 실행
```bash
cd frontend
npm install
npm start
```
프론트엔드 개발 서버는 http://localhost:3000 에서 실행됩니다.

## 주요 기능

- 사용자 인증 (회원가입/로그인)
- 게시글 CRUD
- 게시글 목록 조회
- 게시글 상세 보기
- 게시글 작성/수정/삭제

## API 엔드포인트

### 인증
- POST /api/auth/register - 회원가입
- POST /api/auth/login - 로그인

### 게시글
- GET /api/posts - 게시글 목록 조회
- GET /api/posts/{id} - 게시글 상세 조회
- POST /api/posts - 게시글 작성
- PUT /api/posts/{id} - 게시글 수정
- DELETE /api/posts/{id} - 게시글 삭제

## 개발 환경 설정

### 필수 요구사항
- JDK 17 이상
- Node.js 18 이상
- npm 9 이상

### IDE 설정
- IntelliJ IDEA (백엔드)
- VS Code (프론트엔드)

## 라이선스
MIT License 