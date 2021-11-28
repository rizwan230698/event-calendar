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

export const getLegendCode = (legend) => {
  switch (legend) {
    case "hair cut":
      return { color: "#F5D1E7", code: "Cu" };

    case "protein treatment":
      return { color: "#D2E8E0", code: "Pr" };

    case "hair color":
      return { color: "#F5D1E7", code: "Hc" };

    case "deep conditioning":
      return { color: "#FEEBCD", code: "Dc" };

    case "clarifying":
      return { color: "#DED2F9", code: "C" };
    default:
      return {};
  }
};

export const truncate = (str) => str.slice(0, 150);

export const colors = ["#F193C8", "#F2948E", "#57C0F9"];
