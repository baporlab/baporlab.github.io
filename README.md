# BAPOR Lab 홈페이지

https://baporlab.github.io

- **내용 수정은 관리 화면에서 합니다:** https://baporlab.github.io/admin
- 저장하면 1~2분 뒤 홈페이지에 자동으로 반영됩니다.
- 코드나 Git을 몰라도 됩니다. 아래 "관리자 매뉴얼"만 보면 됩니다.

---

## 1. 관리자 매뉴얼 (행정 담당자용)

### 로그인
1. https://baporlab.github.io/admin 에 접속합니다.
2. **Sign in with GitHub** 버튼을 누르고, 본인 GitHub 계정으로 로그인합니다.
   - 처음 한 번은 교수님이 GitHub 저장소에 초대해 주셔야 합니다. 초대 메일을 수락한 뒤 로그인하세요.

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

### 2-2. 행정 담당자 초대
1. 행정 담당자가 GitHub 계정을 만듭니다 (https://github.com/signup, 무료).
2. 저장소 **Settings → Collaborators**(조직 저장소이면 **Collaborators and teams**)에서 그 계정을 **Write** 권한으로 초대합니다.

### 2-3. 관리 화면 로그인 설정 (Sveltia CMS Authenticator)
GitHub Pages에는 서버가 없습니다. 그래서 "Sign in with GitHub" 로그인을 대신 처리해 줄 작은 프로그램을 Cloudflare(무료)에 한 번 띄워야 합니다.

1. https://github.com/sveltia/sveltia-cms-auth 의 안내대로 **Deploy to Cloudflare** 버튼을 눌러 Worker를 만듭니다.
   만들어진 주소(예: `https://sveltia-cms-auth.xxxx.workers.dev`)를 적어 둡니다.
2. GitHub OAuth App을 만듭니다. 조직 **baporlab → Settings → Developer settings → OAuth Apps → New OAuth App**에서 아래처럼 입력합니다.
   - Homepage URL: `https://baporlab.github.io`
   - Authorization callback URL: `https://sveltia-cms-auth.xxxx.workers.dev/callback`
3. Cloudflare Worker 설정 → **Variables**에 아래 값을 넣습니다.
   - `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`: 2번에서 만든 OAuth App의 값
   - `ALLOWED_DOMAINS`: `baporlab.github.io`
4. [public/admin/config.yml](public/admin/config.yml)의 `base_url` 줄 주석(`#`)을 지우고 1번의 Worker 주소를 넣습니다.

> 이 설정 전에도 관리 화면은 쓸 수 있습니다. **Sign in with token**을 고르고 GitHub 개인 액세스 토큰을 넣는 방식인데, 개발자용이라 행정 담당자에게는 권하지 않습니다.

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
