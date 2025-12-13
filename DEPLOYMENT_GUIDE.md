# 🚀 모클락 웹사이트 Vercel 배포 가이드

## 📋 배포 전 체크리스트

### 프로젝트 파일 구조
```
moclock-website/
├── index.html              # 메인 페이지
├── vercel.json            # Vercel 설정 파일
├── robots.txt             # SEO 크롤러 가이드
├── sitemap.xml            # 사이트맵
├── README.md              # 프로젝트 문서
├── DEPLOYMENT_GUIDE.md    # 이 파일
├── css/
│   └── style.css         # 메인 스타일시트
└── js/
    ├── main.js           # 메인 JavaScript
    └── translations.js   # 다국어 번역 데이터
```

---

## 🌐 Vercel 배포 단계

### Step 1: 파일 준비
1. 모든 프로젝트 파일을 로컬 컴퓨터의 한 폴더에 저장
2. 폴더 이름: `moclock-website` (또는 원하는 이름)

### Step 2: Vercel 계정 생성
1. https://vercel.com 접속
2. **"Sign Up"** 클릭
3. **GitHub 계정으로 가입** (추천)
   - 또는 GitLab, Bitbucket, 이메일 사용 가능

### Step 3: 프로젝트 배포

#### 방법 A: 드래그 앤 드롭 (가장 쉬움) ✨
1. Vercel 대시보드 접속
2. **"Add New..."** → **"Project"** 클릭
3. **"Browse"** 클릭 또는 폴더를 **드래그 앤 드롭**
4. `moclock-website` 폴더 선택
5. 프로젝트 이름 확인: `moclock-gangnam-headspa` (수정 가능)
6. **"Deploy"** 클릭
7. 배포 완료! (30초~1분 소요)

#### 방법 B: GitHub 연동 (자동 배포) 🔄
1. GitHub에 Repository 생성
2. 프로젝트 파일 업로드
3. Vercel에서 **"Import Git Repository"** 선택
4. GitHub Repository 연결
5. 자동 배포 설정
6. 이후 GitHub에 푸시하면 자동으로 재배포됨

---

## 🎨 배포 후 설정

### 1. 도메인 커스터마이징

#### Vercel 무료 도메인 변경
기본 URL: `https://moclock-gangnam-headspa-xxx.vercel.app`

**변경 방법:**
1. 프로젝트 **Settings** 클릭
2. **Domains** 탭 선택
3. 원하는 이름 입력 (예: `moclock.vercel.app`)
4. **Add** 클릭

#### 커스텀 도메인 연결 (본인 소유 도메인)
예: `moclock.com`, `moclock.co.kr`

**준비물:**
- 구매한 도메인 (가비아, Namecheap 등)

**연결 방법:**
1. Vercel **Domains** 탭에서 도메인 추가
2. DNS 설정 안내 확인
3. 도메인 제공업체 사이트에서 DNS 레코드 추가:
   - Type: `A` Record
   - Name: `@`
   - Value: Vercel IP 주소
4. 또는 CNAME:
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
5. SSL 인증서 자동 발급 (5~10분 소요)

### 2. Analytics 활성화
1. 프로젝트 **Analytics** 탭 클릭
2. **Enable** 클릭
3. 무료로 웹사이트 트래픽 분석 가능

### 3. 환경 변수 설정 (필요시)
현재 프로젝트는 환경 변수 불필요 (정적 사이트)

---

## 📊 배포 후 확인 사항

### 1. 기능 테스트
- ✅ 메인 페이지 로딩
- ✅ 네비게이션 메뉴 작동
- ✅ 다국어 전환 (한국어/영어/일본어)
- ✅ 갤러리 이미지 표시
- ✅ 구글 지도 로딩
- ✅ 모바일 반응형 디자인
- ✅ 전화 버튼 작동 (010-5749-5734)
- ✅ WhatsApp 버튼 작동

### 2. SEO 확인
- **Google Search Console 등록**
  1. https://search.google.com/search-console
  2. 사이트 URL 추가
  3. 소유권 확인 (Vercel에서 자동 가능)
  4. sitemap.xml 제출: `https://yourdomain.com/sitemap.xml`

- **Naver 웹마스터 도구 등록**
  1. https://searchadvisor.naver.com
  2. 사이트 등록
  3. 사이트맵 제출

### 3. 성능 테스트
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- Vercel Analytics 대시보드

---

## 🔄 업데이트 방법

### 파일 수정 후 재배포

#### 방법 1: Vercel 대시보드
1. 수정된 파일을 다시 업로드
2. 자동으로 재배포

#### 방법 2: GitHub 연동 사용 시
1. GitHub에 수정 사항 푸시
2. Vercel이 자동으로 감지하고 재배포
3. 이전 버전 롤백 가능

---

## 🛠️ 문제 해결

### 배포 실패 시
1. **빌드 로그 확인**
   - Vercel 대시보드 → Deployments → 실패한 배포 클릭
   - 오류 메시지 확인

2. **파일 구조 확인**
   - `index.html`이 루트에 있는지 확인
   - `css/`, `js/` 폴더 경로 확인

3. **vercel.json 확인**
   - 문법 오류 체크 (JSON 형식)

### 이미지 로딩 실패 시
- 외부 이미지 URL 확인 (403 에러 가능성)
- 이미지를 프로젝트 폴더에 직접 추가 권장

### 도메인 연결 실패 시
- DNS 설정 전파 대기 (최대 48시간)
- Vercel DNS 설정 재확인
- 도메인 제공업체 설정 확인

---

## 📞 연락처 정보 (웹사이트 내)

- **전화번호:** 010-5749-5734 (+82 10-5749-5734)
- **주소:** 서울시 강남구 강남대로 520, 할리스커피 건물 2층
- **이메일:** info@moclock.com (확인 필요)

---

## 🎯 배포 완료 후 해야 할 일

### 즉시 (배포 당일)
- [ ] 모든 페이지 기능 테스트
- [ ] 모바일 디바이스에서 확인
- [ ] 전화번호 클릭 테스트
- [ ] 구글 지도 작동 확인
- [ ] 다국어 전환 테스트

### 1주일 이내
- [ ] Google Search Console 등록
- [ ] Naver 웹마스터 도구 등록
- [ ] Google Analytics 설치 (선택사항)
- [ ] 소셜 미디어에 URL 공유
- [ ] 명함/전단지에 URL 추가

### 1개월 이내
- [ ] SEO 성과 확인
- [ ] 사용자 피드백 수집
- [ ] 필요시 콘텐츠 업데이트
- [ ] 백링크 구축 시작

---

## 🌟 추가 기능 제안

### 향후 개선 아이디어
1. **온라인 예약 시스템**
   - Calendly 연동
   - 네이버 예약 연동

2. **실시간 채팅**
   - 카카오톡 채널
   - Facebook Messenger

3. **고객 후기 자동 수집**
   - Google Reviews API
   - 리뷰 자동 표시

4. **블로그 섹션**
   - 두피 케어 팁
   - SEO 콘텐츠 마케팅

5. **Before/After 갤러리**
   - 고객 사례
   - 슬라이더 효과

---

## 💡 유용한 링크

- **Vercel 공식 문서:** https://vercel.com/docs
- **Vercel 커뮤니티:** https://github.com/vercel/vercel/discussions
- **Google Search Console:** https://search.google.com/search-console
- **Naver 웹마스터:** https://searchadvisor.naver.com
- **PageSpeed Insights:** https://pagespeed.web.dev/

---

## ✅ 체크리스트

배포 전:
- [ ] 모든 파일 준비 완료
- [ ] 전화번호 확인 (010-5749-5734)
- [ ] 주소 확인 (강남구 강남대로 520)
- [ ] 이미지 URL 작동 확인

배포 중:
- [ ] Vercel 계정 생성
- [ ] 프로젝트 업로드
- [ ] 배포 완료 확인
- [ ] URL 생성 확인

배포 후:
- [ ] 전체 기능 테스트
- [ ] 모바일 테스트
- [ ] SEO 설정
- [ ] 분석 도구 설치

---

**배포 성공을 기원합니다! 🚀**

문의사항이 있으시면 언제든지 연락주세요.

**프로젝트:** 모클락 강남헤드스파  
**버전:** 2.1.0  
**최종 업데이트:** 2024-12-13
