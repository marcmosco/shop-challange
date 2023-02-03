import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

const users = [
  {
    id: 1,
    username: 'Marco',
    password: 'password',
    email: 'prova@mail.it',
    firstName: 'Test',
    lastName: 'User',
    role: 'user',
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiIwMGY1YmQ1Mi03ZWYxLTQxZGEtOGJkMi00ZmNkY2JkODljMTEiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vOGM0YjQ3YjUtZWEzNS00MzcwLTgxN2YtOTUwNjZkNGY4NDY3L3YyLjAiLCJpYXQiOjE2NDUwODQwOTMsIm5iZiI6MTY0NTA4NDA5MywiZXhwIjoxNjQ1MDg5MTc0LCJhaW8iOiJBVFFBeS84VEFBQUF5RFdIdlpESXd4NnBxQmJkUC93cURDVzI5M3M1UGFqbjZLbzZnMzZCbEpFUk1MeE1MNDV0V3ZvS0F6aWJoNUM0IiwiYXpwIjoiYmRkMjFhNDctZWVmOS00ZWRhLThmOTgtM2U2ZGU0NThkMGY4IiwiYXpwYWNyIjoiMCIsImdyb3VwcyI6WyJBRF9zaXJlX2Jva2VzX2FkbWluZGV2IiwiQURfc2lyZV9tY19hYl9QUklkZXYiXSwibmFtZSI6Ik1hcmNvIE1vc2NvbmUiLCJvaWQiOiI2YzE1MGU2MC04M2ZkLTQ2NDYtYmRjNC0zNWRiNjUxZjViYjciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJleHQuZW5nbW1vc2NvbmVAY2RwLml0IiwicmgiOiIwLkFRSUF0VWRMakRYcWNFT0JmNVVHYlUtRVoxSzk5UUR4ZnRwQmk5SlB6Y3ZZbkJFQ0FKVS4iLCJzY3AiOiJhbGwiLCJzdWIiOiJtczNXS1FwWU91U21fZXJVc2l4bnd1M2g3ekFLb1JfY0c1R0RKcmdCX3JjIiwidGlkIjoiOGM0YjQ3YjUtZWEzNS00MzcwLTgxN2YtOTUwNjZkNGY4NDY3IiwidXRpIjoiZHJOMEg5ZTFSMC1kVVhBOGxYTTNBQSIsInZlciI6IjIuMCJ9.fVzYb5llkJfbD9hXqEH1Yh38GB4xQbPR5Wbzya2tCTvEcQ2aJKB_mSjDqby0TsLlT2-IxYix5TlXMGTMFyx6gsWOaAuG-jaq_Wpu1uLBaBGdQ162gLMmmq-YT0tRazdIjx4RTlTmUkTDD64JD85xVCyaBVh1QN9eMmBrLj5MgtkoUcQ5pFWwT4efp1GRVbPmNQomr97bfaZrWSF-K_u-vYjaYKijPvBqVfTCWBTSRiY0QgAFrjJ933tzeYjwtSIP4riSAXMASSbFStO7E4wv7vQvq40WrtnxkY-fi0X6FGF4YF6Z5ZcFIqGdNhLcC0vvQ8FaRG4cwLq1w56TtA_RdQ',
  },
];
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiIwMGY1YmQ1Mi03ZWYxLTQxZGEtOGJkMi00ZmNkY2JkODljMTEiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vOGM0YjQ3YjUtZWEzNS00MzcwLTgxN2YtOTUwNjZkNGY4NDY3L3YyLjAiLCJpYXQiOjE2NDUwODQwOTMsIm5iZiI6MTY0NTA4NDA5MywiZXhwIjoxNjQ1MDg5MTc0LCJhaW8iOiJBVFFBeS84VEFBQUF5RFdIdlpESXd4NnBxQmJkUC93cURDVzI5M3M1UGFqbjZLbzZnMzZCbEpFUk1MeE1MNDV0V3ZvS0F6aWJoNUM0IiwiYXpwIjoiYmRkMjFhNDctZWVmOS00ZWRhLThmOTgtM2U2ZGU0NThkMGY4IiwiYXpwYWNyIjoiMCIsImdyb3VwcyI6WyJBRF9zaXJlX2Jva2VzX2FkbWluZGV2IiwiQURfc2lyZV9tY19hYl9QUklkZXYiXSwibmFtZSI6Ik1hcmNvIE1vc2NvbmUiLCJvaWQiOiI2YzE1MGU2MC04M2ZkLTQ2NDYtYmRjNC0zNWRiNjUxZjViYjciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJleHQuZW5nbW1vc2NvbmVAY2RwLml0IiwicmgiOiIwLkFRSUF0VWRMakRYcWNFT0JmNVVHYlUtRVoxSzk5UUR4ZnRwQmk5SlB6Y3ZZbkJFQ0FKVS4iLCJzY3AiOiJhbGwiLCJzdWIiOiJtczNXS1FwWU91U21fZXJVc2l4bnd1M2g3ekFLb1JfY0c1R0RKcmdCX3JjIiwidGlkIjoiOGM0YjQ3YjUtZWEzNS00MzcwLTgxN2YtOTUwNjZkNGY4NDY3IiwidXRpIjoiZHJOMEg5ZTFSMC1kVVhBOGxYTTNBQSIsInZlciI6IjIuMCJ9.fVzYb5llkJfbD9hXqEH1Yh38GB4xQbPR5Wbzya2tCTvEcQ2aJKB_mSjDqby0TsLlT2-IxYix5TlXMGTMFyx6gsWOaAuG-jaq_Wpu1uLBaBGdQ162gLMmmq-YT0tRazdIjx4RTlTmUkTDD64JD85xVCyaBVh1QN9eMmBrLj5MgtkoUcQ5pFWwT4efp1GRVbPmNQomr97bfaZrWSF-K_u-vYjaYKijPvBqVfTCWBTSRiY0QgAFrjJ933tzeYjwtSIP4riSAXMASSbFStO7E4wv7vQvq40WrtnxkY-fi0X6FGF4YF6Z5ZcFIqGdNhLcC0vvQ8FaRG4cwLq1w56TtA_RdQ';
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { email, password } = body;
      const user = users.find(
        (x) => x.email === email && x.password === password
      );
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    // helper functions
    function ok(body?) {
      headers = headers.set('Authorization', token);
      let response = new HttpResponse({ body, headers, status: 200 });

      return of(response);
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return (
        headers.get('Authorization') ===
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiIwMGY1YmQ1Mi03ZWYxLTQxZGEtOGJkMi00ZmNkY2JkODljMTEiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vOGM0YjQ3YjUtZWEzNS00MzcwLTgxN2YtOTUwNjZkNGY4NDY3L3YyLjAiLCJpYXQiOjE2NDUwODQwOTMsIm5iZiI6MTY0NTA4NDA5MywiZXhwIjoxNjQ1MDg5MTc0LCJhaW8iOiJBVFFBeS84VEFBQUF5RFdIdlpESXd4NnBxQmJkUC93cURDVzI5M3M1UGFqbjZLbzZnMzZCbEpFUk1MeE1MNDV0V3ZvS0F6aWJoNUM0IiwiYXpwIjoiYmRkMjFhNDctZWVmOS00ZWRhLThmOTgtM2U2ZGU0NThkMGY4IiwiYXpwYWNyIjoiMCIsImdyb3VwcyI6WyJBRF9zaXJlX2Jva2VzX2FkbWluZGV2IiwiQURfc2lyZV9tY19hYl9QUklkZXYiXSwibmFtZSI6Ik1hcmNvIE1vc2NvbmUiLCJvaWQiOiI2YzE1MGU2MC04M2ZkLTQ2NDYtYmRjNC0zNWRiNjUxZjViYjciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJleHQuZW5nbW1vc2NvbmVAY2RwLml0IiwicmgiOiIwLkFRSUF0VWRMakRYcWNFT0JmNVVHYlUtRVoxSzk5UUR4ZnRwQmk5SlB6Y3ZZbkJFQ0FKVS4iLCJzY3AiOiJhbGwiLCJzdWIiOiJtczNXS1FwWU91U21fZXJVc2l4bnd1M2g3ekFLb1JfY0c1R0RKcmdCX3JjIiwidGlkIjoiOGM0YjQ3YjUtZWEzNS00MzcwLTgxN2YtOTUwNjZkNGY4NDY3IiwidXRpIjoiZHJOMEg5ZTFSMC1kVVhBOGxYTTNBQSIsInZlciI6IjIuMCJ9.fVzYb5llkJfbD9hXqEH1Yh38GB4xQbPR5Wbzya2tCTvEcQ2aJKB_mSjDqby0TsLlT2-IxYix5TlXMGTMFyx6gsWOaAuG-jaq_Wpu1uLBaBGdQ162gLMmmq-YT0tRazdIjx4RTlTmUkTDD64JD85xVCyaBVh1QN9eMmBrLj5MgtkoUcQ5pFWwT4efp1GRVbPmNQomr97bfaZrWSF-K_u-vYjaYKijPvBqVfTCWBTSRiY0QgAFrjJ933tzeYjwtSIP4riSAXMASSbFStO7E4wv7vQvq40WrtnxkY-fi0X6FGF4YF6Z5ZcFIqGdNhLcC0vvQ8FaRG4cwLq1w56TtA_RdQ'
      );
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
