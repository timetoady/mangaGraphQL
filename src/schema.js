const {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  list,
  // enumType,
} = require('nexus')
const { DateTimeResolver } = require('graphql-scalars')

const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {
    // t.nonNull.list.nonNull.field('allAuthors', {
    //   type: 'Author',
    //   resolve: (_parent, _args, context) => {
    //     return context.prisma.author.findMany()
    //   },
    // })

    t.nonNull.list.nonNull.field('allManga', {
      type: 'Manga',
      resolve: (_parent, _args, context) => {
        return context.prisma.manga.findMany()
      },
    })

    t.nonNull.list.nonNull.field('ongoing', {
      type: 'Manga',
      resolve: (_parent, _args, context) => {
        return context.prisma.manga.findMany({
          where: { ongoing: true },
        })
      },
    })

    t.nonNull.list.nonNull.field('finished', {
      type: 'Manga',
      resolve: (_parent, _args, context) => {
        return context.prisma.manga.findMany({
          where: { ongoing: false },
        })
      },
    })

    t.nonNull.list.nonNull.field('favorite', {
      type: 'Manga',
      resolve: (_parent, _args, context) => {
        return context.prisma.manga.findMany({
          where: { favorite: true },
        })
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

    // t.nullable.field('authorById', {
    //   type: 'Author',
    //   args: {
    //     id: intArg(),
    //   },
    //   resolve: (_parent, args, context) => {
    //     return context.prisma.author.findUnique({
    //       where: { id: args.id || undefined },
    //     })
    //   },
    // })

    t.nullable.field('mangaByTitle', {
      type: 'Manga',
      args: {
        title: stringArg(),
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
    // t.nonNull.field('addAuthor', {
    //   type: 'Author',
    //   args: {
    //     data: nonNull(
    //       arg({
    //         type: 'AuthorCreateInput',
    //       }),
    //     ),
    //     manga: nonNull(
    //       arg({
    //         type: 'MangaCreateInput'
    //       })
    //     )
    //   },
    //   resolve: (_, args, context) => {
    //     return context.prisma.author.create({
    //       data: {
    //         name: args.data.name,
    //       },
    //     })
    //   },
    // })

    t.field('addManga', {
      type: 'Manga',
      args: {
        data: nonNull(
          arg({
            type: 'MangaCreateInput',
          }),
        ),
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
            genres: args.data.genres,
            // genres: getGenres(args.data.genres),
            // publishedFrom: returnDateFrom(args.data.publishedFrom),
            // publishedTo: returnDateTo(args.data.publishedTo),
            publishedFrom: args.data.publishedFrom,
            publishedTo: args.data.publishedTo,
            author: args.data.author,
            // author: {
            //   connect: { name: args.author },
            // },
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

    t.field('updateManga', {
      type: 'Manga',
      args: {
        id: nonNull(intArg()),
        data: nonNull(
          arg({
            type: 'MangaCreateInput',
          }),
        ),
      },
      resolve: (_, args, context) => {
        return context.prisma.manga.update({
          where: { id: args.id || undefined },
          data: {
            title: args.data.title,
            title_english: args.data.title_english,
            title_japanese: args.data.title_japanese,
            synopsis: args.data.synopsis,
            image_url: args.data.image_url,
            volumes: args.data.volumes,
            chapters: args.data.chapters,
            ongoing: args.data.ongoing,
            author: args.data.author,
            favorite: args.data.favorite,
          },
        })
      },
    })

    // t.field('deleteAuthor', {
    //   type: 'Author',
    //   args: {
    //     id: nonNull(intArg()),
    //   },
    //   resolve: (_, args, context) => {
    //     return context.prisma.author.delete({
    //       where: { id: args.id },
    //     })
    //   },
    // })

    t.field('deleteManga', {
      type: 'Manga',
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, args, context) => {
        return context.prisma.manga.delete({
          where: { id: args.id },
        })
      },
    })
  },
})

// const Author = objectType({
//   name: 'Author',
//   definition(t) {
//     t.nonNull.int('id')
//     t.nonNull.string('name')
//     t.string('manga')
//     t.nonNull.list.field('manga', {
//       type: 'Manga',
//       resolve: (parent, _, context) => {
//         return context.prisma.author
//           .findUnique({
//             where: { id: parent.id || undefined },
//           })
//           .manga()
//       },
//     })
//   },
// })

const Manga = objectType({
  name: 'Manga',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.nonNull.string('title')
    t.string('title_english')
    t.string('title_japanese')
    t.string('synopsis')
    t.nonNull.string('image_url')
    t.int('volumes')
    t.int('chapters')
    // t.string('genres')
    t.field('genres', {
      type: list('String'),
      args: {
        ids: list(stringArg()),
      },
    })
    t.nonNull.boolean('ongoing')
    t.boolean('favorite')
    t.field('publishedFrom', { type: 'DateTime' })
    t.field('publishedTo', { type: 'DateTime' })
    t.string('author')
    // t.field('author', {
    //   type: 'Author',
    //   resolve: (parent, _, context) => {
    //     return context.prisma.manga
    //       .findUnique({
    //         where: { id: parent.id || undefined },
    //       })
    //       .author()
    //   },
    // })
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
    t.nonNull.string('author')
    t.nonNull.string('image_url')
    t.string('title_japanese')
    t.string('title_english')
    t.nonNull.boolean('ongoing')
    t.boolean('favorite')
    t.string('synopsis')
    t.field('publishedFrom', { type: 'DateTime' })
    t.field('publishedTo', { type: 'DateTime' })
    t.field('genres', {
      type: list('String'),
      args: {
        ids: list(stringArg()),
      },
    })
    t.int('volumes')
    t.int('chapters')
  },
})

// const AuthorCreateInput = inputObjectType({
//   name: 'AuthorCreateInput',
//   definition(t) {
//     t.nonNull.string('name')
//     t.string('manga')
//   },
// })

const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Manga,
    //Author,
    // UserUniqueInput,
    //AuthorCreateInput,
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
