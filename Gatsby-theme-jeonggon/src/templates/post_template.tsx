import React, { FC } from 'react'
import { graphql } from 'gatsby'
import Template from 'components/Common/Template'
import PostHead from 'components/Post/PostHead'
import { PostFrontmatterType } from '../types/PostItem.types'

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
};

const PostTemplate: FC<PostTemplateProps> = (
  { data: {
    allMarkdownRemark: {edges},
  } }
) => {
  const {
    node: {
      html,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        thumbnail: {
          childImageSharp: {gatsbyImageData},
        },
      },
    },
  } = edges[0];

  return (
    <Template>
      <PostHead
        title={title}
        date={date}
        categories={categories}
        thumbnail={gatsbyImageData}
      />
    </Template>
  );
};

export default PostTemplate;

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