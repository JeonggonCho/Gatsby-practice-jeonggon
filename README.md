# Gatsby-theme-jeonggon

본 프로젝트는 인프런의 ["React 기반 Gatsby로 기술 블로그 개발하기"](https://www.inflearn.com/course/gatsby-%EA%B8%B0%EC%88%A0%EB%B8%94%EB%A1%9C%EA%B7%B8/dashboard)를 학습하는 프로젝트로 "Gatsby"의 기초 지식을 학습하는 것을 목표하였습니다.

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
  return <Global style={defaultStyle} />
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

![페이지 상단 소개글 컴포넌트 확인](readme_assets/upper_bar_check.png)

<페이지 상단 소개글 컴포넌트 확인>

<br>
<br>

## 푸터 컴포넌트 구현

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