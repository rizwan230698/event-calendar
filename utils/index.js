export const getRequestObject = (continuationtoken) => ({
  requestobjects: [
    {
      posts: {
        operationtype: "read",
        id: {
          return: true,
        },
        userid: {
          searchvalues: ["41329663-5834-11eb-8e6e-3ca82abc3dd4"],
          return: true,
        },
        iscalendarentry: {
          searchvalues: ["true"],
          return: true,
        },
        media: {
          return: true,
        },
        rating: {
          return: true,
        },
        text: {
          return: true,
        },
        privacy: {
          searchvalues: [18],
          return: true,
        },
        typeofday: {
          return: true,
        },
        calendardatetime: {
          return: true,
          sort: "descending",
        },
        maxitemcount: "20",
        continuationtoken: continuationtoken,
      },
    },
  ],
});
