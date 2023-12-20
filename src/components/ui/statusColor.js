export const getStatusColor = (status) => {
    switch (status) {
      case "sent":
        return "red";
      case "inProgress":
        return "orange";
      case "delivered":
        return "green";
      default:
        return "black";
    }
}

// export function getStatusColor(status) {
//   switch (status) {
//     case "sent":
//       return "red";
//     case "inProgress":
//       return "orange";
//     case "delivered":
//       return "green";
//     default:
//       return "black";
//   }
// }