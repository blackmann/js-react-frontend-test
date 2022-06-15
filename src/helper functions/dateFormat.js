var formatDate = (date) => {
  var dd = date.getDate().toString();
  var mm = date.getMonth().toString();
  var yy = date.getFullYear().toString();
  return mm + dd + yy;
};
export {formatDate};
