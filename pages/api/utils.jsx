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
export const addComment = function (tree, commentId, item) {
  if (tree.id === commentId) {
    tree.items.push({
      id: new Date().getTime(),
      name: item,
      items: [],
    });

    return tree;
  }

  let latestNode = [];
  latestNode = tree.items.map((ob) => {
    return addComment(ob, commentId, item);
  });

  return { ...tree, items: latestNode };
};

export const editComment = (tree, commentId, value) => {
  if (tree.id === commentId) {
    tree.name = value;
    return tree;
  }

  tree.items.map((ob) => {
    return editComment(ob, commentId, value);
  });

  return { ...tree };
};

export const deleteComment = (tree, id) => {
  for (let i = 0; i < tree.items.length; i++) {
    const currentItem = tree.items[i];
    if (currentItem.id === id) {
      tree.items.splice(i, 1);
      return tree;
    } else {
      deleteComment(currentItem, id);
    }
  }
  return tree;
};
