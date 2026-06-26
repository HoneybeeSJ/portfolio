---
version: 1.0
name: Honeybee-web-design-system
surface: website
description: 이승재 포트폴리오 웹사이트의 디자인 시스템 — 브랜드 "사람의 성장 × AI의 속도"를 꿀벌(Honeybee) 상징으로 표현한다. 근적(near-black) 블랙 캔버스 위에 꿀벌 옐로우({colors.honey})를 10% 안팎의 강조로만 쓰는 미니멀·프리미엄 다크 테마. 디스플레이는 Space Grotesk, 본문은 Noto Sans KR. 글래스모피즘 카드, GSAP 리빌·카운트업 모션, 3D 파티클 히어로(hero-scene.js·ca-scene.js), 절제된 육각형(벌집=구조) 모티프가 시각 언어를 이룬다. 적용 범위: 메인 포트폴리오(index.html) + 자기소개.html. 실제 토큰은 css/style.css의 :root에 매핑 완료된 상태를 반영한다.

colors:
  bg: "#0E0E10"
  bg2: "#16161A"
  ink: "#08080A"
  honey: "#FFC400"
  honey-bright: "#FFD43B"
  honey-deep: "#C99700"
  honey-soft: "rgba(255,196,0,0.12)"
  honey-border: "rgba(255,196,0,0.28)"
  hansal: "#57BD86"
  hansal-soft: "rgba(87,189,134,0.12)"
  hansal-border: "rgba(87,189,134,0.32)"
  text: "#F2F2F3"
  text-muted: "#A1A1AA"
  on-honey: "#0A0A0A"
  glass-bg: "rgba(255,255,255,0.04)"
  glass-border: "rgba(255,255,255,0.08)"
  glass-shadow: "0 8px 32px rgba(0,0,0,0.4)"

typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.10
    letterSpacing: -1.5px
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -1px
  heading-1:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.20
    letterSpacing: -0.5px
  heading-2:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.25
  heading-3:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.30
  subtitle:
    fontFamily: Noto Sans KR
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.70
  body-lg:
    fontFamily: Noto Sans KR
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.90
  body-md:
    fontFamily: Noto Sans KR
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.90
  body-sm:
    fontFamily: Noto Sans KR
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.70
  stat-display:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -1px
  sec-tag:
    fontFamily: Noto Sans KR
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.40
    letterSpacing: 1.7px
    textTransform: uppercase

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px
  nav-h: 64px

rounded:
  sm: 8px
  md: 16px
  pill: 999px

components:
  button-primary:
    backgroundColor: "{colors.honey}"
    textColor: "{colors.on-honey}"
    typography: "{typography.body-md}"
    fontWeight: 700
    rounded: "{rounded.pill}"
    padding: "12px 28px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.honey}"
    border: "1px solid {colors.honey-border}"
    rounded: "{rounded.pill}"
    padding: "12px 28px"
    hoverBackground: "{colors.honey-soft}"
  glass-card:
    backgroundColor: "{colors.glass-bg}"
    border: "1px solid {colors.glass-border}"
    rounded: "{rounded.md}"
    shadow: "{colors.glass-shadow}"
    backdropFilter: "blur(20px)"
    padding: "{spacing.xl}"
  glass-card-accent:
    backgroundColor: "{colors.glass-bg}"
    border: "1px solid {colors.honey-border}"
    rounded: "{rounded.md}"
    topAccent: "linear-gradient(90deg, {colors.honey}, {colors.honey-deep})"
    padding: "{spacing.xl}"
  sec-tag:
    backgroundColor: "transparent"
    textColor: "{colors.honey}"
    typography: "{typography.sec-tag}"
    border: "1px solid {colors.honey-border}"
    rounded: "{rounded.pill}"
    padding: "4px 14px"
  stat:
    backgroundColor: "transparent"
    numberColor: "{colors.honey}"
    typography: "{typography.stat-display}"
    labelColor: "{colors.text-muted}"
    labelTypography: "{typography.body-sm}"
  highlight-chip:
    backgroundColor: "{colors.honey-soft}"
    textColor: "{colors.honey-bright}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  tag-chip:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    border: "1px solid {colors.glass-border}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  hex-badge:
    backgroundColor: "{colors.honey}"
    textColor: "{colors.on-honey}"
    shape: hexagon
    size: 40px
    typography: "{typography.heading-3}"
  nav-bar:
    backgroundColor: "rgba(14,14,16,0.72)"
    border: "0 0 1px {colors.glass-border} solid"
    backdropFilter: "blur(20px)"
    height: "{spacing.nav-h}"
    logoColor: "{colors.text}"
    logoDotColor: "{colors.honey}"
  footer-region:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.text-muted}"
    typography: "{typography.body-sm}"
    padding: "{spacing.xxl} {spacing.lg}"
---

## Overview

이승재 포트폴리오는 "사람의 성장 × AI의 속도"라는 브랜드 메시지를 **꿀벌(Honeybee)** 상징으로 풀어낸 다크 테마 웹사이트다. 화면의 약 80%는 근적 블랙({colors.bg})이 캔버스로 깔리고, 꿀벌 옐로우({colors.honey})는 10% 안팎의 포인트로만 등장한다. 디스플레이 타이포는 기하학적인 Space Grotesk 700이, 본문은 Noto Sans KR가 line-height 1.9 전후의 넉넉한 리듬으로 받친다.

시각 언어의 핵심은 세 가지다. (1) **글래스모피즘 카드** — `blur(20px)` 반투명 표면에 미세한 화이트 보더, 강조 시 상단에 옐로우→딥옐로우 그라데이션 라인. (2) **육각형(벌집) 모티프** — "구조화"라는 브랜드 메시지를 나르는 장치로, 배경 텍스처는 거의 안 보일 정도(0.04~0.06)로 깔고 솔리드 육각형은 번호 배지·불릿·로고 닷 같은 작은 요소에만. (3) **3D 파티클 히어로** — hero-scene.js / ca-scene.js가 옐로우 계열 입자·라인을 렌더하고, GSAP가 스크롤 리빌과 수치 카운트업을 담당한다.

실제 토큰은 `css/style.css`의 `:root`에 이미 매핑되어 있다. 단, 변수명은 리스킨 이전의 이름(`--purple`, `--cyan`, `--emerald`)을 그대로 두고 **값만** 옐로우 계열로 치환한 상태다(아래 §Known Gaps 참고).

**Key Characteristics:**
- 근적 블랙 캔버스({colors.bg}) + 옐로우 액센트({colors.honey}) 10% 룰 — 60-30-10 비율
- Space Grotesk(디스플레이) + Noto Sans KR(본문)의 2-폰트 시스템, 본문 line-height 1.9
- 글래스모피즘 카드 — 반투명 + blur, 강조 카드는 옐로우 그라데이션 상단 라인
- 육각형 = "구조" 모티프, 절제가 생명 (큰 면적 옐로우 채우기 금지)
- GSAP 리빌·카운트업 + Three.js 3D 파티클 히어로
- 보조 그린 액센트({colors.hansal}) — "한살림" 등 특정 컨텍스트 한정

## Colors

> Source: `css/style.css` `:root` (허니비 리스킨 적용 완료) + `DESIGN-SYSTEM.md` 원 스펙(2026-06-11 정의). 적용 범위 index.html + 자기소개.html 동일.

**60-30-10 비율** — 근적 블랙 ~70%, 화이트/그레이 텍스트 ~20%, 옐로우 액센트 ~10%.

### Base (배경)
- **BG** ({colors.bg}): 메인 배경, 근적 블랙. 화면의 캔버스
- **BG2** ({colors.bg2}): 카드·상승 표면
- **Ink** ({colors.ink}): 최대 대비 블록·푸터

### Honey (Primary / 액센트)
- **Honey** ({colors.honey}): 주 액센트 — CTA·핵심 수치·`.accent`
- **Honey Bright** ({colors.honey-bright}): 하이라이트·호버
- **Honey Deep** ({colors.honey-deep}): 보더·그라데이션 끝·머티드
- **Honey Soft** ({colors.honey-soft}): 틴트 배경·글로우
- **Honey Border** ({colors.honey-border}): 강조 카드 보더·육각형 라인

### Text & Glass
- **Text** ({colors.text}): 본문, 근백색
- **Text Muted** ({colors.text-muted}): 보조 텍스트
- **On Honey** ({colors.on-honey}): 옐로우 위 텍스트 — **반드시 블랙**
- **Glass BG** ({colors.glass-bg}): 글래스 카드 배경
- **Glass Border** ({colors.glass-border}): 글래스 보더

### Secondary (보조 — 컨텍스트 한정)
- **Hansal Green** ({colors.hansal}): 특정 섹션(한살림 등) 전용 보조 액센트. 옐로우와 동시 사용은 절제
- **Hansal Soft / Border** ({colors.hansal-soft} / {colors.hansal-border}): 그린 틴트·보더

### 접근성 체크 (WCAG)
- {colors.honey} on {colors.bg} → 약 12:1 ✅ (액센트·큰 텍스트 안전)
- {colors.on-honey} on {colors.honey} → 약 13:1 ✅ (버튼 텍스트)
- {colors.text} on {colors.bg} → 약 17:1 ✅
- {colors.text-muted} on {colors.bg} → 약 7:1 ✅
- ⛔ 금지: 옐로우 위 화이트, 화이트 위 옐로우 텍스트(대비 미달)

## Typography

### Font Family
- **Space Grotesk** (디스플레이/제목): h1~h3, stat 수치. weight 700, 음수 자간으로 매거진급 대비
- **Noto Sans KR** (본문): 300–500, line-height 1.9 전후. 한글 가독성 우선. Fallback: Inter, sans-serif

### Hierarchy
| Token | Family | Size | Weight | Line | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | Space Grotesk | 64px | 700 | 1.10 | 히어로 디스플레이 |
| `{typography.display-lg}` | Space Grotesk | 48px | 700 | 1.15 | 섹션 오프너 |
| `{typography.heading-1}` | Space Grotesk | 36px | 700 | 1.20 | 페이지 제목 |
| `{typography.heading-2}` | Space Grotesk | 28px | 700 | 1.25 | 서브섹션·카드 제목 |
| `{typography.heading-3}` | Space Grotesk | 20px | 700 | 1.30 | 작은 카드 제목 |
| `{typography.subtitle}` | Noto Sans KR | 18px | 400 | 1.70 | 히어로 서브타이틀 |
| `{typography.body-lg}` | Noto Sans KR | 17px | 400 | 1.90 | 주 본문 |
| `{typography.body-md}` | Noto Sans KR | 15px | 400 | 1.90 | 카드 본문 |
| `{typography.body-sm}` | Noto Sans KR | 13px | 400 | 1.70 | 캡션·메타 |
| `{typography.stat-display}` | Space Grotesk | 48px | 700 | 1.05 | 핵심 수치 카운트업 |
| `{typography.sec-tag}` | Noto Sans KR | 12px | 600 | 1.40 | 섹션 태그(uppercase, 자간 넓게) |

### Principles
- **2-폰트 시스템 고정** — Space Grotesk(제목) + Noto Sans KR(본문). 추가 폰트 금지(이미 프리미엄)
- **제목은 굵게·큰 대비**, 본문은 line-height 1.9로 호흡 확보
- `.accent` 강조 텍스트 색은 {colors.honey}만 사용
- 음수 자간은 디스플레이(48px+)에만, 본문은 0

## Layout

### Container & Grid
- 콘텐츠 컨테이너 `max-width: 1100px`, 좌우 패딩 `{spacing.lg}`(24px), 중앙 정렬
- 네비게이션 고정 높이 `{spacing.nav-h}`(64px)
- 섹션 세로 리듬 `{spacing.section}`(96px) 전후
- 카드 내부 패딩 `{spacing.xl}`(32px)

### Spacing System
- **Tokens**: `{spacing.xxs}`(4) · `{spacing.xs}`(8) · `{spacing.sm}`(12) · `{spacing.md}`(16) · `{spacing.lg}`(24) · `{spacing.xl}`(32) · `{spacing.xxl}`(48) · `{spacing.section}`(96)

### Background Atmosphere
- `body` 배경은 근적 블랙 + 옐로우 radial-gradient 글로우 3겹(좌상 0.18 / 우하 0.12 / 중앙 0.06)
- 글로우는 저불투명 옐로우만 — 퍼플·시안은 은퇴

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 (flat) | 보더만 {colors.glass-border} | 기본 텍스트 블록 |
| 1 (glass) | `blur(20px)` + {colors.glass-shadow} | 글래스 카드 |
| 2 (accent) | glass + 옐로우 상단 그라데이션 라인 + {colors.honey-border} | 강조 카드 |
| 3 (glow) | `box-shadow: 0 0 0 1px {colors.honey-border}` | 호버 글로우(절제 사용) |
| 3D | Three.js 입자·라인(옐로우 계열) | 히어로 분위기 깊이 |

## Shapes

### Border Radius
| Token | Value | Use |
|---|---|---|
| `{rounded.sm}` | 8px | 작은 요소·인풋 |
| `{rounded.md}` | 16px | 글래스 카드 표준 |
| `{rounded.pill}` | 999px | 버튼·sec-tag·칩 |

### Hexagon Motif (벌집 = 구조)
- **배경 텍스처**: 육각형 타일링을 0.04~0.06 불투명도로 히어로·섹션 구분에. 거의 안 보일 정도
- **솔리드 육각형**: 작은 요소에만 — 번호 배지(01·02), 리스트 불릿(▸ 대신 작은 ⬡), 아이콘 프레임, 로고 닷
- **카드 액센트**: 모서리/상단에 옐로우 라인 또는 육각형 코너 컷
- ⛔ 금지: 큰 면적을 밝은 옐로우 육각형으로 채우기, 벌 캐릭터·이모지 남발(🐝는 파비콘 등 1곳 이내)

### Bee Stripe (선택·최소)
- 허용: 4px 이하 얇은 옐로우 강조 바, 구분선 1곳 정도
- ⛔ 경고테이프처럼 보이는 대각 옐로우/블랙 큰 줄무늬 금지(프리미엄 톤 훼손)

## Components

### Buttons
**`button-primary`** — 주 CTA. 배경 {colors.honey}, 텍스트 {colors.on-honey}(블랙), 700, 호버 {colors.honey-bright}. pill.

**`button-ghost`** — 보조 액션. 투명 배경, 보더 {colors.honey-border}, 텍스트 {colors.honey}, 호버 배경 {colors.honey-soft}. pill.

### Cards
**`glass-card`** — 표준 글래스 카드. 반투명({colors.glass-bg}) + `blur(20px)` + {colors.glass-border} + {colors.glass-shadow}, rounded {rounded.md}.

**`glass-card-accent`** — 강조 카드. glass-card + {colors.honey-border} + 상단 `linear-gradient(90deg, {colors.honey}, {colors.honey-deep})` 라인(기존 퍼플→시안 대체).

### Tags & Stats
**`sec-tag`** — 섹션 라벨 칩. 보더·텍스트 {colors.honey}, uppercase, 자간 넓게, pill.

**`stat`** — 핵심 수치. 숫자 {colors.honey} `{typography.stat-display}`(GSAP 카운트업), 라벨 {colors.text-muted} 작게.

**`highlight-chip`** — 강조 칩. 배경 {colors.honey-soft}, 텍스트 {colors.honey-bright}, pill.

**`tag-chip`** — 기본 태그. 투명 + {colors.glass-border}, 텍스트 {colors.text-muted}, pill.

**`hex-badge`** — 번호 배지(01·02). 옐로우 육각형 + {colors.on-honey} 텍스트.

### Navigation & Footer
**`nav-bar`** — 상단 고정 바. `rgba(14,14,16,0.72)` + `blur(20px)`, 높이 {spacing.nav-h}. 로고 `이승재.`의 닷을 옐로우 육각형/닷으로.

**`footer-region`** — 최대 대비 푸터. 배경 {colors.ink}, 텍스트 {colors.text-muted}.

## Do's and Don'ts

### Do
- {colors.bg} 근적 블랙을 캔버스로, {colors.honey}는 10% 안팎 포인트로만
- 옐로우 위 텍스트는 **항상** {colors.on-honey}(블랙)
- 글래스 카드 유지, 강조는 상단 옐로우 그라데이션 라인으로
- 육각형은 작은 요소에 절제되게(번호 배지·불릿·로고 닷)
- Space Grotesk(제목)+Noto Sans KR(본문) 2-폰트 고정, 본문 line-height 1.9
- 3D 씬·GSAP 모션의 입자·라인 컬러도 옐로우 계열로 통일

### Don't
- 옐로우를 큰 배경 면적이나 본문 텍스트에 쓰지 말 것
- 퍼플·시안 등 은퇴한 액센트를 되살리지 말 것
- 버튼·칩의 pill 형태를 각지게 바꾸지 말 것
- 큰 면적 옐로우 육각형·경고테이프 줄무늬 금지
- 벌 이모지·캐릭터 남발 금지(🐝 1곳 이내)

## Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 600px | 단일 컬럼. 히어로 디스플레이 36px로 축소. nav 햄버거 |
| Tablet | 600–1023px | 2-컬럼 카드 그리드. 컨테이너 패딩 유지 |
| Desktop | ≥ 1024px | 풀 히어로(64px), 멀티 컬럼, 3D 씬 풀 렌더 |

### Notes
- 컨테이너 1100px 초과 화면에서는 좌우 여백으로 흡수(중앙 정렬)
- 3D 파티클 씬은 모바일에서 입자 수/프레임 절감 고려
- 글래스 `blur`는 저사양 기기에서 성능 비용 — 필요 시 폴백 단색

## Iteration Guide

1. 한 번에 하나의 컴포넌트만 수정
2. 토큰·컴포넌트 이름을 직접 참조({colors.honey}, `glass-card-accent` 등)
3. 본문 기본은 `{typography.body-lg}`, 강조는 `{colors.honey}`
4. {colors.honey}는 CTA·핵심 수치·sec-tag·`.accent`에만 한정
5. 새 변형은 `components:`에 별도 엔트리로 추가
6. 육각형은 "작게·절제"가 기본값

## Known Gaps

- **CSS 변수명 ≠ 의미**: `style.css`의 `:root`는 리스킨 전 이름(`--purple`=#FFC400, `--cyan`=#FFD43B, `--emerald`=#C99700)을 유지한 채 값만 옐로우로 치환된 상태. 변수명까지 `--honey*`로 리네이밍하는 정리 작업이 남아 있음
- 라이트 테마 토큰은 미정의(필요 시 배경 #FAFAF7 / 텍스트 #0A0A0A / 옐로우 포인트)
- 3D 씬(hero-scene.js·ca-scene.js)의 정확한 입자 컬러·밀도 파라미터는 코드 기준으로 별도 확인 필요
- 모션 타이밍(GSAP duration·ease)은 본 문서에 미수집 — 150~300ms 권장
