# Vercel 커스텀 도메인 SSL 인증서 문제 해결 가이드

## 🔴 현재 문제
- **에러**: `net::ERR_CERT_COMMON_NAME_INVALID`
- **도메인**: `www.scalptreatmentgangnam.co.kr`
- **원인**: SSL 인증서가 해당 도메인에 대해 올바르게 설정되지 않음

## ✅ 해결 방법 (Vercel Dashboard)

### 1단계: Vercel 대시보드 접속
1. [Vercel Dashboard](https://vercel.com/dashboard) 로그인
2. 해당 프로젝트 선택 (moclock 또는 scalptreatmentgangnam)

### 2단계: 도메인 설정 확인
1. 프로젝트에서 **Settings** 탭 클릭
2. **Domains** 섹션으로 이동
3. 현재 등록된 도메인 확인

### 3단계: 도메인 제거 후 재등록

#### A. 기존 도메인 제거 (문제가 있는 경우)
```
1. www.scalptreatmentgangnam.co.kr 옆의 [...] 메뉴 클릭
2. "Remove" 선택
3. 확인 팝업에서 삭제 승인
```

#### B. 도메인 재등록
```
1. "Add Domain" 버튼 클릭
2. 도메인 입력: scalptreatmentgangnam.co.kr
3. Vercel이 자동으로 www 서브도메인도 제안함
4. "Add" 클릭
```

### 4단계: DNS 설정 확인

Vercel이 제공하는 DNS 레코드를 도메인 등록업체(가비아, 후이즈 등)에 설정해야 합니다:

#### 옵션 1: Vercel DNS (권장)
```
Name Server를 Vercel NS로 변경:
- ns1.vercel-dns.com
- ns2.vercel-dns.com
```

#### 옵션 2: 직접 DNS 레코드 설정

**A 레코드 (루트 도메인)**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**CNAME 레코드 (www 서브도메인)**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 5단계: SSL 인증서 자동 발급 대기
- Vercel은 Let's Encrypt를 사용하여 자동으로 SSL 인증서 발급
- DNS 설정 후 **최대 24시간** 소요
- 보통 **10-30분** 내에 완료됨

### 6단계: 인증서 상태 확인
```
Vercel Dashboard → Project → Settings → Domains

각 도메인 옆에 다음 상태 확인:
✅ Valid Configuration (녹색) - 정상
⚠️ Invalid Configuration (노란색) - 설정 필요
❌ Certificate Error (빨간색) - 에러
```

## 🔧 DNS 설정 방법 (도메인 제공업체별)

### 가비아 (Gabia)
1. [가비아 My가비아](https://www.gabia.com/) 로그인
2. **서비스 관리** → **도메인**
3. `scalptreatmentgangnam.co.kr` 선택
4. **DNS 정보** → **DNS 설정** 버튼
5. 위의 A/CNAME 레코드 추가

### 후이즈 (Whois)
1. [후이즈](https://www.whois.co.kr/) 로그인
2. **도메인 관리** → **네임서버 관리**
3. DNS 레코드 설정 추가

### AWS Route 53
1. Route 53 콘솔 접속
2. Hosted Zone에서 해당 도메인 선택
3. **Create Record** 클릭
4. A/CNAME 레코드 추가

## ⚡ 즉시 테스트 방법

### 1. DNS 전파 확인
```bash
# nslookup으로 DNS 확인
nslookup www.scalptreatmentgangnam.co.kr

# dig 명령어로 상세 확인
dig www.scalptreatmentgangnam.co.kr
```

온라인 도구:
- [DNS Checker](https://dnschecker.org/)
- [What's My DNS](https://www.whatsmydns.net/)

### 2. SSL 인증서 확인
```bash
# OpenSSL로 인증서 확인
openssl s_client -connect www.scalptreatmentgangnam.co.kr:443 -servername www.scalptreatmentgangnam.co.kr
```

온라인 도구:
- [SSL Labs](https://www.ssllabs.com/ssltest/)
- [SSL Checker](https://www.sslshopper.com/ssl-checker.html)

## 🚨 일반적인 문제 해결

### 문제 1: DNS가 아직 전파되지 않음
**해결**: 24-48시간 대기 (보통 1-2시간이면 충분)

### 문제 2: 이전 SSL 캐시
**해결**: 브라우저 캐시 및 SSL 상태 초기화
```
Chrome:
1. 개발자 도구 (F12)
2. Application → Clear Storage
3. "Clear site data" 클릭

또는:
chrome://settings/security → Manage certificates → 해당 인증서 삭제
```

### 문제 3: Vercel에서 SSL 발급 실패
**해결**: 
1. Vercel Dashboard에서 도메인 제거
2. 10분 대기
3. 도메인 재등록
4. "Refresh" 버튼 클릭

### 문제 4: 이중 도메인 등록
**해결**:
- `scalptreatmentgangnam.co.kr`와 `www.scalptreatmentgangnam.co.kr` 둘 다 등록
- Vercel이 자동으로 리다이렉트 설정

## 📋 체크리스트

- [ ] Vercel Dashboard에서 도메인 등록 확인
- [ ] DNS A 레코드 설정 (`@` → `76.76.21.21`)
- [ ] DNS CNAME 레코드 설정 (`www` → `cname.vercel-dns.com`)
- [ ] DNS 전파 확인 (dnschecker.org)
- [ ] Vercel에서 SSL 인증서 발급 완료 확인
- [ ] HTTPS로 사이트 접속 테스트
- [ ] 브라우저 캐시 삭제 후 재시도

## 🔐 보안 권장사항

### HTTPS 강제 리다이렉트
Vercel은 기본적으로 HTTP → HTTPS 리다이렉트를 제공하지만, 추가 보안을 위해:

1. **HSTS 헤더 추가** (`vercel.json`):
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        }
      ]
    }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

2. **HTTPS 체크 스크립트** (선택사항):
```javascript
// index.html <head> 섹션에 추가
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
```

## 📞 추가 지원

### Vercel 지원팀 연락
- [Vercel Support](https://vercel.com/support)
- [Vercel Discord](https://vercel.com/discord)
- [Vercel Documentation](https://vercel.com/docs/concepts/projects/custom-domains)

### 커뮤니티 포럼
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Stack Overflow - Vercel Tag](https://stackoverflow.com/questions/tagged/vercel)

## 🎯 예상 완료 시간

| 단계 | 소요 시간 |
|------|-----------|
| DNS 설정 | 5분 |
| DNS 전파 | 10분 - 24시간 (평균 1시간) |
| SSL 인증서 발급 | 5분 - 30분 |
| 브라우저 캐시 삭제 | 1분 |
| **총 예상 시간** | **1-2시간** |

---

**작성일**: 2024-12-18  
**문제**: ERR_CERT_COMMON_NAME_INVALID  
**도메인**: www.scalptreatmentgangnam.co.kr  
**해결 방법**: Vercel 커스텀 도메인 재설정 + DNS 확인
