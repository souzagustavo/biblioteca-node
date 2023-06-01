function creteForMongoDBFromQueryParam( requestQuery ) {
      
  var criteria = {};

  if (!requestQuery)
    return criteria;

  const searchParams = new URLSearchParams(requestQuery);

  searchParams.forEach((value, key) => {
    criteria[key] = value.replace(/"/g, "");
  });

  return criteria;
}

export default { creteForMongoDBFromQueryParam };