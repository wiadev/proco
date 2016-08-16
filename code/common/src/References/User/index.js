const getUserRef = (uid, child = null) => {
  const ref = `users/${uid}`;
  if (!child) return ref;
  return `${ref}/${child}`;
}
export default getUserRef;