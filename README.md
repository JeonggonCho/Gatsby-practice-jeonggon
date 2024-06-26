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

<br/>

### 생성한 Slug 데이터로 포스트 아이템 링크 연결하기

- index.tsx 페이지에서 Slug 데이터를 쿼리하기

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
          
          // slug 데이터 쿼리 추가
          fields {
            slug
          }
          
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
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
    }
  }
`
```

<br/>

- PostItem.types.ts 파일에 존재하는 PostListItemType 타입 구조도 수정하기

```ts
// src/types/PostItem.types.ts

// ...

export type PostListItemType = {
  node: {
    id: string
    
    // slug 타입 추가
    fields: {
      slug: string
    }
    
    frontmatter: PostFrontmatterType
  }
}
```

<br/>

- PostList.tsx 컴포넌트에서 PostItem.tsx 컴포넌트로 전달할 link 속성 수정하기

```tsx
// src/components/Main/PostList.tsx

// ...

const PostList: FunctionComponent<PostListProps> = function ({
                                                               selectedCategory,
                                                               posts,
                                                             }) {
  
  const { containerRef, postList }: useInfiniteScrollType = useInfiniteScroll(
          selectedCategory,
          posts,
  )

  return (
    <PostListWrapper ref={containerRef}>
      {postList.map(
        ({
           node: {
             id,
             // slug 데이터 추가
             fields: { slug },
             frontmatter,
           },
         }: PostListItemType) => (
           // PostItem 컴포넌트의 link 속성에 slug를 props로 전달하기
           <PostItem {...frontmatter} link={slug} key={id} />
        ),
      )}
    </PostListWrapper>
  )
}

export default PostList
```

- 서버를 실행하고 포스트 아이템을 클릭하면 해당 URL에 대한 페이지가 만들어지지 않아 404에러가 발생하지만, Slug 데이터를 이용한 URL로 이동한 것을 확인할 수 있음

<br/>
<br/>

## 37. 게시글 페이지 레이아웃 템플릿 생성하기

- 모든 게시글은 동일한 `레이아웃`으로 이루어져 있음
- `Next.js 프레임워크`는 pages 디렉토리 내에 `[slug].js`의 이름으로 파일을 생성해 동일한 컴포넌트를 사용할 수 있음
- Gatsby는 정적 사이트 생성만 가능하며 `gatsby-node.js` 파일에서 API를 통해 페이지를 만들어주는 기능을 구현해야 함
- 우선, 공통적으로 사용되는 레이아웃을 위한 `템플릿 컴포넌트`가 필요함
- 레이아웃 컴포넌트의 경우, 여러 곳에서 공용으로 사용되기에 pages 디렉토리에 생성하면 안 되며 `src/templates`의 새로운 디렉토리에 템플릿 컴포넌트(post_template.tsx) 저장하기

```tsx
// src/templates/post_template.tsx

// 기본 구조 먼저 생성

import React, { FunctionComponent } from 'react'

// 타입은 props 데이터가 정해진 후, 작성하기
type PostTemplateProps = {}

const PostTemplate: FunctionComponent<PostTemplateProps> = function (props) {
  console.log(props)

  return <div>Post Template</div>
}

export default PostTemplate
```

<br/>

### 템플릿 컴포넌트로 게시글 생성하기

- `gatsby-node.js` 파일에서 게시글 페이지 생성하는 부분 작성하기
- Gatsby에서 제공하는 `createPage` API 사용하기

```js
// gatsby-node.js

// ...

// 마크다운 데이터를 통해 포스트 페이지 만들기
exports.createPages = async ({ actions, graphql, reporter }) => {

  // createPage API 가져오기
  const { createPage } = actions;

  // 모든 마크다운 데이터의 Slug 데이터 필드를 조회하여 queryAllMarkdownData에 담기
  // 날짜와 제목을 기준으로 내림차순 정렬
  const queryAllMarkdownData = await graphql(
    `
      {
        allMarkdownRemark(
          sort: {
            order: DESC
            fields: [frontmatter___date, frontmatter___title]
          }
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `,
  );

  // GraphQL 쿼리 에러 발생 시, 실행
  if (queryAllMarkdownData.errors) {
    reporter.panicOnBuild(`Error while running query`);
    return;
  }
};
```

<br/>

- 템플릿 컴포넌트를 불러와 쿼리한 데이터를 통해 페이지를 생성하기

```js
// gatsby-node.js

// 마크다운 데이터를 통해 포스트 페이지 만들기
exports.createPages = async ({ actions, graphql, reporter }) => {

  // createPage API 가져오기
  const { createPage } = actions;

  // 모든 마크다운 데이터의 Slug 데이터 필드를 조회하여 queryAllMarkdownData에 담기
  // 날짜와 제목을 기준으로 내림차순 정렬
  const queryAllMarkdownData = await graphql(
    `
      {
        allMarkdownRemark(
          sort: {
            order: DESC
            fields: [frontmatter___date, frontmatter___title]
          }
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `,
  );

  // GraphQL 쿼리 에러 발생 시, 실행
  if (queryAllMarkdownData.errors) {
    reporter.panicOnBuild(`Error while running query`);
    return;
  }

  // post_template 컴포넌트 가져오기
  const PostTemplateComponent = path.resolve(
          __dirname,
          'src/templates/post_template.tsx',
  );

  // 포스트 페이지 만드는 함수
  const generatePostPage = ({
                              node: {
                                fields: { slug },
                              },
                            }) => {
    // path, component, context를 담은 pageOptions 객체 생성
    const pageOptions = {
      // 경로는 slug 데이터
      path: slug,
      // 사용할 component는 위에서 불러온 템플릿 컴포넌트
      component: PostTemplateComponent,
      // 템플릿 컴포넌트에서 props로 받을 수 있고, GraphQL 쿼리 파라미터로도 받을 수 있어
      // 이를 통해 Slug에 맞는 마크다운 데이터를 불러올 예정
      context: { slug },
    };
    
    // createPage API에 pageOptions 객체를 인자로 전달
    createPage(pageOptions);
  };

  // 위에서 생성한 모든 마크다운 데이터 queryAllMarkdownData를 순회하여 포스트 페이지 만들기
  queryAllMarkdownData.data.allMarkdownRemark.edges.forEach(generatePostPage);
};
```

- 이제 404에러 발생 안 하며, 모든 포스트 아이템에 post_template.tsx 템플릿 컴포넌트가 적용 됨

<br/>
<br/>

## 38. 템플릿 컴포넌트 내에서 Slug에 맞는 데이터 조회하기

### createPage API의 파라미터

- createPage 함수의 파라미터로 pageOptions 이름의 생성 옵션을 담은 객체를 보냈었음
- 해당 pageOptions 객체에는 페이지 링크(path), 템플릿 컴포넌트(component), context 3가지 속성이 들어있는데 context 객체 내의 값들은 컴포넌트에서 props로 받을 수 있을 뿐더러 GraphQL Query의 파라미터로 받을 수도 있음
- 파라미터로 받은 `context의 slug` 데이터를 통해 그에 맞는 `마크다운 데이터 Query` 코드 작성하기

<br/>

### GraphQL Query에서 파라미터를 받는 방법

- Query 내에서 사용하기 위한 파라미터 이름은 필드 이름과 구분하기 위해 `$`와 같은 접두사를 붙여야 하며, 타입을 명시해야 함
- 또한, context 객체 내의 프로퍼티와 동일한 이름으로 파라미터 이름을 설정해주어야 함
- context에서 {slug}로 즉, slug라는 이름으로 전달하였으니, Query에서는 $slug라는 이름으로 파라미터를 받아야 함

```js
// query에서 파라미터 받는 예시

query queryMarkdownDataSlug($slug: String) {
  // ...
}
```

<br/>

- 여기서 filter를 통해 마크다운 데이터 내의 slug 데이터와 파라미터 값이 일치하는 데이터를 필터링할 수 있음
- filter를 통해 값을 비교할 필드에 접근한 후, equal을 줄인 eq라는 프로퍼티로 일치하는지 비교할 파라미터 또는 값을 지정

```js
// 필터링 예시

query queryMarkdownDataBySlug($slug: String) {
  allMarkdownRemark(filter: {fields: {slug: {eq: $slug}}}) {
    // ...
  }
}

// -----------------------------------------------------------

query queryMarkdownDataBySlug($slug: String) {
  allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
    edges {
      node {
        html
        frontmatter {
          title
          summary
          date(formatString: "YYYY.MM.DD.")
          categories
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
}
```

<br/>

### 템플릿 컴포넌트에서 Query 코드 작성하기

```js
// src/templates/post_template.tsx

import React, { FunctionComponent } from 'react'
// grqphQL 추가
import { graphql } from 'gatsby'

type PostTemplateProps = {};

const PostTemplate: FunctionComponent<PostTemplateProps> = function (props) {
  console.log(props);

  return <div>Post Template</div>;
};

export default PostTemplate;

// 쿼리문 작성
export const queryMarkdownDataSlug = graphql`
    query queryMarkdownDataBySlug($slug: String) {
        allMarkdownRemark(filter: {fields: {slug: {eq: $slug}}}) {
            edges {
                node {
                    html
                    frontmatter {
                        title
                        summary
                        date(formatString: "YYYY.MM.DD.")
                        categories
                        thumbnail {
                            childImageSharp {
                                gatsbyImageData
                            }
                        }
                    }
                }
            }
        }
    }
`;
```

- console.log로 props를 출력하면 slug로 쿼리하고 필터링한 데이터가 props로 받아진 것을 확인할 수 있음

<p align="center">
  <img src="readme_assets/query_data_props_filtered_by_slug.png" width="600" alt="slug로 쿼리한 데이터 props로 받기"><br/>
  <span>slug로 쿼리한 데이터 props로 받기</span>
</p>

<br/>
<br/>

## 39. 메인 페이지(index.tsx)와 게시글 페이지(post_template) 중복되는 부분 분리하기

- 메인 페이지에 사용된 컴포넌트 중 게시글 페이지에 동일하게 사용되는 컴포넌트는 `Container`, `GlobalStyle`, `Footer`가 있음

```js
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
            <PostList selectedCategory={selectedCategory} posts={edges} />
            <Footer />
          </Container>
  )
}

// ...
```

<br/>

- 공통으로 사용되는 컴포넌트를 Template 컴포넌트로 분리하기

```js
// src/components/Common/Template.tsx

import React, { FunctionComponent, ReactNode } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from 'components/Common/GlobalStyle'
import Footer from 'components/Common/Footer'

type TemplateProps = {
  children: ReactNode
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Template: FunctionComponent<TemplateProps> = function ({ children }) {
  return (
          <Container>
            <GlobalStyle />
            {children}
            <Footer />
          </Container>
  )
};

export default Template;
```

<br/>

### 메인 페이지 수정하기

```js
// src/pages/index.tsx

// ...

import Template from 'components/Common/Template'

// ...

const IndexPage: FunctionComponent<IndexPageProps> = function ({
                                                                 // ...
                                                               }) {
// ...

  return (
          <Template>
            <Introduction profileImage={gatsbyImageData} />
            <CategoryList
                    selectedCategory={selectedCategory}
                    categoryList={categoryList}
            />
            <PostList selectedCategory={selectedCategory} posts={edges} />
          </Template>
  )
}

// ...
```

<br/>

### 게시글 템플릿 컴포넌트에 불러와 적용하기

```js
// src/template/post_template.tsx

// ...

import Template from 'components/Common/Template'

type PostTemplateProps = {}

const PostTemplate: FunctionComponent<PostTemplateProps> = function (props) {
  console.log(props)

  return <Template>Post Template</Template>
}

// ...
```

<br/>
<br/>

## 40. 게시글 페이지 상단 부분 구현

### 페이지 상단부 내용

- 페이지 상단부에는 `썸네일 이미지`, `제목`, `카테고리`, `날짜` 정보가 들어감

<br/>

### 썸네일 이미지 배경화면 구현하기

- 썸네일 이미지를 배경화면으로 사용하기 위해 `gatsby-plugin-image` 라이브러리를 활용하기
- 게시글 페이지에서 사용될 컴포넌트를 저장하기 위해 components 디렉토리에 Post 디렉토리 생성
- 해당 디렉토리에 `PostHead.tsx` 파일 생성

```js
import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

type GatsbyImgProps = {
  image: IGatsbyImageData
  alt: string
  className?: string
}

type PostHeadProps = {
  thumbnail: IGatsbyImageData
}

const PostHeadWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
`

const BackgroundImage = styled((props: GatsbyImgProps) => (
  <GatsbyImage {...props} style={{ position: 'absolute' }} />
))`
  z-index: -1;
  width: 100%;
  height: 400px;
  object-fit: cover;
  filter: brightness(0.25);
`

const PostHead: FunctionComponent<PostHeadProps> = function ({
  thumbnail,
}) {
  return (
    <PostHeadWrapper>
      <BackgroundImage image={thumbnail} alt="thumbnail" />
    </PostHeadWrapper>
  )
}

export default PostHead
```

- styled components 중 `BackgroundImage` 컴포넌트를 보면 `styled(GatsbyImage)`로 넘기지 않고 PostHead 함수 내부에서 `props`를 받아 스타일과 함께 `GatsbyImage 컴포넌트`에 넘기도록 구현
- 이렇게 처리하는 이유는 gatsby-plugin-image 라이브러리에서 제공하는 GatsbyImage 컴포넌트에 기본적으로 적용된 인라인 스타일이 존재하는데 !important는 지양해야하기에 사용하지 않으면서 직접 스타일을 넘겨주기 위해서 위의 인라인 적용 방법을 사용

<br/>

### 게시물 템플릿 컴포넌트(post_template.tsx)에 PostHead 적용하기

```js
// src/templates/post_template.tsx

import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { PostPageItemType } from 'types/PostItem.types' // 바로 아래에서 정의할 예정
import Template from 'components/Common/Template'
import PostHead from 'components/Post/PostHead'

export type PostPageItemType = {
  node: {
    html: string
    frontmatter: PostFrontmatterType
  }
}

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: PostPageItemType[] 
    }
  }
}

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
                                                                       data: {
                                                                         allMarkdownRemark: { edges },
                                                                       },
                                                                     }) {
  const {
    node: {
      html,
      frontmatter: {
        title,
        summary, // 나중에 사용할 예정
        date,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
        },
      },
    },
  } = edges[0]

  return (
          <Template>
            <PostHead
                    title={title}
                    date={date}
                    categories={categories}
                    thumbnail={gatsbyImageData}
            />
          </Template>
  )
};

// ...
```

<br/>

<p align="center">
  <img src="readme_assets/post_template_thumbnail.png" width="600" alt="게시물 페이지 썸네일"><br/>
  <span>게시물 페이지 썸네일</span>
</p>

<br/>

### 게시글 정보 화면에 띄우기

- 먼저 상단의 `뒤로가기 버튼`을 위치시키는데 해당 버튼에 사용되는 아이콘을 위해 `아이콘 라이브러리`인 `FontAwesome` 라이브러리 설치하기

```bash
$ yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
```

<br/>

- components의 Post 디렉토리에 `PostHeadInfo.tsx` 파일 생성

```js
import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export type PostHeadInfoProps = {
  title: string
  date: string
  categories: string[]
}

const PostHeadInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 768px;
  height: 100%;
  margin: 0 auto;
  padding: 60px 0;
  color: #ffffff;
`

const PrevPageIcon = styled.div`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffffff;
  color: #000000;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`

const PostHeadInfo: FunctionComponent<PostHeadInfoProps> = function ({
  title,
  date,
  categories,
}) {
  const goBackPage = () => window.history.back()

  return (
    <PostHeadInfoWrapper>
      <PrevPageIcon onClick={goBackPage}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </PrevPageIcon>
    </PostHeadInfoWrapper>
  )
}

export default PostHeadInfo
```

<br/>

- 해당 PostHeadInfo 컴포넌트를 PostHead 컴포넌트로 불러와 사용하기

```js
// src/components/Post/PostHead.tsx

// ...

import PostHeadInfo, { PostHeadInfoProps } from 'components/Post/PostHeadInfo'

type PostHeadProps = PostHeadInfoProps & {
  thumbnail: IGatsbyImageData
}

// ...

const PostHead: FunctionComponent<PostHeadProps> = function ({
                                                               title,
                                                               date,
                                                               categories,
                                                               thumbnail,
                                                             }) {
  return (
          <PostHeadWrapper>
            <BackgroundImage image={thumbnail} alt="thumbnail" />
            <PostHeadInfo title={title} date={date} categories={categories} />
          </PostHeadWrapper>
  )
}

export default PostHead
```

<br/>

- 카테고리 데이터는 문자열 배열 데이터이므로 `Web / Frontend / Algorithm`과 같이 `/`로 구분하여 출력하기 위해 join 메서드 사용하여 `categories.join('/')`으로 출력하기

```js
// src/components/Post/PostHeadInfo.tsx

// ...

const Title = styled.div`
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: break-word;
  margin-top: auto;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 45px;
  font-weight: 800;
`

const PostData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 700;
`

const PostHeadInfo: FunctionComponent<PostHeadInfoProps> = function ({
                                                                       title,
                                                                       date,
                                                                       categories,
                                                                     }) {
  const goBackPage = () => window.history.back();

  return (
          <PostHeadInfoWrapper>
            <PrevPageIcon onClick={goBackPage}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </PrevPageIcon>
            <Title>{title}</Title>
            <PostData>
              <div>{categories.join(' / ')}</div>
              <div>{date}</div>
            </PostData>
          </PostHeadInfoWrapper>
  )
}

export default PostHeadInfo
```

<br/>

<p align="center">
  <img src="readme_assets/post_template_postHead.png" width="600" alt="PostHead 컴포넌트"><br/>
  <span>PostHead 컴포넌트</span>
</p>

<br/>
<br/>

## 41. Gatsby에서 마크다운 문서 출력하기

- 쿼리 데이터에 html 속성이 포함되어있었는데 해당 데이터는 마크다운으로 작성된 글이 모두 HTML 태그로 변환되어 문자열 형태로 저장되어있음
- 따라서 각 태그의 스타일을 지정한 후, 문자열 형태의 HTML 요소들을 출력해주면 됨

<br/>

### 마크다운 게시글 출력 컴포넌트 구현하기

- src/components/Post 디렉토리에 PostContent.tsx 파일 생성하기
- 문자열 형태의 HTML 코드 출력하기 위해 `dangerouslySetInnerHTML` 속성을 이용

```tsx
// src/components/Post/PostContent.tsx

import { FC } from 'react'
import styled from '@emotion/styled'

interface PostContentProps {
  html: string;
}

const MarkdownRenderer = styled.div`
    display: flex;
    flex-direction: column;
    width: 768px;
    margin: 0 auto;
    padding: 100px 0;
`;

const PostContent:FC<PostContentProps> = ({html}) => {
  return (
          <MarkdownRenderer dangerouslySetInnerHTML={{__html: html}}/>
  );
};

export default PostContent;
```

<br/>

- 해당 마크다운 게시글 출력 컴포넌트를 게시글 템플릿 컴포넌트(post_template.tsx)에 적용하기
- 아직 스타일이 적용되지 않은 상태임

```tsx
// src/templates/post_template.tsx

// ...

import PostContent from 'components/Post/PostContent'

// ...

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
                                                                       data: {
                                                                         allMarkdownRemark: { edges },
                                                                       },
                                                                     }) {
  const {
    node: {
      html,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
        },
      },
    },
  } = edges[0]

  return (
          <Template>
            <PostHead
                    title={title}
                    date={date}
                    categories={categories}
                    thumbnail={gatsbyImageData}
            />
            {/*컴포넌트 추가*/}
            <PostContent html={html} />
          </Template>
  )
}

// ...
```

<br/>

<p align="center">
  <img src="readme_assets/PostContent.png" width="600" alt="PostContent 컴포넌트 적용"><br/>
  <span>PostContent 컴포넌트 적용</span>
</p>

<br/>

### 마크다운 커스텀 스타일 적용하기

```tsx
// src/components/Post/PostContent.tsx

// ...

const MarkdownRenderer = styled.div`
  // Renderer Style
  display: flex;
  flex-direction: column;
  width: 768px;
  margin: 0 auto;
  padding: 100px 0;
  word-break: break-all;

  // Markdown Style
  line-height: 1.8;
  font-size: 16px;
  font-weight: 400;

  // Apply Padding Attribute to All Elements
  p {
    padding: 3px 0;
  }

  // Adjust Heading Element Style
  h1,
  h2,
  h3 {
    font-weight: 800;
    margin-bottom: 30px;
  }

  * + h1,
  * + h2,
  * + h3 {
    margin-top: 80px;
  }

  hr + h1,
  hr + h2,
  hr + h3 {
    margin-top: 0;
  }

  h1 {
    font-size: 30px;
  }

  h2 {
    font-size: 25px;
  }

  h3 {
    font-size: 20px;
  }

  // Adjust Quotation Element Style
  blockquote {
    margin: 30px 0;
    padding: 5px 15px;
    border-left: 2px solid #000000;
    font-weight: 800;
  }

  // Adjust List Element Style
  ol,
  ul {
    margin-left: 20px;
    padding: 30px 0;
  }

  // Adjust Horizontal Rule style
  hr {
    border: 1px solid #000000;
    margin: 100px 0;
  }

  // Adjust Link Element Style
  a {
    color: #4263eb;
    text-decoration: underline;
  }

  // Adjust Code Style
  pre[class*='language-'] {
    margin: 30px 0;
    padding: 15px;
    font-size: 15px;

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.5);
      border-radius: 3px;
    }
  }

  code[class*='language-'],
  pre[class*='language-'] {
    tab-size: 2;
  }
`

// ...
```

<br/>

<p align="center">
  <img src="readme_assets/PostContent_custom_styling.png" width="600" alt="마크다운 html 스타일링"><br/>
  <span>마크다운 html 스타일링</span>
</p>

<br/>
<br/>

## 42. Utterances 댓글 위젯

- Utterances는 Github Issue를 통한 댓글 작성 기능을 제공하는 애플리케이션
- 사용법이 간단하며, 용량도 적기에 정적 사이트에 많이 사용되는 댓글 위젯임
- 마크다운도 작성할 수 있으며 감정표현도 가능함
- https://github.com/apps/utterances 해당 링크에서 먼저 Github Utterances 애플리케이션을 설치해야 함
- 설치 후, 권한을 설정할 레포지토리를 지정할 수 있는데 모든 레포지토리에 권한을 부여해도 되지만, 적용할 특정 레포지토리에만 권한을 부여하는 것을 지향함

<br/>

### React에서 Utterances 사용방법

- 공식 문서에서는 Utterances 위젯을 불러오기 위한 스크립트 코드를 자동으로 생성하여 제공함
- 하지만 React에서는 해당 스크립트를 붙여넣기 하여도 적용되지 않음
- 보안의 문제와 더불어 컴포넌트 내에서 스크립트 태그를 사용할 경우, 리렌더링 될 때마다 리소스를 불러오기에 문제가 발생함
- 그러므로 `useRef`로 빈 div 태그 요소에 연결한 후, `useEffect`로 `마운트 시에 script 요소를 생성`해 추가하도록 함
- Post 디렉토리에 `CommentWidget.tsx` 파일 생성 후, 코드 작성하기

```tsx
// src/components/Post/CommentWidget.tsx

import React, { createRef, FunctionComponent, useEffect } from 'react'

const src = 'https://utteranc.es/client.js'
const repo = '[username]/[username].github.io' // 자신 계정의 레포지토리로 설정

type UtterancesAttributesType = {
  src: string
  repo: string
  'issue-term': string
  label: string
  theme: string
  crossorigin: string
  async: string
};

const CommentWidget: FunctionComponent = function () {
  const element = createRef<HTMLDivElement>()

  useEffect(() => {
    if (element.current === null) return

    const utterances: HTMLScriptElement = document.createElement('script')

    const attributes: UtterancesAttributesType = {
      src,
      repo,
      'issue-term': 'pathname',
      label: 'Comment',
      theme: `github-light`,
      crossorigin: 'anonymous',
      async: 'true',
    }

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })

    element.current.appendChild(utterances)
  }, [])

  return <div ref={element} />
}

export default CommentWidget
```

<br/>

- 상단의 `repo` 변수에는 `계정명/레포지토리`의 형태로 작성하기
- useEffect 훅을 통해 마운트 시, 빈 스크립트 태그를 생성하고 각각의 속성들을 `setAttribute 메서드`를 통해 추가함
- 해당 스크립트 태그를 `appendChild 메서드`를 이용해 빈 div 태그 내에 추가함
- 스크립트 태그의 속성 중 `issue-term`이 있는데 Utterances에서는 6가지 매핑 방식을 제공하는데 `pathname`의 방식은 포스트 경로 별로 issue가 생성됨
- 하지만 제목으로 분류되도록 하려면 `title`로 설정하면 되는데 title Meta Tag가 존재하지 않아 에러 발생과 함께 위젯이 출력되지 않는 문제가 생김
- 이는 검색 엔진 최적화와 함께 설정할 수 있음

<br/>

### CommentWidget 컴포넌트를 post_template 컴포넌트에 적용하기

- 컴포넌트를 추가하여 각 게시글 페이지마다 Utterances 위젯을 확인할 수 있으며, 댓글 작성 후, 레포지토리 Issue와 Comment가 생성되는 것을 확인할 수 있음

```tsx
// src/templates/post_template.tsx

// ...

import CommentWidget from 'components/Post/CommentWidget'

// ...

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
                                                                       data: {
                                                                         allMarkdownRemark: { edges },
                                                                       },
                                                                     }) {
  const {
    node: { html, frontmatter },
  } = edges[0];

  return (
          <Template>
            <PostHead {...frontmatter} />
            <PostContent html={html} />
            <CommentWidget />
          </Template>
  )
};

// ...
```

<br/>
<br/>

## 43. 게시글 페이지(post_template.tsx) 반응형 디자인 구현

### 마크다운 커스텀 스타일 수정

```js
// src/components/Post/PostContent.tsx

// ...

const MarkdownRenderer = styled.div`
  // Renderer Style
  display: flex;
  flex-direction: column;
  width: 768px;
  margin: 0 auto;
  padding: 100px 0;
  word-break: break-all;

  // Markdown Style
  line-height: 1.8;
  font-size: 16px;
  font-weight: 400;

  // Apply Padding Attribute to All Elements
  p {
    padding: 3px 0;
  }

  // Adjust Heading Element Style
  h1,
  h2,
  h3 {
    font-weight: 800;
    margin-bottom: 30px;
  }

  * + h1,
  * + h2,
  * + h3 {
    margin-top: 80px;
  }

  hr + h1,
  hr + h2,
  hr + h3 {
    margin-top: 0;
  }

  h1 {
    font-size: 30px;
  }

  h2 {
    font-size: 25px;
  }

  h3 {
    font-size: 20px;
  }

  // Adjust Quotation Element Style
  blockquote {
    margin: 30px 0;
    padding: 5px 15px;
    border-left: 2px solid #000000;
    font-weight: 800;
  }

  // Adjust List Element Style
  ol,
  ul {
    margin-left: 20px;
    padding: 30px 0;
  }

  // Adjust Horizontal Rule style
  hr {
    border: 1px solid #000000;
    margin: 100px 0;
  }

  // Adjust Link Element Style
  a {
    color: #4263eb;
    text-decoration: underline;
  }

  // Adjust Code Style
  pre[class*='language-'] {
    margin: 30px 0;
    padding: 15px;
    font-size: 15px;

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.5);
      border-radius: 3px;
    }
  }

  code[class*='language-'],
  pre[class*='language-'] {
    tab-size: 2;
  }

  // Markdown Responsive Design
  @media (max-width: 768px) {
    width: 100%;
    padding: 80px 20px;
    line-height: 1.6;
    font-size: 14px;

    h1 {
      font-size: 23px;
    }

    h2 {
      font-size: 20px;
    }

    h3 {
      font-size: 17px;
    }

    img {
      width: 100%;
    }

    hr {
      margin: 50px 0;
    }
  }
`

// ...
```

<br/>

### 상단 부분(PostHead.tsx) 반응형 디자인 구현하기

- 높이 300px로 설정하기

```js
// src/components/Post/PostHead.tsx

// ...

const PostHeadWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;

  @media (max-width: 768px) {
    height: 300px;
  }
`

const BackgroundImage = styled((props: GatsbyImgProps) => (
        <GatsbyImage {...props} style={{ position: 'absolute' }} />
))`
  z-index: -1;
  width: 100%;
  height: 400px;
  object-fit: cover;
  filter: brightness(0.25);

  @media (max-width: 768px) {
    height: 300px;
  }
`

// ...
```

<br/>

### 상단부 정보(PostHeadInfo) 부분 수정하기

```js
// src/components/Post/PostHeadInfo.tsx

// ...

const PostHeadInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 768px;
  height: 100%;
  margin: 0 auto;
  padding: 60px 0;
  color: #ffffff;

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 20px;
  }
`

const PrevPageIcon = styled.div`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffffff;
  color: #000000;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
`

const Title = styled.div`
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: break-word;
  margin-top: auto;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 45px;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`

const PostData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 700;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    font-size: 15px;
    font-weight: 400;
  }
`

// ...
```

<br/>

### 댓글 컴포넌트(CommentWidget) 반응형 구현하기

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<br/>
<br/>

## 44. 404 에러 페이지

### 404 에러 페이지의 중요성

- 사용자 경험(UX)적인 측면에서 매우 중요함
- 깨진 링크를 클릭 시, 서버는 해당 페이지를 찾을 수 없기에 `404 Not Found` 문구의 페이지를 출력함
- 이 화면은 불친절한 화면으로서 사용자로 하여금 부정적인 경험을 주게 됨
- 하지만, 깨진 링크뿐만 아니라 잘못된 링크에 의해서도 404 에러 페이지는 출력될 수 있기 때문에 필요하기는 함
- 따라서, 기본 404 에러 페이지 대신 커스텀을 할 필요가 있음

<br/>

### 다양한 404 에러 페이지

- 해당 페이지를 찾을 수 없다는 문구와 함께 `다른 컨텐츠로의 링크` 제공
- `홈으로 이동하는 링크` 제공 및 `독특한 인터랙션` 제공
- `화려하게 디자인` 된 404 페이지

<br/>

### 404 에러 페이지의 목적

- 사용자 이탈률 감소 : 다시 해당 서비스로 유입시키는 역할
- 개성 표현 : 서비스의 브랜드 이미지를 표현하는 역할
- 긍정적인 사용자 경험 : 어떤 이유로 에러가 발생했는지 유저에게 알려주어 좋은 경험을 제공할 수 있음

<br/>

### 404 에러 페이지 구현하기

- Gatsby에서 404 에러 페이지를 구현하기 위해서는 `src/pages` 디렉토리에 404이름의 컴포넌트 파일(`404.tsx`)을 생성하면 자동으로 기존 에러 페이지에 덮어쓰게 됨

```js
// src/pages/404.tsx

import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import GlobalStyle from 'components/Common/GlobalStyle'

const NotFoundPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const NotFoundText = styled.div`
  font-size: 150px;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 100px;
  }
`

const NotFoundDescription = styled.div`
  font-size: 25px;
  text-align: center;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`

const GoToMainButton = styled(Link)`
  margin-top: 30px;
  font-size: 20px;
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
  }
`

const NotFoundPage: FunctionComponent = function () {
  return (
          <NotFoundPageWrapper>
            <GlobalStyle />
            <NotFoundText>404</NotFoundText>
            <NotFoundDescription>
              찾을 수 없는 페이지입니다. <br />
              다른 콘텐츠를 보러 가보시겠어요?
            </NotFoundDescription>
            <GoToMainButton to="/">메인으로</GoToMainButton>
          </NotFoundPageWrapper>
  )
}

export default NotFoundPage
```

- 존재하지 않는 페이지로 접속 후, `Preview custom 404 page` 버튼을 클릭하여 404 에러 페이지 확인하기

<br/>

<p align="center">
  <img src="readme_assets/404_error_page.png" width="600" alt="커스텀한 404 에러 페이지"><br/>
  <span>커스텀한 404 에러 페이지</span>
</p>

<br/>
<br/>

## 45. Meta Tag

### SEO와 Meta Tag

- 구글 등 검색엔진에서 검색결과 첫 페이지에 개발한 서비스 혹은 웹페이지가 나와야 쉽게 접근할 수 있으며 재방문율도 높아짐
- 이를 위해 만든 사이트를 표시하도록 하는 역할을 하는 것이 Meta Tag임
- Meta Tag는 검색엔진이 처리할 수 있도록 검색 키워드와 관련된 데이터를 띄워줄 수 있도록 하며 사용자에게 어떤 사이트인지 정보를 제공하는 역할을 함
- SNS에서 링크 공유 시, 간략한 정보를 출력할 수 있음

<br/>

### React-Helmet

- React-Helmet 라이브러리는 간단하게 여러 Meta Tag를 추가 할 수 있음
- 프로젝트 초기에 해당 라이브러리를 설치했으며, TypeScript 환경에서 사용하기 위해서는 React-Helmet 라이브러리의 타입을 설치해야함

```bash
$ yarn add @types/react-helmet
```

```tsx
// React-Helmet 예제

// ...

// React-Helmet에서 Helmet 컴포넌트 가져오기
import { Helmet } from 'react-helmet'

// ...

const Template: FunctionComponent<TemplateProps> = function ({ children }) {
  return (
    <Container>
      {/*Helmet 컴포넌트 내부에 여러 Meta Tag를 작성*/}
      <Helmet>
        <title>Hyun's Dev Blog</title>

        <meta name="description" content="항상 발전하기 위해 노력하는 주니어 개발자입니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      </Helmet>

      <GlobalStyle />
      {children}
      <Footer />
    </Container>
  )
}

export default Template
```

<br/>

### 필수로 작성해야하는 Meta Tag

1. `title` : Meta Tag 형식은 아니지만, 해당 페이지의 제목을 나타내기에 SEO에서 가장 중요함
2. `Description` : 검색엔진 또는 SNS 공유 시, 사용자가 해당 페이지의 설명을 확인할 수 있음
3. `Viewport` : 모바일 환경을 위해 사용하는 태그
4. `Content Type` : 해당 Meta Tag에 의해서 브라우저가 데이터를 어떻게 읽을 지 지정
5. `Social Meta Tag` : 페이스북, 트위터, 인스타그램 등 여러 SNS를 위한 Meta Tag로 일반적으로는 Open Graph Data를 나타내는 Meta Tag를 사용하지만 트위터는 별도의 Meta Tag를 사용함

- 이 외에도 필수는 아니지만 웹 크롤러의 동작 명령을 지시하는 `Robots`, 해당 사이트의 핵심 키워드를 나타내는 `Keywords` 등의 Meta 데이터가 존재함

```js
// Meta Tag 예시

// Open Graph data
// 대부분의 SNS에서 사용할 수 있는 데이터
<meta property="og:title" content="WebSite Title" />
<meta property="og:type" content="article" />
<meta property="og:url" content="<http://www.my-website.com/>" />
<meta property="og:image" content="<http://my-website.com/image.jpg>" />
<meta property="og:description" content="WebSite Description" />
<meta property="og:site_name" content="Site Name, i.e. Moz" />

// Meta Data for Facebook
// 페이스북과 연결해 통계를 확인하기 위해 사용하는 태그
<meta property="fb:app_id" content="Application ID"/>
<meta property="fb:admins" content="Facebook numeric ID" />

// Meta Data for Twitter
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@publisher_handle" />
<meta name="twitter:title" content="Page Title" />
<meta name="twitter:description" content="Page description less than 200 characters" />
<meta name="twitter:creator" content="@author_handle" />
<meta name="twitter:image" content="<http://www.example.com/image.jpg>" />
```

<br/>

### Template 컴포넌트에서 Meta Tag 작성하기

- src/components/Common/Template.tsx 컴포넌트는 모든 페이지에서 사용되는 컴포넌트
- 따라서 각각의 페이지에 Meta Tag를 작성하지 않고 해당 컴포넌트에만 작성하여 전역으로 반영해 중복 작성을 피할 수 있음
- 각 페이지에서 여러 Meta 데이터를 Template 컴포넌트로 props로 넘겨주고 해당 props를 Template에서 받아 Meta Tag 작성하기
- props로 페이지 제목, 설명, 주소, 이미지 링크 받기

```tsx
// src/components/Common/Template.tsx

import React, { FunctionComponent, ReactNode } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from 'components/Common/GlobalStyle'
import Footer from 'components/Common/Footer'
import { Helmet } from 'react-helmet'

type TemplateProps = {
  title: string
  description: string
  url: string
  image: string
  children: ReactNode
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Template: FunctionComponent<TemplateProps> = function ({
                                                               title,
                                                               description,
                                                               url,
                                                               image,
                                                               children,
                                                             }) {
  return (
          <Container>
            <Helmet>
              <title>{title}</title>

              <meta name="description" content={description} />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

              <meta property="og:type" content="website" />
              <meta property="og:title" content={title} />
              <meta property="og:description" content={description} />
              <meta property="og:image" content={image} />
              <meta property="og:url" content={url} />
              <meta property="og:site_name" content={title} />

              <meta name="twitter:card" content="summary" />
              <meta name="twitter:title" content={title} />
              <meta name="twitter:description" content={description} />
              <meta name="twitter:image" content={image} />
              <meta name="twitter:site" content="@사용자이름" />
              <meta name="twitter:creator" content="@사용자이름" />
            </Helmet>

            <GlobalStyle />
            {children}
            <Footer />
          </Container>
  )
}

export default Template
```

<br/>

### 메인 페이지(index.tsx)에서 Meta 데이터 props로 전달하기

- `gatsby-config.js`에서 `siteMetadata` 프로퍼티를 통해 GraphQL 상에서 해당 데이터를 쿼리할 수 있음

```js
// gatsby-config.js

module.exports = {
  siteMetadata: {
    title: `조정곤 개발 블로그`,
    description: `주니어 개발자로서 지식과 개발 정보 정리한 블로그입니다.`,
    author: `JeonggonCho`,
    siteUrl: '<https://my-website-link.com>',
  },
  // ...
};
```

<br/>

- 메인 페이지 컴포넌트에서 title, description, url 데이터 쿼리문 작성하기
- 이 데이터들은 `site 필드` 내의 `siteMetadata 필드`에 정의되어 있음
- 또한 이미지 링크도 props로 전달해야하므로 `file 필드` 내의 `publicUrl 데이터`도 불러오기

```tsx
// src/pages/index.tsx

// ...

type IndexPageProps = {
  location: {
    search: string
  }
  data: {
    // site 필드 타입 추가
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
      // publicURL 타입 추가
      publicURL: string
    }
  }
}

const IndexPage: FunctionComponent<IndexPageProps> = function ({
                                                                 location: { search },
                                                                 data: {
                                                                   // 쿼리한 site 데이터 받기
                                                                   site: {
                                                                     siteMetadata: { title, description, siteUrl },
                                                                   },
                                                                   allMarkdownRemark: { edges },
                                                                   file: {
                                                                     childImageSharp: { gatsbyImageData },
                                                                     // publicURL 받기
                                                                     publicURL,
                                                                   },
                                                                 },
                                                               }) {
...

  return (
    // Template 컴포넌트로 title, description, url, image 데이터 props로 전달
          <Template
                  title={title}
                  description={description}
                  url={siteUrl}
                  image={publicURL}
          >
            <Introduction profileImage={gatsbyImageData} />
            <CategoryList
                    selectedCategory={selectedCategory}
                    categoryList={categoryList}
            />
            <PostList selectedCategory={selectedCategory} posts={edges} />
          </Template>
  )
}

export default IndexPage

export const getPostList = graphql`
  query getPostList {
  // site 데이터 쿼리하기
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
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
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
      // 이미지 링크 쿼리하기
      publicURL
    }
  }
`;
```

<br/>

### 게시글 페이지(post_template.tsx)에서 Meta 데이터 전달하기

- 기본적으로 제목(title), 요약 데이터(summary)를 전달하고, 이미지 또한 publicURL로 받아오기
- 페이지 링크의 경우, location 프로퍼티의 location.href 데이터를 쿼리해서 전달

```tsx
// src/components/templates/post_template.tsx

// ...

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: PostPageItemType[]
    }
  }
  location: {
    href: string
  }
}

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
                                                                       data: {
                                                                         allMarkdownRemark: { edges },
                                                                       },
                                                                       location: { href },
                                                                     }) {
// ...
};

export default PostTemplate

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
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

- `src/components/types/PostItem.types.ts` 파일 내의 PostPageItemType 타입에서 사용하고 있는 `PostFrontmatterType` 형식도 변경해야 함

```ts
// src/components/types/PostItem.types.ts

// ...

export type PostFrontmatterType = {
  title: string
  date: string
  categories: string[]
  summary: string
  thumbnail: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
    // 타입 추가
    publicURL: string
  }
}

// ...
```

<br/>

- post_template에서 Template 컴포넌트로 쿼리한 데이터 전달

```tsx
// src/components/templates/post_template.tsx

// ...

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
                                                                       data: {
                                                                         allMarkdownRemark: { edges },
                                                                       },
                                                                       location: { href },
                                                                     }) {
  const {
    node: {
      html,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
          publicURL,
        },
      },
    },
  } = edges[0];

  return (
    // props 전달
          <Template title={title} description={summary} url={href} image={publicURL}>
            <PostHead
                    title={title}
                    date={date}
                    categories={categories}
                    thumbnail={gatsbyImageData}
            />
            <PostContent html={html} />
            <CommentWidget />
          </Template>
  )
}

// ...
```

<br/>
<br/>

## 46. Canonical Link Element

- Canonical Link Element란 검색 엔진에 `중복된 페이지 중 가장 대표적인 URL`을 알려주는 역할을 하는 Link 요소
- 검색 엔진은 사이트 인덱스(색인)을 생성 시, 대부분 Canonical Link Element에 명시된 페이지를 표준 페이지로 설정하여 중복된 페이지의 크롤링 빈도 수를 낮춤
- 여러 유형의 기기를 지원하는 웹 사이트가 따로 존재하거나 쿼리 스트링, http/https 및 www의 유무 등으로 중복된 페이지 발생

```
페이지 중복 URL

<https://my-website.com/>
<https://m.my-website.com/>
<http://www.my-website.com/>
<https://www.my-webiste.com/?name=gatsby>
```

<br/>

- Canonical Link Element를 사용하지 않을 시, 첫 색인 생성 시, 검색 엔진이 임의로 표준 페이지를 설정하게 됨
- 따라서 `rel="canonical` 속성과 대표 URL을 나타내는 `href` 속성이 있는 링크 태그를 head 태그 내에서 명시해야함

```js
// Canonical Link Element 예시

<head>
  <link rel="canonical" href="<https://www.my-website.com/>" />
</head>
```

<br/>

### Canonical Link Element를 위한 라이브러리 세팅

```bash
$ yarn add gatsby-plugin-canonical-urls
```

<br/>

- `gatsby-config.js` 파일에서 플러그인 세팅하기
- `siteUrl`과 `stripQueryString`을 추가할 수 있는데 배포 전이므로 전자는 임의로 지정하기
- `stripQueryString` 옵션은 쿼리 스트링을 그대로 반영할 지, 안 할지에 관한 옵션으로 현재 카테고리를 쿼리 스트링으로 받고 있기에 중복 페이지가 생성될 가능성이 있음
- 따라서 쿼리 스트링 부분을 제거하도록 `stripQueryString` 옵션을 `true`로 설정하기

```js
// gatsby-config.js

module.exports = {
  siteMetadata: { ... },
  plugins: [
    // ...,
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: '<https://my-website.com/>',
        stripQueryString: true,
      },
    },
  ],
};
```

<br/>
<br/>

## 47. Sitemap

- Sitemap은 검색 엔진이 크롤링을 함으로써 `사용자들이 방문할 수 있는 페이지의 목록`을 나타냄
- 일반적으로 `XML 파일`로 작성되며 사이트의 URL을 나열한 형태의 파일임
- Sitemap을 통해 크롤링 속도를 개선하고 검색 엔진 최적화에 중요한 역할을 함

```xml
<!--sitemap.xml 예시-->

<urlset
        xmlns="<http://www.sitemaps.org/schemas/sitemap/0.9>"
        xmlns:news="<http://www.google.com/schemas/sitemap-news/0.9>"
        xmlns:xhtml="<http://www.w3.org/1999/xhtml>"
        xmlns:mobile="<http://www.google.com/schemas/sitemap-mobile/1.0>"
        xmlns:image="<http://www.google.com/schemas/sitemap-image/1.1>"
        xmlns:video="<http://www.google.com/schemas/sitemap-video/1.1>"
>
  <url>
    <loc><https://ji5485.github.io/></loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc><https://ji5485.github.io/about/></loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc><https://ji5485.github.io/portfolio/></loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

<br/>

### Sitemap 생성을 위한 라이브러리 세팅

```bash
$ yarn add gatsby-plugin-sitemap
```

<br/>

- `gatsby-config.js` 파일에서 설정 코드를 추가해야함
- 공식문서 : https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/
- sitemap 생성 경로와 이름을 설정할 수 있고, 필요한 URL만 추가할 수 있도록 지정할 수 있음
- 따로 옵션을 지정하지 않으면 모든 페이지를 sitemap에 추가함

```js
// gatsby-config.js

module.exports = {
  siteMetadata: { ... },
  plugins: [
    // ...,
    'gatsby-plugin-sitemap',
  ],
};
```

<br/>

- 프로젝트 빌드를 통해 Sitemap이 잘 생성되는지 확인하기

```bash
$ yarn build
```

- 빌드 시, 에러가 발생하는데 이는 `서버 사이드 렌더링` 작업 시에 볼 수 있는 에러임
- 무한 스크롤을 위해 구현한 useInfiniteScroll에서 사용한 `IntersectionObserver`는 브라우저 API로 `클라이언트 렌더링` 시 사용할 수 있는 API임
- `로컬 서버`를 실행할 경우, Gatsby는 일반 React 애플리케이션과 동일하게 `클라이언트 사이트 렌더링(CSR)을 통해` 화면을 보여주기에 IntersectionObserver나 window 객체와 같은 브라우저 제공 요소를 문제없이 사용 가능 함
- 하지만, Gatsby는 기본적으로 `빌드 시`, `Node.js 환경`에서 진행되므로 브라우저 API를 사용할 수 없게 됨

<br/>

### 빌드 시, 서버 사이드 렌더링 에러 해결 방안

1. 사용하려는 API 또는 객체가 undefined인지 확인하는 `조건문` 추가

```js
if (IntersectionObserver === undefined) return;
if (window === undefined) return;
```

<br/>

2. `useEffect` 사용하기
   - useEffect 내부의 코드는 클라이언트 렌더링 시, 실행되기에 빌드 시, 실행되지 않음

- 위의 2가지 방법 중 2번째의 useEffect 사용해보기
- useInfiniteScroll.tsx 파일에서 useRef를 사용해 Observer를 담기 위한 변수를 하나 생성한 후, 처음 렌더링 시에 IntersectionObserver 객체를 생성해 변수에 담기

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
  const containerRef: MutableRefObject<HTMLDivElement | null> =
          useRef<HTMLDivElement>(null)
  const observer: MutableRefObject<IntersectionObserver | null> =
          useRef<IntersectionObserver>(null)
  const [count, setCount] = useState<number>(1)

  const postListByCategory = useMemo<PostListItemType[]>(
          () =>
                  posts.filter(
                          ({
                             node: {
                               frontmatter: { categories },
                             },
                           }: PostListItemType) =>
                                  selectedCategory !== 'All'
                                          ? categories.includes(selectedCategory)
                                          : true,
                  ),
          [selectedCategory],
  )

  useEffect(() => {
    observer.current = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return

      setCount(value => value + 1)
      observer.unobserve(entries[0].target)
    })
  }, [])

  useEffect(() => setCount(1), [selectedCategory])

  useEffect(() => {
    if (
            NUMBER_OF_ITEMS_PER_PAGE * count >= postListByCategory.length ||
            containerRef.current === null ||
            containerRef.current.children.length === 0 ||
            observer.current === null
    )
      return

    observer.current.observe(
            containerRef.current.children[containerRef.current.children.length - 1],
    )
  }, [count, selectedCategory])

  return {
    containerRef,
    postList: postListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  }
}

export default useInfiniteScroll
```

- 또한 기존의 IntersectionObserver 내부에서 `disconnect 메서드`를 사용하였는데 이렇게 할 경우, 첫 추가 로딩 이 후, `더 이상 데이터가 로딩이 안 됨`
- 따라서 `unobserve 메서드`로 교체하기

<br/>

- 다시 빌드 진행하기

<br/>

- public 디렉토리에 `sitemap-0.xml` 파일과 `sitemap-index.xml` 파일이 생성되어있음

```xml
<!--public/sitemap-index.xml-->

<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://naver.com/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>
```

- 이처럼 sitemap을 분리하여 생성하는 이유는 몇몇 웹 마스터 도구에서 특정 개수(대략 5만) 이상의 URL이 담긴 sitemap을 인식하지 못한다는 문제가 발생하기 때문임
- 따라서 URL을 단위 개수로 나눈 후, `sitemap-0.xml, sitemap-1.xml, ...`과 같이 sitemap을 생성함
- 이렇게 생성한 sitemap들을 sitemap-index.xml 파일에서 참조하게 됨

```xml
<!--public/sitemap-0.xml-->

<?xml version="1.0" encoding="UTF-8"?>
<urlset 
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>https://naver.com/test/</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://naver.com/test10/</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://naver.com/test2/</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://naver.com/test1/</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
<!--  ...-->
</urlset>
```

- sitemap-0.xml 파일을 보면 메인 페이지와 마크다운에 의해 생성된 게시글 페이지 URL이 들어가게 됨
- URL 호스트 부분에 해당하는 `https://naver.com` 부분은 gatsby-config.js의 siteMetadata 내부의 siteUrl 프로퍼티를 참조하기에 추후 배포 후 변경해야 함

<br/>
<br/>

## 48. robots.txt

- 검색 엔진으로 크롤링되는 사이트의 경우, robots.txt 파일이 존재함
- 구글 robots.txt : https://www.google.com/robots.txt
- 페이스북 robots.txt : https://www.facebook.com/robots.txt
- robots.txt 파일에는 `User-agent`, `Disallow`, `Allow` 키워드가 있는데 `User-agent`에는 `검색 로봇의 이름`을, `Disallow`와 `Allow`에는 `페이지 경로`를 작성함
- 즉, robots.txt 파일은 `특정 검색 로봇으로 하여금 크롤링을 허용하는 페이지와 허용하지 않는 페이지를 지정`할 수 있음
- 필수는 아니지만 추가하는 것을 지향함

<br/>

### robots.txt 파일 생성을 위한 라이브러리 세팅

- 라이브러리 : https://www.gatsbyjs.com/plugins/gatsby-plugin-robots-txt/

```bash
$ yarn add gatsby-plugin-robots-txt
```

<br/>

- gatsby-config.js 파일에서 해당 라이브러리 설정 코드 작성하기
- 모든 검색 엔진('*')에서 구분없이 모든 페이지('/')를 크롤링 할 수 있도록 설정하기

```js
// gatsby-config.js

module.exports = {
  siteMetadata: { ... },
  plugins: [
    // ...,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
  ],
};
```

- gatsby build로 빌드 후, public 디렉토리를 확인하면 robots.txt 파일이 생성된 것을 확인할 수 있음
- 또는 로컬 서버 실행 후, `/robots.txt` url로 접속해 확인할 수 있음

<br/>
<br/>

## 49. Semantic Tag

- 신체가 불편하거나 고령의 유저들도 일반 사용자와 동등하게 접근할 수 있도록 해야 함
- 따라서 브라우징에 사용되는 보조기술인 스크린 리더 또는 음성 인식 등을 위해 Semantic Tag를 추가하고 설정해주어야 함

<br/>

### 추가할 수 있는 Semantic Tag 종류

1. 마우스 사용이 불가능한 유저를 위해 페이지 랜드마크 역할을 하는 Semantic Tag 추가하기
2. 스크린 리더를 사용하는 유저를 위해 html에 lang 속성 추가하기

- 여러 Semantic Tag : https://developer.mozilla.org/ko/docs/Glossary/Semantics#%EC%9D%98%EB%AF%B8%EB%A1%A0%EC%A0%81_%EC%9A%94%EC%86%8Celement%EB%93%A4

<br/>

### Semantic Tag 추가하기

- Semantic Tag는 특정 기능이 있는 태그가 아닌 유저와 브라우저에게 의미를 나타내는 의미론적인 태그임
- `main`, `footer` 태그 사용하기

```tsx
// src/components/Common/Template.tsx

// ...

// 기존 div 태그를 main으로 수정
const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

// ...
```

```tsx
// src/components/Common/Footer.tsx

// ...

// 기존 div 태그를 footer로 수정
const FooterWrapper = styled.footer`
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

// ...
```

<br/>

### 웹 사이트 기본 언어 선택하기

- html 태그의 lang 속성을 지정하기
- 하지만 Gatsby에서는 html 파일이 보이지 않기에 `React-Helmet` 라이브러리를 사용할 수 있음

```tsx
// src/components/Common/Template.tsx

// ...

const Template: FunctionComponent<TemplateProps> = function ({
                                                               title,
                                                               description,
                                                               url,
                                                               image,
                                                               children,
                                                             }) {
  return (
          <Container>
            <Helmet>
              <title>{title}</title>

              <meta name="description" content={description} />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

              <meta property="og:type" content="website" />
              <meta property="og:title" content={title} />
              <meta property="og:description" content={description} />
              <meta property="og:image" content={image} />
              <meta property="og:url" content={url} />
              <meta property="og:site_name" content={title} />

              <meta name="twitter:card" content="summary" />
              <meta name="twitter:title" content={title} />
              <meta name="twitter:description" content={description} />
              <meta name="twitter:image" content={image} />
              <meta name="twitter:site" content="@사용자이름" />
              <meta name="twitter:creator" content="@사용자이름" />

              {/*해당 태그를 추가하면 기존 태그를 덮어쓰게 됨*/}
              <html lang="ko" />
            </Helmet>

            <GlobalStyle />
            {children}
            <Footer />
          </Container>
  )
};

export default Template;
```

- 이처럼 Semantic Tag를 사용하면 lightroom과 같은 사이트 성능 측정 프로그램에서 Accessibility(접근성)에서 좋은 점수를 받을 수 있음

<br/>
<br/>

## 50. Github Pages 배포

- Github Pages는 Github에서 제공하는 서비스로, Repository를 통해 무료로 웹 사이트를 호스팅하는 서비스
- 백엔드 서버, DB가 없는 블로그를 호스팅하기에 최적의 서비스임
- Github Pages 외에도 Netlify, Vercel 등의 호스팅 서비스가 있음

<br/>

### Github Repository 생성하기

- Github Pages는 `[username].github.io` 이름의 레포지토리를 생성해주어야 함

<br/>

### Github Pages 배포를 위한 라이브러리 설치 및 세팅

- `gh-pages` 라이브러리 설치해야 함

```bash
$ yarn add gh-pages --dev
```

<br/>

### 스크립트 추가하기

- `package.json` 파일에 배포 스크립트 추가하기

```json
//package.json

{
//  ...,
  "scripts": {
    "build": "gatsby build",
    "develop": "gatsby develop",
    "format": "prettier --write \\"**/*.{js,jsx,ts,tsx,json,md}\\"",
    "start": "npm run develop",
    "serve": "gatsby serve",
    "clean": "gatsby clean",
    "test": "echo \\"Write tests! -> <https://gatsby.dev/unit-testing\\>" && exit 1",
    "deploy": "gatsby build && gh-pages -d public -b master"
  },
//...
}
```

<br/>

### gatsby-config.js 수정

- `siteUrl` 프로퍼티 및 `gatsby-plugin-canonical-urls` 플러그인의 옵션 부분을 `https://[username].github.io/`로 설정하기

```js
// gatsby-config.js

module.exports = {
  siteMetadata: {
    title: `주니어 개발자의 개발 블로그`,
    description: `주니어 개발자로서의 저를 표현한 블로그입니다.`,
    author: `Hyun`,
    siteUrl: 'https://[username].github.io/',
  },
  plugins: [
    // ...,
    {
      resolve: 'gatsby-plugin-canonical-urls',
        options: {
          siteUrl: 'https://[username].github.io/',
          stripQueryString: true,
        },
      },
    // ...
  ],
};
```

<br/>

### 프로젝트 배포하기

- 작성한 스크립트를 통해 배포하기

```bash
$ yarn deploy

#or

$ gatsby deploy
```

- 배포 성공 시, Published 단어가 나옴

<br/>

- 이 후, 레포지토리의 setting 탭에 들어가면 Github Pages 설정 부분에서 배포가 되었다는 문구를 볼 수 있음

<br/>
<br/>

## 51. 웹 마스터 도구에 등록하기

- 제작한 블로그가 검색 결과에 노출이 되도록 하기 위해서는 각 `검색 엔진의 웹 마스터 도구`에 웹 페이지를 등록해야 함
- 각각의 검색 엔진마다 웹 마스터 도구가 존재하며 웹 마스터 도구에서 요구하는 사항에 맞추어 등록해야 함
- 이를 통해 검색 노출을 최적화하고 모니터링 도구도 제공받을 수 있음

<br/>

### Google Search Console

- https://search.google.com/search-console/welcome
- 해당 사이트 접근 시, `도메인`, `URL 접두어` 2가지 옵션 중 하나를 선택할 수 있음
- `도메인` : 모바일 사이트를 따로 제공하거나, http/https를 모두 사용하는 경우
- `URL 접두어` : 단순 프로토콜만 사용하거나, 반응형을 적용하여 별도의 모바일 전용 페이지가 존재하지 않는 경우

<br/>

- URL 접두어 옵션을 선택한 후, URL에 `https://[username].github.io/` 입력하고 계속 버튼 클릭하기
- 페이지 소유권 확인 모달이 나옴
- 소유권 확인 방법에는 여러 방법이 있으나 HTML 태그를 추가하는 방법 적용하기
- 해당 모달에서 제공해준 Meta Tag를 복사 붙여넣기 하면 된다고 나오기에 Meta Tag를 관리 중인 Template.tsx에 모달에서 제공하는 Meta Tag를 복사 붙여넣기한 후 재배포하기

```tsx
// src/components/Common/Template.tsx

// ...

const Template: FunctionComponent<TemplateProps> = function ({
                                                               title,
                                                               description,
                                                               url,
                                                               image,
                                                               children,
                                                             }) {
  return (
          <Container>
            <Helmet>
              <title>{title}</title>

              <meta name="description" content={description} />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

              <meta property="og:type" content="website" />
              <meta property="og:title" content={title} />
              <meta property="og:description" content={description} />
              <meta property="og:image" content={image} />
              <meta property="og:url" content={url} />
              <meta property="og:site_name" content={title} />

              <meta name="twitter:card" content="summary" />
              <meta name="twitter:title" content={title} />
              <meta name="twitter:description" content={description} />
              <meta name="twitter:image" content={image} />
              <meta name="twitter:site" content="@username" />
              <meta name="twitter:creator" content="@username" />

              <meta
                      name="google-site-verification"
                      content="웹 마스터 도구가 제공하는 Meta 태그"
              />

              <html lang="ko" />
            </Helmet>

            <GlobalStyle />
            {children}
            <Footer />
          </Container>
  );
};

export default Template;
```

<br/>

- 일정 시간 후, 변경사항이 반영되고 확인 버튼을 누르면 소유권 확인이 완료됨
- Sitemaps 메뉴로 이동하기
- sitemap 링크 (`https://[username].github.io/sitemap/sitemap-index.xml`, `sitemap/sitemap-index.xml`) 작성 및 제출하기
- sitemap을 등록하면 해당 사이트가 크롤링 대기열에 추가되고 등록이 완료됨

<br/>

### Naver Search Advisor 사용하기

- https://searchadvisor.naver.com/
- `https://[username].github.io` 링크 입력 후, 확인 버튼을 클릭하면 소유권 확인 절차를 진행하게 됨
- HTML 태그 방법을 선택한 후, 제공되는 Meta Tag를 복사하여 서비스의 헤드에 붙여넣기 진행

```js
// src/components/Common/Template.tsx

// ...

const Template: FunctionComponent<TemplateProps> = function ({
                                                               title,
                                                               description,
                                                               url,
                                                               image,
                                                               children,
                                                             }) {
  return (
          <Container>
            <Helmet>
              <title>{title}</title>

              <meta name="description" content={description} />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

              <meta property="og:type" content="website" />
              <meta property="og:title" content={title} />
              <meta property="og:description" content={description} />
              <meta property="og:image" content={image} />
              <meta property="og:url" content={url} />
              <meta property="og:site_name" content={title} />

              <meta name="twitter:card" content="summary" />
              <meta name="twitter:title" content={title} />
              <meta name="twitter:description" content={description} />
              <meta name="twitter:image" content={image} />
              <meta name="twitter:site" content="@username" />
              <meta name="twitter:creator" content="@username" />

              <meta
                      name="google-site-verification"
                      content="웹 마스터 도구가 제공하는 Meta 태그"
              />
              <meta
                      name="naver-site-verification"
                      content="웹 마스터 도구가 제공하는 Meta 태그"
              />

              <html lang="ko" />
            </Helmet>

            <GlobalStyle />
            {children}
            <Footer />
          </Container>
  );
};

export default Template;
```

<br/>

- 코드 수정 후, 재배포 진행하기
- 웹 페이지에 변경사항이 반영되면 소유 확인 버튼 클릭하여 계속 진행하기
- 소유권 확인이 완료되면 대시보드로 이동한 후, 사이드 메뉴의 요청 탭의 사이트맵 제출로 이동
- `sitemap/sitemap-index.xml` 작성 후, 확인 버튼 클릭하면 등록 완료됨