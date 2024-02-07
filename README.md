# Gatsby-theme-jeonggon

본 프로젝트는 인프런의 ["React 기반 Gatsby로 기술 블로그 개발하기"](https://www.inflearn.com/course/gatsby-%EA%B8%B0%EC%88%A0%EB%B8%94%EB%A1%9C%EA%B7%B8/dashboard)를 학습하는 프로젝트로 "Gatsby"의 기초 지식을 학습하는 것을 목표하였습니다.

<br>
<br>

## Gatsby 프로젝트 생성

```bash
$ npx gatsby-cli new "[프로젝트 명]"
```

<br>

- 프로젝트로 이동 및 실행

```bash
$ cd "[프로젝트 명]"
$ gatsby develop
# yarn develop 도 마찬가지로 가능
```

<br>
<br>

## 디렉토리 설정

- Root Directory에 `contents` 디렉토리 생성
- src에 `components`, `hooks`, `pages`, `templates` 디렉토리 생성

<br>

1. `contents` : 블로그 포스트 파일 저장하기 위한 디렉토리
2. `components` : React Component를 저장하기 위한 디렉토리
3. `hooks` : Custom Hooks을 저장하기 위한 디렉토리
4. `pages` : 페이지 컴포넌트를 저장하기 위한 디렉토리, 기본적으로 브라우저에서 pages의 파일 이름을 통해 페이지에 접근하기에 페이지만 저장하고 관리
5. `templates` : 게시글과 같이 같은 형식을 보여주는 컴포넌트를 저장하기 위한 디렉토리

<br>
<br>

## 라이브러리 정리

- PWA와 Gatsby Cloud를 위한 라이브러리 삭제

```bash
$ yarn remove gatsby-plugin-manifest gatsby-plugin-gatsby-cloud
```

<br>

- 프로젝트에 타입스크립트 설치

```bash
$ yarn add typescript --dev
```

<br>

- Gatsby에서 타입스크립트를 사용하기 위한 플러그인 설치

```bash
$ yarn add gatsby-plugin-typescript
```

<br>
<br>

## gatsby-config.js 설정

- 플러그인 추가 및 디렉토리 탐색을 위해 라이브러리 설정 옵션 변경

```bash
# gatsby-plugin-typescript 플러그인 설치

$ npm install gatsby-plugin-react-helmet react-helmet
```

```javascript
// gatsby-config.js

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `contents`,
    //     path: `${__dirname}/contents`,
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: <https://gatsby.dev/offline>
    // `gatsby-plugin-offline`,
  ],
};
```

<br>
<br>

## 타입스크립트 설정을 위한 tsconfig.json

- tsconfig.json 파일 생성

```bash
$ yarn tsc --init
```

<br>

- 다음과 같이 수정

```json
//tsconfig.json

{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "allowJs": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "baseUrl": "./src",
    "paths": {
      "components/*": ["./components/*"],
      "utils/*": ["./utils/*"],
      "hooks/*": ["./hooks/*"]
    },
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*.tsx"],
  "exclude": ["node_modules"]
}
```

- paths 옵션의 경우, `절대경로`를 사용하기 위해 경로를 매핑해주는 옵션으로 상대적으로 깔끔하게 코드작성 가능
- 이를 위해 `baseUrl`을 `src 폴더`로 설정
- 매핑 경로를 사용하기 위해서는 추가적으로 `gatsby-node.js` 파일에서 `Webpack Config`를 추가해야 함

<br>
<br>

## gatsby-node.js 설정

- 해당 코드 추가
- alias 옵션에서 components로 시작하는 경로는 모두 src 폴더 내의 component 폴더로 매핑하여 절대 경로 사용할 수 있도록 함

```javascript
// gatsby-node.js

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: <https://www.gatsbyjs.com/docs/node-apis/>
 */

// You can delete this file if you're not using it

const path = require('path');

// Setup Import Alias
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const output = getConfig().output || {};

  actions.setWebpackConfig({
    output,
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        utils: path.resolve(__dirname, 'src/utils'),
        hooks: path.resolve(__dirname, 'src/hooks'),
      },
    },
  });
};
```

<br>
<br>

## ESLint와 Prettier 설정

- `ESLint` : 코드에서 문법, 규칙 오류를 찾아주는 `정적 코드 분석도구`
- `Prettier` : 개발자가 작성한 코드를 정해진 규칙을 따르도록 변환하는 `Code Formatter`
- 깔끔하고 효율적인 코드 작성을 통해 생산성 향상

```bash
# 라이브러리 설치

$ yarn add eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest --dev
```

<br>

- .eslintrc.json 파일 생성 및 다음과 같이 작성
- 아래 코드를 통해 tsx 파일 문법 오류 확인 가능

```json
//.eslintrc.json

{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ["react", "@typescript-eslint"],
  "ignorePatterns": ["dist/", "node_modules/"],
  "rules": {}
}
```

<br>

- 그리고 .eslintrc.json 파일의 parserOptions.project 프로퍼티 값에 의해 루트 디렉토리의 자바스크립트 파일에서 TypeScript Parser 관련된 오류가 발생할 수 있음
- 이를 위해 루트 디렉토리에 `.eslintignore` 파일을 생성한 후, 아래와 같이 내용을 추가

```
gatsby-browser.js
gatsby-config.js
gatsby-node.js
gatsby-ssr.js
```

<br>

- .prettierrc 파일을 다음과 같이 수정

```
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

<br>
<br>

## components 폴더 및 pages 폴더

- components 폴더에 `Text.tsx` 파일 생성
- pages 폴더에 `index.tsx` 파일 생성

<br>

- Text.tsx

```tsx
// src/components/Text.tsx

import React, { FunctionComponent } from 'react'

type TextProps = {
  text: string
}

const Text: FunctionComponent<TextProps> = function ({ text }) {
  return <div>{text}</div>
}

export default Text
```

<br>

- index.tsx

```tsx
// src/pages/index.tsx

import React, { FunctionComponent } from 'react'
import Text from 'components/Text'

const IndexPage: FunctionComponent = function () {
  return <Text text="Home" />
}

export default IndexPage
```

<br>
<br>

## 초기 세팅 확인

```bash
$ gatsby develop
```

![초기 화면 확인](readme_assets/first_setting.png)

<초기 화면 확인>