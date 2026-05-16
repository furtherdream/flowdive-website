// ────────────────────────────────────────────────────────────
// 언어 추가 방법:
//   1. LOCALES 배열에 새 코드 추가 (예: 'ja')
//   2. messages 객체에 같은 키로 번역 추가
//   3. 끝 — 드롭다운에 자동으로 나타납니다
// ────────────────────────────────────────────────────────────

export const LOCALES = ['ko', 'en', 'ja', 'zh-CN', 'es', 'de'] as const
export type Locale = (typeof LOCALES)[number]

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  'zh-CN': '简体中文',
  es: 'Español',
  de: 'Deutsch',
}

// ── 번역 타입 ────────────────────────────────────────────────

type Messages = {
  nav: { features: string; pricing: string; download: string; cta: string }
  hero: {
    badge: string
    title: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    blockPage: { headline: string; currentGoal: string; sampleGoal: string; timer: string }
  }
  stats: {
    items: { number: string; label: string }[]
  }
  howItWorks: {
    label: string
    heading: string
    subheading: string
    steps: { number: string; title: string; description: string }[]
  }
  features: {
    label: string
    heading: string
    subheading: string
    items: { icon: string; title: string; description: string; badge?: string }[]
  }
  testimonials: {
    label: string
    heading: string
    items: { quote: string; author: string; role: string }[]
  }
  pricing: {
    label: string
    heading: string
    subheading: string
    free: { name: string; price: string; period: string; cta: string; items: string[] }
    pro: { name: string; price: string; period: string; cta: string; badge: string; items: string[] }
  }
  faq: {
    label: string
    heading: string
    items: { question: string; answer: string }[]
  }
  download: {
    heading: string
    subheading: string
    chrome: { title: string; description: string; cta: string }
    windows: { title: string; description: string; cta: string }
  }
  finalCta: {
    heading: string
    subheading: string
    ctaPrimary: string
    ctaSecondary: string
  }
  footer: { copyright: string; privacy: string; terms: string }
}

// ── 번역 데이터 ──────────────────────────────────────────────

export const messages: Record<Locale, Messages> = {
  ko: {
    nav: {
      features: '기능',
      pricing: '가격',
      download: '다운로드',
      cta: 'Chrome에 추가',
    },
    hero: {
      badge: 'Chrome 확장 + Windows 데스크탑 앱',
      title: '무의식적인 방문이\n집중을 깨뜨립니다',
      subtitle:
        '일해야 할 시간에 무심코 YouTube를 열고 있나요?\nFlowdive이 그 순간을 막고, 목표를 상기시켜드립니다.',
      ctaPrimary: 'Chrome에 무료로 추가하기',
      ctaSecondary: 'Windows 앱 다운로드',
      blockPage: {
        headline: '지금은 집중 시간이에요',
        currentGoal: '현재 목표',
        sampleGoal: '논문 3장 쓰기',
        timer: '42분째 집중 중',
      },
    },
    features: {
      label: '기능 소개',
      heading: '의지력이 아닌 환경으로 집중하세요',
      subheading:
        'Flowdive은 무의식적인 방문을 물리적으로 차단해 집중할 수밖에 없는 환경을 만들어드립니다.',
      items: [
        {
          icon: '🚫',
          title: '사이트 차단',
          description:
            'YouTube, Netflix, Instagram 등 집중을 방해하는 사이트를 차단 리스트에 추가하세요. 집중 모드 중에는 접근이 차단됩니다.',
        },
        {
          icon: '🎯',
          title: '목표 설정',
          description:
            '집중할 목표를 입력하면 차단 페이지에서 목표를 상기시켜드립니다. 무의식적인 방문을 의식적인 선택으로 바꿔드립니다.',
        },
        {
          icon: '🔒',
          title: 'Deep Dive',
          description:
            '입력한 시간 동안은 집중 모드를 종료할 수 없습니다. 미래의 내가 우회하려 할 때를 막아주는 강력한 잠금 기능입니다.',
          badge: 'Pro',
        },
        {
          icon: '💻',
          title: '크로스 플랫폼',
          description:
            'Chrome 확장으로 브라우저를 제어하고, Windows 데스크탑 앱으로 브라우저 외의 앱까지 차단하세요. 하나의 계정으로 연동됩니다.',
          badge: 'Pro',
        },
      ],
    },
    pricing: {
      label: '가격 정책',
      heading: '시작은 무료로',
      subheading:
        '기본 차단 기능은 무료입니다. 더 강력한 집중이 필요할 때 업그레이드하세요.',
      free: {
        name: '무료',
        price: '₩0',
        period: '/월',
        cta: '무료로 시작하기',
        items: [
          'Chrome 확장 프로그램',
          '무제한 사이트 차단',
          '목표 설정 및 표시',
          '브라우저 재시작 시 자동 복원',
        ],
      },
      pro: {
        name: 'Pro',
        price: '₩9,900',
        period: '/월',
        cta: 'Pro 구독하기',
        badge: '인기',
        items: [
          '무료 플랜의 모든 기능',
          'Deep Dive (시간 제한 잠금)',
          'Windows 데스크탑 앱',
          '앱 레벨 차단 (카카오톡, 게임 등)',
        ],
      },
    },
    download: {
      heading: '지금 시작해보세요',
      subheading: '설치 1분, 오늘부터 집중력이 달라집니다.',
      chrome: {
        title: 'Chrome 확장',
        description: '브라우저 내 사이트 차단 · 무료',
        cta: 'Chrome 웹 스토어에서 설치',
      },
      windows: {
        title: 'Windows 앱',
        description: '앱 레벨 차단 포함 · Pro',
        cta: '.exe 다운로드',
      },
    },
    stats: {
      items: [
        { number: '12,000+', label: '집중을 시작한 사용자' },
        { number: '4.2M', label: '차단된 방해 사이트 접근' },
        { number: '38,000+', label: '시간의 집중 시간' },
        { number: '4.8 ★', label: '평균 사용자 평점' },
      ],
    },
    howItWorks: {
      label: '작동 방식',
      heading: '3단계로 집중 환경을 만들어요',
      subheading: '복잡한 설정 없이, 지금 바로 시작할 수 있습니다.',
      steps: [
        {
          number: '01',
          title: '목표를 적습니다',
          description: '오늘 끝내야 할 한 가지를 입력하세요. 차단 페이지에서 이 목표가 계속 떠오릅니다.',
        },
        {
          number: '02',
          title: '방해 요소를 등록',
          description: 'YouTube, 인스타그램, 게임 — 무엇이든 차단 리스트에 추가하세요.',
        },
        {
          number: '03',
          title: '집중 모드 시작',
          description: '버튼 한 번이면 끝. 무의식적으로 사이트를 열어도 차단 페이지가 막아줍니다.',
        },
      ],
    },
    testimonials: {
      label: '사용자 후기',
      heading: '집중력을 되찾은 사람들',
      items: [
        {
          quote: '예전엔 일하다 무심코 유튜브를 켰는데, 이제는 그 버릇이 사라졌어요. 차단 페이지에 적힌 내 목표를 보면 정신이 번쩍 들어요.',
          author: '김민재',
          role: '대학원생',
        },
        {
          quote: 'Deep Dive 덕분에 회의 자료 만들 때 3시간 완벽하게 집중했습니다. 평소 같으면 SNS만 들락거렸을 시간이었어요.',
          author: '이서연',
          role: '디자이너',
        },
        {
          quote: '의지력에 기댈 필요가 없어졌습니다. 환경이 의지를 만들어준다는 말, 직접 써보고 알았어요.',
          author: '박지훈',
          role: '개발자',
        },
      ],
    },
    faq: {
      label: '자주 묻는 질문',
      heading: '궁금한 점이 있으신가요?',
      items: [
        {
          question: '집중 모드 중에 차단을 해제할 수 있나요?',
          answer: '일반 모드에서는 언제든 종료할 수 있어요. Deep Dive는 설정한 시간이 끝날 때까지 끌 수 없습니다.',
        },
        {
          question: '시크릿 모드로 우회할 수 있나요?',
          answer: 'Chrome 확장은 시크릿 모드 접근 권한을 요청하면 차단됩니다. Windows 데스크탑 앱은 시스템 레벨에서 차단하므로 우회가 어렵습니다.',
        },
        {
          question: '무료 플랜과 Pro 플랜의 차이가 뭔가요?',
          answer: '무료 플랜은 기본 사이트 차단을 제공합니다. Pro 플랜은 Deep Dive(시간 잠금)와 Windows 앱(앱 레벨 차단)을 사용할 수 있어요.',
        },
        {
          question: '여러 기기를 동시에 쓸 수 있나요?',
          answer: '하나의 계정으로 Chrome 확장과 Windows 앱을 모두 사용할 수 있습니다. 차단 리스트는 자동 동기화됩니다.',
        },
        {
          question: '데이터는 어디에 저장되나요?',
          answer: '차단 리스트와 목표는 사용자 기기에 저장되며, 계정 동기화 시에만 암호화되어 서버로 전송됩니다.',
        },
      ],
    },
    finalCta: {
      heading: '오늘부터 집중하세요',
      subheading: '의지가 약해서가 아닙니다. 환경이 그렇게 만들어진 거예요. Flowdive이 그 환경을 바꿔드립니다.',
      ctaPrimary: 'Chrome에 무료로 추가',
      ctaSecondary: 'Windows 앱 다운로드',
    },
    footer: {
      copyright: '© 2025 Flowdive. All rights reserved.',
      privacy: '개인정보처리방침',
      terms: '이용약관',
    },
  },

  en: {
    nav: {
      features: 'Features',
      pricing: 'Pricing',
      download: 'Download',
      cta: 'Add to Chrome',
    },
    hero: {
      badge: 'Chrome Extension + Windows Desktop App',
      title: 'Mindless browsing\nbreaks your focus',
      subtitle:
        'Do you find yourself opening YouTube without thinking?\nFlowdive blocks that moment and reminds you of your goal.',
      ctaPrimary: 'Add to Chrome — Free',
      ctaSecondary: 'Download for Windows',
      blockPage: {
        headline: 'Time to focus',
        currentGoal: 'Current Goal',
        sampleGoal: 'Write chapter 3 of thesis',
        timer: 'Focused for 42 min',
      },
    },
    features: {
      label: 'Features',
      heading: 'Focus through environment, not willpower',
      subheading:
        'Flowdive physically blocks mindless visits so you have no choice but to stay focused.',
      items: [
        {
          icon: '🚫',
          title: 'Site Blocking',
          description:
            'Add distracting sites like YouTube, Netflix, or Instagram to your block list. During focus mode, access is blocked and redirected.',
        },
        {
          icon: '🎯',
          title: 'Goal Setting',
          description:
            'Enter what you need to do. The blocked page shows your goal, turning a mindless visit into a conscious choice.',
        },
        {
          icon: '🔒',
          title: 'Deep Dive',
          description:
            "During the set time, focus mode cannot be stopped. It stops your future self from giving up when tempted.",
          badge: 'Pro',
        },
        {
          icon: '💻',
          title: 'Cross-Platform',
          description:
            'Control your browser with the Chrome extension and block non-browser apps with the Windows desktop app — one account, synced.',
          badge: 'Pro',
        },
      ],
    },
    pricing: {
      label: 'Pricing',
      heading: 'Start for free',
      subheading:
        'Core blocking is free. Upgrade when you need stronger focus.',
      free: {
        name: 'Free',
        price: '$0',
        period: '/mo',
        cta: 'Get started free',
        items: [
          'Chrome extension',
          'Unlimited site blocking',
          'Goal setting & display',
          'Auto-restore on browser restart',
        ],
      },
      pro: {
        name: 'Pro',
        price: '$7.99',
        period: '/mo',
        cta: 'Subscribe to Pro',
        badge: 'Popular',
        items: [
          'Everything in Free',
          'Deep Dive (timed lock)',
          'Windows desktop app',
          'App-level blocking (games, etc.)',
        ],
      },
    },
    download: {
      heading: 'Get started today',
      subheading: '1-minute setup. Better focus starts now.',
      chrome: {
        title: 'Chrome Extension',
        description: 'Block sites in your browser · Free',
        cta: 'Install from Chrome Web Store',
      },
      windows: {
        title: 'Windows App',
        description: 'App-level blocking included · Pro',
        cta: 'Download .exe',
      },
    },
    stats: {
      items: [
        { number: '12,000+', label: 'People focusing now' },
        { number: '4.2M', label: 'Distractions blocked' },
        { number: '38,000+', label: 'Hours focused' },
        { number: '4.8 ★', label: 'Average rating' },
      ],
    },
    howItWorks: {
      label: 'How it works',
      heading: 'Build focus in 3 steps',
      subheading: 'No complex setup. Start right now.',
      steps: [
        {
          number: '01',
          title: 'Write your goal',
          description: 'Type the one thing you need to finish today. The blocked page surfaces it whenever you stray.',
        },
        {
          number: '02',
          title: 'Add distractions',
          description: 'YouTube, Instagram, games — drop them into your block list.',
        },
        {
          number: '03',
          title: 'Start focus mode',
          description: 'One click. When you open a blocked site by reflex, Flowdive redirects you to your goal.',
        },
      ],
    },
    testimonials: {
      label: 'Testimonials',
      heading: 'People who got their focus back',
      items: [
        {
          quote: "I used to open YouTube without thinking. That habit is gone — seeing my goal on the blocked page snaps me back instantly.",
          author: 'Minjae Kim',
          role: 'Graduate Student',
        },
        {
          quote: "Deep Dive helped me focus 3 full hours on a deck. I'd normally have spent that time scrolling.",
          author: 'Seoyeon Lee',
          role: 'Designer',
        },
        {
          quote: "I stopped relying on willpower. Now my environment does the work for me.",
          author: 'Jihoon Park',
          role: 'Developer',
        },
      ],
    },
    faq: {
      label: 'FAQ',
      heading: 'Got questions?',
      items: [
        {
          question: 'Can I stop blocking while focus mode is on?',
          answer: 'Yes, in standard mode you can stop anytime. Deep Dive locks blocking until your timer ends.',
        },
        {
          question: 'Can incognito mode bypass it?',
          answer: 'The Chrome extension blocks incognito when granted access. The Windows desktop app blocks at the system level, so bypassing is hard.',
        },
        {
          question: "What's the difference between Free and Pro?",
          answer: 'Free includes basic site blocking. Pro unlocks Deep Dive (timed lock) and the Windows app (app-level blocking).',
        },
        {
          question: 'Can I use multiple devices?',
          answer: 'One account works on both Chrome extension and Windows app. Block lists sync automatically.',
        },
        {
          question: 'Where is my data stored?',
          answer: 'Block lists and goals are stored on your device. Only account-synced data is encrypted and sent to the server.',
        },
      ],
    },
    finalCta: {
      heading: 'Focus, starting today',
      subheading: "It's not weak willpower — your environment is built to distract you. Flowdive rebuilds it.",
      ctaPrimary: 'Add to Chrome — Free',
      ctaSecondary: 'Download for Windows',
    },
    footer: {
      copyright: '© 2025 Flowdive. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
  },

  ja: {
    nav: {
      features: '機能',
      pricing: '料金',
      download: 'ダウンロード',
      cta: 'Chromeに追加',
    },
    hero: {
      badge: 'Chrome拡張機能 + Windowsデスクトップアプリ',
      title: '無意識な訪問が\n集中を妨げます',
      subtitle:
        '仕事の時間に何気なくYouTubeを開いていませんか？\nFlowdiveがその瞬間を防ぎ、目標を思い出させます。',
      ctaPrimary: 'Chromeに無料で追加',
      ctaSecondary: 'Windowsアプリをダウンロード',
      blockPage: {
        headline: '今は集中時間です',
        currentGoal: '現在の目標',
        sampleGoal: '論文の第3章を書く',
        timer: '42分間集中中',
      },
    },
    features: {
      label: '機能紹介',
      heading: '意志ではなく環境で集中しよう',
      subheading:
        'Flowdiveは無意識な訪問を物理的にブロックし、集中せざるを得ない環境を作ります。',
      items: [
        {
          icon: '🚫',
          title: 'サイトブロック',
          description:
            'YouTube、Netflix、Instagramなど集中を妨げるサイトをブロックリストに追加しましょう。集中モード中はアクセスが遮断されます。',
        },
        {
          icon: '🎯',
          title: '目標設定',
          description:
            '集中する目標を入力すると、ブロックページで目標を思い出させます。無意識な訪問を意識的な選択に変えます。',
        },
        {
          icon: '🔒',
          title: 'Deep Dive',
          description:
            '設定した時間中は集中モードを終了できません。未来の自分が回避しようとする瞬間を防ぐ強力なロック機能です。',
          badge: 'Pro',
        },
        {
          icon: '💻',
          title: 'クロスプラットフォーム',
          description:
            'Chrome拡張でブラウザを制御し、Windowsデスクトップアプリでブラウザ以外のアプリも遮断。1つのアカウントで連携します。',
          badge: 'Pro',
        },
      ],
    },
    pricing: {
      label: '料金プラン',
      heading: '無料で始めよう',
      subheading:
        '基本のブロック機能は無料です。より強力な集中が必要な時にアップグレードしてください。',
      free: {
        name: '無料',
        price: '¥0',
        period: '/月',
        cta: '無料で始める',
        items: [
          'Chrome拡張機能',
          '無制限のサイトブロック',
          '目標設定と表示',
          'ブラウザ再起動時に自動復元',
        ],
      },
      pro: {
        name: 'Pro',
        price: '¥980',
        period: '/月',
        cta: 'Proを購読',
        badge: '人気',
        items: [
          '無料プランのすべての機能',
          'Deep Dive（時間制限ロック）',
          'Windowsデスクトップアプリ',
          'アプリレベルのブロック（LINE、ゲームなど）',
        ],
      },
    },
    download: {
      heading: '今すぐ始めよう',
      subheading: '1分でインストール。今日から集中力が変わります。',
      chrome: {
        title: 'Chrome拡張機能',
        description: 'ブラウザ内でサイトをブロック · 無料',
        cta: 'Chromeウェブストアからインストール',
      },
      windows: {
        title: 'Windowsアプリ',
        description: 'アプリレベルのブロック搭載 · Pro',
        cta: '.exeをダウンロード',
      },
    },
    stats: {
      items: [
        { number: '12,000+', label: '集中を始めたユーザー' },
        { number: '4.2M', label: 'ブロックされた妨害アクセス' },
        { number: '38,000+', label: '時間の集中時間' },
        { number: '4.8 ★', label: '平均ユーザー評価' },
      ],
    },
    howItWorks: {
      label: '使い方',
      heading: '3ステップで集中環境をつくる',
      subheading: '複雑な設定なし、今すぐ始められます。',
      steps: [
        {
          number: '01',
          title: '目標を書く',
          description: '今日終わらせる1つを入力。ブロックページにこの目標が表示されます。',
        },
        {
          number: '02',
          title: '妨害要素を登録',
          description: 'YouTube、Instagram、ゲーム — なんでもブロックリストに追加。',
        },
        {
          number: '03',
          title: '集中モードを開始',
          description: 'ボタン1つで完了。無意識に開いてもブロックページが守ってくれます。',
        },
      ],
    },
    testimonials: {
      label: 'ユーザーの声',
      heading: '集中を取り戻した人たち',
      items: [
        {
          quote: '以前は何気なくYouTubeを開いていましたが、今はその習慣が消えました。ブロックページの目標を見ると気が引き締まります。',
          author: '木村 健太',
          role: '大学院生',
        },
        {
          quote: 'Deep Diveのおかげで資料作成に3時間完璧に集中できました。普段ならSNSばかり見ていた時間です。',
          author: '佐藤 美咲',
          role: 'デザイナー',
        },
        {
          quote: '意志力に頼る必要がなくなりました。環境が意志を作ってくれます。',
          author: '田中 大輔',
          role: 'エンジニア',
        },
      ],
    },
    faq: {
      label: 'よくある質問',
      heading: 'ご質問はありますか？',
      items: [
        {
          question: '集中モード中にブロックを解除できますか？',
          answer: '通常モードならいつでも終了できます。Deep Diveは設定した時間が終わるまで解除できません。',
        },
        {
          question: 'シークレットモードで回避できますか？',
          answer: 'Chrome拡張はシークレットモード権限があればブロックします。Windowsデスクトップアプリはシステムレベルでブロックするため回避困難です。',
        },
        {
          question: '無料プランとProプランの違いは？',
          answer: '無料プランは基本的なサイトブロックを提供。ProプランはDeep Dive（時間ロック）とWindowsアプリ（アプリレベルブロック）を利用可能。',
        },
        {
          question: '複数デバイスで使えますか？',
          answer: '1つのアカウントでChrome拡張とWindowsアプリ両方使えます。ブロックリストは自動同期されます。',
        },
        {
          question: 'データはどこに保存されますか？',
          answer: 'ブロックリストと目標はデバイスに保存され、アカウント同期時のみ暗号化してサーバーに送信されます。',
        },
      ],
    },
    finalCta: {
      heading: '今日から集中しよう',
      subheading: '意志が弱いのではありません。環境がそうさせるのです。Flowdiveがその環境を変えます。',
      ctaPrimary: 'Chromeに無料で追加',
      ctaSecondary: 'Windowsアプリをダウンロード',
    },
    footer: {
      copyright: '© 2025 Flowdive. All rights reserved.',
      privacy: 'プライバシーポリシー',
      terms: '利用規約',
    },
  },

  'zh-CN': {
    nav: {
      features: '功能',
      pricing: '价格',
      download: '下载',
      cta: '添加到Chrome',
    },
    hero: {
      badge: 'Chrome扩展 + Windows桌面应用',
      title: '无意识的浏览\n打断你的专注',
      subtitle:
        '工作时间会不自觉地打开YouTube吗？\nFlowdive会阻止那一刻，并提醒你的目标。',
      ctaPrimary: '免费添加到Chrome',
      ctaSecondary: '下载Windows版',
      blockPage: {
        headline: '现在是专注时间',
        currentGoal: '当前目标',
        sampleGoal: '撰写论文第3章',
        timer: '已专注42分钟',
      },
    },
    features: {
      label: '功能介绍',
      heading: '用环境而非意志力来专注',
      subheading:
        'Flowdive在物理层面阻止无意识访问，让你不得不保持专注。',
      items: [
        {
          icon: '🚫',
          title: '网站屏蔽',
          description:
            '将YouTube、Netflix、Instagram等干扰性网站添加到屏蔽列表。专注模式期间访问将被阻止。',
        },
        {
          icon: '🎯',
          title: '目标设定',
          description:
            '输入需要专注的目标，屏蔽页面会提醒你。把无意识的访问变成有意识的选择。',
        },
        {
          icon: '🔒',
          title: 'Deep Dive',
          description:
            '在设定的时间内无法退出专注模式。这是一项强大的锁定功能，能阻止未来想要绕过的自己。',
          badge: 'Pro',
        },
        {
          icon: '💻',
          title: '跨平台',
          description:
            '用Chrome扩展控制浏览器，用Windows桌面应用屏蔽浏览器之外的应用。一个账户同步。',
          badge: 'Pro',
        },
      ],
    },
    pricing: {
      label: '价格政策',
      heading: '免费开始',
      subheading: '核心屏蔽功能免费。需要更强专注时升级。',
      free: {
        name: '免费',
        price: '¥0',
        period: '/月',
        cta: '免费开始',
        items: [
          'Chrome扩展程序',
          '无限网站屏蔽',
          '目标设定与显示',
          '浏览器重启自动恢复',
        ],
      },
      pro: {
        name: 'Pro',
        price: '¥58',
        period: '/月',
        cta: '订阅Pro',
        badge: '热门',
        items: [
          '免费版所有功能',
          'Deep Dive（限时锁定）',
          'Windows桌面应用',
          '应用级屏蔽（微信、游戏等）',
        ],
      },
    },
    download: {
      heading: '立即开始',
      subheading: '1分钟安装。从今天开始改变你的专注力。',
      chrome: {
        title: 'Chrome扩展',
        description: '在浏览器内屏蔽网站 · 免费',
        cta: '从Chrome网上应用店安装',
      },
      windows: {
        title: 'Windows应用',
        description: '包含应用级屏蔽 · Pro',
        cta: '下载.exe',
      },
    },
    stats: {
      items: [
        { number: '12,000+', label: '开始专注的用户' },
        { number: '4.2M', label: '已屏蔽的干扰访问' },
        { number: '38,000+', label: '小时专注时间' },
        { number: '4.8 ★', label: '平均用户评分' },
      ],
    },
    howItWorks: {
      label: '工作原理',
      heading: '三步打造专注环境',
      subheading: '无需复杂设置，立即开始。',
      steps: [
        {
          number: '01',
          title: '写下目标',
          description: '输入今天需要完成的一件事。屏蔽页面会持续提醒你这个目标。',
        },
        {
          number: '02',
          title: '添加干扰源',
          description: 'YouTube、Instagram、游戏——任何东西都可加入屏蔽列表。',
        },
        {
          number: '03',
          title: '开启专注模式',
          description: '一键搞定。即使无意识打开网站，屏蔽页面也会拦住你。',
        },
      ],
    },
    testimonials: {
      label: '用户反馈',
      heading: '重获专注的人们',
      items: [
        {
          quote: '以前工作时总是无意识地打开YouTube，现在这个习惯消失了。看到屏蔽页面上的目标，立刻清醒。',
          author: '张明',
          role: '研究生',
        },
        {
          quote: 'Deep Dive让我做PPT时连续专注了3小时。平时这些时间都浪费在刷社交媒体上了。',
          author: '李静',
          role: '设计师',
        },
        {
          quote: '不再需要依赖意志力。环境塑造意志，这句话亲身体验后才明白。',
          author: '王伟',
          role: '开发者',
        },
      ],
    },
    faq: {
      label: '常见问题',
      heading: '有疑问吗？',
      items: [
        {
          question: '专注模式中可以解除屏蔽吗？',
          answer: '普通模式下随时可以停止。Deep Dive必须等设定的时间结束后才能关闭。',
        },
        {
          question: '无痕模式能绕过屏蔽吗？',
          answer: 'Chrome扩展授权无痕模式后会屏蔽。Windows桌面应用在系统级屏蔽，难以绕过。',
        },
        {
          question: '免费版和Pro版的区别？',
          answer: '免费版提供基础网站屏蔽。Pro版解锁Deep Dive（限时锁定）和Windows应用（应用级屏蔽）。',
        },
        {
          question: '可以同时使用多个设备吗？',
          answer: '一个账户可同时使用Chrome扩展和Windows应用。屏蔽列表自动同步。',
        },
        {
          question: '数据存储在哪里？',
          answer: '屏蔽列表和目标存储在你的设备上，仅在账户同步时加密传输到服务器。',
        },
      ],
    },
    finalCta: {
      heading: '从今天开始专注',
      subheading: '不是意志薄弱，是环境让你分心。Flowdive帮你重塑环境。',
      ctaPrimary: '免费添加到Chrome',
      ctaSecondary: '下载Windows版',
    },
    footer: {
      copyright: '© 2025 Flowdive. 保留所有权利。',
      privacy: '隐私政策',
      terms: '服务条款',
    },
  },

  es: {
    nav: {
      features: 'Funciones',
      pricing: 'Precios',
      download: 'Descargar',
      cta: 'Añadir a Chrome',
    },
    hero: {
      badge: 'Extensión de Chrome + App de escritorio Windows',
      title: 'La navegación inconsciente\nrompe tu concentración',
      subtitle:
        '¿Te encuentras abriendo YouTube sin pensar?\nFlowdive detiene ese momento y te recuerda tu objetivo.',
      ctaPrimary: 'Añadir a Chrome — Gratis',
      ctaSecondary: 'Descargar para Windows',
      blockPage: {
        headline: 'Hora de concentrarse',
        currentGoal: 'Objetivo actual',
        sampleGoal: 'Escribir el capítulo 3 de la tesis',
        timer: 'Concentrado 42 min',
      },
    },
    features: {
      label: 'Funciones',
      heading: 'Concéntrate por entorno, no por fuerza de voluntad',
      subheading:
        'Flowdive bloquea físicamente las visitas inconscientes para que no tengas más opción que mantenerte concentrado.',
      items: [
        {
          icon: '🚫',
          title: 'Bloqueo de sitios',
          description:
            'Añade sitios distractores como YouTube, Netflix o Instagram a tu lista de bloqueo. Durante el modo de concentración, el acceso se bloquea.',
        },
        {
          icon: '🎯',
          title: 'Definir objetivo',
          description:
            'Escribe lo que necesitas hacer. La página bloqueada muestra tu objetivo, convirtiendo una visita inconsciente en una elección consciente.',
        },
        {
          icon: '🔒',
          title: 'Deep Dive',
          description:
            'Durante el tiempo establecido, el modo de concentración no se puede detener. Detiene a tu yo futuro cuando quiere rendirse ante la tentación.',
          badge: 'Pro',
        },
        {
          icon: '💻',
          title: 'Multiplataforma',
          description:
            'Controla tu navegador con la extensión de Chrome y bloquea apps no navegadoras con la app de escritorio Windows — una cuenta, sincronizada.',
          badge: 'Pro',
        },
      ],
    },
    pricing: {
      label: 'Precios',
      heading: 'Empieza gratis',
      subheading:
        'El bloqueo principal es gratis. Mejora cuando necesites más concentración.',
      free: {
        name: 'Gratis',
        price: '$0',
        period: '/mes',
        cta: 'Empezar gratis',
        items: [
          'Extensión de Chrome',
          'Bloqueo ilimitado de sitios',
          'Configuración y visualización de objetivos',
          'Restauración automática al reiniciar el navegador',
        ],
      },
      pro: {
        name: 'Pro',
        price: '$7.99',
        period: '/mes',
        cta: 'Suscribirse a Pro',
        badge: 'Popular',
        items: [
          'Todo lo del plan Gratis',
          'Deep Dive (bloqueo temporal)',
          'App de escritorio Windows',
          'Bloqueo a nivel de app (juegos, etc.)',
        ],
      },
    },
    download: {
      heading: 'Empieza hoy',
      subheading: 'Configuración en 1 minuto. Mejor concentración desde ahora.',
      chrome: {
        title: 'Extensión de Chrome',
        description: 'Bloquea sitios en tu navegador · Gratis',
        cta: 'Instalar desde Chrome Web Store',
      },
      windows: {
        title: 'App de Windows',
        description: 'Incluye bloqueo a nivel de app · Pro',
        cta: 'Descargar .exe',
      },
    },
    stats: {
      items: [
        { number: '12,000+', label: 'Personas concentradas' },
        { number: '4.2M', label: 'Distracciones bloqueadas' },
        { number: '38,000+', label: 'Horas de concentración' },
        { number: '4.8 ★', label: 'Valoración media' },
      ],
    },
    howItWorks: {
      label: 'Cómo funciona',
      heading: 'Construye concentración en 3 pasos',
      subheading: 'Sin configuración complicada. Empieza ahora mismo.',
      steps: [
        {
          number: '01',
          title: 'Escribe tu objetivo',
          description: 'Anota lo único que necesitas terminar hoy. La página bloqueada te lo recordará.',
        },
        {
          number: '02',
          title: 'Añade distracciones',
          description: 'YouTube, Instagram, juegos — lo que sea, ponlo en tu lista de bloqueo.',
        },
        {
          number: '03',
          title: 'Inicia el modo concentración',
          description: 'Un clic basta. Si abres una web bloqueada por reflejo, te redirigimos a tu objetivo.',
        },
      ],
    },
    testimonials: {
      label: 'Testimonios',
      heading: 'Gente que recuperó su concentración',
      items: [
        {
          quote: 'Antes abría YouTube sin pensar. Ese hábito desapareció — ver mi objetivo en la página bloqueada me devuelve al instante.',
          author: 'Carlos Ruiz',
          role: 'Estudiante de posgrado',
        },
        {
          quote: 'El Deep Dive me ayudó a concentrarme 3 horas en una presentación. Normalmente las habría perdido scrolleando.',
          author: 'María García',
          role: 'Diseñadora',
        },
        {
          quote: 'Dejé de depender de la fuerza de voluntad. Ahora mi entorno hace el trabajo por mí.',
          author: 'Daniel López',
          role: 'Desarrollador',
        },
      ],
    },
    faq: {
      label: 'Preguntas frecuentes',
      heading: '¿Tienes preguntas?',
      items: [
        {
          question: '¿Puedo detener el bloqueo durante el modo concentración?',
          answer: 'En modo estándar puedes detenerlo cuando quieras. El Deep Dive bloquea hasta que termine el temporizador.',
        },
        {
          question: '¿Se puede saltar con el modo incógnito?',
          answer: 'La extensión de Chrome bloquea el incógnito si le das permiso. La app de escritorio Windows bloquea a nivel sistema, difícil de saltar.',
        },
        {
          question: '¿Diferencia entre Gratis y Pro?',
          answer: 'Gratis incluye bloqueo básico de sitios. Pro desbloquea el Deep Dive (bloqueo temporal) y la app de Windows (bloqueo a nivel app).',
        },
        {
          question: '¿Puedo usar varios dispositivos?',
          answer: 'Una cuenta funciona en la extensión de Chrome y la app de Windows. Las listas se sincronizan automáticamente.',
        },
        {
          question: '¿Dónde se almacenan mis datos?',
          answer: 'Las listas y objetivos se guardan en tu dispositivo. Solo los datos sincronizados se cifran y envían al servidor.',
        },
      ],
    },
    finalCta: {
      heading: 'Concéntrate, empezando hoy',
      subheading: 'No es falta de voluntad — tu entorno está hecho para distraerte. Flowdive lo reconstruye.',
      ctaPrimary: 'Añadir a Chrome — Gratis',
      ctaSecondary: 'Descargar para Windows',
    },
    footer: {
      copyright: '© 2025 Flowdive. Todos los derechos reservados.',
      privacy: 'Política de privacidad',
      terms: 'Términos de servicio',
    },
  },

  de: {
    nav: {
      features: 'Funktionen',
      pricing: 'Preise',
      download: 'Download',
      cta: 'Zu Chrome hinzufügen',
    },
    hero: {
      badge: 'Chrome-Erweiterung + Windows-Desktop-App',
      title: 'Gedankenloses Surfen\nzerstört deinen Fokus',
      subtitle:
        'Öffnest du YouTube, ohne nachzudenken?\nFlowdive blockiert diesen Moment und erinnert dich an dein Ziel.',
      ctaPrimary: 'Kostenlos zu Chrome hinzufügen',
      ctaSecondary: 'Für Windows herunterladen',
      blockPage: {
        headline: 'Zeit zum Fokussieren',
        currentGoal: 'Aktuelles Ziel',
        sampleGoal: 'Kapitel 3 der Abschlussarbeit schreiben',
        timer: '42 Min. fokussiert',
      },
    },
    features: {
      label: 'Funktionen',
      heading: 'Fokussiere durch Umgebung, nicht durch Willenskraft',
      subheading:
        'Flowdive blockiert gedankenlose Besuche physisch, damit du gar keine Wahl hast, als konzentriert zu bleiben.',
      items: [
        {
          icon: '🚫',
          title: 'Webseiten blockieren',
          description:
            'Füge ablenkende Seiten wie YouTube, Netflix oder Instagram zur Blockliste hinzu. Im Fokusmodus wird der Zugriff blockiert.',
        },
        {
          icon: '🎯',
          title: 'Ziele setzen',
          description:
            'Gib ein, was du erledigen musst. Die Blockseite zeigt dein Ziel und verwandelt einen gedankenlosen Besuch in eine bewusste Entscheidung.',
        },
        {
          icon: '🔒',
          title: 'Deep Dive',
          description:
            'Während der eingestellten Zeit kann der Fokusmodus nicht beendet werden. Stoppt dein zukünftiges Ich, wenn die Versuchung kommt.',
          badge: 'Pro',
        },
        {
          icon: '💻',
          title: 'Plattformübergreifend',
          description:
            'Steuere deinen Browser mit der Chrome-Erweiterung und blockiere Nicht-Browser-Apps mit der Windows-App – ein Konto, synchronisiert.',
          badge: 'Pro',
        },
      ],
    },
    pricing: {
      label: 'Preise',
      heading: 'Kostenlos starten',
      subheading:
        'Grundlegende Blockierung ist kostenlos. Upgrade, wenn du stärkeren Fokus brauchst.',
      free: {
        name: 'Kostenlos',
        price: '0 €',
        period: '/Mon.',
        cta: 'Kostenlos starten',
        items: [
          'Chrome-Erweiterung',
          'Unbegrenzte Seitenblockierung',
          'Zielsetzung & Anzeige',
          'Automatische Wiederherstellung beim Neustart',
        ],
      },
      pro: {
        name: 'Pro',
        price: '7,99 €',
        period: '/Mon.',
        cta: 'Pro abonnieren',
        badge: 'Beliebt',
        items: [
          'Alles aus dem kostenlosen Plan',
          'Deep Dive (zeitbasierte Sperre)',
          'Windows-Desktop-App',
          'App-Ebene-Blockierung (Spiele usw.)',
        ],
      },
    },
    download: {
      heading: 'Heute beginnen',
      subheading: 'Einrichtung in 1 Minute. Besserer Fokus ab jetzt.',
      chrome: {
        title: 'Chrome-Erweiterung',
        description: 'Blockiere Seiten im Browser · Kostenlos',
        cta: 'Aus dem Chrome Web Store installieren',
      },
      windows: {
        title: 'Windows-App',
        description: 'App-Ebene-Blockierung enthalten · Pro',
        cta: '.exe herunterladen',
      },
    },
    stats: {
      items: [
        { number: '12.000+', label: 'Menschen im Fokus' },
        { number: '4,2 Mio.', label: 'Blockierte Ablenkungen' },
        { number: '38.000+', label: 'Stunden fokussiert' },
        { number: '4,8 ★', label: 'Durchschnittsbewertung' },
      ],
    },
    howItWorks: {
      label: 'So funktioniert es',
      heading: 'Fokus in 3 Schritten aufbauen',
      subheading: 'Keine komplizierte Einrichtung. Starte sofort.',
      steps: [
        {
          number: '01',
          title: 'Ziel notieren',
          description: 'Schreib auf, was du heute fertigmachen musst. Die Blockseite erinnert dich daran.',
        },
        {
          number: '02',
          title: 'Ablenkungen hinzufügen',
          description: 'YouTube, Instagram, Spiele — alles, was ablenkt, kommt auf die Blockliste.',
        },
        {
          number: '03',
          title: 'Fokusmodus starten',
          description: 'Ein Klick. Öffnest du reflexartig eine Seite, leitet dich Flowdive zu deinem Ziel zurück.',
        },
      ],
    },
    testimonials: {
      label: 'Stimmen',
      heading: 'Menschen, die ihren Fokus zurück haben',
      items: [
        {
          quote: 'Früher öffnete ich YouTube ohne nachzudenken. Diese Gewohnheit ist weg — mein Ziel auf der Blockseite reißt mich sofort raus.',
          author: 'Lukas Müller',
          role: 'Doktorand',
        },
        {
          quote: 'Mit Deep Dive war ich 3 Stunden lang voll konzentriert auf eine Präsentation. Normalerweise hätte ich nur gescrollt.',
          author: 'Anna Schmidt',
          role: 'Designerin',
        },
        {
          quote: 'Ich verlasse mich nicht mehr auf Willenskraft. Mein Umfeld erledigt es jetzt für mich.',
          author: 'Tobias Weber',
          role: 'Entwickler',
        },
      ],
    },
    faq: {
      label: 'FAQ',
      heading: 'Hast du Fragen?',
      items: [
        {
          question: 'Kann ich das Blockieren während des Fokusmodus stoppen?',
          answer: 'Im Standardmodus jederzeit. Deep Dive sperrt bis der Timer abgelaufen ist.',
        },
        {
          question: 'Kann der Inkognito-Modus es umgehen?',
          answer: 'Die Chrome-Erweiterung blockiert auch Inkognito, wenn du es erlaubst. Die Windows-App blockiert auf Systemebene — schwer zu umgehen.',
        },
        {
          question: 'Unterschied zwischen Free und Pro?',
          answer: 'Free bietet grundlegendes Seitenblockieren. Pro schaltet Deep Dive (zeitbasierte Sperre) und die Windows-App (App-Blockierung) frei.',
        },
        {
          question: 'Kann ich mehrere Geräte nutzen?',
          answer: 'Ein Konto funktioniert für Chrome-Erweiterung und Windows-App. Die Blocklisten werden automatisch synchronisiert.',
        },
        {
          question: 'Wo werden meine Daten gespeichert?',
          answer: 'Blocklisten und Ziele werden auf deinem Gerät gespeichert. Nur synchronisierte Daten werden verschlüsselt an den Server gesendet.',
        },
      ],
    },
    finalCta: {
      heading: 'Fokussiere ab heute',
      subheading: 'Es ist nicht mangelnde Willenskraft — dein Umfeld ist auf Ablenkung gebaut. Flowdive baut es um.',
      ctaPrimary: 'Kostenlos zu Chrome hinzufügen',
      ctaSecondary: 'Für Windows herunterladen',
    },
    footer: {
      copyright: '© 2025 Flowdive. Alle Rechte vorbehalten.',
      privacy: 'Datenschutzerklärung',
      terms: 'Nutzungsbedingungen',
    },
  },
}