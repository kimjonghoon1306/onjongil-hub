# 온종일 허브

블로그 · 애드센스 · 부업 스터디 자동화 툴 모음 페이지

## 파일 구조

```
onjongil-hub/
├── index.html
├── vercel.json
├── README.md
└── assets/
    ├── css/
    │   ├── reset.css       # 기본 초기화
    │   ├── layout.css      # 전체 레이아웃 (사이드바, 그리드 등)
    │   ├── components.css  # 카드, 버튼, 폼 등 컴포넌트
    │   └── responsive.css  # 반응형 (PC / 모바일)
    └── js/
        ├── data.js         # 상수 (색상, 카테고리, 기본 툴)
        ├── render.js       # DOM 렌더링 함수
        └── app.js          # 상태 관리 & 이벤트 핸들러
```

## 배포

1. GitHub에 레포 생성
2. 이 폴더 전체 업로드
3. Vercel → Import → Deploy

## 관리자

- 기본 비밀번호: `0000`
- `assets/js/data.js` 상단 `CONFIG.ADMIN_PW` 변경

## 툴 추가/수정/삭제

1. 사이트 접속
2. 우측 하단 `+` 버튼
3. 비밀번호 입력 → 관리자 모드
4. 카드 추가 / 수정 / 삭제
