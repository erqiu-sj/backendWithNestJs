export function isEmail(email: string) {
  const regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  if (!email.length)
    return false;
  return regemail.test(email);
}

/**
 * @description  [true,'string'] === userName | [false,'string'] === email 注册时使用 | [boolean,boolean] === 验证不通过
 * @param check
 */
export function isUserNameOrEmail(userName: string, email: string): [boolean, string] | [boolean, boolean] {
  if (!userName) {
    // 用户名为空
    const checkEmail = isEmail(email);
    // 用户名为空，邮箱验证也不通过
    if (!checkEmail) return [false, false];
    return [false, email];
  }
  // 用户名不为空
  return [true, userName];
}