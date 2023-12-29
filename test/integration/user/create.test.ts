import describe, { before, it } from "node:test";

describe("Create User", () => {
  let server;

  before(() => {
    console.log('Eu fui o terceiro');
    // server = buildFastify();
  });

  it('POST Create user with status 201', () =>{
    console.log('Eu fui o quarto');
  });
});