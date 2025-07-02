module.exports = {
  default: [
    '--require', 'features/step_definations/*.js',  
    '--require', 'features/AccountsPayable/*.js',
    '--require', 'support/**/*.js',
    '--format', 'progress'
  ]
};