export function makeModifyWebRequest(
  endpoint: any,
  token: any,
  payload: any,
  method: any,
) {
  try {
    return fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
        Accept: 'application/json',
        authorization: token,
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .catch(error => {
        return error;
      });
  } catch (error) {}
}

export function makeWebRequest(endpoint: any, token: any, method: any) {
  try {
    return fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
        Accept: 'application/json',
        authorization: token,
      },
    })
      .then(response => response.json())
      .catch(error => {
        return error;
      });
  } catch (error) {}
}
