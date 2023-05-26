class LocalStorageService {
  static setItem(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  static getItem(key) {
    const item = localStorage.getItem(key);
    try {
      return JSON.parse(item);
    } catch (e) {
      return item;
    }
  }

  static removeItem(key) {
    localStorage.removeItem(key);
  }

  static setSession(token, user) {
    this.setItem('token', token);
    this.setItem('user', user);
  }

  static clearSession() {
    this.removeItem('token');
    this.removeItem('user');
  }

  static setToken(token) {
    this.setItem('token', token);
  }

  static getToken() {
    return this.getItem('token');
  }

  static removeToken() {
    this.removeItem('token')
  }

  static setUser(user) {
    return this.setItem('user', user);
  }

  static getUser() {
    return this.getItem('user');
  }

  static isAuthenticated() {
    const token = this.getToken();
    return token && token.length > 0;
  }
}

export default LocalStorageService;
