import { request, gql } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                id
                name
                picture {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                slug
                createdBy {
                  name
                }
              }
            }
          }
        }
      }
      
    `

  const result = await request(graphqlAPI, query)
  return result.postsConnection.edges;

};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails(){
      posts(
        orderBy: createdAt_ASC
        last: 3
      ){
        title
        featuredImage{
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)
  return result.posts;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query getPostDetails($slug: String!, $categories: [String!]){
      posts(
        where: { slug_not: $slug, AND: {categories_some: { slug_in: $categories }} }
        last: 3
        ){
          title
          featuredImage{
            url
          }
          createdAt
          slug
        }
    }
  `
  const result = await request(graphqlAPI, query, { categories, slug })
  return result.posts;
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        category
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)
  return result.categories;
}

export const getPostDetails = async (slug) => {
  const query = gql`
  query GetPostDetails($slug: String!) {
    post(where: {slug:$slug}){
            author {
              bio
              id
              name
              picture {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              slug
              createdBy {
                name
              }
            }
            content{
              raw
            }
          }
    }
    
  `

  const result = await request(graphqlAPI, query, { slug } )
  return result.post;

};

export const submitComment = async (obj) => {
  const result = await fetch ('/api/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })

  return result.json();
}

export const getComment = async (slug) => {
  const query = gql`
    query GetComment($slug:String!) {
      comments(where: {post: {slug:$slug}}) {
        name
        createdAt
        comment
      }
    }
  `
  const result = await request(graphqlAPI, query, {slug})
  return result.comments;
}

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          picture {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}){
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              picture{
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage{
              url
            }
            categories{
              category
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })
  return result.postsConnection.edges
}