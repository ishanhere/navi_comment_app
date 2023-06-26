// export const dummyCommentObject = {
//   12345: {
//     cid: "1",
//     comment: "test ",
//     child: {
//       1232345: {
//         cid: "1",
//         comment: "test ",
//         child: {
//           12323245: {
//             cid: "1",
//             comment: "test ",
//             child: [],
//             ctime: "12323245",
//           },
//         },
//         ctime: "1232345",
//       },
//     },
//     ctime: 12345,
//   },
//   12342: {
//     cid: "",
//     comment: "",
//     child: {
//       123125: {
//         cid: "1",
//         comment: "test ",
//         child: {},
//         ctime: "123125",
//       },
//     },
//     ctime: "12342",
//   },
// };
// In object search operation for insert and delete will be costly as child object operation can go upto n^n.
// where iteration would be easy.

// export const dummyCommentArray = [
//   {
//     cid: 1,
//     comment: "",
//     child: [2],
//     ctime: "12342",
//     parent: "",
//   },
//   {
//     cid: 2,
//     comment: "",
//     child: [3],
//     ctime: "12342",
//     parent: 1,
//   },
//   {
//     cid: 3,
//     comment: "",
//     child: [4, 5],
//     ctime: "12342",
//     parent: 2,
//   },
//   {
//     cid: 4,
//     comment: "",
//     child: [],
//     ctime: "12342",
//     parent: 2,
//   },
//   {
//     cid: 5,
//     comment: "",
//     child: [],
//     ctime: "12342",
//     parent: 2,
//   },
// ];
// in array insert and delete would be easy but iteration would be difficult.

// const dummyCommentMap = new Map();
// dummyCommentMap.set("12345", { cid: "1", comment: "test" });
// // add child comment
// const temp = new Map();
// dummyCommentMap.set("12345", { cid: "1", comment: "test" });
