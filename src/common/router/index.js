export function getRouteWithoutParams(router) {
  const { pathname } = router.location;
  if (Object.keys(router.params) === 0) return pathname;

  let result = pathname;
  for (const param in router.params) {
    const index = result.lastIndexOf(`/${router.params[param]}`);
    result = result.substring(0, index);
  }

  return result;
}
