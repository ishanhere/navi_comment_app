// export const getComments = async () => {
//   return [
//     {
//       id: "1",
//       body: "First comment",
//       username: "Jack",
//       userId: "1",
//       parentId: null,
//       createdAt: "2021-08-16T23:00:33.010+02:00",
//     },
//     {
//       id: "2",
//       body: "Second comment",
//       username: "John",
//       userId: "2",
//       parentId: null,
//       createdAt: "2021-08-16T23:00:33.010+02:00",
//     },
//     {
//       id: "3",
//       body: "First comment first child",
//       username: "John",
//       userId: "2",
//       parentId: "1",
//       createdAt: "2021-08-16T23:00:33.010+02:00",
//     },
//     {
//       id: "4",
//       body: "Second comment second child",
//       username: "John",
//       userId: "2",
//       parentId: "2",
//       createdAt: "2021-08-16T23:00:33.010+02:00",
//     },
//   ];
// };

// export const createComment = async (text, parentId = null) => {
//   return {
//     id: Math.random().toString(36).substr(2, 9),
//     body: text,
//     parentId,
//     userId: "1",
//     username: "John",
//     createdAt: new Date().toISOString(),
//   };
// };

// export const updateComment = async (text) => {
//   return { text };
// };

// export const deleteComment = async () => {
//   return {};
// };
export const addComment = function (data, commentId, item) {
  if (data.id === commentId) {
    data.items.push({
      id: new Date().getTime(),
      name: item,
      items: [],
    });

    return data;
  }

  let latestNode = [];
  latestNode = data.items.map((ob) => {
    return addComment(ob, commentId, item);
  });

  return { ...data, items: latestNode };
};

export const editComment = (data, commentId, value) => {
  if (data.id === commentId) {
    data.name = value;
    return data;
  }

  data.items.map((ob) => {
    return editComment(ob, commentId, value);
  });

  return { ...data };
};

export const deleteComment = (data, id) => {
  for (let i = 0; i < data.items.length; i++) {
    const currentItem = data.items[i];
    if (currentItem.id === id) {
      data.items.splice(i, 1);
      return data;
    } else {
      deleteComment(currentItem, id);
    }
  }
  return data;
};
