export default function (context) {
  context.app.router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
    //
  });
}
