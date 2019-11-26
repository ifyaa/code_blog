const { slugify } = require("./src/util/utilityFunctions")
const path = require(`path`)
const authors = require(`./src/util/authors`)
const _ = require("lodash")
// executed each time one node is created on the graphql schema
// test it in graphql :
// //query{
//     allMarkdownRemark{
//         edges{
//           node{
//             id
//             frontmatter{
//               title
//             }
//             fields{
//               slug
//             }
//           }
//         }
//       }
//     }
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    })
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  // const singlePostTemplate = path.resolve("src/templates/single-post.js")
  // console.log("the path : " + singlePostTemplate)
  const templates = {
    singlePost: path.resolve("src/templates/single-post.js"),
    tagsPage: path.resolve("src/templates/tags-page.js"),
    tagPosts: path.resolve("src/templates/tag-posts.js"),
    postList: path.resolve("src/templates/post-list.js"),
    authorPosts: path.resolve("src/templates/author-posts.js"),
  }
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    // console.log("the result : " + JSON.stringify(res.data))
    if (res.errors) return Promise.reject(res.errors)
    const posts = res.data.allMarkdownRemark.edges

    //create single blog post pages
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: templates.singlePost,
        context: {
          //passing slug for template to use to get post
          slug: node.fields.slug,
          // find author imageUrl from authors and pass it to the single post
          imageUrl: authors.find(x => x.name === node.frontmatter.author)
            .imageUrl,
        },
      })
    })

    //get all tags
    let tags = []
    _.each(posts, edge => {
      //check if edge contain node.frontmatter.tags
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })

    //['coding','javascript','algorithms',...]
    //{coding:3 , javascript:4, algorithms:4}

    let tagPostCounts = {}
    tags.forEach(tag => {
      tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1
    })

    console.log(tags)
    console.log(tagPostCounts)

    tags = _.uniq(tags)

    //create tags page
    createPage({
      path: "/tags",
      component: templates.tagsPage,
      context: {
        tags,
        tagPostCounts,
      },
    })

    //create tag posts pages
    tags.forEach(tag => {
      createPage({
        path: `/tag/${slugify(tag)}`,
        component: templates.tagPosts,
        context: {
          tag,
        },
      })
    })

    // Create posts pagination pages
    const postsPerPage = 2
    const numberOfPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numberOfPages }).forEach((_, index) => {
      const isFirstPage = index === 0
      const currentPage = index + 1

      // Skip first page because of index.js
      if (isFirstPage) return

      createPage({
        path: `/page/${currentPage}`,
        component: templates.postList,
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          numberOfPages: numberOfPages,
          currentPage: currentPage,
        },
      })
    })

    // Create author posts pages
    authors.forEach(author => {
      createPage({
        path: `/author/${slugify(author.name)}`,
        component: templates.authorPosts,
        context: {
          authorName: author.name,
          imageUrl: author.imageUrl,
        },
      })
    })
  })
}
