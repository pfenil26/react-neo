
export const fetchApi = async (url) => {
    let response = await fetch(url);
    response = await response.json();
  
    return response;
}
