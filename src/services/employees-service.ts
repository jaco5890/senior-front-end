import ServicePath from '../constants/ServicePath';
import Token from '../constants/Token';
import { makeModifyWebRequest, makeWebRequest } from './web-service';

export function getAllEmployees() {
  const endpoint = ServicePath.url.base + ServicePath.url.employees;
  return makeWebRequest(endpoint, Token.apiToken.token, 'GET');
}

export function getEmployeeById(employeeId: any) {
  const endpoint =
    ServicePath.url.base + ServicePath.url.employees + '/' + `${employeeId}`;
  return makeWebRequest(endpoint, Token.apiToken.token, 'GET');
}

export function addNewEmployee(employee: any) {
  const endpoint = ServicePath.url.base + ServicePath.url.employees;
  return makeModifyWebRequest(endpoint, Token.apiToken.token, employee, 'POST');
}

export function deleteExistingEmployee(employeeId: any) {
  const endpoint =
    ServicePath.url.base + ServicePath.url.employees + '/' + `${employeeId}`;
  return makeWebRequest(endpoint, Token.apiToken.token, 'DELETE');
}

export function updateExistingEmployee(employee: any, employeeId: any) {
  const endpoint =
    ServicePath.url.base + ServicePath.url.employees + '/' + `${employeeId}`;
  return makeModifyWebRequest(
    endpoint,
    Token.apiToken.token,
    employee,
    'PATCH',
  );
}
