function creteFromQueryParam( requestQuery, useRegex, filterBy ) {
      
  var criteria = {};

  if (!requestQuery)
    return criteria;

  const searchParams = new URLSearchParams(requestQuery);

  searchParams.forEach((value, key) => {
   
    let keyLowerCase = key.toLowerCase();
    
    if (filterBy.find(element => element == keyLowerCase)) {

      if (useRegex)
        criteria[keyLowerCase] = { $regex: value.replace(/"/g, ""), $options : "i" };
      else
        criteria[keyLowerCase] = value.replace(/"/g, "");        
    }
    
  });

  return criteria;
}

export default { creteFromQueryParam };