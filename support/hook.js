const { Before, After } = require('@cucumber/cucumber');

Before(async function () {
  if (this.init) {
    await this.init();
  } else {
    throw new Error("CustomWorld.init is not defined.");
  }
});

After(async function () {
  if (this.close) {
    await this.close();
  } else {
    throw new Error("CustomWorld.close is not defined.");
  }
});
