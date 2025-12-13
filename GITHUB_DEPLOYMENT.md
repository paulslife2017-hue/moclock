# 🚀 GitHub → Vercel 배포 가이드

## 📋 전체 프로세스

```
로컬 컴퓨터 → GitHub → Vercel → 라이브 웹사이트
```

---

## Step 1: 파일 다운로드

현재 프로젝트의 모든 파일을 로컬 컴퓨터에 저장하세요.

**필요한 파일 목록:**
```
moclock-website/
├── index.html
├── vercel.json
├── .gitignore
├── robots.txt
├── sitemap.xml
├── README.md
├── DEPLOYMENT_GUIDE.md
├── GITHUB_DEPLOYMENT.md (이 파일)
├── css/
│   └── style.css
└── js/
    ├── main.js
    └── translations.js
```

---

## Step 2: GitHub Repository 생성

### 2.1 GitHub 계정 생성 (없다면)
1. https://github.com 접속
2. "Sign up" 클릭
3. 이메일, 비밀번호 입력하여 계정 생성

### 2.2 새 Repository 생성
1. GitHub 로그인
2. 우측 상단 **"+"** 클릭 → **"New repository"** 선택
3. Repository 설정:
   - **Repository name:** `moclock-website` (또는 원하는 이름)
   - **Description:** "모클락 강남헤드스파 공식 웹사이트"
   - **Public** 선택 (무료) 또는 **Private** (비공개)
   - ✅ **Add a README file** 체크 해제 (이미 있음)
   - **Add .gitignore:** None (이미 있음)
   - **Choose a license:** None
4. **"Create repository"** 클릭

---

## Step 3: 로컬에서 Git 설정

### 3.1 Git 설치 (없다면)

**Windows:**
- https://git-scm.com/download/win 에서 다운로드 및 설치

**Mac:**
```bash
# Homebrew로 설치
brew install git

# 또는 Xcode Command Line Tools
xcode-select --install
```

**Linux:**
```bash
sudo apt-get install git  # Ubuntu/Debian
sudo yum install git      # CentOS/RedHat
```

### 3.2 Git 초기 설정
터미널/명령 프롬프트에서:

```bash
# 사용자 정보 설정 (최초 1회)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3.3 프로젝트 폴더로 이동
```bash
cd path/to/moclock-website
```

### 3.4 Git 초기화 및 커밋
```bash
# Git 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: Moclock website v2.1.0"

# 기본 브랜치 이름 변경 (main으로)
git branch -M main

# GitHub Repository 연결
# (GitHub에서 생성한 Repository URL 사용)
git remote add origin https://github.com/YOUR_USERNAME/moclock-website.git

# GitHub에 푸시
git push -u origin main
```

**주의:** `YOUR_USERNAME`을 본인의 GitHub 사용자명으로 변경하세요!

---

## Step 4: Vercel에 배포

### 4.1 Vercel 계정 생성
1. https://vercel.com 접속
2. **"Sign Up"** 클릭
3. **"Continue with GitHub"** 선택 (추천)
4. GitHub 계정으로 로그인하여 Vercel 연결

### 4.2 Repository 연결
1. Vercel 대시보드에서 **"Add New..."** → **"Project"** 클릭
2. **"Import Git Repository"** 섹션에서 GitHub 탭 선택
3. `moclock-website` Repository 찾기
4. **"Import"** 클릭

### 4.3 프로젝트 설정
1. **Project Name:** `moclock-gangnam-headspa` (자동 생성, 수정 가능)
2. **Framework Preset:** Other (또는 자동 감지)
3. **Root Directory:** `./` (기본값)
4. **Build Command:** 비워두기 (정적 사이트)
5. **Output Directory:** 비워두기 (정적 사이트)
6. **Environment Variables:** 없음 (필요 없음)

### 4.4 배포
1. **"Deploy"** 버튼 클릭
2. 배포 진행 상황 확인 (30초~1분)
3. 완료! 🎉

---

## Step 5: 배포 확인

### 생성된 URL
배포 완료 후 자동으로 생성되는 URL:
```
https://moclock-gangnam-headspa.vercel.app
```
또는
```
https://moclock-gangnam-headspa-username.vercel.app
```

### 기능 테스트
- [ ] 홈페이지 로딩
- [ ] 네비게이션 작동
- [ ] 갤러리 이미지 표시
- [ ] 구글 지도 표시
- [ ] 전화 버튼 클릭 (010-5749-5734)
- [ ] 다국어 전환 (한/영/일)
- [ ] 모바일 반응형

---

## Step 6: 도메인 설정 (선택사항)

### Vercel 도메인 변경
1. 프로젝트 **Settings** → **Domains** 클릭
2. 원하는 이름 입력: `moclock.vercel.app`
3. **Add** 클릭

### 커스텀 도메인 연결
1. 도메인 구매 (예: `moclock.com`)
2. Vercel Domains에서 도메인 추가
3. DNS 설정:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. SSL 자동 발급 대기 (5~10분)

---

## 🔄 업데이트 방법

### 파일 수정 후 재배포

1. **로컬에서 파일 수정**
2. **Git 커밋 및 푸시:**
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push origin main
   ```
3. **Vercel 자동 배포**
   - GitHub 푸시 감지
   - 자동으로 빌드 및 배포
   - 1~2분 후 라이브 반영

---

## 🛠️ 문제 해결

### Git push 실패 시
```bash
# 인증 문제 해결
git config credential.helper store
git push origin main
```

### GitHub Personal Access Token 필요 시
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. 권한 선택: `repo` 전체 체크
5. 생성된 토큰을 비밀번호 대신 사용

### Vercel 배포 실패 시
1. Vercel 대시보드 → Deployments
2. 실패한 배포 클릭 → Logs 확인
3. 오류 메시지 분석 후 수정

---

## 📊 장점: GitHub + Vercel 조합

✅ **자동 배포:** GitHub 푸시 시 자동 재배포  
✅ **버전 관리:** Git으로 모든 변경사항 추적  
✅ **롤백 가능:** 이전 버전으로 즉시 복원  
✅ **협업 가능:** 여러 사람이 함께 작업  
✅ **무료:** 개인 프로젝트는 완전 무료  
✅ **안정성:** 전 세계 CDN으로 빠른 속도  

---

## 🎯 빠른 시작 명령어 모음

```bash
# 1. 프로젝트 폴더로 이동
cd moclock-website

# 2. Git 초기화
git init

# 3. 모든 파일 추가
git add .

# 4. 첫 커밋
git commit -m "Initial commit: Moclock website"

# 5. 브랜치 이름 변경
git branch -M main

# 6. GitHub Repository 연결
git remote add origin https://github.com/YOUR_USERNAME/moclock-website.git

# 7. GitHub에 푸시
git push -u origin main

# 8. 이후 업데이트 시
git add .
git commit -m "Update description"
git push
```

---

## 📞 도움이 필요하면

- **GitHub 문서:** https://docs.github.com
- **Vercel 문서:** https://vercel.com/docs
- **Git 기초 튜토리얼:** https://git-scm.com/book/ko/v2

---

**행운을 빕니다! 🚀**

배포 과정에서 문제가 있으면 오류 메시지를 공유해주세요.
