const path = require('path');
const { useExpressDevPack } = require('@midwayjs/faas-dev-pack');
const URL = require('url');

module.exports = async ({ context, onGetWebpackConfig, onHook, log }) => {
  const { rootDir, command } = context;

  onGetWebpackConfig((config) => {
    if (command === 'start') {
      const originalDevServeBefore = config.devServer.get('before');

      config.merge({ devServer: {
        before(app, server) {
          app.use(useExpressDevPack({
            functionDir: rootDir,
            sourceDir: path.resolve(rootDir, 'src/apis'),
            ignoreWildcardFunctions: ['render'],
            // 忽略静态文件地址
            ignorePattern: (req) => {
              const { pathname } = URL.parse(req.url)
              return /\.(js|css|map|json|png|jpg|jpeg|gif|svg|eot|woff2|ttf)$/.test(pathname);
            }
          }));

          if (typeof originalDevServeBefore === 'function') {
            originalDevServeBefore(app, server);
          }
        },
      }});
    }
  });

  onHook('before.build.run', () => {
    // build({
    //   log,
    //   outputDir,
    //   rootDir,
    //   yamlData,
    // }).catch((err) => {
    //   log.error('函数构建出错');
    //   console.error(err);
    //   process.exit(1);
    // })
  });

  onHook('after.build.compile', () => {
    // xxx
  });
};
