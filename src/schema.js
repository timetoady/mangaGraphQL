const {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} = require('nexus')
const { DateTimeResolver } = require('graphql-scalars')

const DateTime = asNexusMethod(DateTimeResolver, 'date')

function getNested(fn, defaultVal) {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

function returnDate(object) {
  let year = getNested(() => object["prop"].to["year"])
  let month = getNested(() => object["prop"].to["month"])
  let day = getNested(() => object["prop"].to["day"])
  let theDate = new Date(year, month, day)
  if (year === null) {
      return null
  } else{
      return theDate
  }
}

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allAuthors', {
      type: 'Author',
      resolve: (_parent, _args, context) => {
        return context.prisma.author.findMany()
      },
    })

    t.nonNull.list.nonNull.field('allManga', {
      type: 'Manga',
      resolve: (_parent, _args, context) => {
        return context.prisma.manga.findMany()
      },
    })

    t.nullable.field('mangaById', {
      type: 'Manga',
      args: {
        id: intArg(),
      },
      resolve: (_parent, args, context) => {
        return context.prisma.manga.findUnique({
          where: { id: args.id || undefined },
        })
      },
    })

    t.nullable.field('mangaByTitle', {
      type: 'Manga',
      args: {
        id: intArg(),
      },
      resolve: (_parent, args, context) => {
        return context.prisma.manga.findUnique({
          where: { title: args.title || undefined },
        })
      },
    })

    // t.nonNull.list.nonNull.field('feed', {
    //   type: 'Post',
    //   args: {
    //     searchString: stringArg(),
    //     skip: intArg(),
    //     take: intArg(),
    //     orderBy: arg({
    //       type: 'PostOrderByUpdatedAtInput',
    //     }),
    //   },
    //   resolve: (_parent, args, context) => {
    //     const or = args.searchString
    //       ? {
    //         OR: [
    //           { title: { contains: args.searchString } },
    //           { content: { contains: args.searchString } },
    //         ],
    //       }
    //       : {}

    //     return context.prisma.post.findMany({
    //       where: {
    //         published: true,
    //         ...or,
    //       },
    //       take: args.take || undefined,
    //       skip: args.skip || undefined,
    //       orderBy: args.orderBy || undefined,
    //     })
    //   },
    // })

    // t.list.field('draftsByUser', {
    //   type: 'Post',
    //   args: {
    //     userUniqueInput: nonNull(
    //       arg({
    //         type: 'UserUniqueInput',
    //       }),
    //     ),
    //   },
    //   resolve: (_parent, args, context) => {
    //     return context.prisma.user
    //       .findUnique({
    //         where: {
    //           id: args.userUniqueInput.id || undefined,
    //           email: args.userUniqueInput.email || undefined,
    //         },
    //       })
    //       .posts({
    //         where: {
    //           published: false,
    //         },
    //       })
    //   },
    // })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    // t.nonNull.field('signupUser', {
    //   type: 'User',
    //   args: {
    //     data: nonNull(
    //       arg({
    //         type: 'UserCreateInput',
    //       }),
    //     ),
    //   },
    //   resolve: (_, args, context) => {
    //     const postData = args.data.posts
    //       ? args.data.posts.map((post) => {
    //         return { title: post.title, content: post.content || undefined }
    //       })
    //       : []
    //     return context.prisma.user.create({
    //       data: {
    //         name: args.data.name,
    //         email: args.data.email,
    //         posts: {
    //           create: postData,
    //         },
    //       },
    //     })
    //   },
    // })

    t.field('createManga', {
      type: 'Manga',
      args: {
        data: nonNull(
          arg({
            type: 'MangaCreateInput',
          }),
        ),
        authorName: nonNull(stringArg()),
      },
      resolve: (_, args, context) => {
        return context.prisma.manga.create({
          data: {
            title: args.data.title,
            title_english: args.data.title_english,
            title_japanese: args.data.title_japanese,
            synopsis: args.data.synopsis,
            image_url: args.data.image_url,
            volumes: args.data.volumes,
            chapters: args.data.chapters,
            ongoing: args.data.ongoing,
            publishedFrom: returnDate(args.data.publishedFrom),
            publishedTo: returnDate(args.data.publishedTo),
            author: {
              connect: { name: args.authorName },
            },
          },
        })
      },
    })

    // t.field('togglePublishPost', {
    //   type: 'Post',
    //   args: {
    //     id: nonNull(intArg()),
    //   },
    //   resolve: async (_, args, context) => {
    //     const post = await context.prisma.post.findUnique({
    //       where: { id: args.id || undefined },
    //       select: {
    //         published: true,
    //       },
    //     })

    //     if (!post) {
    //       throw new Error(
    //         `Post with ID ${args.id} does not exist in the database.`,
    //       )
    //     }

    //     return context.prisma.post.update({
    //       where: { id: args.id || undefined },
    //       data: { published: !post.published },
    //     })
    //   },
    // })

    // t.field('incrementPostViewCount', {
    //   type: 'Post',
    //   args: {
    //     id: nonNull(intArg()),
    //   },
    //   resolve: (_, args, context) => {
    //     return context.prisma.post.update({
    //       where: { id: args.id || undefined },
    //       data: {
    //         viewCount: {
    //           increment: 1,
    //         },
    //       },
    //     })
    //   },
    // })

    // t.field('deletePost', {
    //   type: 'Post',
    //   args: {
    //     id: nonNull(intArg()),
    //   },
    //   resolve: (_, args, context) => {
    //     return context.prisma.post.delete({
    //       where: { id: args.id },
    //     })
    //   },
    // })
  },
})

const Author = objectType({
  name: 'Author',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.list.nonNull.field('manga', {
      type: 'Manga',
      resolve: (parent, _, context) => {
        return context.prisma.author
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .manga()
      },
    })
  },
})

const Manga = objectType({
  name: 'Manga',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.nonNull.string('title')
    t.string('title_english')
    t.nonNull.string('title_japanese')
    t.string('synopsis')
    t.nonNull.string('image_url')
    t.int('volumes')
    t.int('chapters')
    t.nonNull.boolean('ongoing')
    t.nonNull.field('publishedFrom', { type: 'DateTime' })
    t.field('publishedTo', { type: 'DateTime' })
    t.field('author', {
      type: 'Author',
      resolve: (parent, _, context) => {
        return context.prisma.manga
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author()
      },
    })
  },
})

// const SortOrder = enumType({
//   name: 'SortOrder',
//   members: ['asc', 'desc'],
// })

// const PostOrderByUpdatedAtInput = inputObjectType({
//   name: 'PostOrderByUpdatedAtInput',
//   definition(t) {
//     t.nonNull.field('updatedAt', { type: 'SortOrder' })
//   },
// })

// const UserUniqueInput = inputObjectType({
//   name: 'UserUniqueInput',
//   definition(t) {
//     t.int('id')
//     t.string('email')
//   },
// })

const MangaCreateInput = inputObjectType({
  name: 'MangaCreateInput',
  definition(t) {
    t.nonNull.string('title')
    t.string('synopsis')
  },
})

// const UserCreateInput = inputObjectType({
//   name: 'UserCreateInput',
//   definition(t) {
//     t.nonNull.string('email')
//     t.string('name')
//     t.list.nonNull.field('posts', { type: 'PostCreateInput' })
//   },
// })

const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Manga,
    Author,
    // UserUniqueInput,
    // UserCreateInput,
    MangaCreateInput,
    // SortOrder,
    // PostOrderByUpdatedAtInput,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

module.exports = {
  schema: schema,
}
