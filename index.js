/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line import/no-unresolved
  require('./build/index')
} else {
  require('@babel/register')({ extensions: ['.js', '.ts'] })
  require('./src/index')
}
