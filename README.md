# BAPOR Lab 홈페이지

https://baporlab.github.io

- **내용 수정은 관리 화면에서 합니다:** https://baporlab.github.io/admin
- 저장하면 1~2분 뒤 홈페이지에 자동으로 반영됩니다.
- 코드나 Git을 몰라도 됩니다. 아래 "관리자 매뉴얼"만 보면 됩니다.

---

## 1. 관리자 매뉴얼 (행정 담당자용)

### 로그인
1. https://baporlab.github.io/admin 에 접속합니다.
2. 교수님께 받은 **아이디와 임시 비밀번호**로 로그인합니다. GitHub 계정은 필요 없습니다.
3. 처음 로그인하면 본인이 쓸 비밀번호(12자 이상)를 새로 정합니다.
   - 비밀번호를 잊어버렸다면 교수님께 재설정을 요청하세요.

> 관리 화면의 버튼은 영어로 나옵니다. 자주 쓰는 버튼: **New**(새로 만들기), **Save**(저장), **Delete**(삭제)

### 논문 추가 ⭐ 가장 자주 하는 일
1. 왼쪽 메뉴 **논문**에서 **New**를 누릅니다.
2. **DOI** 칸에 DOI를 넣습니다. 예: `10.1007/s10877-026-01427-x`
   - `https://doi.org/...` 주소를 통째로 붙여넣어도 됩니다.
3. (선택) **뉴스 제목**에 한글 요약을 씁니다. 예: `심음 기반 수액반응성 예측 논문 게재`
4. **Save**를 누릅니다.
5. 제목, 저자, 저널, 게재일은 **비워 둡니다.** 1~2분 뒤 자동으로 채워집니다.
6. "홈 뉴스에 표시"가 켜져 있으면 홈 화면 News에도 자동으로 올라갑니다. 논문 소식을 뉴스에 따로 쓸 필요가 없습니다.

### 뉴스 추가 (수상, 과제 선정, 입학 등)
1. 왼쪽 메뉴 **뉴스**에서 **New**를 누릅니다.
2. 제목, 날짜, 분류를 입력합니다.
3. 필요하면 관련 링크(보도자료 등)와 내용을 넣습니다.
4. **Save**를 누릅니다.

### 구성원 추가 / 변경
- **새 구성원:** **구성원**에서 **New** → 이름, 구분, 직책, 사진, 표시 순서를 입력하고 **Save**를 누릅니다.
  - 사진은 세로(3:4) 사진이 잘 맞습니다. 파일을 끌어다 놓으면 됩니다.
  - **표시 순서**는 숫자가 작을수록 앞에 나옵니다. 기존 구성원은 10, 20, 30… 순서로 되어 있습니다. 두 사람 사이에 넣으려면 그 사이 숫자(예: 15)를 쓰세요.
- **졸업·퇴사:** 삭제하지 말고 **구분**을 **졸업생 (Alumni)** 으로 바꿉니다. Team 페이지의 Alumni 목록으로 옮겨집니다.

### 연구 이미지, 홈 화면, 연락처
- **연구 소개 이미지:** Research 페이지의 그림입니다. 이미지와 표시 순서를 정합니다.
- **사이트 설정 → 홈 화면:** 상단 사진 슬라이드, 연구실 소개글을 고칩니다.
- **사이트 설정 → 연락처·채용 안내:** 주소, 이메일, Join us 페이지 문구를 고칩니다.

### 반영이 안 될 때
- 저장하고 **2~3분**을 기다린 뒤 새로고침합니다. Mac은 `Cmd+Shift+R`, Windows는 `Ctrl+F5`를 누르면 캐시를 무시하고 새로 불러옵니다.
- 그래도 안 되면 입력 내용에 문제가 있을 수 있습니다. 이때 홈페이지는 **이전 상태 그대로 유지**되므로 망가지지는 않습니다.
  - 원인은 https://github.com/baporlab/baporlab.github.io/actions 에서 빨간 ✘ 항목을 눌러 확인할 수 있습니다.
  - 메시지는 한글로 나옵니다. 예: "같은 DOI가 두 번 등록되어 있습니다"
- 잘못 고친 내용은 모두 기록이 남아 있어서 언제든 되돌릴 수 있습니다. 담당 교수님께 알려 주세요.

---

## 2. 처음 한 번만 하는 설정 (관리 책임자용)

### 2-1. GitHub Pages 배포 방식 변경
저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 바꿉니다.
기존 Jekyll 방식("Deploy from a branch")에서 바꾸는 것입니다.

### 2-2. 관리 화면 로그인 설정 (Sveltia CMS Additions)
GitHub Pages에는 서버가 없어서, 로그인을 처리할 작은 서비스를 Cloudflare(무료)에 한 번 띄워야 합니다.
**Cloudflare 계정은 설정하는 사람 한 명만** 있으면 됩니다. 행정 담당자에게는 Cloudflare 계정도 GitHub 계정도 필요 없습니다.
자세한 내용은 공식 문서를 참고하세요: https://sveltiacms.app/en/docs/additions/setup

1. **관리자 비밀키를 만듭니다.**
   - 터미널에서 `openssl rand -base64 32`를 실행합니다.
   - 나온 값은 **비밀번호 관리자에만** 보관합니다. 이 키를 가진 사람이 로그인 서비스 전체를 관리할 수 있습니다.
2. **Worker를 배포합니다.**
   - [Deploy 버튼](https://deploy.workers.cloudflare.com/?url=https://github.com/sveltia/sveltia-cms-additions/tree/main/templates/cloudflare)을 누릅니다.
   - Cloudflare에 로그인한 뒤 `ADMIN_SECRET` 칸에 1번 값을 넣습니다.
   - 이때 설정용 저장소가 배포하는 사람의 GitHub 계정에 복사됩니다.
3. **Worker 주소를 켭니다.**
   - Cloudflare 대시보드 → **Workers & Pages** → 해당 Worker → **Domains**에서 **Production URL**을 켭니다.
   - 주소(예: `https://sveltia-cms-additions.xxxx.workers.dev`)를 [public/admin/config.yml](public/admin/config.yml)의 `base_url`에 넣습니다.
4. **설정 마법사를 실행합니다.**
   - https://baporlab.github.io/admin 에서 **Use Admin Secret**을 고르고 1번 비밀키를 넣습니다.
   - ① 첫 관리자 계정을 만듭니다.
   - ② GitHub App을 만든 뒤, **Only select repositories → baporlab.github.io 하나만** 선택해 설치합니다.
5. **보안 체크리스트를 확인합니다.**
   - Cloudflare와 GitHub 계정에 2단계 인증을 켭니다.
   - 저장소에 기본 브랜치 강제 push·삭제 차단 규칙(ruleset)을 둡니다. 관리 화면 Administration → GitHub 항목에서도 경고로 알려줍니다.
   - 관리 화면 Administration 페이지에 새 버전 알림이 뜨면 업데이트합니다. 배포자 계정에 복사된 저장소로 Dependabot PR이 오면 병합하면 됩니다.

### 2-3. 행정 담당자 계정 만들기
1. 관리자 계정으로 https://baporlab.github.io/admin 에 로그인합니다.
2. 상단 **Administration → Users → Add User**를 누릅니다.
3. 아이디(영문 소문자), 이름, 역할 **Editor**를 입력합니다.
4. 화면에 나온 **아이디와 임시 비밀번호**를 행정 담당자에게 전달합니다. 이메일이 있으면 **Email to** 버튼으로 바로 보낼 수 있습니다.
5. 퇴사하거나 담당자가 바뀌면 삭제하지 말고 **Disable User**로 비활성화합니다. 비활성화하면 그 사람의 수정 권한이 즉시 취소됩니다.

---

## 3. 개발자용

**구성:** [Astro](https://astro.build) 정적 사이트 + [Sveltia CMS](https://github.com/sveltia/sveltia-cms)(`/admin`) + GitHub Actions → GitHub Pages

```
src/content/
  publications/*.yml   논문 (DOI만 있으면 빌드 시 Crossref로 나머지 자동 입력)
  news/*.md            뉴스 (논문 뉴스는 publications의 news: true 로 자동 생성)
  members/*.yml        구성원
  research/*.yml       연구 이미지
  settings/home.yml    홈 화면 (슬라이드, 소개글)
  settings/site.yml    사이트 이름, 연락처, 채용 안내
public/images/         이미지 (team / research / slider / uploads)
public/admin/          관리 화면 (config.yml 에 입력 폼 정의)
scripts/fill-doi.mjs       DOI → Crossref 메타데이터 자동 입력
scripts/check-content.mjs  중복 DOI, 사진 누락 등 입력 오류 검사 (빌드 전에 실행)
```

**로컬 실행** (Node.js 22.23.4 이상 필요)

```bash
npm install
npm run dev        # http://localhost:4321
npm run fill-doi   # DOI 자동 입력만 실행
npm run build      # 검사 + 빌드 (dist/)
```

`master`에 push하면 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)이 다음 순서로 실행됩니다.
1. DOI 자동 입력, 결과가 있으면 커밋
2. 콘텐츠 검사
3. 빌드
4. GitHub Pages 배포

검사에 실패하면 배포되지 않고 기존 사이트가 유지됩니다.
