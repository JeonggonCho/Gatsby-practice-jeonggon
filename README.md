# Gatsby-theme-jeonggon

본 프로젝트는 인프런의 ["React 기반 Gatsby로 기술 블로그 개발하기"](https://www.inflearn.com/course/gatsby-%EA%B8%B0%EC%88%A0%EB%B8%94%EB%A1%9C%EA%B7%B8/dashboard)를 학습하는 프로젝트로 "Gatsby"의 기초 지식을 학습하는 것을 목표하였습니다.

<br>
<br>

## Q) Gatsby는 무엇이며, 왜 사용하는가?

- Gatsby는 `JAM Stack`을 활용한 `정적 사이트 생성기`
- JAM Stack 기반 프레임워크 중 Next.js 다음으로 `많은 점유율`을 차지함
- 하지만 두 프레임워크의 사용 용도가 크게 다름. `Next.js`는 정적 사이트 생성도 하지만 주로 `서버 사이드 렌더링(SSR)`을 위해 사용하는 프레임워크로 서버와 통신을 하며, 요청 시, 동적으로 웹 사이트를 생성함
- `Gatsby`는 서버 없이 `정적 사이트 생성`만을 목적으로 사용하는 프레임워크
- 따라서 소개 페이지, 블로그, 포트폴리오 등에 많이 활용됨

<br>

### JAM Stack

[JAM Stack 공식 사이트](https://jamstack.org/)

- `JavaScript, API, Markup Stack`의 약자
- 빠르고, 안전하고, 스케일링하기 쉬운 웹을 만들기 위해 디자인된 아키텍처
- 기존의 웹 사이트 방식은 서버에서 DB 또는 CMS(Content Management System)로부터 추출한 데이터를 클라이언트에 뿌려주는 방식을 사용하여 구조가 상대적으로 복잡함
- JAM Stack을 사용한 방식은 마크업 요소와 많은 API를 통해 만든 정적 사이트를 Pre-Render한 것을 CDN(Content Delivery Network)을 통해 열람 가능

1. `빠르게 웹 사이트 제공` : 대부분 웹 사이트는 초기 접속 시, 렌더링하는 과정을 필요로 하지만, JAM Stack은 Pre-Render하기에 시간이 단축되며, 브라우저에서 첫 응답 받기까지 걸리는 시간인 TTFB(Time to First Byte)를 최소화할 수 있음
2. `안전한 웹 사이트 제공` : 사이트 생성을 위한 프로세스가 추상화되어 있어 공격 노출 범위 감소
3. `스케일링 하기 쉬운 웹 사이트 제공` : CDN을 통해 더 많은 지역에서 홈페이지를 제공할 수 있음

![기존 웹 사이트와 JAM Stack 아키텍처 비교](readme_assets/jam_stack.png)

<기존 웹 사이트와 JAM Stack 아키텍처 비교>

<br>
<br>

## 1. Gatsby 프로젝트 생성

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

## 2. 디렉토리 설정

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

## 3.라이브러리 정리

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

## 4. gatsby-config.js 설정

- 플러그인 추가 및 디렉토리 탐색을 위해 라이브러리 설정 옵션 변경

```bash
# gatsby-plugin-typescript 플러그인 설치

$ npm install gatsby-plugin-react-helmet react-helmet
```

- `react-helmet` : react 애플리케이션의 컴포넌트 내에서 동적으로 \<head> 요소를 조작하는데 사용되며 이를 통해 제목(\<title>), 메타태그(\<meta>), 스타일시트(\<link>), 스크립트(\<script>) 등의 메타데이터를 조작할 수 있음, Helmet 컴포넌트를 제공함, SEO 최적화에 도움이 됨
    ```javascript
    // react-helmet 예시
    
    import { Helmet } from "react-helmet"
  
    const SEO = () => {
      return <Helmet title="타이틀" />
    }
  
    // 또는 -------------------------------------
  
    <Helmet>
      <title>타이틀</title>
      <meta name="description" content="This is my page description" />
    </Helmet>
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

## 5. 타입스크립트 설정을 위한 tsconfig.json

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

## 6. gatsby-node.js 설정

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

## 7. ESLint와 Prettier 설정

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

```ignore
.eslintignore

gatsby-browser.js
gatsby-config.js
gatsby-node.js
gatsby-ssr.js
```

<br>

- .prettierrc 파일을 다음과 같이 수정

```
.prettierrc

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

## 8. components 폴더 및 pages 폴더

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

## 9. 초기 세팅 확인

```bash
$ gatsby develop
```

![초기 화면 확인](readme_assets/first_setting.png)

<초기 화면 확인>

<br>
<br>

## 10. 함수형 컴포넌트 타입

- React에서는 기본적으로 타입스크립트 활용을 위해 `FunctionComponent`라는 함수형 컴포넌트 타입을 제공함

```tsx
// FunctionComponent 타입 사용 예시

// src/pages/index.tsx

import React, { FunctionComponent } from 'react'

const IndexPage: FunctionComponent = function () {
  return <Text text="Home" />
}
```

<br>
<br>

## 11. Generics

- Generic이란 어떠한 클래스나 함수에서 사용할 `타입을 그 함수나 클래스를 사용할 때, 결정`할 수 있게 만들어주는 기능

```tsx
// Generics 예시

// 타입스크립트를 통해 만든 Stack 자료구조

class Stack {
  private data: any[] = [];

  constructor() {};

  push(item: any): void {
    this.data.push(item);
  }

  pop(): any {
    return this.data.pop();
  }
}
```

- Stack에 어떤 타입의 데이터가 추가될 지, 모르기에 함수 및 변수에 any 타입지정

```tsx
const stack = new Stack();

stack.push(10);
stack.push('10');

console.log(stack.pop().toFixed()) // 10
console.log(stack.pop().toFixed()) // Error
```

- `toFixed()` 메서드는 숫자 타입에서만 사용할 수 있는 함수
- 하지만 위의 stack은 any[] 타입인데 숫자만 있다고 착각하고 toFixed() 메서드 사용 시, 에러가 발생할 수 있음
- 이러한 상황에서 Generics가 숫자 타입만 받을 것이라고 명시 할 수 있음

```tsx
// 타입스크립트를 통해 만든 Stack 자료구조

// Generics 적용

class Stack<DataType> {
  private data: DataType[] = []

  constructor() {}

  push(item: DataType): void {
    this.data.push(item)
  }

  pop(): DataType {
    return this.data.pop()
  }
}
```

- 클래스명 옆에 타입변수가 추가되었음
- 이를 통해 클래스 정의 시점이 아닌 인스턴스 생성 시점에 타입 정의 가능

```tsx
const stack = new Stack<number>()

stack.push('10') // error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```

- 위와 같이 다른 타입 데이터 추가 시 에러 발생

<br>
<br>

## 12. Generics를 이용하여 컴포넌트 수정

- Text.tsx 파일 코드 수정

```tsx
// src/components/Text.tsx

import React, { FunctionComponent } from 'react'

interface TextProps {
  text: string
}

const Text: FunctionComponent<TextProps> = function ({ text }) {
  return <div>{text}</div>
}

export default Text
```

- FunctionComponent 타입에 `TextProps` Generic을 추가
- React에서는 함수형 컴포넌트 타입에 Generic을 추가함으로써, 컴포넌트가 받는 props가 어떤 것이 있고, 어떤 타입인지 지정 가능
- 이를 통해 해당 컴포넌트에 맞는 props를 전달 할 수 있음

<br>
<br>

## 13. GraphQL

- 특정 데이터 베이스에 제한받지 않고 전체 애플리케이션에 걸쳐 균일한 API를 생성하고 `필요한 데이터만` 받아올 수 있는 `서버사이드 런타임`
- Query를 정의하고 호출하는 방식으로 구성

```graphql
# GraphQL 예시

query getPeopleList {
  allPeople {
    edges {
      node {
        id
        name
      }
    }
  }
}
```

<br>

- getPeopleList라는 Query를 정의하고 해당 데이터 객체를 호출
- Gatsby에서는 실행 시, `localhost:8000/___graphal` 주소를 통해 `GraphiQL IDE`로 접속 가능하며 해당 페이지에서 GraphQL 쿼리를 작성할 수 있음

![GraphiQL](readme_assets/graphiQL.png)

<GraphiQL로 연결한 모습>

<br>
<br>

## 14. Gatsby에서 GraphQL Query 사용

- 컴포넌트에서 Query를 요청해보기
- src 폴더의 pages 폴더에 `info.tsx` 파일 생성
- 하단에 GraphQL 호출하여 metadataQuery 변수에 저장 및 내보내기
- alias(별칭)으로 각 객체 데이터 타입 지정
- 해당 타입과 Props를 컴포넌트에 Generics와 비구조화 할당을 통해 받고 Text 컴포넌트에 Props로 각 데이터 전달

```tsx
// src/pages/info.tsx

import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import Text from 'components/Text'

type InfoPageProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: string
      }
    }
  }
}

const InfoPage: FunctionComponent<InfoPageProps> = function ({
                                                               data: {
                                                                 site: {
                                                                   siteMetadata: { title, description, author },
                                                                 },
                                                               },
                                                             }) {
  return (
          <div>
            <Text text={title} />
            <Text text={description} />
            <Text text={author} />
          </div>
  )
}

export default InfoPage

export const metadataQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
```

<br>
<br>

## 15. Anchor 태그를 통한 페이지 이동

- Gatsby 프로젝트에서 `src/pages` 내 모든 파일의 이름을 통해 접근 가능
- 만약 디렉토리에 `about.tsx` 파일이 존재하면, `site.com/about` url을 통해 접근 가능
- `about.tsx` 파일을 `src/pages/info`로 경로를 이동하면 `site.com/info/about`과 같은 url을 생성할 것임

```tsx
// src/pages/index.tsx

// a 태그를 사용한 링크생성

...
const IndexPage: FunctionComponent = function () {
  return (
          <div>
            <Text text="Hello, World!" />
            <a href="/info/">To Info</a>
          </div>
  )
}
...
```

```tsx
// src/pages/info.tsx

...
const InfoPage: FunctionComponent<InfoPageProps> = function ({
                                                               data: {
                                                                 site: {
                                                                   siteMetadata: { title, description, author },
                                                                 },
                                                               },
                                                             }) {
  return (
          <div>
            <Text text={title} />
            <Text text={description} />
            <Text text={author} />
            <a href="/">To Main</a>
          </div>
  )
}
...
```

- a 태그를 이용할 경우, 페이지 이동은 정상적으로 이루어지나, 이동하는 과정에서 `새로고침이 발생`
- Gatsby에서는 사용자 경험을 위해 자체적 API를 제공함

<br>
<br>

## 16. Gatsby Link API 사용

- Link 태그를 import하여 사용하고, 경로는 to 속성의 props로 전달

```tsx
// src/pages/index.tsx

import { Link } from 'gatsby'

...
<div>
  <Text text="Hello, World!" />
  <Link to="/info/">To Info</Link>
</div>
...
```

```tsx
// src/pages/info.tsx

import { graphql, Link } from 'gatsby'

...
<div>
  <Text text={title} />
  <Text text={description} />
  <Text text={author} />
  <Link to="/">To Main</Link>
</div>
...
```

- Link 태그를 사용하면 `Prefetch`를 통해서 페이지의 로딩 속도를 높임
- 페이지가 로드되면 Gatsby는 현재 페이지에서 사용되는 `모든 링크를 찾아 페이지를 미리 로드`해놓음

<br>
<br>

## 17. EmotionJS

- React는 `Sass`, `CSS`와 같은 여러 스타일 기법을 사용할 수 있음
- `Sass`와 `CSS`의 경우, 스타일 파일을 `따로 생성`하여, 컴포넌트 파일에서 불러와 적용하는 방식
- EmotionJS 라이브러리는 `CSS-in-JS` 라이브러리로 JavaScript 파일에서 스타일을 지정할 수 있는 라이브러리
- EmotionJS와 함께 많이 이용되는 라이브러리로 `styled-components` 라이브러리가 있음
- EmotionJS의 장점은 `간결한 코드 작성이 가능`하며, `서버사이드 렌더링을 지원`함
- styled-components 역시 동일한 기능을 제공하나, EmotionJS의 경우, `번들 용량이 압도적으로 작다는 점`이 큰 장점임

```bash
# EmotionJS 설치

$ yarn add gatsby-plugin-emotion @emotion/react @emotion/styled
```

- `gatsby-config.js`에 플러그인 추가

```js
// gatsby-config.js

plugins: [
  ...,
        `gatsby-plugin-emotion`,
...
]
```

<br>
<br>

## 18. CSS 정의 및 글로벌 스타일 지정 방법

- emotion 라이브러리에서 컴포넌트와 함수 가져오기

```tsx
import {Global, css} from '@emotion/react'
```

- 전역 설정 스타일 정의

```tsx
...
const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 20px;
  }
`
...

<div>
  <Global styles={globalStyle}/>
  {title} {description} {author}
</div>
```

- 전역 스타일 변경을 위해서 EmotionJS에서 제공하는 `Global 컴포넌트를 사용`하고, style 속성의 `props로 전역 스타일 변수를 전달`

<br>
<br>

## 19. Tagged Template Literal 방식 css 적용

```tsx
...
const TextStyle = css`
    font-size: 18px;
    font-weight: 700;
    color: gray;
`

...
<div>
  <Global styles={globalStyle}/>
  <div css={TextStyle}>{title}</div>
  {description} {author}
</div>
```

- 일반 JSX 문법 태그에 `css 속성`을 추가하고 앞서 정의한 스타일을 `속성의 props로 전달함`

<br>
<br>

## 20. Tagged Template Literal 방식 Styled Component 생성

- 필요한 함수 import 하기

```tsx
import styled from '@emotion/styled'

...
const Text1 = styled.div`
    font-size: 20px;
    font-weight: 700;
`
...

<div>
  <Global styles={globalStyle}/>
  <div css={TextStyle}>{title}</div>
  <Text1>{description}</Text1>
  {author}
</div>
```

- 이를 통해 생성한 `Text1 컴포넌트`는 사용자가 정의한 스타일이 `적용된 div 태그`가 됨
- div 이외의 다른 태그를 사용할 경우, `styled.img...`와 같이 styled 뒤에 요소를 호출하면 됨

<br>
<br>

## 21. 객체를 사용하여 Styled Component 생성

- `화살표 함수`로 객체를 리턴하고, 객체의 `키`는 `Camel Case`를 사용하며 객체의 `값`은 무조건 `문자열 타입`으로 전달
- 이 styled component도 html 태그와 같이 사용

```tsx
...

// Kebab Case 사용
const Text1 = styled.div`
    font-size: 20px;
    font-weight: 700;
`

// Camel Case 사용
const Text2 = styled('div')(() => ({
  fontSize: '15px',
  color: 'blue',
}))

...
<div>
  <Global styles={globalStyle}/>
  <div css={TextStyle}>{title}</div>
  <Text1>{description}</Text1>
  <Text2>{author}</Text2>
</div>
```

<br>
<br>

## 22. Styled Component에서 Props 처리

- 기존 Styled Component에 disabled라는 Props 전달
- 타입스크립트이므로 Props에도 타입을 지정해주어야 함

```tsx
...
const Text1 = styled.div<{ disable: boolean }>`
    font-size: 20px;
    font-weight: 700;
    text-decoration: ${({disable}) => (disable ? 'line-through' : 'none')};
`

const Text2 = styled('div')<{ disable: boolean }>(({disable}) => ({
  fontSize: '15px',
  color: 'blue',
  textDecoration: disable ? 'line-through' : 'none',
}))
...

...
<div>
  <Global styles={globalStyle}/>
  <div css={TextStyle}>{title}</div>
  <Text1 disable={true}>{description}</Text1>
  <Text2 disable={true}>{author}</Text2>
</div>
...
```

<br>

![EmotionJS 실습결과](readme_assets/EmotionJS_result.png)

<EmotionJS 실습결과>

<br>
<br>

## 23. 메인 페이지에 사용될 컴포넌트

- 디렉토리 구조는 위와 같이 설정
- 공통으로 사용되는 컴포넌트는 `Common 디렉토리`
- 그 외, 컴포넌트는 사용되는 `페이지 이름의 디렉토리`

```
- src
  - components
    - Common
      - Footer.tsx : 페이지 하단 푸터
      - GlobalStyle.tsx : 전역 스타일
    - Main
      - CategoryList.tsx : 카테고리 목록
      - Introduction.tsx : 페이지 상단 소개글
      - PostItem.tsx : 포스트 아이템
      - PostList.tsx : 여러 포스트 아이템을 묶은 포스트 리스트
      - ProfileImage.tsx : 소개글 구역에서 사용할 프로필 이미지
  - ...
```

<br>
<br>

## 24. 글로벌 스타일 정의

```tsx
// src/components/Common/GlobalStyle.tsx

import React, {FunctionComponent} from 'react'
import {Global, css} from '@emotion/react'

const defaultStyle = css`
    @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap');
    
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Nanum Myeongjo', serif;
    }
    
    html,
    body,
    #___gatsby {
        height: 100%;
    }
    
    a,
    a:hover {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
    }
`;

const GlobalStyle: FunctionComponent = function() {
  return <Global styles={defaultStyle} />
};

export default GlobalStyle;
```

<br>
<br>

## 25. 페이지 상단 소개글 컴포넌트 구현

```tsx
// src/components/Main/ProfileImage.tsx

import {FunctionComponent} from 'react'
import styled from '@emotion/styled'

// 프로필 이미지
const PROFILE_IMAGE_LINK = '<https://avatars.githubusercontent.com/u/24629040?s=460&u=0bb3411f25c0e1c5d25d753fc648739367cb7032&v=4>';

const ProfileImageWrapper = styled.img`
    width: 120px;
    height: 120px;
    margin-bottom: 30px;
    border-radius: 50%;
`;

const ProfileImage: FunctionComponent = () => {
  return <ProfileImageWrapper src={PROFILE_IMAGE_LINK} alt="Profile Image" />
};

export default ProfileImage;
```

- EmotionJS 라이브러리를 통해 Image Styled Component를 생성하고 일반 이미지 태그처럼 불러와 사용
- 글로벌 컴포넌트와 이미지 컴포넌트 index.tsx로 불러와 확인하기

```tsx
// src/pages/index.tsx

import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from 'components/Common/GlobalStyle'
import ProfileImage from 'components/Main/ProfileImage'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const IndexPage: FunctionComponent = function () {
  return (
          <Container>
            <GlobalStyle />
            <ProfileImage />
          </Container>
  )
}

export default IndexPage
```

![프로필 이미지 출력 확인](readme_assets/profile_rendering_check.png)

<프로필 이미지 출력 확인>

<br>

- Introduction.tsx 파일 작성하기

```tsx
// src/components/Main/Introduction.tsx

import { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import ProfileImage from 'components/Main/ProfileImage'

const Background = styled.div`
    width: 100%;
    background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
    color: #ffffff;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 768px;
    height: 400px;
    margin: 0 auto;
`;

const SubTitle = styled.div`
    font-size: 20px;
    font-weight: 400;
`;

const Title = styled.div`
    margin-top: 5px;
    font-size: 35px;
    font-weight: 700;
`;

const Introduction: FunctionComponent = function () {
  return (
          <Background>
            <Wrapper>
              <ProfileImage />

              <div>
                <SubTitle>Nice to Meet You,</SubTitle>
                <Title>I'm Junior Frontend Developer Jeonggon</Title>
              </div>
            </Wrapper>
          </Background>
  )
};

export default Introduction;
```

- index.tsx 파일에 가져오기

```tsx
// src/pages/index.tsx

import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from 'components/Common/GlobalStyle'
import Introduction from 'components/Main/Introduction'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const IndexPage: FunctionComponent = function () {
  return (
          <Container>
            <GlobalStyle />
            <Introduction />
          </Container>
  )
}

export default IndexPage
```

<br>

![페이지 상단 소개글 컴포넌트 확인](readme_assets/introduction_rendering_check.png)

<페이지 상단 소개글 컴포넌트 확인>

<br>
<br>

## 26. 푸터 컴포넌트 구현

- 푸터 컴포넌트는 다른 페이지에서도 사용되기에 Common 디렉토리에 생성

```tsx
// src/components/Common/Footer.tsx

import { FunctionComponent } from 'react'
import styled from '@emotion/styled'

const FooterWrapper = styled.div`
    display: grid;
    place-items: center;
    margin-top: auto;
    padding: 50px 0;
    font-size: 15px;
    text-align: center;
    line-height: 1.5;
`;

const Footer: FunctionComponent = function() {
  return (
          <FooterWrapper>
            Thank You for Visiting My Blog, Have a Good Day 😆
            <br />© 2024 Developer Jeonggon, Powered By Gatsby.
          </FooterWrapper>
  )
}

export default Footer;
```

<br>

- index 페이지에 푸터 적용

```tsx
// src/pages/index.tsx

import Footer from 'components/Common/Footer'
...

return (
        <Container>
          <GlobalStyle />
          <Introduction />
          <Footer />
        </Container>
)
...
```

<br>

![푸터 컴포넌트 확인](readme_assets/footer_rendering_check.png)

<푸터 컴포넌트 확인>

<br>
<br>

## 27. 카테고리 목록 Props로 받아 띄우기

- CategoryList.tsx 파일 생성 후, 컴포넌트 Props 타입을 지정

```tsx
// src/components/Main/CategoryList.tsx

import { FunctionComponent } from 'react'
import styled from '@emotion/styled'

export type CategoryListProps = {
  selectedCategory: string
  categoryList: {
    // 프로퍼티 이름은 문자열, 프로퍼티 값은 숫자로 타입
    [key: string]: number
  }
}

const CategoryList: FunctionComponent<CategoryListProps> = function({ selectedCategory, categoryList,}) {
  return <div />
};

export default CategoryList;
```

<br>

- index 페이지에 CategoryList 컴포넌트 불러와 사용하기

```tsx
// src/pages/index.tsx

import CategoryList from 'components/Main/CategoryList'
...

const CATEGORY_LIST = {
  All: 5,
  Web: 3,
  Mobile: 2,
}
...

return (
        <Container>
          <GlobalStyle />
          <Introduction />
          <CategoryList selectedCategory="Web" categoryList={CATEGORY_LIST} />
          <Footer />
        </Container>
)
...
```

<br>

- CategoryList 컴포넌트에서 Props 받기

```tsx
// src/components/Main/CategoryList.tsx

...
const CategoryList: FunctionComponent<CategoryListProps> = function({ selectedCategory, categoryList,}) {
  return (
          <CategoryListWrapper>
            {Object.entries(categoryList).map(([name, count]) => (
                    <div key={name}>
                      #{name}({count})
                    </div>
            ))}
          </CategoryListWrapper>
  )
};
...
```

<br>
<br>

## 28. 카테고리 아이템 컴포넌트 구현

- 카테고리 아이템을 클릭하면, `/?category=Web`과 같은 형식의 URL로 이동
- `Query Parameter`로 받은 category 값과 동일한 아이템의 폰트를 굵게 표시
- Gatsby의 Link 컴포넌트에 새로운 styled Component 생성

```tsx
// src/components/Main/CategoryList.tsx

import { Link } from 'gatsby'
...

const CategoryItem = styled(Link)`
    margin-right: 20px;
    padding: 5px 0;
    font-size: 18px;
    cursor: pointer;
    
    &:last-of-type {
        margin-right: 0;
    }
`;

const CategoryList: FunctionComponent<CategoryListProps> = function({ selectedCategory, categoryList,}) {
  return (
          <CategoryListWrapper>
            {Object.entries(categoryList).map(([name, count]) => (
                    <CategoryItem
                            to={`/?category=${name}`}
                            active={name === selectedCategory}
                            key={name}
                    >
                      #{name}({count})
                    </CategoryItem>
            ))}
          </CategoryListWrapper>
  )
};

...
```

- 이 상태에서는 콘솔창에 오류 발생 : active라는 Props가 Boolean 형태이기 때문
- 단순히 해당 값을 문자열 형태로 바꿔도 해결이 가능하지만, active도 속성임
- Styled Component에서 Props로 받아서 처리하도록 수정

```tsx
// src/components/Main/CategoryList.tsx

...

const CategoryItem = styled(({ active, ...props }) => (
        <Link {...props} />
))`
  margin-right: 20px;
  padding: 5px 0;
  font-size: 18px;
  font-weight: ${({ active }) => (active ? '800' : '400')};
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }
`

...
```

- active 키 값을 가진 프로퍼티를 제외한 나머지 프로퍼티들만 props로 Link 컴포넌트에 넘겨줌으로써 해결가능
- Props 데이터들의 타입을 지정해줄 필요가 있음

```tsx
// src/components/Main/CategoryList.tsx

import React, { FunctionComponent, ReactNode } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

type CategoryItemProps = {
  active: boolean;
}

type GatsbyLinkProps = {
  children: ReactNode;
  className?: string;
  to: string;
} & CategoryItemProps

...
```

- CategoryItem 컴포넌트에서 사용할 Props, Link 컴포넌트에서 사용할 Props
- `CategoryItemProps`에서는 `active` 속성만 필요로 하기에 `GatsbyLinkProps`에 `& 연산자`를 사용하여 합쳐주기
- 타입을 Styled Component에 적용하기

```tsx
// src/components/Main/CategoryList.tsx

...
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CategoryItem = styled(({active, ...props}: GatsbyLinkProps) => (
        <Link {...props} />
))<CategoryItemProps>`
    margin-right: 20px;
    padding: 5px 0;
    font-size: 18px;
    font-weight: ${({active}) => (active? '800': '400')};
    cursor: pointer;
    
    &:last-of-type {
        margin-right: 0;
    }
`;

...
```

- CategoryItem 컴포넌트 위의 주석은 active 파라미터가 사용되지 않아 경고문이 발생하는 것을 무시하는 용도로 남용 주의

<br>

![카테고리 리스트 컴포넌트 확인](readme_assets/category_list_rendering_check.png)

<카테고리 리스트 컴포넌트 확인>

<br>
<br>

## 29. 카테고리 목록 컴포넌트 구현

- CSS의 Grid 속성 지식이 도움이 됨
- 포스트 아이템을 감쌀 Styled Component 정의

```tsx
// src/components/Main/PostList.tsx

import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

const PostListWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    width: 768px;
    margin: 0 auto;
    padding: 50px 0 100px;
`

const PostList: FunctionComponent = function () {
  return <PostListWrapper></PostListWrapper>
}

export default PostList;
```

- `grid-template-columns` 속성은 그리드 컨테이너의 열(Column)의 크기를 정의
- `1fr` : `fractional unit`을 의미, 사용가능 공간을 동등한 비율로 사용하는 것을 의미
  - `1fr 1fr` : 두 개의 동일한 너비의 열로 나누겠다는 의미
- 만든 PostList 컴포넌트를 index 페이지에 적용하기

```tsx
// src/pages/index.tsx

import PostList from 'components/Main/PostList'

...
const IndexPage: FunctionComponent = function () {
  return (
          <Container>
            <GlobalStyle />
            <Introduction />
            <CategoryList selectedCategory="Web" categoryList={CATEGORY_LIST} />
            <PostList />
            <Footer />
          </Container>
  )
}
...
```

<br>
<br>

## 30. 포스트 아이템 컴포넌트 구현

- 아이템에서 필요로 하는 데이터 목록
  - 포스트 제목
  - 업로드 날짜
  - 카테고리 목록
  - 포스트 요약
  - 썸네일 이미지
  - 포스트 링크
- 해당 데이터는 모두 부모 컴포넌트에서 Props로 받을 것이므로 PostItem.tsx 파일 생성

```tsx
// src/components/Main/PostItem.tsx

import React, {FunctionComponent} from 'react'

type PostItemProps = {
  title: string
  date: string
  categories: string[]
  summary: string
  thumbnail: string
  link: string
}

const PostItem: FunctionComponent<PostItemProps> = function ({
                                                               title,
                                                               date,
                                                               categories,
                                                               summary,
                                                               thumbnail,
                                                               link,
                                                             }) {
  return <div />
};

export default PostItem;
```

- 포스트 아이템을 부모 컴포넌트인 PostList 컴포넌트에 불러오기
- 부모 컴포넌트에서 PostItem 컴포넌트로 Props 데이터 보내기

```tsx
// src/components/Main/PostList.tsx

import PostItem from 'components/Main/PostItem'

const POST_ITEM_DATA = {
  title: 'Post Item Title',
  date: '2024.02.15',
  categories: ['Web', 'Frontend', 'Testing'],
  summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident repellat doloremque fugit quis rem temporibus! Maxime molestias, suntrem debitis odit harum impedit. Modi cupiditate harum dignissimos eos in corrupti!',
  thumbnail: 'https://ji5485.github.io/static/e4f34c558ae8e8235ff53b0311085796/4d854/javascript-core-concept-summary-function-1.webp',
  link: 'https://www.google.co.kr/'
}

...

const PostList: FunctionComponent = function () {
  return (
          <PostListWrapper>
            <PostItem {...POST_ITEM_DATA} />
            <PostItem {...POST_ITEM_DATA} />
            <PostItem {...POST_ITEM_DATA} />
            <PostItem {...POST_ITEM_DATA} />
          </PostListWrapper>
  )
}
...
```

- 포스트 아이템 구현

```tsx
// src/components/Main/PostItem.tsx

import React, {FunctionComponent} from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

type PostItemProps = {
  title: string
  date: string
  categories: string[]
  summary: string
  thumbnail: string
  link: string
}

const PostItemWrapper = styled(Link)`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
    transition:0.3s box-shadow;
    cursor: pointer;
    
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
`;

const ThumbnailImage = styled.img`
    width: 100%;
    height: 200px;
    border-radius: 10px 10px 0 0;
    object-fit: cover;
`;

const PostItemContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 15px;
`;

const Title = styled.div`
    display: -webkit-box;
    overflow: hidden;
    margin-bottom: 3px;
    text-overflow: ellipsis;
    white-space: normal;
    overflow-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 20px;
    font-weight: 700;
`;

const Date = styled.div`
    font-size: 14px;
    font-weight: 400;
    opacity: 0.7;
`;

const Category = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    margin: 10px -5px;
`;

const CategoryItem = styled.div`
    margin: 2.5px 5px;
    padding: 3px 5px;
    border-radius: 3px;
    background: black;
    font-size: 14px;
    font-weight: 700;
    color: white;
`;

const Summary = styled.div`
    display: -webkit-box;
    overflow: hidden;
    margin-top: auto;
    text-overflow: ellipsis;
    white-space: normal;
    overflow-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 16px;
    opacity: 0.8;
`;

const PostItem: FunctionComponent<PostItemProps> = function ({
                                                               title,
                                                               date,
                                                               categories,
                                                               summary,
                                                               thumbnail,
                                                               link,
                                                             }) {
  return (
          <PostItemWrapper>
            <ThumbnailImage src={thumbnail} alt="Post Item Image" />

            <PostItemContent>
              <Title>{title}</Title>
              <Date>{date}</Date>
              <Category>{categories.map(category => (
                      <CategoryItem key={category}>{category}</CategoryItem>
              ))}</Category>
              <Summary>{summary}</Summary>
            </PostItemContent>
          </PostItemWrapper>
  )
};

export default PostItem;
```

<br>

![포스트 아이템](readme_assets/PostList.png)

<포스트 아이템>

<br>
<br>

## 31. CSS 미디어 쿼리 사용

- 디바이스의 화면 해상도, 너비에 따라 다른 스타일 지정
- 기준 너비를 태블릿 너비 768px로 설정

```css
/*미디어 쿼리 구조 예시*/

@media (max-width: 768px) {
  ...
}
```

- 해당 쿼리는 너비가 768px 이하일 경우, 적용됨

<br>

### 프로필 이미지 반응형 디자인 구현

- 현재 프로필 이미지는 120px X 120px이지만 768px 이하인 경우, 80px로 크기 축소시키기

```tsx
// src/components/Main/ProfileImage.tsx

...
const ProfileImageWrapper = styled.img`
    width: 120px;
    height: 120px;
    margin-bottom: 30px;
    border-radius: 50%;
    
    @media (max-width: 768px) {
        width: 80px;
        height: 80px;
    }
`;

...
```

<br>

![프로필 이미지 반응형](readme_assets/profileImage_responsive.gif)

<프로필 이미지 반응형>

<br>

### 소개글 반응형 구현

```tsx
// src/components/Main/Introduction.tsx

...
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 768px;
    height: 400px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
        width: 100%;
        height: 300px;
        padding: 0 20px;
    }
`;

const SubTitle = styled.div`
    font-size: 20px;
    font-weight: 400;
    
    @media (max-width: 768px) {
        font-size: 15px;
    }
`;

const Title = styled.div`
    margin-top: 5px;
    font-size: 35px;
    font-weight: 700;
    
    @media (max-width: 768px) {
        font-size: 25px;
    }
`;

...
```

<br>

![소개글 반응형](readme_assets/introduction_responsive.gif)

<소개글 반응형>

<br>

### CategoryList 컴포넌트 반응형 구현

- 가로 길이가 768px로 맞춰져 있지만, 화면 너비가 768px 이하일 경우, 양 옆 20px 여백을 두고 꽉 채우도록 구현
- 폰트 사이즈 줄이기

```tsx
// src/components/Main/CategoryList.tsx

...
const CategoryListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 768px;
    margin: 100px auto 0;
    
    @media (max-width: 768px) {
        width: 100%;
        margin-top: 50px;
        padding: 0 20px;
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CategoryItem = styled(({active, ...props}: GatsbyLinkProps) => (
        <Link {...props} />
))<CategoryItemProps>`
    margin-right: 20px;
    padding: 5px 0;
    font-size: 18px;
    font-weight: ${({active}) => (active? '800': '400')};
    cursor: pointer;
    
    &:last-of-type {
        margin-right: 0;
    }
    
    @media (max-width: 768px) {
        font-size: 15px;
    }
`;
...
```

<br>

### PostList 컴포넌트 반응형 구현

- 화면 너비 768px 이하일 경우, 양 옆 20px 여백을 두고 꽉 채우도록 구현
- 2줄로 포스트 아이템을 띄워주던 것을 한 줄로 띄워주기

```tsx
// src/components/Main/PostList.tsx

...
const PostListWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    width: 768px;
    margin: 0 auto;
    padding: 50px 0 100px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        width: 100%;
        padding: 50px 20px;
    }
`;
...
```

<br>

### Footer 컴포넌트 반응형 구현

- 폰트 사이즈 줄이기

```tsx
// src/components/Common/Footer.tsx

const FooterWrapper = styled.div`
    display: grid;
    place-items: center;
    margin-top: auto;
    padding: 50px 0;
    font-size: 15px;
    text-align: center;
    line-height: 1.5;
    
    @media (max-width: 768px) {
        font-size: 13px;
    }
`;
```

<br>

![반응형 화면 구현](readme_assets/main_responsive.gif)

<반응형 화면 구현>

<br/>
<br/>

## 32. Markdown 처리

### Markdown 처리를 위한 라이브러리

1. `gatsby-transformer-remark` : Markdown Parser 역할을 하는 라이브러리로 마크다운 문법을 HTML 형태로 변환해주어 띄워줄 수 있도록 해줌
2. `gatsby-remark-images` : 마크다운 문서 내에서의 이미지 사용을 최적화해주는 라이브러리로 다양한 반응형 이미지 생성, 동적 로딩 등 다양한 기능을 제공
3. `gatsby-remark-prismjs & prismjs` : prismjs는 문법 하이라이팅 역할을 담당하는 라이브러리로 소스코드를 실제 IDE에서 보는 것처럼 변환해주는 기능을 제공
4. `gatsby-remark-smartypants` : 해당 라이브러리는 글 내에서 사용되는 여러 문장 부호들을 더 깔끔한 부호로 바꿔주는 기능을 제공하여 글의 가독성을 보다 더 높일 수 있음
5. `gatsby-remark-copy-linked-files` : 마크다운 내에서 사용되는 이미지를 특정 디렉토리로 복사해주는 라이브러리이며 일반적으로 루트 디렉토리의 public 디렉토리에 이미지들이 복사됨
6. `gatsby-remark-external-links` : 마크다운 내에서 사용되는 링크 태그의 target, rel 등의 속성을 지정해주는 기능을 제공

<br/>

### 라이브러리 설치

- 아래의 명령어를 통해 한 번에 설치

```bash
$ yarn add gatsby-transformer-remark gatsby-remark-images gatsby-remark-prismjs prismjs gatsby-remark-smartypants gatsby-remark-copy-linked-files gatsby-remark-external-links
```

<br/>

### gatsby-config.js 설정

- gatsby-config.js 파일에서 사용하기 위한 라이브러리를 추가해줘야 함

```js
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
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    // 설치한 라이브러리들 추가 및 옵션 설정
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              dashes: 'oldschool',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 768,
              quality: 100,
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {},
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
        ],
      },
    },
  ],
};
```

<br/>

### gatsby-browser.js 작성

- 마크다운 내의 `소스코드 테마`를 적용하기 위해 `gatsby-browser.js 파일`에 테마를 불러오는 코드를 작성해야 함
- `prism-tomorrow 테마`를 적용하는 것을 예시로 하지만 이외에도 다양한 테마를 제공함
- [PrismJS/prism 다양한 테마 - Github](https://github.com/PrismJS/prism/tree/1d5047df37aacc900f8270b1c6215028f6988eb1/themes)

```js
// gatsby-browser.js

import 'prismjs/themes/prism-tomorrow.css';
```

<br/>

### Markdown 파일 추가

- gatsby-config.js 파일에 정의되어있음
- gatsby-source-filesystem 라이브러리 옵션 중, path 옵션의 경로에 마크다운 파일을 저장해야 Gatsby 라이브러리에서 불러올 수 있음

```js
// gatsby-config.js

module.exports = {
  siteMetadata: { ... },
  plugins: [
    //...,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },
    //...
  ],
};
```

<br/>

- 마크다운 test 파일 만들어보기
- 상단의 date, title, categories, summary, thumbnail 부분은 GraphQL을 통해 처리되는 데이터임
- 해당 데이터를 GraphQL 쿼리로 불러와 메인 페이지에서 PostItem을 보여주는 용도로 사용됨

```markdown
[//]: # (contents/test.md)

---
date: '2020-07-29'
title: 'Test'
categories: ['Web', 'SEO', 'Optimization']
summary: '홈페이지를 운영하는 많은 사람들 또는 기업들이 검색 페이지 최상단에 보여지게 하기 위해 어떤 최적화 작업을 하는지 알아보자.'
thumbnail: './test.png'
---

### 1. Help Google Bot to Find My Contents

구글에 SiteMap을 제출하여 사이트에 있는 파일로서 새 페이지나 변경된 페이지가 있을 때 이를 검색 엔진에 알려주도록 할 수 있다.

SiteMap은 사이트에 있는 페이지, 동영상 및 기타 파일과 각 관계에 관한 정보를 제공하는 파일로, 검색 엔진은 이를 읽고 사이트를 더 지능적으로 크롤링 할 수 있게 된다.

### 2. Use 'Robots.txt' File

Robots.txt 파일은 검색 엔진에 어떤 페이지를 크롤링해도 되는지 알리는 파일로, 서버의 루트 디렉토리에 있어야 한다.

과도한 Robots.txt 파일은 더 많은 방문자를 유도할 수 있는 정상적인 검색 엔진 크롤러의 접근을 막을 가능성이 있기 때문에 적절하게 설정해야 한다.

---

## Source

- SEO 기본 가이드

  [<https://support.google.com/webmasters/answer/7451184?hl=ko&ref_topic=9460495>](<https://support.google.com/webmasters/answer/7451184?hl=ko&ref_topic=9460495>)
```

<br/>

### GraphQL을 통해 Markdown 정보 쿼리하기

- http://localhost:8000/___graphql 페이지에 접속해 GraphiQL IDE를 켜기
- 아래 쿼리문 실행

```graphql
query MyQuery {
  allMarkdownRemark {
    edges {
      node {
        id
        frontmatter {
          title
          date
          summary
          categories
        }
      }
    }
  }
}
```

<br/>

<p align="center">
  <img src="readme_assets/graphiQL_markdown.png" width="600" alt="마크다운 graphql 쿼리"><br/>
  <span>GraphiQL로 마크다운 쿼리</span>
</p>

<br/>

### index.tsx 페이지에서 쿼리 작성

- 썸네일 이미지로 사용할 테스트 이미지를 `contents 디렉토리`에 `test.png` 이름으로 저장하기
- index.tsx 페이지에서 쿼리 작성하기

```tsx
// src/pages/index.tsx

import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from 'components/Common/GlobalStyle'
import Introduction from 'components/Main/Introduction'
import CategoryList from 'components/Main/CategoryList'
import Footer from 'components/Common/Footer'
import PostList from 'components/Main/PostList'

// gatsby에서 쿼리문을 작성할 graphql 템플릿 리터럴 태그 가져오기
import {graphql} from 'gatsby'

const CATEGORY_LIST = {
  All: 5,
  Web: 3,
  Mobile: 2,
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const IndexPage: FunctionComponent = function () {
  return (
          <Container>
            <GlobalStyle />
            <Introduction />
            <CategoryList selectedCategory="Web" categoryList={CATEGORY_LIST} />
            <PostList />
            <Footer />
          </Container>
  )
}

export default IndexPage

// GraphQL 쿼리문 작성
// 날짜, 제목을 기준으로 내림차순 (sort)
export const getPostList = graphql`
    query getPostList {
        allMarkdownRemark(
            sort: {order:DESC, fields: [frontmatter__date, frontmatter__title]}
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        summary
                        date(formatString: "YYYY.MM.DD.")
                        categories
                        thumbnail {
                            publicURL
                        }
                    }
                }
            }
        }
    }
`
```

<br/>

### 쿼리한 data props로 전달

- GraphiQL에서 확인 할 수 있듯이 쿼리를 통해 받은 데이터는 `data`라는 이름으로 받아짐
- data를 IndexPage 컴포넌트에 props로 전달

```js
// src/pages/index.tsx

// ...
const IndexPage: FunctionComponent = function ({
                                                 data: {
                                                   allMarkdownRemark: { edges },
                                                 },
                                               }) {
// ...
```

<br/>

### props 타입 선언

```js
// src/pages/index.tsx

import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from 'components/Common/GlobalStyle'
import Footer from 'components/Common/Footer'
import CategoryList from 'components/Main/CategoryList'
import Introduction from 'components/Main/Introduction'
import PostList from 'components/Main/PostList'
import { graphql } from 'gatsby'

// type 선언
type IndexPageProps = {
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: {
            id: string
            frontmatter: {
              title: string
              summary: string
              date: string
              categories: string[]
              thumbnail: {
                publicURL: string
              }
            }
          }
        },
      ]
    }
  }
}

// ...

// 함수형 컴포넌트에 타입 지정
const IndexPage: FunctionComponent<IndexPageProps> = function ({

// ...
```

<br/>

### IndexPageProps 타입 PostList 컴포넌트로 옮기기

- IndexPageProps 타입 하위의 node부터의 타입은 PostList 컴포넌트에 PostType의 이름으로 옮기기
- 또한 PostList의 더미데이터 지우기

```tsx
// src/components/Main/PostList.tsx

import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import PostItem from 'components/Main/PostItem'

export type PostType = {
  node: {
    id: string
    frontmatter: {
      title: string
      summary: string
      date: string
      categories: string[]
      thumbnail: {
        publicURL: string
      }
    }
  }
}

const PostListWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    width: 768px;
    margin: 0 auto;
    padding: 50px 0 100px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        width: 100%;
        padding: 50px 20px;
    }
`;

const PostList: FunctionComponent = function () {
  return (
          <PostListWrapper></PostListWrapper>
  )
}

export default PostList;
```

<br/>

- index.tsx 페이지 수정

```tsx
// src/pages/index.tsx

import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from 'components/Common/GlobalStyle'
import Introduction from 'components/Main/Introduction'
import CategoryList from 'components/Main/CategoryList'
import Footer from 'components/Common/Footer'

// PostType 가져오기
import PostList, { PostType } from 'components/Main/PostList'
import {graphql} from 'gatsby'

type IndexPageProps = {
  data: {
    allMarkdownRemark: {
      edges: PostType[]
    }
  }
}

// ...
```

<br/>

- data props의 edge 배열 데이터를 PostList 컴포넌트에 posts라는 이름의 props로 전달하기

```tsx
// src/pages/index.tsx

// ...

const IndexPage: FunctionComponent<IndexPageProps> = function ({
                                                                 data: {
                                                                   allMarkdownRemark: { edges },
                                                                 },
                                                               }) {
  return (
          <Container>
            <GlobalStyle />
            <Introduction />
            <CategoryList selectedCategory="Web" categoryList={CATEGORY_LIST} />

            {/*edges 배열 posts 이름의 props로 전달*/}
            <PostList posts={edges} />
            <Footer />
          </Container>
  )
}

// ...
```

<br/>

### PostList 컴포넌트에서 PostItem 컴포넌트로 props 전달

- 타입 정의

```tsx
// src/components/Main/PostList.tsx

// ...

export type PostType = {
  node: {
    id: string
    frontmatter: {
      title: string
      summary: string
      date: string
      categories: string[]
      thumbnail: {
        publicURL: string
      }
    }
  }
}

type PostListProps = {
  posts: PostType[]
}

// ...

const PostList: FunctionComponent<PostListProps> = function ({
                                                               posts,
                                                             }) {

// ...
```

<br/>

- map 메서드를 통해 posts 배열의 값을 PostItem 컴포넌트로 전달하기

```tsx
// src/components/Main/PostList.tsx

// ...

const PostList: FunctionComponent<PostListProps> = function ({ posts }) {
  return (
    <PostListWrapper>
      {posts.map(
        ({
           node: { id, frontmatter },
         }: PostType) => (
           <PostItem
                   {...frontmatter}
                   link="https://www.google.co.kr/"
                   key={id}
           />
        ),
      )}
    </PostListWrapper>
  )
}

export default PostList
```

<br/>

- PostItem 컴포넌트 수정

```tsx
// src/components/Main/PostItem.tsx

// ...

type PostItemProps = {
  title: string
  date: string
  categories: string[]
  summary: string
  thumbnail: {
    publicURL: string
  }
  link: string
}

// ...

const PostItem: FunctionComponent<PostItemProps> = function ({
                                                               title, date, categories, summary, thumbnail: { publicURL }, link,
                                                             }) {
  return (
          <PostItemWrapper to={link}>
            <ThumbnailImage src={publicURL} alt="Post Item Image" />

            <PostItemContent>
              <Title>{title}</Title>
              <Date>{date}</Date>
              <Category>
                {categories.map(category => (
                        <CategoryItem key={category}>{category}</CategoryItem>
                ))}
              </Category>
              <Summary>{summary}</Summary>
            </PostItemContent>
          </PostItemWrapper>
  )
}

export default PostItem
```

<br/>

### 중복되는 타입 분리하기

- PostItem 컴포넌트의 Props 타입과 PostList 컴포넌트의 PostListItemType 타입에서 중복되는 부분이 있음
- PostListItemType 타입 중, frontmatter 프로퍼티에 해당하는 값이 중복

```tsx
// src/components/Main/PostItem.tsx

type PostItemProps = {
  title: string
  date: string
  categories: string[]
  summary: string
  thumbnail: {
    publicURL: string
  }
  link: string
}
```

```tsx
// src/components/Main/PostList.tsx

export type PostType = {
  node: {
    id: string
    frontmatter: {
      title: string
      summary: string
      date: string
      categories: string[]
      thumbnail: {
        publicURL: string
      }
    }
  }
}
```

<br/>

- 중복을 없애기 위해 `src/types/PostItem.types.ts` 파일 생성 후, 중복되는 타입 부분 분리하기

```ts
// src/types/PostItem.types.ts

export type PostFrontmatterType = {
  title: string
  date: string
  categories: string[]
  summary: string
  thumbnail: {
    publicURL: string
  }
}

export type PostListItemType = {
  node: {
    id: string
    frontmatter: PostFrontmatterType
  }
}
```

<br/>

- 생성한 타입을 PostList 컴포넌트와 PostItem 컴포넌트로 불러와 적용하기

```tsx
// src/components/Main/PostList.tsx

// ...

import { PostListItemType } from 'types/PostItem.types'

// 기존에 정의했던 PostListItemType 삭제

type PostListProps = {
  posts: PostListItemType[]
}

// ...
```

```tsx
// src/components/Main/PostItem.tsx

// ...

import { PostFrontmatterType } from 'types/PostItem.types'

type PostItemProps = PostFrontmatterType & { link: string }

// ...
```

<br/>

- index.tsx 페이지에도 적용

```tsx
// src/pages/index.tsx

// ...

import { PostListItemType } from 'types/PostItem.types'

type IndexPageProps = {
  data: {
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
  }
}

// ...
```

<br/>
<br/>

## 33. gatsby-plugin-image 라이브러리로 썸네일 최적화

### gatsby-plugin-image 라이브러리

- `GraphQL 쿼리`를 통해 이미지 링크를 받아와 썸네일 이미지를 띄워주는 방식은 `완전히 로딩되기 전까지 이미지가 화면에 나타나지 않아` UX적으로 좋지 않음
- 또한 `이미지 사이즈와 해상도 조절이 불가능`하기에 파일 용량이 클수록 로딩시간이 더 길어질 수 있음
- 이러한 문제를 해결하기 위해 `gatsby-plugin-image` 라이브러리를 사용함

<br/>

### gatsby-plugin-image 라이브러리 세팅 및 사용

- `gatsby-plugin-image`, `gatsby-plugin-sharp`, `gatsby-transformer-sharp`3가지 라이브러리 설치하기

```bash
$ yarn add gatsby-plugin-image gatsby-plugin-sharp gatsby-transformer-sharp
```

<br/>

- gatsby-config.js에 플러그인 옵션 추가

```js
// gatsby-config.js

module.exports = {
  plugins: [
    // ...,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: ['auto', 'webp'],
          quality: 100,
          placeholder: 'blurred',
        }
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    // ...
  ],
}
```

<br/>

- gatsby-plugin-image 라이브러리 사용 예시
- 기본적인 구조는 아래의 예시와 같음

```tsx
// gatsby-plugin-image 예시

import { GatsbyImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'

// gatsby-plugin-image에서 제공하는 GatsbyImage 컴포넌트 사용
// 쿼리 응답 데이터는 data라는 이름으로 전달됨
export default ({ data }) => (
  <div>
    <h1>hello gatsby-image</h1>
    <GatsbyImage
      // image 속성에 쿼리를 통해 가져온 gatsbyImageData 넣기
      image={data.file.childImageSharp.gatsbyImageData}
      alt="Gatsby Image"
    />
  </div>
)

// 이미지 가져오는 쿼리
export const imageQuery = graphql`
  {
    file {
      childImageSharp {
        gatsbyImageData(width: 700)
      }
    }
  }
`
```

- 라이브러리에 의해 내부적으로 이미지가 가공되어 `childImageSharp` 프로퍼티가 존재하고 해당 프로퍼티 안에 `gatsbyImageData` 프로퍼티가 있음
- gatsbyImageData 프로퍼티가 gatsby-plugin-image 라이브러리에서 사용할 이미지 데이터임

<br/>

### index.tsx 쿼리문 수정

```tsx
// src/pages/index.tsx

// ...
export const getPostList = graphql`
    query getPostList {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        summary
                        date(formatString: "YYYY.MM.DD.")
                        categories
                        thumbnail {
                            
                            // 기존에는 publicURL
                            
                            childImageSharp {
                                gatsbyImageData(width: 768, height: 400)
                            }
                        }
                    }
                }
            }
        }
    }
`
```

<br/>

- 쿼리문 변경으로 인해 props 타입을 변경해주어야하는데 해당 부분은 `PostItem.types.ts` 파일에 존재

```ts
// src/types/PostItem.types.ts

import {IGatsbyImageData} from 'gatsby-plugin-image'

export type PostFrontmatterType = {
  title: string
  date: string
  categories: string[]
  summary: string
  thumbnail: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

// ...
```

<br/>

- PostItem.tsx 수정

```tsx
// src/components/Main/PostItem.tsx

// GatsbyImage 컴포넌트 가져오기
import {GatsbyImage} from 'gatsby-plugin-image'

// ...

// 기존 img 요소 Styled Component 대신 GatsbyImage 컴포넌트 활용
const ThumbnailImage = styled(GatsbyImage)`
    width: 100%;
    height: 200px;
    border-radius: 10px 10px 0 0;
    // 이미지 크기와 해상도 등은 gatsby-config.js에서 설정했기에 object-fit 속성 지우기
    // object-fit: cover;
`;

// ...

const PostItem: FunctionComponent<PostItemProps> = function ({
                                                               title,
                                                               date,
                                                               categories,
                                                               summary,
                                                               thumbnail: {
                                                                 // 타입 수정
                                                                 childImageSharp: { gatsbyImageData },
                                                               },
                                                               link,
}) {
  return (
          <PostItemWrapper to={link}>
            {/*src 속성 대신 image 속성 사용 및 속성 값으로 gatsbyImageData 연결*/}
            <ThumbnailImage image={gatsbyImageData} alt="Post Item Image" />

            <PostItemContent>
              <Title>{title}</Title>
              <Date>{date}</Date>
              <Category>
                {categories.map(item => (
                        <CategoryItem key={item}>{item}</CategoryItem>
                ))}
              </Category>
              <Summary>{summary}</Summary>
            </PostItemContent>
          </PostItemWrapper>
  )
}

export default PostItem
```

- gatsby-config.js 파일에서 placeholder 속성에 blurred를 지정했었기 때문에 썸네일 불러올 때, blurred 효과를 볼 수 있음

<br/>

<p align="center">
  <img src="readme_assets/gatsby-plugin-image.gif" alt="gatsby-plugin-image" width="600"><br/>
  <span>gatsby-plugin-image를 통한 썸네일</span>
</p>

<br/>

### 프로필 이미지 Lazy Loading 적용하기

- index 페이지의 상단 Introduction.tsx 컴포넌트에서 프로필 이미지를 사용했음
- 프로필 이미지도 `gatsby-plugin-image`를 통해 Lazy Loading 기능을 적용할 수 있음
- 루트 디렉토리에 `static 폴더` 생성 후, `profile-image` 이름으로 프로필 이미지 저장
- `gatsby-source-filesystem` 라이브러리를 통해 static 디렉토리 내의 파일도 GraphQL로 처리할 수 있도록 설정

```js
// gatsby-config.js

module.exports = {
  siteMetadata: { ... },
  plugins: [
    // ...,
    { 
      resolve: `gatsby-source-filesystem`,
      options: { 
        name: `contents`,
        path: `${__dirname}/contents`, 
      }, 
    }, 
          
    // static 폴더 추가
    { 
      resolve: `gatsby-source-filesystem`,
      options: { 
        name: `images`,
        path: `${__dirname}/static`, 
      }, 
    }, 
    // ...
  ],
};
```

<br/>

- index.tsx 페이지에서 프로필 이미지 쿼리문 작성
- Introduction.tsx 컴포넌트에 profileImage라는 이름으로 props 전달

```tsx
// src/pages/index.tsx

//...

// gatsby-plugin-image의 IGatsbyImageData 타입 가져오기
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { PostListItemType } from 'types/PostItem.types'

type IndexPageProps = {
  data: {
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
    
    // file 쿼리의 타입 설정
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
}

// ...

const IndexPage: FunctionComponent<IndexPageProps> = function ({
                                                                 data: {
                                                                   allMarkdownRemark: { edges },
                                                                   // file 데이터 받기
                                                                   file: {
                                                                     childImageSharp: { gatsbyImageData },
                                                                   },
                                                                 },
                                                               }) {
  return (
          <Container>
            <GlobalStyle />
            
            {/*Introduction 컴포넌트에 props로 gatsbyImageData 전달*/}
            <Introduction profileImage={gatsbyImageData} />
            <CategoryList selectedCategory="Web" categoryList={CATEGORY_LIST} />
            <PostList posts={edges} />
            <Footer />
          </Container>
  )
}

export default IndexPage

export const getPostList = graphql`
  query getPostList {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
    
    // 프로필 이미지 쿼리문 작성
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
    }
  }
`
```

<br/>

- 프로필 이미지를 props로 전달받은 Introduction.tsx 컴포넌트 수정하기

```tsx
// src/components/Main/Introduction.tsx

// ...
import { IGatsbyImageData } from 'gatsby-plugin-image'
import ProfileImage from 'components/Main/ProfileImage'

// props를 위한 타입 생성
type IntroductionProps = {
  profileImage: IGatsbyImageData
}

// ...

// 타입 지정 및 props로 profileImage 받기
const Introduction: FunctionComponent<IntroductionProps> = function ({
                                                                       profileImage,
                                                                     }) {
  return (
          <Background>
            <Wrapper>
              
              {/*ProfileImage 컴포넌트에 profileImage 다시 props로 전달*/}
              <ProfileImage profileImage={profileImage} />

              <div>
                <SubTitle>Nice to Meet You,</SubTitle>
                <Title>I'm Junior Frontend Developer Hyun.</Title>
              </div>
            </Wrapper>
          </Background>
  )
}

export default Introduction
```

<br/>

- ProfileImage.tsx 컴포넌트에서 GatsbyImage 컴포넌트 사용해 기존 이미지 태그 교체

```tsx
// src/components/Main/ProfileImage.tsx

import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

// GatsbyImage 컴포넌트와 IGatsbyImageData 타입 가져오기
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

// props를 위한 타입 생성
type ProfileImageProps = {
  profileImage: IGatsbyImageData
}

// 기존 img 태그가 아닌 GatsbyImage 컴포넌트로 Styled Component 수정
const ProfileImageWrapper = styled(GatsbyImage)`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`

// 타입 지정 및 props 데이터 받기
const ProfileImage: FunctionComponent<ProfileImageProps> = function ({
                                                                       profileImage,
                                                                     }) {
  // image 속성으로 profileImage 데이터 넣기
  return <ProfileImageWrapper image={profileImage} alt="Profile Image" />
}

export default ProfileImage
```

- 프로필 이미지도 최적화 및 Lazy Loading 됨

<br/>

<p align="center">
  <img src="readme_assets/profileImage_lazy_loading.gif" alt="profile lazy loading" width="600"><br/>
  <span>프로필 이미지 Lazy Loading</span>
</p>

<br/>
<br/>

## 34. URL로부터 선택된 카테고리 파싱하기

- CategoryList.tsx 컴포넌트에서 아이템 선택 시, `to={/?category=${name}}`속성을 통해 `http://localhost:8000/?category=Web` 와 같은 링크로 이동하도록 구현
- 따라서 URL에서 해당 카테고리 아이템을 파싱해야 함
- 기본적으로 Gatsby 페이지 컴포넌트에서는 쿼리(?category=Web)를 props로 받을 수 있음
- URL Paser 라이브러리인 `query-string` 라이브러리를 통해 객체로 변환 후, 해당 값 저장하기

<br/>

### query-string 라이브러리 설치

```bash
$ yarn add query-string
```

<br/>

### index.tsx 수정

- props를 받는 부분과 타입을 변경

```tsx
// src/pages/index.tsx

// ...

type IndexPageProps = {
  // URL의 query string 데이터는 location 객체 내의 search 프로퍼티에 들어감
  location: {
    search: string
  }
  data: {
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
}

// ...

const IndexPage: FunctionComponent<IndexPageProps> = function ({
                                                                // search 데이터 props로 받기
                                                                 location: { search },
                                                                 data: {
                                                                   allMarkdownRemark: { edges },
                                                                   file: {
                                                                     childImageSharp: { gatsbyImageData },
                                                                   },
                                                                 },
                                                               }) {

// ...
```

<br/>

- URL 데이터 쿼리 파싱하기
- `query-string` 라이브러리에서 제공하는 `parse` 함수를 통해 구현

```tsx
// src/pages/index.tsx

// ...

// query-string에서 queryString 객체와 ParsedQuery 타입 가져오기
import queryString, { ParsedQuery } from 'query-string'

type IndexPageProps = {
  location: {
    search: string
  }
  data: {
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
}

// ...

const IndexPage: FunctionComponent<IndexPageProps> = function ({
                                                                 location: { search },
                                                                 data: {
                                                                   allMarkdownRemark: { edges },
                                                                   file: {
                                                                     childImageSharp: { gatsbyImageData },
                                                                   },
                                                                 },
                                                               }) {
  // search 데이터 queryString의 parse 함수로 파싱 후, parsed 객체 변수에 저장
  // 변수의 타입은 ParsedQuery 타입으로 지정해야하며, 해당 객체의 프로퍼티 타입인 string을 제네릭으로 지정해 줌
  const parsed: ParsedQuery<string> = queryString.parse(search)
  // parsed의 category 타입이 문자열이 아니거나, 값이 없으면 'All'을 아니면 '해당 값'을 selectedCategory에 할당
  const selectedCategory: string =
          typeof parsed.category !== 'string' || !parsed.category
                  ? 'All'
                  : parsed.category

  return (
          <Container>
            <GlobalStyle />
            <Introduction profileImage={gatsbyImageData} />
            <CategoryList
                    // selectedCategory에 할당된 값을 CategoryList에 props로 전달
                    selectedCategory={selectedCategory}
                    categoryList={CATEGORY_LIST}
            />
            <PostList posts={edges} />
            <Footer />
          </Container>
  )
}

// ...
```

<br/>

<p align="center">
  <img src="readme_assets/query-string.gif" alt="query-string" width="600"><br/>
  <span>URL 파싱을 통한 카테고리 리스트</span>
</p>

<br/>

### 마크다운 데이터로 카테고리 목록 만들기

- 임의로 All, Web, Mobile과 같이 카테고리 더미 객체를 만들어 전달하는 것이 아닌, props로 받은 edges 데이터를 통해 해당 객체의 형태를 따라 카테고리 목록 만들기
- `reduce` 메서드를 사용하여 모든 edges 데이터를 순회하고, 각 edges 데이터의 categories 배열을 순회하여 각 category 개수 누적 연산하기
- `reduce`를 매번 재실행하는 것이 아닌 `useMemo`를 사용하여 불필요한 재연산 막기

```tsx
// src/pages/index.tsx

import React, { FunctionComponent, useMemo } from 'react'

// ...

// CATEGORY_LIST 상수 제거

const IndexPage: FunctionComponent<IndexPageProps> = function ({
                                                                 location: { search },
                                                                 data: {
                                                                   allMarkdownRemark: { edges },
                                                                   file: {
                                                                     childImageSharp: { gatsbyImageData },
                                                                   },
                                                                 },
                                                               }) {
  const parsed: ParsedQuery<string> = queryString.parse(search);
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category ? 'All' : parsed.category;

  // useMemo 함수는 최적화된 값을 반환
  const categoryList = useMemo(() =>
    // reduce 메서드(배열을 순회하며 누적된 값을 계산)로 edges 배열을 반복
    edges.reduce(
      (
        // reduce 첫번째 인자(accumulator)으로 타입 넣기
        list: CategoryListProps['categoryList'],
        // reduce 두번째 인자(current)는 각 edges의 categories
        {
          node: {
            frontmatter: { categories },
          },
        }: PostType,
      ) => {
        // categories를 순회하며 없으면 카테고리를 객체에 넣고 값을 1로 설정
        // category가 있으면 값에 더하기 1
        categories.forEach(category => {
          if (list[category] === undefined) list[category] = 1;
          else list[category]++;
        });
        // 'All'은 categories마다 더하기 1
        list['All']++;
        // list를 반환
        return list;
        }, 
            // list 객체의 초기 값
            { All: 0 },
    ), [],);

  return (
          <Container>
            <GlobalStyle />
            <Introduction profileImage={gatsbyImageData} />
            <CategoryList
                    selectedCategory={selectedCategory}
                    // useMemo로 최적화한 categoryList를 props로 전달
                    categoryList={categoryList}
            />
            <PostList posts={edges} />
            <Footer />
          </Container>
  )
}

// ...
```

<br/>

### 카테고리 별로 PostItem.tsx 컴포넌트 띄우기

- 파싱한 URL의 category 값을 통해 해당 category에 해당하는 포스트 아이템만 띄워주기

```tsx
// src/components/Main/PostList.tsx

// ...

// PostList props의 타입에 selectedCategory 추가
type PostListProps = {
  selectedCategory: string
  posts: PostListItemType[]
}

// ...

// props로 selectedCategory 추가
const PostList: FunctionComponent<PostListProps> = function ({
                                                               selectedCategory,
                                                               posts,
                                                             }) {

// ...
```

<br/>

- index.tsx 페이지에서 selectedCategory props로 전달

```tsx
// src/pages/index.tsx

// ...

const IndexPage: FunctionComponent<IndexPageProps> = function ({
                                                                 location: { search },
                                                                 data: {
                                                                   allMarkdownRemark: { edges },
                                                                   file: {
                                                                     childImageSharp: { gatsbyImageData },
                                                                   },
                                                                 },
                                                               }) {
// ...

  return (
          <Container>
            <GlobalStyle />
            <Introduction profileImage={gatsbyImageData} />
            <CategoryList
                    selectedCategory={selectedCategory}
                    categoryList={categoryList}
            />
            
            {/*selectedCategory props 전달*/}
            <PostList selectedCategory={selectedCategory} posts={edges} />
            <Footer />
          </Container>
  )
}

// ...
```

<br/>

- PostList 컴포넌트에서 filter 메서드를 사용해 selectedCategory 값을 가진 포스트 아이템만 필터링하기
- `filter` 메서드와 필터링된 결과값의 최적화를 위해 `useMemo` 사용

```tsx
// src/components/Main/PostList.tsx

// useMemo 가져오기
import React, { FunctionComponent, useMemo } from 'react'

// ...

const PostList: FunctionComponent<PostListProps> = function ({
                                                               selectedCategory,
                                                               posts,
                                                             }) {
  const postListData = useMemo(() =>
    // posts를 순회하며 필터링하기
    posts.filter(({ node: { frontmatter: { categories } } }: PostListItemType) =>
      // categories이 'All'이면 true 반환하여 다 출력하고 'All'이 아니면 include 메서드를 사용해 selectedCategory가 있는 categories만 true 반환
      selectedCategory !== 'All' ? categories.includes(selectedCategory) : true,
    ), [selectedCategory]);

  return (
          <PostListWrapper>
            {postListData.map(({ node: { id, frontmatter } }: PostListItemType) => (
                    <PostItem {...frontmatter} link="https://www.google.co.kr/" key={id} />
            ))}
          </PostListWrapper>
  )
}

export default PostList
```

<br/>

<p align="center">
  <img src="readme_assets/post_item_filtering.gif" alt="post_item_filtering" width="600"><br/>
  <span>포스트 아이템 필터링</span>
</p>

<br/>
<br/>

## 35. 인피니티 스크롤 구현

### 인피니티 스크롤 장단점

- 인피니티 스크롤 장점
  1. 더보기 또는 다음 페이지 버튼 등의 추가 클릭없이 스크롤만으로 자연스럽게 컨텐츠 출력이 가능하기에 `높은 사용자 경험` 제공
  2. `하나의 페이지`에서 모든 컨텐츠가 확인 가능하여 여러 페이지가 필요하지 않음

- 인피니티 스크롤 단점
  1. 사용자의 `개별 아이템 집중 어려움`
  2. 초기 로딩된 컨텐츠에 한해서 검색결과에 반영하기에 `SEO 적용이 어려움`
  3. 스크롤이 하단에 위치하면 바로 다음 컨텐츠를 로드하기에 footer를 확인하는 시간이 굉장히 짧기에 `footer`에 접근이 어려움

<br/>

### 인피니티 스크롤 구현을 위해 알아야하는 API

- 인피니티 스크롤의 핵심을 담당하는 `IntersectionObserver`에 대해 알아야 함
- IntersectionObserver는 `2개의 파라미터`를 받음
- 하나는 `타겟요소가 화면에 노출된 경우, 실행할 콜백함수`로 필수 인자임
- 나머지는 `옵션객체`로 선택사항이고 전달하지 않을 경우, 기본 값으로 적용됨
- `observe()` 메서드를 통해 특정 요소 관측하고 해당 요소가 화면에 노출되면 콜백함수 실행
- 중단할 경우, `unobserve`(특정 요소) 또는 `disconnect()`(전체 요소) 메서드를 사용 

```js
// IntersectionObserver 사용법

const callback = (entries, observer) => {console.log("hi")};
const observer = new IntersectionObserver(callback, options);

// 타겟 요소 관측 시작
observer.observe(TargetElement);

// 타겟 요소 관측 중단
observer.unobserve(TargetElement);

// 모든 요소 관측 중단
observer.disconnect();
```

<br/>

### 인피니티 스크롤을 위한 커스텀 훅 구현 준비

- 인피니티 스크롤 기능을 제공하는 `useInfiniteScroll` 커스텀 훅 구현하기
- selectedCategory와 PostList 데이터 전부를 PostList.tsx 컴포넌트에서 커스텀 훅으로 코드를 옮겨야 함
- `src/hooks` 디렉토리에 `useInfiniteScroll.tsx` 파일 생성
- PostList.tsx 컴포넌트 코드 수정하기

```tsx
// src/components/Main/PostList.tsx

import React, { FunctionComponent } from 'react'

// ...

const PostList: FunctionComponent<PostListProps> = function ({
                                                               selectedCategory,
                                                               posts,
                                                             }) {
  // 기존의 카테고리 필터링한 postListData 제거
  
  return (
          <PostListWrapper>
            {/*posts에 map 적용 */}
            {posts.map(({ node: { id, frontmatter } }: PostType) => (
                    <PostItem {...frontmatter} link="<https://www.google.co.kr/>" key={id} />
            ))}
          </PostListWrapper>
  )
}

export default PostList
```

<br/>

### useRef으로 PostListWrapper 요소 선택하기

- 인피니티 스크롤 방식은 특정 요소가 화면에 보일 경우, 다음 데이터를 로드하는 방식임
- 따라서 화면에 보이는지를 확인하기 위한 특정 요소를 선택하기 위해, 상위 요소인 `PostListWrapper`를 연결해주어야 함
- 커스텀 훅에서 ref 선언 후, 반환 값에 추가하기

```tsx
// src/hooks/useInfiniteScroll.tsx

import { MutableRefObject, useRef } from 'react'
import { PostListItemType } from 'types/PostItem.types'

// useInfiniteScroll은 selectedCategory와 posts를 props로 받음
const useInfiniteScroll = function (
        selectedCategory: string,
        posts: PostListItemType[],
) {
  // div 요소를 containerRef로 지정할 수 있음
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(
          null,
  )
  // containerRef를 반환
  return { containerRef }
}

export default useInfiniteScroll
```

<br/>

- useInfiniteScroll에서 반환한 ref를 PostList.tsx 컴포넌트에서 해당 요소에 연결하기

```tsx
// src/components/Main/PostList.tsx

// ...

// useInfiniteScroll 가져오기
import useInfiniteScroll from 'hooks/useInfiniteScroll'

// ...

const PostList: FunctionComponent<PostListProps> = function ({
                                                               selectedCategory,
                                                               posts,
                                                             }) {
  // useInfiniteScroll이 selectedCategory, posts를 받고 containerRef를 반환
  const { containerRef } = useInfiniteScroll(selectedCategory, posts)

  return (
    // containerRef를 PostListWrapper ref에 연결
    <PostListWrapper ref={containerRef}>
      {posts.map(({ node: { id, frontmatter } }: PostType) => (
        <PostItem {...frontmatter} link="https://www.google.co.kr/" key={id} />
      ))}
    </PostListWrapper>
  )
}

export default PostList
```

- useRef를 통해 특정 요소에 연결하면, `containerRef.current` 프로퍼티를 통해 ref로 연결된 요소에 접근 가능함

<br/>

### 분할된 포스트 목록 받아 출력

- 한 번에 포스트 아이템 `10개씩` 출력하기
- 해당 개수만큼 posts 데이터를 잘라서 반환하기

```tsx
// src/hooks/useInfiniteScroll.tsx

import { MutableRefObject, useState, useRef, useMemo } from 'react'
import { PostListItemType } from 'types/PostItem.types'

// useInfiniteScroll이 반환하는 값(containerRef, postList)의 리턴 타입 정의
export type useInfiniteScrollType = {
  containerRef: MutableRefObject<HTMLDivElement | null>
  postList: PostListItemType[]
}

// 한 번에 보여줄 포스트 아이템 개수를 상수로 저장
const NUMBER_OF_ITEMS_PER_PAGE = 10

const useInfiniteScroll = function (
        selectedCategory: string,
        posts: PostListItemType[],
): useInfiniteScrollType {
  
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  
  const [count, setCount] = useState<number>(1)

  // 기존 필터링 코드
  const postListByCategory = useMemo<PostListItemType[]>(() =>
    posts.filter(({ node: { frontmatter: { categories } } }: PostListItemType) =>
      selectedCategory !== 'All' ? categories.includes(selectedCategory) : true,
    ), [selectedCategory],)

  return {
    containerRef,
    postList: postListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  }
}

export default useInfiniteScroll
```

<br/>

- PostList.tsx 컴포넌트에서 포스트 목록 데이터 받아 출력하기

```tsx
// src/components/Main/PostList.tsx

// 타입 가져오기
import useInfiniteScroll, { useInfiniteScrollType } from 'hooks/useInfiniteScroll'

// ...

const PostList: FunctionComponent<PostListProps> = function ({
                                                               selectedCategory,
                                                               posts,
                                                             }) {
  // useInfiniteScroll hooks에서 처리 후, postList(필터링 후, 10개씩 slice함)도 반환 함
  // useInfiniteScrollType도 불러와 지정
  const { containerRef, postList }: useInfiniteScrollType = useInfiniteScroll(
          selectedCategory,
          posts,
  )

  return (
          <PostListWrapper ref={containerRef}>
            
            {/*posts를 useInfiniteScroll에서 반환 한 postList로 교체*/}
            {postList.map(({ node: { id, frontmatter } }: PostListItemType) => (
                    <PostItem {...frontmatter} link="https://www.google.co.kr/" key={id} />
            ))}
          </PostListWrapper>
  )
}

// ...
```

- contents 디렉토리에 마크다운 테스트 파일을 10개 이상 생성한 후, 확인하면, 카테고리 별로 포스트 아이템이 최대 10개만 출력되는 것을 확인할 수 있음

<br/>

### IntersectionObserver API로 특정 부분에 도달 시, 데이터 불러오기

- useRef로 연결한 요소(PostListWrapper)의 자식 노드 중, 가장 마지막 노드가 화면에 보일 경우, 다음 데이터를 로드하는 기능 구현
- useInfiniteScroll에 `observer 선언하기`

```tsx
// src/hooks/useInfiniteScroll.tsx

import { MutableRefObject, useState, useEffect, useRef, useMemo } from 'react'
import { PostListItemType } from 'types/PostItem.types'

export type useInfiniteScrollType = {
  containerRef: MutableRefObject<HTMLDivElement | null>
  postList: PostListItemType[]
}

const NUMBER_OF_ITEMS_PER_PAGE = 10;

const useInfiniteScroll = function (
        selectedCategory: string,
        posts: PostListItemType[],
): useInfiniteScrollType {
  
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  
  const [count, setCount] = useState<number>(1);

  const postListByCategory = useMemo<PostListItemType[]>(() =>
    posts.filter(({ node: { frontmatter: { categories } } }: PostListItemType) =>
      selectedCategory !== 'All' ? categories.includes(selectedCategory) : true
    ), [selectedCategory]);

  // observer 객체 생성
  const observer: IntersectionObserver = new IntersectionObserver(
    // 콜백함수(타겟요소가 화면에 노출된 경우, 실행할 함수)의 첫 번째 인자는 entries
    // 두 번째 인자는 observer 객체 자체
    (entries, observer) => {
      // 배열 내의 데이터에는 isIntersecting이라는 프로퍼티를 통해 화면에 노출되었는지를 확인
      // entries 요소가 화면에 노출되지 않았으면 함수 종료
      if (!entries[0].isIntersecting) return;
      // 노출되었으면 현재 value에 1 더하기
      // 해당 count 값은 10개의 데이터가 추가적으로 출력되는데 이용
      setCount(value => value + 1);
      // disconnect()를 호출하여 observer 중단
      observer.disconnect();
      },
  )

  return {
    containerRef,
    postList: postListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  }
}

export default useInfiniteScroll
```

<br/>

- observer를 선언한 후, observer 메서드 사용하기
- useEffect 훅 사용하고, count 값이 변경될 때마다 ref로 연결된 요소의 맨 마지막 자식 노드를 관측하기

```tsx
// src/hooks/useInfiniteScroll.tsx

// useEffect 가져오기
import { MutableRefObject, useState, useEffect, useRef, useMemo } from 'react'
import { PostListItemType } from 'types/PostItem.types'

export type useInfiniteScrollType = {
  containerRef: MutableRefObject<HTMLDivElement | null>
  postList: PostType[]
}

const NUMBER_OF_ITEMS_PER_PAGE = 10

const useInfiniteScroll = function (
        selectedCategory: string,
        posts: PostListItemType[],
): useInfiniteScrollType {
  
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(
          null,
  );
  const [count, setCount] = useState<number>(1);

  const postListByCategory = useMemo<PostListItemType[]>(() =>
    posts.filter(({ node: { frontmatter: { categories } } }: PostListItemType) =>
      selectedCategory !== 'All' ? categories.includes(selectedCategory) : true
    ), [selectedCategory]);

  const observer: IntersectionObserver = new IntersectionObserver(
    (entries, observer) => {
      if (!entries[0].isIntersecting) return;
      setCount(value => value + 1);
      observer.disconnect();
      }
  );

  // useEffect 사용
  useEffect(() => {
    // (상수(10) * 현재 count 값)이 카테고리를 통해 필터링된 포스트 아이템 개수 이상이거나,
    // ref가 제대로 연결 안 되어있거나,
    // ref의 자식 노드(포스트 아이템) 개수가 0이면,
    if (
            NUMBER_OF_ITEMS_PER_PAGE * count >= postListByCategory.length ||
            containerRef.current === null ||
            containerRef.current.children.length === 0
    )
      // 실행 안 함
      return;
    
    // 필터링 개수가 더 많고, 제대로 ref가 연결되어있고, ref 자식노드 개수가 0개가 아니면,
    // observer로 관측시작
    observer.observe(
      // ref의 자식 노드 중 마지막 요소 선택
      containerRef.current.children[containerRef.current.children.length - 1],
    )
    // count 값과 selectedCategory가 변경될 때마다 관측요소 변경하기
  }, [count, selectedCategory]);

  return {
    containerRef,
    postList: postListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  }
}

export default useInfiniteScroll
```

<br/>

- 인피니티 스크롤이 잘 구현되나 count의 값을 카테고리가 변경되는 경우에 1로 초기화해주는 과정이 필요함

```tsx
// src/hooks/useInfiniteScroll.tsx

import { MutableRefObject, useState, useEffect, useRef, useMemo } from 'react'
import { PostListItemType } from 'types/PostItem.types'

export type useInfiniteScrollType = {
  containerRef: MutableRefObject<HTMLDivElement | null>
  postList: PostListItemType[]
}

const NUMBER_OF_ITEMS_PER_PAGE = 10

const useInfiniteScroll = function (
        selectedCategory: string,
        posts: PostListItemType[],
): useInfiniteScrollType {
  
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(
          null,
  );
  const [count, setCount] = useState<number>(1);

  const postListByCategory = useMemo<PostListItemType[]>(() =>
    posts.filter(({ node: { frontmatter: { categories } } }: PostListItemType) =>
      selectedCategory !== 'All' ? categories.includes(selectedCategory) : true
    ), [selectedCategory]);

  const observer: IntersectionObserver = new IntersectionObserver(
    (entries, observer) => {
      if (!entries[0].isIntersecting) return;
      setCount(value => value + 1);
      observer.disconnect();
      }
  );

  // useEffect를 사용하고 selectedCategory가 변경되면 count 값을 1로 초기화
  useEffect(() => setCount(1), [selectedCategory]);

  useEffect(() => {
    if (
            NUMBER_OF_ITEMS_PER_PAGE * count >= postListByCategory.length ||
            containerRef.current === null ||
            containerRef.current.children.length === 0
    )
      return;

    observer.observe(containerRef.current.children[containerRef.current.children.length - 1]);
  }, [count, selectedCategory])

  return {
    containerRef,
    postList: postListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  }
}

export default useInfiniteScroll
```

<br/>
<br/>

## 36. Slug

- 포스트 아이템 클릭 시, 게시글 페이지로 가는 링크 구현하기

<br/>

### Slug란?

- 사전적 정의로 신문이나 잡지 등에서 사용되는 `제목을 핵심 키워드의 조합으로 간단하게 만드는 방법`을 의미
- Gatsby와 같은 대부분의 정적 사이트 생성기에서는 `띄어쓰기`를 `여러 문장 부호`로 대체하여 slug를 생성함
- ex) `What is Your Name?` --> `what-is-your-name`

<br/>

### Slug 사용 이유

- 검색 엔진 최적화(SEO)를 위해 사용함
- `https://site.com/what-is-your-name/` 의 형태로 링크를 생성하게 되는데 URL을 의미있는 단어로 구성할 경우, 보다 검색 결과의 상위권에 노출될 수 있음
- 따라서 URL을 통해 검색 엔진이 더 쉽게 포스트를 찾을 수 있음

<br/>

### 마크다운 데이터에 Slug 필드 추가하기

- Gatsby에서는 Slug를 위해 다양한 API를 제공함
- 그 중 `onCreateNode`라는 API를 활용하여 `특정 노드에 필드를 추가`하는 기능 구현하기
- 우선 `gatsby-node.js` 파일 수정

```js
// gatsby-node.js

const path = require('path');

// gatsby-source-filesystem 플러그인에서 createFilePath 가져오기
const { createFilePath } = require(`gatsby-source-filesystem`);

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

// 각각의 포스트 아이템마다 Slug 생성하기
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  // 마크다운 데이터에 한해서 Slug 필드 추가
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });

    createNodeField({ node, name: 'slug', value: slug });
  }
};
```

<br/>

- Slug 데이터는 `contents 디렉토리` 내의 마크다운 파일의 `경로`와 `이름`을 통해서 만들어짐
- `gatsby-config.js` 파일 내의 설정 때문임
- `gatsby-source-filesystem` 플러그인을 통해 루트 디렉토리의 `contents` 디렉토리를 `마크다운 데이터의 경로`로 설정했었음
- 따라서 해당 마크다운 파일의 경로와 이름으로 Slug 데이터가 생성됨
- ex) `contents/2021-02-18/what-is-cookie-and-session.md` --> `/2021-02-18/what-is-cookie-and-session/`

```js
// gatsby-config.js의 gatsby-source-filesystem 플러그인

module.exports = {
  // ...
  plugins: [
  // ...,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },
  // ...
  ],
};
```

<br/>

### 생성된 Slug 데이터 확인하기

- GraphQL 쿼리를 통해 확인 가능함 (GraphiQL 사용)
- node 필드 내에 여러 마크다운 데이터들이 들어있으며, 새로 생성한 Slug 데이터도 node 필드 내에 존재함

```graphql
#slug 데이터 조회 쿼리

query MyQuery {
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
}
```

<br/>

<p align="center">
  <img src="readme_assets/slug.png" width="700" alt="slug"><br/>
  <span>GraphQL 쿼리를 통해 확인한 Slug 데이터</span>
</p>